'use client';

export default function MobileHeroCarousel() {
    return (
        <section
            className="relative lg:hidden"
            style={{ margin: 0, padding: 0, display: 'block', lineHeight: 0 }}
        >
            {/* Full-bleed video container — starts at top-0, header overlaps it */}
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '56vh',
                    minHeight: 280,
                    overflow: 'hidden',
                    lineHeight: 0,
                    display: 'block',
                }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                    }}
                >
                    <source
                        src="https://fiqeuvdxsqupjdgqcpnj.supabase.co/storage/v1/object/public/asset/Hero/Man_cleaning_with_202603181718.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* Gradient scrim — stronger at bottom where text lives */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.38) 45%, rgba(0,0,0,0.78) 100%)',
                    }}
                />

                {/* Content — pt-14 (56px) clears the fixed header */}
                <div
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '0 20px 28px',
                    }}
                >
                    <h1
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 900,
                            color: '#fff',
                            lineHeight: 1.05,
                            letterSpacing: '-0.04em',
                            fontSize: 'clamp(32px, 10vw, 42px)',
                            margin: '0 0 10px',
                            padding: 0,
                        }}
                    >
                        Deep Clean.<br/>
                        <span style={{ fontStyle: 'italic', color: 'var(--primary)' }}>Better Life.</span>
                    </h1>
                    <p
                        style={{
                            color: 'rgba(255,255,255,0.83)',
                            fontSize: 13,
                            lineHeight: 1.5,
                            margin: '0 0 18px',
                            maxWidth: 260,
                        }}
                    >
                        Professional cleaning solutions trusted by experts.
                    </p>
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <a
                            href="#m-categories"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'var(--primary)',
                                color: '#fff',
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 600,
                                fontSize: 13,
                                padding: '10px 20px',
                                borderRadius: 999,
                                textDecoration: 'none',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Shop Now
                        </a>
                        <a
                            href="https://wa.me/919999999999"
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'rgba(255,255,255,0.18)',
                                backdropFilter: 'blur(8px)',
                                WebkitBackdropFilter: 'blur(8px)',
                                color: '#fff',
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 600,
                                fontSize: 13,
                                padding: '10px 20px',
                                borderRadius: 999,
                                textDecoration: 'none',
                                border: '1.5px solid rgba(255,255,255,0.35)',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
