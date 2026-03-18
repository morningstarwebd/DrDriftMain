"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingCart, MessageCircle, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Header: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const { items } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = items.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Products', href: '#products' },
    { name: 'Why Dr. Drift', href: '#why-us' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 inset-x-0 z-[80] transition-all duration-300 py-4 px-6 md:px-12",
        isScrolled ? "bg-white/80 backdrop-blur-xl border-b border-primary/10 py-3" : "bg-transparent text-white"
      )}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#" className="text-3xl font-black font-heading tracking-tight">
            Dr.<span className={cn(isScrolled ? "text-primary" : "text-white")}>Drift</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={cn(
                  "font-medium text-sm uppercase tracking-widest transition-all hover:text-primary",
                  !isScrolled && "text-white/80 hover:text-white"
                )}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="https://wa.me/919999999999" 
              target="_blank" 
              className={cn(
                "p-3 rounded-full transition-all bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white",
                !isScrolled && "bg-white/10 text-white hover:bg-green-500"
              )}
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button 
              onClick={onOpenCart}
              className={cn(
                "relative p-3 rounded-full transition-all bg-primary/10 text-primary hover:bg-primary hover:text-white",
                !isScrolled && "bg-white/10 text-white hover:bg-primary"
              )}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {itemCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-3 rounded-full bg-muted/20"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-white z-[100] md:hidden p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-3xl font-black font-heading text-primary">Dr. Drift</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-muted/30 rounded-full">
                <X className="w-8 h-8" />
              </button>
            </div>
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-heading font-bold hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="mt-auto space-y-4">
              <a href="https://wa.me/919999999999" className="w-full btn-primary py-4 text-lg bg-green-500 hover:bg-green-600 border-none">
                <MessageCircle className="w-6 h-6 mr-2" />
                WhatsApp Us
              </a>
              <p className="text-center text-muted-foreground text-sm">© 2024 Dr. Drift Cleaning Co.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
