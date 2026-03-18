"use client";

import React from 'react';
import { Home, ShoppingBag, Info, MessageCircle, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MobileBottomNav: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const { items } = useCart();
  const itemCount = items.reduce((acc: number, i: any) => acc + i.quantity, 0);

  const navItems = [
    { name: 'Home', icon: Home, href: '#' },
    { name: 'Products', icon: ShoppingBag, href: '#products' },
    { name: 'Cart', icon: Heart, onClick: onOpenCart, isCart: true },
    { name: 'About', icon: Info, href: '#about' },
    { name: 'Chat', icon: MessageCircle, href: 'https://wa.me/919999999999' },
  ];

  return (
    <nav className="md:hidden fixed bottom-6 inset-x-6 z-[90] bg-white/80 backdrop-blur-2xl border border-primary/10 rounded-[2.5rem] shadow-2xl px-6 py-4 flex items-center justify-between">
      {navItems.map((item) => (
        <a 
          key={item.name}
          href={item.href || 'javascript:void(0)'}
          onClick={item.onClick}
          className="relative flex flex-col items-center gap-1 group"
        >
          <div className={cn(
            "p-2 rounded-2xl transition-all group-active:scale-95",
            item.isCart ? "bg-primary text-white -mt-10 p-4 shadow-xl shadow-primary/40 mb-1" : "text-muted-foreground group-hover:text-primary"
          )}>
            <item.icon className={cn(item.isCart ? "w-6 h-6" : "w-5 h-5")} />
            {item.isCart && itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary">
                {itemCount}
              </span>
            )}
          </div>
          {!item.isCart && <span className="text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">{item.name}</span>}
        </a>
      ))}
    </nav>
  );
};
