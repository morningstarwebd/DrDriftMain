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
            <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto">
              <span className="text-primary font-bold uppercase tracking-widest text-xs">{product.category} Cleaner</span>
              <h2 className="text-3xl font-heading font-bold mt-2">{product.name}</h2>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                {product.description}
              </p>

              <div className="mt-8">
                <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Select Size</h4>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setSelectedVariant(idx)}
                      className={cn(
                        "px-6 py-3 rounded-xl border-2 transition-all font-medium",
                        selectedVariant === idx 
                          ? "border-primary bg-primary/5 text-primary" 
                          : "border-muted hover:border-muted-foreground/30 text-muted-foreground"
                      )}
                    >
                      {variant.size} — ₹{variant.price}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Quantity</h4>
                  <div className="flex items-center gap-4 bg-muted/50 w-fit p-1 rounded-xl">
                    <button 
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="p-2 rounded-lg hover:bg-white transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="p-2 rounded-lg hover:bg-white transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground block">Total Price</span>
                  <span className="text-2xl font-bold">₹{product.variants[selectedVariant].price * quantity}</span>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full mt-10 btn-primary py-4 text-lg shadow-lg shadow-primary/20"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
