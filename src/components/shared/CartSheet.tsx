"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartSheet: React.FC<CartSheetProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, removeFromCart, updateQuantity, subtotal, deliveryCharge, total } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
          />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-[151] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold font-heading">Your Cart</h2>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                  {items.reduce((acc, i) => acc + i.quantity, 0)} Items
                </span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-muted-foreground">
                  <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <p className="text-lg">Your cart is empty</p>
                  <button onClick={onClose} className="btn-outline px-8">Start Shopping</button>
                </div>
              ) : (
                items.map((item, idx) => (
                  <div key={`${item.id}-${item.variant}`} className="flex gap-4 p-4 rounded-3xl bg-muted/20 border border-transparent hover:border-primary/20 transition-all group">
                    <div className="w-20 h-20 bg-white rounded-2xl p-2 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{item.variant}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-white p-1 rounded-lg">
                          <button onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)} className="p-1 hover:bg-muted rounded text-primary">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)} className="p-1 hover:bg-muted rounded text-primary">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button onClick={() => removeFromCart(item.id, item.variant)} className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all rounded-lg opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right flex flex-col justify-end pb-1">
                      <p className="font-bold text-lg">RS {item.price * item.quantity}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t bg-white space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span><span>RS {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span>{deliveryCharge === 0 ? 'FREE' : `RS ${deliveryCharge}`}</span>
                  </div>
                  {deliveryCharge > 0 && (
                    <p className="text-[10px] text-primary text-center bg-primary/5 py-1 rounded-md">
                      Free delivery on orders above RS 1000!
                    </p>
                  )}
                  <div className="flex justify-between text-2xl font-bold pt-2 border-t font-heading">
                    <span>Total</span><span>RS {total}</span>
                  </div>
                </div>
                <button onClick={onCheckout} className="w-full btn-primary py-4 text-lg shadow-xl shadow-primary/20">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
