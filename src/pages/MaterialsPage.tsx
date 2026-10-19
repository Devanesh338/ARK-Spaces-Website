import React, { useState, useRef } from 'react';
import { PageId, MaterialItem } from '../types';
import { MATERIALS, MOODBOARDS } from '../data/mockData';
import { ArrowRight } from 'lucide-react';
import { MaterialModal } from '../components/MaterialModal';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MaterialsPageProps {
  onNavigate: (page: PageId) => void;
}

export const MaterialsPage: React.FC<MaterialsPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Wood');
  const [activeMaterial, setActiveMaterial] = useState<MaterialItem | null>(null);

  const categories = ['Wood', 'Stone', 'Fabrics', 'Metals', 'Colours'];

  // PDF Page 6 specifically displays 8 primary architectural swatches:
  const pdfEightSwatches = [
    MATERIALS.find(m => m.id === 'oak-wood')!,
    MATERIALS.find(m => m.id === 'walnut-wood')!,
    MATERIALS.find(m => m.id === 'teak-wood')!,
    MATERIALS.find(m => m.id === 'ash-wood')!,
    MATERIALS.find(m => m.id === 'calacatta-marble')!,
    MATERIALS.find(m => m.id === 'black-granite')!,
    MATERIALS.find(m => m.id === 'travertine-stone')!,
    MATERIALS.find(m => m.id === 'sandstone')!
  ].filter(Boolean);

  const displayedSwatches = selectedCategory === 'Wood' || selectedCategory === 'Stone'
    ? pdfEightSwatches
    : MATERIALS.filter(m => m.category.toLowerCase() === selectedCategory.toLowerCase());

  useGsapContext(containerRef, () => {
    // 1. Hero Entrance
    gsap.from('.materials-hero-title', {
      y: 30,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.1
    });
    gsap.from('.materials-hero-sub', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.25
    });

    // 2. Swatches Stagger
    gsap.from('.material-swatch-card', {
      scrollTrigger: {
        trigger: '.materials-four-column-grid',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.65,
      stagger: 0.08,
      ease: 'power2.out'
    });

    // 3. Combinations Section Reveal
    gsap.from('.combinations-card', {
      scrollTrigger: {
        trigger: '.combinations-three-column-grid',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power3.out'
    });
  }, [selectedCategory]);

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-warm-ivory)' }}>

      {/* 1. HERO SECTION (Directly matching PDF Page 6) */}
      <section 
        style={{
          position: 'relative',
          minHeight: '48vh',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#171713',
          color: '#FFFFFF',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/images/materials-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35)',
            transform: 'scale(1.02)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '640px' }}>
            <h1 
              className="materials-hero-title"
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2.6rem, 5vw, 4rem)', 
                color: '#FFFFFF',
                marginBottom: '0.65rem',
                lineHeight: 1.15
              }}
            >
              Materials & Moodboards
            </h1>
            <p className="materials-hero-sub" style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '1.15rem' }}>
              Thoughtfully curated. Beautifully combined.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY TABS & 4-COLUMN SWATCHES GRID (Directly matching PDF Page 6) */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-ivory)' }}>
        <div className="container">

          {/* Centered Category Tabs */}
          <div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center',
              gap: '0.75rem', 
              marginBottom: '3.5rem',
              alignItems: 'center'
            }}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.55rem 1.4rem',
                    fontSize: '0.82rem',
                    borderRadius: '24px',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--color-warm-taupe)' : 'var(--color-stone-border)',
                    backgroundColor: isActive ? 'var(--color-warm-taupe)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--color-charcoal-muted)',
                    cursor: 'pointer',
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--color-deep-charcoal)';
                      e.currentTarget.style.color = 'var(--color-deep-charcoal)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = 'var(--color-stone-border)';
                      e.currentTarget.style.color = 'var(--color-charcoal-muted)';
                    }
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* 4-Column Desktop Swatch Grid (Directly matching PDF Page 6) */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2.5rem 1.75rem',
              marginBottom: '5rem'
            }}
            className="materials-four-column-grid"
          >
            {displayedSwatches.map((mat) => (
              <div 
                key={mat.id}
                onClick={() => setActiveMaterial(mat)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}
                className="img-zoom-container material-swatch-card"
              >
                {/* Square Texture Swatch */}
                <div 
                  style={{ 
                    height: '210px', 
                    width: '100%', 
                    borderRadius: '3px', 
                    overflow: 'hidden', 
                    backgroundColor: mat.colorHex || '#E5E1DA',
                    boxShadow: '0 4px 14px rgba(23, 23, 19, 0.06)',
                    marginBottom: '0.75rem'
                  }}
                >
                  {mat.image ? (
                    <img 
                      src={mat.image} 
                      alt={mat.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', backgroundColor: mat.colorHex, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '0.9rem', color: '#FFFFFF', fontWeight: 500 }}>{mat.name}</span>
                    </div>
                  )}
                </div>

                {/* Swatch Label below */}
                <span style={{ fontSize: '0.84rem', color: 'var(--color-charcoal-muted)', fontWeight: 400 }}>
                  {mat.name}
                </span>
              </div>
            ))}
          </div>

          {/* 3. EXPLORE COMBINATIONS SECTION (Directly matching PDF Page 6) */}
          <div style={{ borderTop: '1px solid var(--color-stone-border)', paddingTop: '4rem' }}>
            
            {/* Header Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', color: 'var(--color-deep-charcoal)' }}>
                Explore Combinations
              </h2>
              <button 
                onClick={() => onNavigate('consultation')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: 'var(--color-deep-charcoal)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--color-deep-charcoal)',
                  paddingBottom: '2px'
                }}
              >
                View All Moodboards <ArrowRight size={15} />
              </button>
            </div>

            {/* 3 Combination Cards */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem'
              }}
              className="combinations-three-column-grid"
            >
              {MOODBOARDS.map((mb) => (
                <div 
                  key={mb.id}
                  onClick={() => onNavigate('consultation')}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  className="img-zoom-container combinations-card"
                >
                  <div 
                    style={{ 
                      height: '240px', 
                      width: '100%', 
                      borderRadius: '4px', 
                      overflow: 'hidden', 
                      boxShadow: '0 6px 18px rgba(23, 23, 19, 0.06)',
                      marginBottom: '0.85rem'
                    }}
                  >
                    <img 
                      src={mb.image} 
                      alt={mb.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>

                  <span style={{ fontSize: '0.9rem', color: 'var(--color-deep-charcoal)', fontWeight: 500 }}>
                    {mb.name}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Material Detail Modal */}
      <MaterialModal 
        material={activeMaterial}
        onClose={() => setActiveMaterial(null)}
        onNavigate={onNavigate}
      />

      {/* Responsive layout for smaller screens */}
      <style>{`
        @media (max-width: 900px) {
          .materials-four-column-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .combinations-three-column-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
};
