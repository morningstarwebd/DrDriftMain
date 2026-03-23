"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, CreditCard, CheckCircle2, ShoppingBag, ArrowLeft, MessageSquare, Smartphone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import QRCode from 'qrcode';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CheckoutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4;

export const CheckoutDialog: React.FC<CheckoutDialogProps> = ({ isOpen, onClose }) => {
  const { items, subtotal, deliveryCharge, total, clearCart } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'upi' | null>(null);
  const qrRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (step === 3 && paymentMethod === 'upi' && qrRef.current) {
        const upiUrl = `upi://pay?pa=drdrift@upi&pn=Dr%20Drift&am=${total}&cu=INR&tn=Order%20Payment`;
        QRCode.toCanvas(qrRef.current, upiUrl, { width: 240, margin: 2 }, (error) => {
            if (error) console.error(error);
        });
    }
  }, [step, paymentMethod, total]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateOrderSummary = () => {
    return items.map(i => `${i.name} (${i.variant}) x ${i.quantity}`).join('\n');
  };

  const handleWhatsAppOrder = (method: string) => {
    const message = `Hello Dr. Drift,
I want to place an order.

*Order Details:*
${generateOrderSummary()}

*Total:* RS ${total}
*Payment Method:* ${method === 'upi' ? 'UPI (Paid)' : 'Order on WhatsApp'}

*Delivery Address:*
${formData.name}
${formData.phone}
${formData.address}, ${formData.city} - ${formData.pincode}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/919999999999?text=${encodedMessage}`, '_blank');
    setStep(4);
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Review Order";
      case 2: return "Delivery Details";
      case 3: return "Payment Method";
      case 4: return "Success!";
    }
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-xl bg-white z-[201] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-4">
                {step > 1 && step < 4 && (
                  <button onClick={() => setStep(prev => (prev - 1) as Step)} className="p-2 hover:bg-muted rounded-full">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                )}
                <h2 className="text-xl font-bold">{getStepTitle()}</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-muted rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Stepper */}
            <div className="px-6 py-4 border-b flex justify-between bg-muted/20">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                    step >= s ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  )}>
                    {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                  </div>
                  {s < 4 && <div className={cn("w-12 h-1 bg-muted rounded-full", step > s && "bg-primary")} />}
                </div>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    {items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-muted/30">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                        <div className="flex-1">
                          <h4 className="font-bold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.variant} x {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">RS {item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-6 rounded-2xl bg-primary/5 space-y-3">
                    <div className="flex justify-between"><span>Subtotal</span><span>RS {subtotal}</span></div>
                    <div className="flex justify-between"><span>Delivery</span><span>{deliveryCharge === 0 ? 'FREE' : `RS ${deliveryCharge}`}</span></div>
                    <div className="flex justify-between text-xl font-bold pt-3 border-t"><span>Total</span><span>RS {total}</span></div>
                  </div>
                  <button onClick={() => setStep(2)} className="w-full btn-primary py-4">Continue to Address</button>
                </div>
              )}

              {step === 2 && (
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Full Name *</label>
                      <input name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-muted focus:border-primary outline-none transition-all" placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Phone Number *</label>
                      <input name="phone" value={formData.phone} onChange={handleInputChange} required type="tel" className="w-full px-4 py-3 rounded-xl border border-muted focus:border-primary outline-none transition-all" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Address *</label>
                      <textarea name="address" value={formData.address} onChange={handleInputChange} required rows={3} className="w-full px-4 py-3 rounded-xl border border-muted focus:border-primary outline-none transition-all" placeholder="Plot No, Street, Landmark" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">City *</label>
                        <input name="city" value={formData.city} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl border border-muted focus:border-primary outline-none transition-all" placeholder="City" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">Pincode *</label>
                        <input name="pincode" value={formData.pincode} onChange={handleInputChange} required maxLength={6} className="w-full px-4 py-3 rounded-xl border border-muted focus:border-primary outline-none transition-all" placeholder="XXXXXX" />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="w-full btn-primary py-4">Continue to Payment</button>
                </form>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <button 
                      onClick={() => setPaymentMethod('whatsapp')}
                      className={cn(
                        "flex items-center gap-4 p-6 rounded-3xl border-2 transition-all text-left",
                        paymentMethod === 'whatsapp' ? "border-primary bg-primary/5" : "border-muted hover:border-muted-foreground/20"
                      )}
                    >
                      <div className="p-4 rounded-2xl bg-green-500/10 text-green-500"><MessageSquare className="w-8 h-8" /></div>
                      <div>
                        <h4 className="font-bold text-lg">Order on WhatsApp</h4>
                        <p className="text-sm text-muted-foreground">Send details & pay after discussion</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setPaymentMethod('upi')}
                      className={cn(
                        "flex items-center gap-4 p-6 rounded-3xl border-2 transition-all text-left",
                        paymentMethod === 'upi' ? "border-primary bg-primary/5" : "border-muted hover:border-muted-foreground/20"
                      )}
                    >
                      <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-500"><Smartphone className="w-8 h-8" /></div>
                      <div>
                        <h4 className="font-bold text-lg">Pay with UPI (QR Code)</h4>
                        <p className="text-sm text-muted-foreground">Instant payment via any UPI app</p>
                      </div>
                    </button>
                  </div>

                  {paymentMethod === 'upi' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="p-8 bg-muted/30 rounded-3xl flex flex-col items-center text-center space-y-4"
                    >
                      <canvas ref={qrRef} className="rounded-xl shadow-lg bg-white p-2" />
                      <div>
                        <p className="text-sm text-muted-foreground">Scan to pay <strong>RS {total}</strong></p>
                        <p className="font-mono font-bold mt-1">drdrift@upi</p>
                      </div>
                      <button onClick={() => handleWhatsAppOrder('upi')} className="w-full btn-primary py-4">✅ I Have House Paid</button>
                    </motion.div>
                  )}

                  {paymentMethod === 'whatsapp' && (
                    <button onClick={() => handleWhatsAppOrder('whatsapp')} className="w-full btn-primary py-4">
                      Submit Order on WhatsApp
                    </button>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                  <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-16 h-16" />
                  </div>
                  <h2 className="text-3xl font-heading font-bold">Order Received!</h2>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you! Your order has been placed. We will reach out to you on WhatsApp for final confirmation.
                  </p>
                  <button onClick={() => { onClose(); clearCart(); setStep(1); }} className="px-10 py-4 btn-primary">
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
