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
      <div className="hidden lg:block relative z-10 w-full overflow-hidden">
        <Header onOpenCart={() => setIsCartOpen(true)} />
        <Hero />
        <ProductSection onOpenDetail={handleOpenProduct} />
      </div>

      {/* ==================== MOBILE ONLY HEADER/HERO/PRODUCTS ==================== */}
      <div className="lg:hidden relative z-10 bg-gray-50 w-full overflow-hidden">
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

        {/* Mobile Call-to-action */}
        <div className="px-5 pb-8">
          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-heading font-semibold py-3.5 rounded-2xl shadow-sm w-full transition-transform active:scale-95">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0c-6.627 0-12.022 5.405-12.022 12.036 0 2.13.561 4.218 1.625 6.06L0 24l6.045-1.587c1.78.966 3.785 1.47 5.823 1.47h.005c6.627 0 12.021-5.405 12.021-12.036 0-3.21-1.258-6.225-3.374-8.4zm-8.475 18.575h-.004c-1.8 0-3.565-.484-5.111-1.402l-.367-.217-3.799.996 1.018-3.7-.238-.379c-1.009-1.602-1.542-3.456-1.542-5.367 0-5.558 4.526-10.089 10.09-10.089 2.72 0 5.253 1.059 7.175 2.984 1.905 1.906 2.951 4.437 2.951 7.135 0 5.558-4.526 10.04-10.086 10.04z" /><path fillRule="evenodd" clipRule="evenodd" d="M17.59 13.54c-.272-.136-1.613-.797-1.864-.887-.251-.091-.433-.136-.615.136-.181.272-.703.887-.862 1.069-.159.181-.318.204-.59.068-.272-.136-1.151-.424-2.193-1.353-.811-.722-1.358-1.614-1.517-1.886-.159-.272-.017-.419.119-.554.123-.122.272-.317.408-.476.136-.159.181-.272.272-.453.091-.182.045-.34-.022-.476-.068-.136-.615-1.482-.843-2.027-.223-.532-.449-.46-.615-.468l-.522-.008c-.181 0-.476.068-.726.34-.25.272-.953.931-.953 2.269s.976 2.625 1.112 2.807c.136.182 1.904 2.915 4.613 4.085 1.942.837 2.766.908 3.738.767 1.064-.155 3.268-1.336 3.722-2.625.454-1.29.454-2.396.318-2.625-.136-.226-.499-.362-.771-.498z" /></svg>
            WhatsApp Order
          </a>
        </div>
      </div>

      {/* ==================== SHARED CONTENT (RESPONSIVE) ==================== */}
      <div className="relative z-10 w-full overflow-hidden pb-20 lg:pb-0">
        <WhyDrDrift />
        <About />
        <Contact />
        <Footer />
      </div>

      {/* ==================== MOBILE FLOATING NAV/FAB ==================== */}
      <MobileBottomNav onNavigate={handleMobileNavigate} onOpenCart={() => setIsCartOpen(true)} />
      <MobileCartFab onOpenCart={() => setIsCartOpen(true)} />

      {/* ==================== GLOBAL DIALOGS ==================== */}
      <div className="relative z-[60]">
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
