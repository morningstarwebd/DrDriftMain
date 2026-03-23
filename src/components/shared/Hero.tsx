"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, MessageSquare, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0.4, 0.8]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <video 
        autoPlay muted loop playsInline 
        className="absolute inset-0 w-full h-full object-cover scale-105"
      >
        <source src="https://fiqeuvdxsqupjdgqcpnj.supabase.co/storage/v1/object/public/asset/Hero/Man_cleaning_with_202603181718.mp4" type="video/mp4" />
      </video>

      {/* Dynamic Overlay from PetShop pattern */}
      <motion.div 
        style={{ backgroundColor: 'rgba(0,0,0,1)', opacity: overlayOpacity }}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 container-custom text-white text-center pb-20 md:pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-black uppercase tracking-widest animate-fade-in">
            ✨ Premium Institutional Grade
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black tracking-tight leading-[0.9]">
            Deep Clean.<br/>
            <span className="text-primary italic">Better Life.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed font-light">
            Dr. Drift delivers high-performance cleaning solutions trusted by 3-star and 4-star hotels, cafes, and premium homes across India.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <motion.a 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              href="#products" 
              className="btn-primary btn-lg shadow-2xl shadow-primary/40 px-12"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Shop Now
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              href="https://wa.me/919999999999" 
              target="_blank"
              className="btn-outline border-white text-white hover:bg-white/10 btn-lg px-12"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              WhatsApp Help
            </motion.a>
          </div>
        </motion.div>
      </div>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>

      {/* Stats row inspired by Atithi */}
      <div className="absolute bottom-0 inset-x-0 hidden md:block bg-black/30 backdrop-blur-xl border-t border-white/10 py-8">
        <div className="container-custom flex justify-between items-center text-center">
            <div className="flex-1">
                <span className="block text-4xl font-heading font-bold text-white">99.9%</span>
                <span className="text-xs text-white/40 uppercase tracking-widest font-black">Germ Protection</span>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="flex-1">
                <span className="block text-4xl font-heading font-bold text-white">B2B</span>
                <span className="text-xs text-white/40 uppercase tracking-widest font-black">Hospitality Focused</span>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="flex-1">
                <span className="block text-4xl font-heading font-bold text-white">Pro</span>
                <span className="text-xs text-white/40 uppercase tracking-widest font-black">Institutional Grade</span>
            </div>
        </div>
      </div>
    </section>
  );
};
