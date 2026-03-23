"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProductDetailDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailDialog: React.FC<ProductDetailDialogProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      variant: product.variants[selectedVariant].size,
      price: product.variants[selectedVariant].price,
      quantity: quantity,
      image: product.images[0]
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-[95%] max-w-4xl h-[90vh] md:h-auto md:max-h-[85vh] bg-white rounded-3xl z-[101] shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-md shadow-md hover:bg-white z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-muted/30 relative group">
              <motion.img 
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.images[currentImage]} 
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
              
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setCurrentImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="p-2 rounded-full bg-white/80 shadow-md hover:bg-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setCurrentImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="p-2 rounded-full bg-white/80 shadow-md hover:bg-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
                {product.images.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      currentImage === idx ? "bg-primary w-6" : "bg-primary/20"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Info Section */}
            <div className="w-full md:w-1/2 flex flex-col h-[calc(100%-16rem)] md:h-auto overflow-hidden">
              
              {/* Scrollable Details */}
              <div className="p-6 md:p-10 pb-2 md:pb-6 overflow-y-auto flex-1 no-scrollbar">
                <span className="text-primary font-bold uppercase tracking-widest text-xs">{product.category} Cleaner</span>
                <h2 className="text-3xl font-heading font-black mt-1 text-gray-800">{product.name}</h2>
                
                {/* Moved Size Selector ABOVE description */}
                <div className="mt-6">
                  <h4 className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Select Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setSelectedVariant(idx)}
                        className={cn(
                          "px-5 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm",
                          selectedVariant === idx 
                            ? "border-primary bg-primary/5 text-primary" 
                            : "border-muted hover:border-muted-foreground/30 text-gray-500"
                        )}
                      >
                        {variant.size} — ₹{variant.price}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 mb-4">
                  <h4 className="font-semibold text-[11px] uppercase tracking-wider text-muted-foreground mb-3">Description</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Sticky Bottom Bar */}
              <div className="p-4 px-6 md:p-10 pt-4 border-t border-muted/50 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.02)] shrink-0 z-10 w-full relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-xl border border-muted/50">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition-all active:scale-95"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center font-bold text-gray-800">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-gray-600 transition-all active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mb-0.5">Total</span>
                    <span className="text-2xl font-black text-primary leading-none">
                        ₹{product.variants[selectedVariant].price * quantity}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  className="w-full btn-primary py-3.5 text-base shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
