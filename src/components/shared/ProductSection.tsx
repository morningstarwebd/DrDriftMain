"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { products, Product } from '@/data/products';
import { ShoppingCart, Eye } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProductSectionProps {
  onOpenDetail: (product: Product) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({ onOpenDetail }) => {
  const [filter, setFilter] = useState<'all' | 'floor' | 'toilet' | 'dish'>('all');

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter((p: Product) => p.category === filter);

  const categories = [
    { id: 'all', name: 'All', icon: '🧹' },
    { id: 'floor', name: 'Floor Cleaner', icon: '🏠' },
    { id: 'toilet', name: 'Toilet Cleaner', icon: '🚽' },
    { id: 'dish', name: 'Dishwash', icon: '🍽️' },
  ];

  return (
    <section id="products" className="section-padding bg-muted/20">
      <div className="container-custom">
        <div className="text-center mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold uppercase tracking-widest text-xs"
          >
            Our Catalog
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-black tracking-tight"
          >
            Premium Cleaning Solutions
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-primary mx-auto rounded-full"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={cn(
                "px-6 py-3 rounded-2xl flex items-center gap-2 transition-all font-medium",
                filter === cat.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105" 
                  : "bg-white text-muted-foreground hover:bg-muted"
              )}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product: Product, idx: number) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              key={product.id}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-muted/50 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all"
            >
              <div className="relative aspect-square bg-muted/30 p-10 overflow-hidden cursor-pointer" onClick={() => onOpenDetail(product)}>
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl">
                        <Eye className="w-5 h-5 text-primary" />
                    </div>
                </div>
                <div className="absolute top-6 left-6">
                    <span className="px-3 py-1 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20">
                        {product.category}
                    </span>
                </div>
              </div>

              <div className="p-8 space-y-4">
                <div>
                    <h3 className="text-2xl font-heading font-bold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                    {product.shortDescription}
                    </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-muted">
                    <div>
                        <span className="text-xs text-muted-foreground block uppercase font-bold tracking-tighter">Starts at</span>
                        <span className="text-2xl font-black text-primary">₹{product.variants[0].price}</span>
                    </div>
                    <button 
                        onClick={() => onOpenDetail(product)}
                        className="p-4 rounded-2xl bg-primary text-white hover:opacity-90 transition-all active:scale-90"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
