"use client";

import React, { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { Hero } from '@/components/shared/Hero';
import { ProductSection } from '@/components/shared/ProductSection';
import { WhyDrDrift, About, Contact } from '@/components/shared/ExtraSections';
import { Footer } from '@/components/shared/Footer';
import { MobileBottomNav } from '@/components/shared/MobileBottomNav';
import { CartSheet } from '@/components/shared/CartSheet';
import { ProductDetailDialog } from '@/components/shared/ProductDetailDialog';
import { CheckoutDialog } from '@/components/shared/CheckoutDialog';
import { Product as ProductType } from '@/data/products';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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

  return (
    <main className="min-h-screen">
      <Header onOpenCart={() => setIsCartOpen(true)} />
      
      <Hero />
      
      <ProductSection onOpenDetail={handleOpenProduct} />
      
      <WhyDrDrift />
      
      <About />
      
      <Contact />
      
      <Footer />

      {/* Overlays / Dialogs */}
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

      <MobileBottomNav onOpenCart={() => setIsCartOpen(true)} />
    </main>
  );
}
