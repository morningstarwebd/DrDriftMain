"use client";

import React from 'react';
import { Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-muted/10 border-t border-muted py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-8">
            <span className="text-3xl font-black font-heading text-primary">Dr. Drift</span>
            <p className="text-muted-foreground leading-relaxed">
              Redefining cleanliness with premium-grade solutions for homes and professional spaces. 
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-muted flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-muted flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-muted flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Products', 'Why Us', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    {item} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8">Products</h4>
            <ul className="space-y-4">
              {['Floor Cleaner', 'Toilet Cleaner', 'Dishwash Liquid', 'Bulk Packs', 'Institutional Range'].map((item) => (
                <li key={item}>
                  <a href="#products" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    {item} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-8">Our Presence</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>Corporate Office: New Delhi, India</li>
              <li>B2B Support: +91 99999 99999</li>
              <li>Support: hello@drdrift.com</li>
            </ul>
            <div className="mt-8 p-6 rounded-3xl bg-primary/5 border border-primary/10">
              <p className="text-[10px] font-black uppercase tracking-widest mb-2">Hospitality Specialist</p>
              <p className="text-xs leading-relaxed italic">"The #1 choice for boutique hotels and cafes."</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-muted flex flex-col md:row items-center justify-between gap-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
          <p>© 2024 Dr. Drift Cleaning solutions</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
