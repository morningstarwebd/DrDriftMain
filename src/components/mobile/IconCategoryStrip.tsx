'use client';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface IconCategoryStripProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export default function IconCategoryStrip({ selectedCategory, onSelectCategory }: IconCategoryStripProps) {
    const allCategories = [
        { id: 'all', name: 'All', slug: 'all', icon: '🫧' },
        { id: 'floor', name: 'Floor', slug: 'floor', icon: '🧹' },
        { id: 'dish', name: 'Dishwash', slug: 'dish', icon: '🍽️' },
        { id: 'toilet', name: 'Toilet', slug: 'toilet', icon: '🚽' },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            id="m-categories" 
            className="lg:hidden px-4 py-4"
        >
            <h3 className="font-heading font-bold text-gray-800 text-base mb-3">Categories</h3>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {allCategories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => onSelectCategory(cat.slug)}
                        className={twMerge(clsx(
                            "flex flex-col items-center justify-center gap-1.5 flex-1 min-w-[80px] py-2.5 px-3 rounded-2xl transition-all border-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-95",
                            selectedCategory === cat.slug 
                                ? "border-primary bg-primary/5 text-primary" 
                                : "border-transparent bg-white text-gray-500"
                        ))}
                    >
                        <span className="text-2xl mb-1">{cat.icon}</span>
                        <span className="text-[11px] font-semibold text-center leading-tight">
                            {cat.name}
                        </span>
                    </button>
                ))}
            </div>
        </motion.div>
    );
}
