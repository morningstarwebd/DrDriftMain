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
        
        {/* ================= DESKTOP VIEW ================= */}
        <div className="hidden lg:grid grid-cols-2 gap-16 items-center">
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

        {/* ================= MOBILE VIEW ================= */}
        <div className="flex flex-col lg:hidden space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="px-4 text-center"
          >
            <span className="text-primary font-bold uppercase tracking-widest text-[10px]">The Dr. Drift Difference</span>
            <h2 className="text-4xl font-heading font-black tracking-tight leading-[1.2] mt-2">
                Engineered for <br/>
                <span className="text-primary">Superior Clean.</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                We combine industrial-grade potency with consumer-safe formulations. Whether it's a grand hotel lobby or your kitchen floor, Dr. Drift ensures perfection.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 px-2 pb-4">
            {/* Stat Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="p-5 rounded-[2rem] bg-accent border border-primary/10 space-y-2 shadow-sm flex flex-col justify-center"
            >
              <span className="text-4xl font-black text-primary font-heading">500+</span>
              <p className="font-bold text-sm font-heading text-gray-800 leading-tight">Businesses Served</p>
            </motion.div>
            
            {/* Stat Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="p-5 rounded-[2rem] bg-muted/30 border border-muted space-y-2 shadow-sm flex flex-col justify-center"
            >
              <span className="text-4xl font-black text-foreground font-heading">99.9%</span>
              <p className="font-bold text-sm font-heading text-gray-800 leading-tight">Bacteria Free</p>
            </motion.div>

            {/* Feature Cards */}
            {features.map((f, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                key={i}
                className="p-5 rounded-[2rem] bg-white border border-muted shadow-sm flex flex-col"
              >
                <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center mb-4 shrink-0", f.bg, f.color)}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold mb-2 font-heading text-gray-800 leading-tight">{f.title}</h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">
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
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center"
                >
                    <div className="flex-1 w-full">
                        <div className="relative">
                            <div className="relative z-10 w-full overflow-hidden rounded-[2rem] lg:rounded-[3rem] shadow-2xl bg-white flex items-center justify-center aspect-square lg:aspect-auto">
                                <img 
                                    src="https://fiqeuvdxsqupjdgqcpnj.supabase.co/storage/v1/object/public/asset/product%20images/Floor%20cleaner/5l/Whisk_55751352e8a31f6a4ee49f0a1d3fffb0dr.png" 
                                    alt="Dr. Drift Products" 
                                    className="w-[130%] h-[130%] lg:w-full lg:h-auto object-cover lg:object-contain relative -top-6 lg:-top-0" 
                                />
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                            <div className="absolute -top-10 -left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
                        </div>
                    </div>
                    <div className="flex-1 space-y-6 lg:space-y-10 w-full">
                        <div className="space-y-2 lg:space-y-4">
                            <span className="text-primary font-bold uppercase tracking-widest text-xs">The Vision</span>
                            <h2 className="text-4xl lg:text-5xl font-heading font-black tracking-tight leading-tight">Redefining FMCG Excellence</h2>
                            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
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
                </motion.div>
            </div>
        </section>
    );
};

const Contact: React.FC = () => {
    return (
        <section id="contact" className="section-padding bg-white">
            <div className="container-custom">
                {/* Desktop Version */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="hidden md:block max-w-4xl mx-auto rounded-[3rem] bg-foreground text-white p-20 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px]" />
                    
                    <div className="relative z-10 grid grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <h2 className="text-5xl font-heading font-black tracking-tight leading-tight">Need a Bulk Order?</h2>
                            <p className="text-white/60 leading-relaxed text-base">
                                Our dedicated B2B team is ready to assist you with customized pricing and logistics for your business.
                            </p>
                            <div className="space-y-4 pt-4">
                                <a href="tel:+919999999999" className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-all group-hover:bg-primary shrink-0">
                                        <PackageCheck className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-base">+91 99999 99999</span>
                                </a>
                                <a href="mailto:sales@drdrift.com" className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-all group-hover:bg-primary shrink-0">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-base break-all">sales@drdrift.com</span>
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
                            <input name="name" required placeholder="Full Name" className="w-full text-base bg-white/10 border border-white/20 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all" />
                            <input name="business" required placeholder="Business Name (Hotel/Cafe)" className="w-full text-base bg-white/10 border border-white/20 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all" />
                            <textarea name="msg" required placeholder="Tell us about your requirements..." rows={4} className="w-full text-base bg-white/10 border border-white/20 rounded-2xl px-6 py-4 outline-none focus:border-primary transition-all" />
                            <button type="submit" className="w-full btn-primary py-4 mt-4 bg-primary text-foreground border-none text-base font-semibold rounded-2xl">
                                Send Inquiry on WhatsApp
                            </button>
                        </form>
                    </div>
                </motion.div>

                {/* Mobile Version - Highly Compact & Light Theme */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="md:hidden space-y-8 px-2"
                >
                    <div className="text-center space-y-2">
                        <h2 className="text-4xl font-heading font-black tracking-tight text-foreground">Bulk Order?</h2>
                        <p className="text-muted-foreground text-sm px-4">
                            Get customized B2B pricing & logistics for your business instantly.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <a href="tel:+919999999999" className="flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-3xl bg-muted/20 text-foreground font-semibold active:scale-95 transition-transform">
                            <PackageCheck className="w-6 h-6 text-primary" />
                            <span className="text-xs">Call Us</span>
                        </a>
                        <a href="mailto:sales@drdrift.com" className="flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-3xl bg-muted/20 text-foreground font-semibold active:scale-95 transition-transform">
                            <MessageSquare className="w-6 h-6 text-primary" />
                            <span className="text-xs">Email Us</span>
                        </a>
                    </div>

                    <form className="space-y-4 pt-2" onSubmit={(e) => {
                        e.preventDefault();
                        const target = e.target as any;
                        const message = `Bulk Inquiry from Dr. Drift Website:
Name: ${target.name.value}
Business: ${target.business.value}
Message: ${target.msg.value}`;
                        window.open(`https://wa.me/919999999999?text=${encodeURIComponent(message)}`, '_blank');
                    }}>
                        <div className="space-y-5">
                            <div className="relative border-b-2 border-muted focus-within:border-primary transition-colors">
                                <input name="name" required placeholder="Full Name" className="w-full text-sm bg-transparent px-1 py-2 outline-none" />
                            </div>
                            <div className="relative border-b-2 border-muted focus-within:border-primary transition-colors">
                                <input name="business" required placeholder="Business Name" className="w-full text-sm bg-transparent px-1 py-2 outline-none" />
                            </div>
                            <div className="relative border-b-2 border-muted focus-within:border-primary transition-colors">
                                <textarea name="msg" required placeholder="Requirements..." rows={2} className="w-full text-sm bg-transparent px-1 py-2 outline-none resize-none" />
                            </div>
                        </div>

                        <button type="submit" className="w-full h-14 bg-[#25D366] text-white font-heading font-semibold text-lg rounded-2xl flex items-center justify-center gap-2 shadow-sm shadow-[#25D366]/20 active:scale-[0.98] transition-all mt-4">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.449C18.24 1.245 15.24 0 12.045 0c-6.627 0-12.022 5.405-12.022 12.036 0 2.13.561 4.218 1.625 6.06L0 24l6.045-1.587c1.78.966 3.785 1.47 5.823 1.47h.005c6.627 0 12.021-5.405 12.021-12.036 0-3.21-1.258-6.225-3.374-8.4zm-8.475 18.575h-.004c-1.8 0-3.565-.484-5.111-1.402l-.367-.217-3.799.996 1.018-3.7-.238-.379c-1.009-1.602-1.542-3.456-1.542-5.367 0-5.558 4.526-10.089 10.09-10.089 2.72 0 5.253 1.059 7.175 2.984 1.905 1.906 2.951 4.437 2.951 7.135 0 5.558-4.526 10.04-10.086 10.04z" /></svg>
                            WhatsApp Us
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export { WhyDrDrift, About, Contact };
