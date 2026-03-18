"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, FlaskConical, PackageCheck, Hotel, Zap, ShieldCheck, Flower2, MessageSquare } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const WhyDrDrift: React.FC = () => {
  const features = [
    {
      icon: FlaskConical,
      title: "Premium Formula",
      desc: "Scientifically formulated for maximum cleaning power without harsh surface damage.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: PackageCheck,
      title: "Bulk Supply Ready",
      desc: "Available in 500ml to 5L packs — perfect for high-volume commercial needs.",
      color: "text-teal-500",
      bg: "bg-teal-500/10"
    },
    {
      icon: Hotel,
      title: "Hospitality Grade",
      desc: "Ideal for 3-star and 4-star hotels, ensuring consistent professional results.",
      color: "text-amber-500",
      bg: "bg-amber-500/10"
    },
    {
      icon: Zap,
      title: "Strong Performance",
      desc: "Tough on grease and stains, leaving surfaces spotless with minimal effort.",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      icon: ShieldCheck,
      title: "Surface Safe",
      desc: "Gentle on marble, granite, and tiles while maintaining 99.9% germ protection.",
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      icon: Flower2,
      title: "Fresh Fragrance",
      desc: "Leaves a premium, long-lasting scent that elevates the ambiance of any room.",
      color: "text-rose-500",
      bg: "bg-rose-500/10"
    }
  ];

  return (
    <section id="why-us" className="section-padding bg-white relative overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">The Dr. Drift Difference</span>
            <h2 className="text-5xl md:text-6xl font-heading font-black tracking-tight leading-[1.1]">
                Engineered for <br/>
                <span className="text-primary">Superior Clean.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                We combine industrial-grade potency with consumer-safe formulations. Whether it's a grand hotel lobby or your kitchen floor, Dr. Drift ensures perfection.
            </p>
            <div className="grid sm:grid-cols-2 gap-8 pt-8">
              <div className="p-8 rounded-[2rem] bg-accent border border-primary/10 space-y-4">
                <span className="text-5xl font-black text-primary">500+</span>
                <p className="font-bold">Businesses Served</p>
                <p className="text-sm text-muted-foreground">From cafes to major hotel chains.</p>
              </div>
              <div className="p-8 rounded-[2rem] bg-muted/30 border border-muted space-y-4">
                <span className="text-5xl font-black text-foreground">99.9%</span>
                <p className="font-bold">Bacteria Free</p>
                <p className="text-sm text-muted-foreground">Lab tested sanitation standards.</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-white border border-muted hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", f.bg, f.color)}>
                  <f.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
    return (
        <section id="about" className="section-padding bg-muted/20">
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    <div className="flex-1 w-full">
                        <div className="relative">
                            <img 
                                src="https://fiqeuvdxsqupjdgqcpnj.supabase.co/storage/v1/object/public/asset/product%20images/Floor%20cleaner/5l/Whisk_55751352e8a31f6a4ee49f0a1d3fffb0dr.png" 
                                alt="Dr. Drift Products" 
                                className="w-full h-auto rounded-[3rem] shadow-2xl relative z-10" 
                            />
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                            <div className="absolute -top-10 -left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
                        </div>
                    </div>
                    <div className="flex-1 space-y-10">
                        <div className="space-y-4">
                            <span className="text-primary font-bold uppercase tracking-widest text-xs">The Vision</span>
                            <h2 className="text-5xl font-heading font-black tracking-tight">Redefining FMCG Excellence</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                Dr. Drift is more than a cleaning brand. It’s a promise of purity and professionalism. 
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Elite Formulation</h4>
                                    <p className="text-muted-foreground">High-performance chemicals that meet international safety standards.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Market Focus</h4>
                                    <p className="text-muted-foreground">Starting with premium white-labeling, moving towards full manufacturing.</p>
                                </div>
                            </div>
                        </div>
                        <button className="btn-outline border-primary text-primary px-10">
                            Download Brochure
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Contact: React.FC = () => {
    return (
        <section id="contact" className="section-padding bg-white">
            <div className="container-custom">
                <div className="max-w-4xl mx-auto rounded-[3rem] bg-foreground text-white p-12 md:p-20 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
                    
                    <div className="relative z-10 grid md:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <h2 className="text-5xl font-heading font-black tracking-tight">Need a Bulk Order?</h2>
                            <p className="text-white/60 leading-relaxed">
                                Our dedicated B2B team is ready to assist you with customized pricing and logistics for your business.
                            </p>
                            <div className="space-y-4 pt-4">
                                <a href="tel:+919999999999" className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-all group-hover:bg-primary">
                                        <PackageCheck className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold">+91 99999 99999</span>
                                </a>
                                <a href="mailto:sales@drdrift.com" className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-all group-hover:bg-primary">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold">sales@drdrift.com</span>
                                </a>
                            </div>
                        </div>
                        
                        <form className="space-y-4" onSubmit={(e) => {
                            e.preventDefault();
                            const target = e.target as any;
                            const message = `Bulk Inquiry from Dr. Drift Website:
Name: ${target.name.value}
Business: ${target.business.value}
Message: ${target.msg.value}`;
                            window.open(`https://wa.me/919999999999?text=${encodeURIComponent(message)}`, '_blank');
                        }}>
                            <input name="name" required placeholder="Full Name" className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all" />
                            <input name="business" required placeholder="Business Name (Hotel/Cafe)" className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all" />
                            <textarea name="msg" required placeholder="Tell us about your requirements..." rows={4} className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all" />
                            <button type="submit" className="w-full btn-primary py-4 mt-4 bg-primary text-foreground border-none">
                                Send Inquiry on WhatsApp
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { WhyDrDrift, About, Contact };
