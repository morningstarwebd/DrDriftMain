'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

interface Props {
    title: string;
    products: Product[];
    onProductClick: (product: Product) => void;
}

export default function HorizontalProductScroller({ title, products, onProductClick }: Props) {
    const { addToCart } = useCart();
    const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
    const [flyingItem, setFlyingItem] = useState<{ id: string, src: string, startRect: DOMRect, endRect: DOMRect } | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleAddToCart = (e: React.MouseEvent, product: Product, price: number, size: string, image: string) => {
        e.stopPropagation();
        
        // Fly-to-cart animation logic
        const buttonEl = e.currentTarget as HTMLElement;
        const cardEl = buttonEl.closest('.flex-shrink-0');
        const imgEl = cardEl?.querySelector('img');
        const targetEl = document.getElementById('mobile-header-cart');
        
        if (imgEl && targetEl) {
            const startRect = imgEl.getBoundingClientRect();
            const endRect = targetEl.getBoundingClientRect();
            
            setFlyingItem({
                id: Date.now().toString(),
                src: image,
                startRect,
                endRect
            });
            
            setTimeout(() => setFlyingItem(null), 700);
        }

        addToCart({
            id: product.id,
            name: product.name,
            variant: size,
            price: price,
            quantity: 1,
            image: image
        });
        setAddedItems(prev => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
            setAddedItems(prev => ({ ...prev, [product.id]: false }));
        }, 1200);
    };

    if (products.length === 0) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:hidden mb-6"
        >
            <div className="flex items-center justify-between px-4 mb-3">
                <h3 className="font-heading font-bold text-gray-800 text-base">{title}</h3>
                <button className="text-primary text-xs font-semibold">View All →</button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar px-4 pb-4">
                {products.map(product => {
                    const price = product.variants[0]?.price || 0;
                    const size = product.variants[0]?.size || '';
                    const image = product.images[0] || '';
                    const isAdded = addedItems[product.id];

                    return (
                        <div
                            key={product.id}
                            className="flex-shrink-0 w-[160px] bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer flex flex-col"
                            onClick={() => onProductClick(product)}
                        >
                            <div className="relative aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                                <img
                                    src={image}
                                    alt={product.name}
                                    className="w-full h-full object-contain mix-blend-multiply"
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-3.5 flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="font-heading font-bold text-sm text-gray-800 line-clamp-1 leading-tight">{product.name}</h4>
                                    <p className="text-[11px] text-gray-500 mt-0.5">{size}</p>
                                </div>
                                <div className="flex items-center justify-between mt-3">
                                    <span className="font-heading font-bold text-primary text-sm flex items-center">
                                        RS {price.toLocaleString()}
                                    </span>
                                    <button
                                        onClick={e => handleAddToCart(e, product, price, size, image)}
                                        className={twMerge(clsx(
                                            "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                                            isAdded 
                                                ? "bg-green-500 text-white scale-110 shadow-lg shadow-green-500/20" 
                                                : "bg-primary/10 text-primary hover:bg-primary hover:text-white active:scale-90"
                                        ))}
                                        aria-label="Add to cart"
                                    >
                                        {isAdded ? (
                                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 animate-in zoom-in shrink-0">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : (
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                                                <path d="M12 5v14M5 12h14" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Fly-to-cart Animation Portal */}
            {mounted && flyingItem && createPortal(
                <motion.img 
                    key={flyingItem.id}
                    src={flyingItem.src}
                    initial={{ 
                        position: 'fixed',
                        left: flyingItem.startRect.left,
                        top: flyingItem.startRect.top,
                        width: flyingItem.startRect.width,
                        height: flyingItem.startRect.height,
                        opacity: 1,
                        zIndex: 999999,
                        pointerEvents: 'none',
                        borderRadius: '1rem',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                    animate={{
                        left: flyingItem.endRect.left + flyingItem.endRect.width / 2 - 15, // center on target
                        top: flyingItem.endRect.top + flyingItem.endRect.height / 2 - 15,
                        width: 30, // smaller size at target
                        height: 30,
                        opacity: 0.2, // fade out slightly at the end
                        scale: 0.5
                    }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} // smooth ease out
                    className="object-contain mix-blend-multiply bg-white"
                />,
                document.body
            )}
        </motion.div>
    );
}
