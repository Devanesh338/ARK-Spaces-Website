import React, { useRef, useEffect } from 'react';
import { PageId } from '../types';
import { ArrowRight } from 'lucide-react';
import { useGsapContext } from '../hooks/useGsapContext';
import { ScrollVideoSequence } from '../components/ScrollVideoSequence';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HomePageProps {
  onNavigate: (page: PageId, projectId?: string, filterCategory?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const categoryCards = [
    {
      title: 'Residential',
      subtitle: 'Homes that tell your story',
      image: '/images/cat-residential.jpg',
      categoryKey: 'Residential'
    },
    {
      title: 'Modular Kitchens',
      subtitle: 'Smart. Functional. Beautiful.',
      image: '/images/cat-kitchen.jpg',
      categoryKey: 'Modular Kitchens'
    },
    {
      title: 'Bedrooms',
      subtitle: 'Restful and refined.',
      image: '/images/cat-bedroom.jpg',
      categoryKey: 'Bedrooms'
    },
    {
      title: 'Workspaces',
      subtitle: 'Productive by design.',
      image: '/images/cat-workspace.jpg',
      categoryKey: 'Workspaces'
    }
  ];

  // Progressive scroll-triggered reveals matching the site's working pages
  useGsapContext(containerRef, () => {
    // Sort all triggers by DOM order to ensure pinned hero spacer is calculated first
    ScrollTrigger.sort();

    // 1. Selected Work Section Header Reveal
    gsap.from('.home-work-header', {
      scrollTrigger: {
        trigger: '.home-work-section',
        start: 'top 85%',
        toggleActions: 'play none none none',
        refreshPriority: 0
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => {
        gsap.set('.home-work-header', { clearProps: 'opacity,transform' });
      }
    });

    // 2. Selected Work Staggered Category Cards Reveal
    gsap.from('.home-category-card', {
      scrollTrigger: {
        trigger: '.home-cards-grid',
        start: 'top 82%',
        toggleActions: 'play none none none',
        refreshPriority: 0
      },
      y: 35,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      onComplete: () => {
        gsap.set('.home-category-card', { clearProps: 'opacity,transform' });
      }
    });

    // 3. Process Section Dual Reveal (Safe vertical reveal on mobile to prevent horizontal overflow)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    gsap.from('.home-quote-box', {
      scrollTrigger: {
        trigger: '#process-section',
        start: 'top 82%',
        toggleActions: 'play none none none',
        refreshPriority: 0
      },
      x: isMobile ? 0 : -30,
      y: isMobile ? 25 : 0,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.out',
      onComplete: () => {
        gsap.set('.home-quote-box', { clearProps: 'opacity,transform' });
      }
    });

    gsap.from('.home-process-box', {
      scrollTrigger: {
        trigger: '#process-section',
        start: 'top 82%',
        toggleActions: 'play none none none',
        refreshPriority: 0
      },
      x: isMobile ? 0 : 30,
      y: isMobile ? 25 : 0,
      opacity: 0,
      duration: 0.85,
      delay: isMobile ? 0 : 0.1,
      ease: 'power2.out',
      onComplete: () => {
        gsap.set('.home-process-box', { clearProps: 'opacity,transform' });
      }
    });

    // 4. CTA Section Entrance (Content + Image)
    gsap.from('.home-cta-content', {
      scrollTrigger: {
        trigger: '.home-cta-section',
        start: 'top 80%',
        toggleActions: 'play none none none',
        refreshPriority: 0
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      onComplete: () => {
        gsap.set('.home-cta-content', { clearProps: 'opacity,transform' });
      }
    });

    gsap.from('.home-cta-image-container', {
      scrollTrigger: {
        trigger: '.home-cta-section',
        start: 'top 80%',
        toggleActions: 'play none none none',
        refreshPriority: 0
      },
      y: 35,
      opacity: 0,
      duration: 0.85,
      delay: 0.12,
      ease: 'power3.out',
      onComplete: () => {
        gsap.set('.home-cta-image-container', { clearProps: 'opacity,transform' });
      }
    });

    // Parallax on CTA Still Life Image (Responsive check: only if screen > 768px)
    if (!isMobile) {
      gsap.to('.home-cta-image', {
        scrollTrigger: {
          trigger: '.home-cta-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        },
        yPercent: -10,
        ease: 'none'
      });
    }
  });

  // Safety Fallback: Ensure content is never permanently hidden if an animation fails or is interrupted
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      const selectors = [
        '.home-work-header',
        '.home-category-card',
        '.home-quote-box',
        '.home-process-box',
        '.home-cta-content',
        '.home-cta-image-container'
      ];
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          const htmlEl = el as HTMLElement;
          if (htmlEl && htmlEl.style.opacity === '0') {
            htmlEl.style.opacity = '1';
            htmlEl.style.transform = 'none';
          }
        });
      });
    }, 2500);

    return () => clearTimeout(safetyTimer);
  }, []);

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-warm-ivory)' }}>
      
      {/* 1. SCROLL-CONTROLLED CINEMATIC LANDING HERO (120-Frame WebP Canvas Sequence) */}
      <ScrollVideoSequence onNavigate={onNavigate} />

      {/* 3. SELECTED WORK SECTION (Directly matching PDF Page 1) */}
      <section className="section-py home-work-section" style={{ backgroundColor: 'var(--color-warm-ivory)' }}>
        <div className="container">
          
          {/* Header Row */}
          <div 
            className="home-work-header"
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'space-between', 
              alignItems: 'flex-end', 
              marginBottom: '2.5rem',
              gap: '1rem'
            }}
          >
            <div>
              <span 
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-warm-taupe)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.4rem'
                }}
              >
                SELECTED WORK
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'var(--color-deep-charcoal)' }}>
                Spaces designed with purpose.
              </h2>
            </div>

            <button 
              onClick={() => onNavigate('projects')}
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
                paddingBottom: '2px',
                borderBottom: '1px solid var(--color-deep-charcoal)'
              }}
            >
              View All Projects <ArrowRight size={15} />
            </button>
          </div>

          {/* 4 Category Cards matching PDF Page 1 */}
          <div 
            className="home-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.75rem'
            }}
          >
            {categoryCards.map((card, idx) => (
              <div 
                key={idx}
                onClick={() => onNavigate('projects', undefined, card.categoryKey)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                className="img-zoom-container home-category-card"
              >
                <div 
                  style={{ 
                    height: '320px', 
                    width: '100%', 
                    overflow: 'hidden', 
                    borderRadius: '4px',
                    marginBottom: '1rem',
                    boxShadow: '0 4px 15px rgba(23, 23, 19, 0.05)'
                  }}
                >
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>

                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-deep-charcoal)', marginBottom: '0.2rem' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--color-charcoal-muted)' }}>
                    {card.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. EDITORIAL DESIGN PHILOSOPHY & PROCESS SECTION (Directly matching PDF Page 1) */}
      <section id="process-section" style={{ backgroundColor: 'var(--color-warm-ivory)', paddingBottom: '5rem', overflow: 'hidden' }}>
        <div className="container">
          <div 
            className="home-process-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '2rem',
              alignItems: 'stretch'
            }}
          >
            {/* Left Box: Dark Olive / Charcoal Box with Quote */}
            <div 
              className="home-quote-box"
              style={{
                backgroundColor: 'var(--color-dark-olive)',
                color: '#FFFFFF',
                padding: 'clamp(2.5rem, 5vw, 4rem)',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <blockquote 
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                  lineHeight: 1.3,
                  fontWeight: 400,
                  color: '#FAF8F5',
                  fontStyle: 'italic',
                  marginBottom: '2rem'
                }}
              >
                &ldquo;Good design isn’t just about how it looks, but how it makes you feel.&rdquo;
              </blockquote>

              <cite style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-warm-taupe)', fontStyle: 'normal' }}>
                — ARK SPACES
              </cite>
            </div>

            {/* Right Box: Ivory Card with "OUR PROCESS: From concept to completion" */}
            <div 
              className="home-process-box"
              style={{
                backgroundColor: '#FAF8F5',
                border: '1px solid var(--color-stone-border)',
                padding: 'clamp(2.5rem, 5vw, 4rem)',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-warm-taupe)', fontWeight: 600, marginBottom: '0.6rem' }}>
                OUR PROCESS
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', color: 'var(--color-deep-charcoal)', marginBottom: '1.25rem' }}>
                From concept to completion
              </h3>
              <p style={{ fontSize: '0.94rem', color: 'var(--color-charcoal-muted)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '420px' }}>
                A disciplined, collaborative journey from discovery and 3D visualization to precision turnkey handover.
              </p>

              <div>
                <button 
                  onClick={() => onNavigate('process')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--color-deep-charcoal)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    borderBottom: '1px solid var(--color-deep-charcoal)',
                    paddingBottom: '2px'
                  }}
                >
                  Explore Our Process <ArrowRight size={15} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. START YOUR JOURNEY CONSULTATION SECTION (Directly matching PDF Page 1) */}
      <section className="home-cta-section" style={{ backgroundColor: 'var(--color-warm-ivory)', borderTop: '1px solid var(--color-stone-border)', padding: '5rem 0', overflow: 'hidden' }}>
        <div className="container">
          <div 
            className="home-cta-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '4rem',
              alignItems: 'center'
            }}
          >
            {/* Left Content */}
            <div className="home-cta-content">
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3rem)', color: 'var(--color-deep-charcoal)', marginBottom: '1rem' }}>
                Start your journey
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-charcoal-muted)', maxWidth: '460px', marginBottom: '2rem' }}>
                Tell us what you’re imagining. Let’s explore what’s possible.
              </p>
              <button 
                onClick={() => onNavigate('consultation')}
                style={{
                  backgroundColor: 'var(--color-deep-charcoal)',
                  color: '#FFFFFF',
                  padding: '0.9rem 2rem',
                  fontSize: '0.84rem',
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  borderRadius: '2px',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'background-color 0.25s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#000000')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-deep-charcoal)')}
              >
                Book a Consultation <ArrowRight size={15} />
              </button>
            </div>

            {/* Right Photography: Ceramic vase & plant composition with subtle parallax */}
            <div 
              style={{
                height: '360px',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(23, 23, 19, 0.08)'
              }}
              className="img-zoom-container home-cta-image-container"
            >
              <img 
                className="home-cta-image"
                src="/images/cta-warm.jpg" 
                alt="ARK Spaces Plant & Vase Still Life" 
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '120%', objectFit: 'cover' }} 
              />
            </div>

          </div>
        </div>
      </section>

      {/* Responsive adjustments for narrow screens */}
      <style>{`
        @media (max-width: 768px) {
          .home-process-grid, .home-cta-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .home-hero-actions {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .home-hero-actions button {
            width: 100% !important;
            text-align: center !important;
            justify-content: center !important;
          }
        }
      `}</style>

    </div>
  );
};
