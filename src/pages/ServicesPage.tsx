import React, { useState, useRef } from 'react';
import { PageId, ServiceItem } from '../types';
import { SERVICES } from '../data/mockData';
import { ArrowRight, Home, UtensilsCrossed, Bed, Briefcase, Wrench } from 'lucide-react';
import { ServiceModal } from '../components/ServiceModal';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServicesPageProps {
  onNavigate: (page: PageId, projectId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  // 5 services matching PDF Page 5
  const serviceIcons = [
    <Home size={22} color="var(--color-charcoal-muted)" strokeWidth={1.5} />,
    <UtensilsCrossed size={22} color="var(--color-charcoal-muted)" strokeWidth={1.5} />,
    <Bed size={22} color="var(--color-charcoal-muted)" strokeWidth={1.5} />,
    <Briefcase size={22} color="var(--color-charcoal-muted)" strokeWidth={1.5} />,
    <Wrench size={22} color="var(--color-charcoal-muted)" strokeWidth={1.5} />
  ];

  const displayServices = SERVICES.slice(0, 5);

  useGsapContext(containerRef, () => {
    // 1. Hero Entrance
    gsap.from('.services-hero-title', {
      y: 30,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.1
    });
    gsap.from('.services-hero-sub', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.25
    });

    // 2. Staggered Service Rows
    gsap.from('.service-row-item', {
      scrollTrigger: {
        trigger: '.services-list-container',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 28,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out'
    });

    // 3. CTA Entrance
    gsap.from('.services-cta-content', {
      scrollTrigger: {
        trigger: '.services-cta-section',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 25,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-warm-ivory)' }}>

      {/* 1. DARK PHOTOGRAPHIC HERO (Directly matching PDF Page 5) */}
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
            backgroundImage: 'url(/images/services-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35)',
            transform: 'scale(1.02)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '640px' }}>
            <h1 
              className="services-hero-title"
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2.6rem, 5vw, 4rem)', 
                color: '#FFFFFF',
                marginBottom: '0.65rem',
                lineHeight: 1.15
              }}
            >
              Our Services
            </h1>
            <p className="services-hero-sub" style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '1.15rem' }}>
              End-to-end interior solutions for every space.
            </p>
          </div>
        </div>
      </section>

      {/* 2. VERTICALLY STACKED SERVICE LIST (Directly matching PDF Page 5) */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-ivory)' }}>
        <div className="container">
          <div className="services-list-container" style={{ maxWidth: '960px', margin: '0 auto' }}>
            
            {displayServices.map((service, idx) => (
              <div 
                key={service.id}
                onClick={() => setActiveService(service)}
                style={{
                  cursor: 'pointer',
                  padding: '2rem 1rem',
                  borderBottom: '1px solid var(--color-stone-border)',
                  borderTop: idx === 0 ? '1px solid var(--color-stone-border)' : 'none',
                  display: 'grid',
                  gridTemplateColumns: '150px 32px 1fr 32px',
                  gap: '2rem',
                  alignItems: 'center',
                  transition: 'background-color 0.25s ease, padding-left 0.25s ease'
                }}
                className="service-row-item"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                  e.currentTarget.style.paddingLeft = '1.5rem';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.paddingLeft = '1rem';
                }}
              >
                {/* Small Thumbnail Photo on Left */}
                <div 
                  style={{ 
                    height: '95px', 
                    width: '150px', 
                    borderRadius: '3px', 
                    overflow: 'hidden', 
                    boxShadow: '0 4px 12px rgba(23, 23, 19, 0.06)' 
                  }}
                  className="img-zoom-container"
                >
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>

                {/* Service Line Icon */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {serviceIcons[idx]}
                </div>

                {/* Service Title and Short Description */}
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--color-deep-charcoal)', marginBottom: '0.25rem' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
                    {service.tagline}
                  </p>
                </div>

                {/* Directional Arrow / Plus on Far Right */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', color: 'var(--color-charcoal-light)' }}>
                  <span style={{ fontSize: '1.3rem', fontWeight: 300 }}>+</span>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* 3. CLOSING BOTTOM CTA (Directly matching PDF Page 5) */}
      <section 
        className="services-cta-section"
        style={{
          position: 'relative',
          padding: '5.5rem 1.5rem',
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
            backgroundImage: 'url(/images/cta-warm.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35)',
            transform: 'scale(1.02)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="services-cta-content" style={{ maxWidth: '640px' }}>
            <h2 
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', 
                color: '#FFFFFF',
                marginBottom: '2rem',
                lineHeight: 1.2
              }}
            >
              Custom solutions for<br />unique spaces.
            </h2>

            <button 
              onClick={() => onNavigate('consultation')}
              style={{
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                padding: '0.85rem 2rem',
                borderRadius: '2px',
                fontSize: '0.82rem',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#171713';
                e.currentTarget.style.borderColor = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
            >
              Book a Consultation <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <ServiceModal 
        service={activeService}
        onClose={() => setActiveService(null)}
        onNavigate={onNavigate}
      />

      {/* Responsive layout for mobile */}
      <style>{`
        @media (max-width: 680px) {
          .service-row-item {
            grid-template-columns: 100px 1fr auto !important;
            gap: 1rem !important;
          }
        }
      `}</style>

    </div>
  );
};
