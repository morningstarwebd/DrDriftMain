"use client";

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/shared/Header';
import { Hero } from '@/components/shared/Hero';
import { ProductSection } from '@/components/shared/ProductSection';
import { WhyDrDrift, About, Contact } from '@/components/shared/ExtraSections';
import { Footer } from '@/components/shared/Footer';
import { CartSheet } from '@/components/shared/CartSheet';
import { ProductDetailDialog } from '@/components/shared/ProductDetailDialog';
import { CheckoutDialog } from '@/components/shared/CheckoutDialog';
import { Product as ProductType, products } from '@/data/products';

// Mobile components
import MobileHeader from '@/components/mobile/MobileHeader';
import MobileHeroCarousel from '@/components/mobile/MobileHeroCarousel';
import IconCategoryStrip from '@/components/mobile/IconCategoryStrip';
import HorizontalProductScroller from '@/components/mobile/HorizontalProductScroller';
import MobileBottomNav from '@/components/mobile/MobileBottomNav';
import MobileCartFab from '@/components/mobile/MobileCartFab';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState<string>('all');

  useEffect(() => {
    if (isCartOpen || selectedProduct || isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, selectedProduct, isCheckoutOpen]);

  const handleOpenProduct = (product: ProductType) => {
    setSelectedProduct(product);
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
  };

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleMobileNavigate = (section: string) => {
    if (section === 'categories') {
      document.getElementById('m-categories')?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'search') {
      // search is handled by header toggle
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* ==================== DESKTOP ONLY HEADER/HERO/PRODUCTS ==================== */}
      <div className="hidden lg:block relative z-[50] w-full overflow-hidden">
        <Header onOpenCart={() => setIsCartOpen(true)} />
        <Hero />
        <ProductSection onOpenDetail={handleOpenProduct} />
      </div>

      {/* ==================== MOBILE ONLY HEADER/HERO/PRODUCTS ==================== */}
      <div className="lg:hidden relative z-[50] bg-gray-50 w-full overflow-hidden">
        <MobileHeader onOpenCart={() => setIsCartOpen(true)} />
        <MobileHeroCarousel />

        <div className="mt-4">
          <IconCategoryStrip 
            selectedCategory={mobileCategory} 
            onSelectCategory={setMobileCategory} 
          />
        </div>

        {/* Selected Category Scroller */}
        <div className="pt-4 pb-8">
          <HorizontalProductScroller 
            title={mobileCategory === 'all' ? "All Products" : `${mobileCategory.charAt(0).toUpperCase() + mobileCategory.slice(1)} Cleaners`} 
            products={mobileCategory === 'all' ? products : products.filter(p => p.category === mobileCategory)} 
            onProductClick={setSelectedProduct} 
          />
        </div>

      </div>

      {/* ==================== SHARED CONTENT (RESPONSIVE) ==================== */}
      <div className="relative z-10 w-full overflow-hidden pb-20 lg:pb-0">
        <WhyDrDrift />
        <About />
        <Contact />
        <Footer />
      </div>

      {/* ==================== GLOBAL DIALOGS ==================== */}
      <div className="relative z-[200]">
        <CartSheet 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            onCheckout={handleOpenCheckout}
        />
        
        <ProductDetailDialog 
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={handleCloseProduct}
        />

        <CheckoutDialog 
            isOpen={isCheckoutOpen}
            onClose={() => setIsCheckoutOpen(false)}
        />
      </div>
    </main>
  );
}
