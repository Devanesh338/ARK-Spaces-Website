import React, { useRef } from 'react';
import { PageId } from '../types';
import { ArrowRight } from 'lucide-react';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(containerRef, () => {
    // 1. Hero Entrance
    gsap.from('.about-hero-title', {
      y: 30,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.1
    });
    gsap.from('.about-hero-sub', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.25
    });

    // 2. Our Story Section
    gsap.from('.about-story-text', {
      scrollTrigger: {
        trigger: '.about-story-section',
        start: 'top 82%',
        toggleActions: 'play none none none'
      },
      x: -30,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.out'
    });

    gsap.from('.about-story-image', {
      scrollTrigger: {
        trigger: '.about-story-section',
        start: 'top 82%',
        toggleActions: 'play none none none'
      },
      x: 30,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.out'
    });

    // 3. Stats Row Stagger
    gsap.from('.about-stat-item', {
      scrollTrigger: {
        trigger: '.about-stats-section',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out'
    });

    // 4. Philosophy Section
    gsap.from('.about-philosophy-image', {
      scrollTrigger: {
        trigger: '.about-philosophy-section',
        start: 'top 82%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.out'
    });

    gsap.from('.about-philosophy-content', {
      scrollTrigger: {
        trigger: '.about-philosophy-section',
        start: 'top 82%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.15
    });

    // 5. CTA Section Reveal
    gsap.from('.about-cta-content', {
      scrollTrigger: {
        trigger: '.about-cta-section',
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

      {/* 1. HERO SECTION (Directly matching PDF Page 2) */}
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
            backgroundImage: 'url(/images/about-hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.38)',
            transform: 'scale(1.02)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '640px' }}>
            <h1 
              className="about-hero-title"
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2.6rem, 5vw, 4rem)', 
                color: '#FFFFFF',
                marginBottom: '0.65rem',
                lineHeight: 1.15
              }}
            >
              About ARK Spaces
            </h1>
            <p className="about-hero-sub" style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '1.15rem' }}>
              Designing spaces. Enriching lives.
            </p>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY SECTION (Directly matching PDF Page 2) */}
      <section className="section-py about-story-section" style={{ backgroundColor: 'var(--color-warm-ivory)', overflow: 'hidden' }}>
        <div className="container">
          <div 
            className="about-split-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(2rem, 5vw, 4.5rem)',
              alignItems: 'center'
            }}
          >
            {/* Story Text */}
            <div className="about-story-text">
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 3.8vw, 3rem)', color: 'var(--color-deep-charcoal)', marginBottom: '1.75rem' }}>
                Our Story
              </h2>
              
              <p style={{ fontSize: '1.02rem', lineHeight: 1.85, color: 'var(--color-deep-charcoal)', marginBottom: '1.5rem' }}>
                ARK Spaces is a Chennai-based interior design studio focused on creating thoughtful, functional and timeless spaces. We believe that great design is not just about aesthetics, but about how a space makes you feel and live.
              </p>

              <p style={{ fontSize: '1.02rem', lineHeight: 1.85, color: 'var(--color-deep-charcoal)' }}>
                With a passion for detail and a commitment to quality, we work closely with our clients to bring their vision to life — from concept to completion.
              </p>
            </div>

            {/* Story Image */}
            <div 
              className="img-zoom-container about-story-image"
              style={{ 
                height: '460px', 
                borderRadius: '4px', 
                overflow: 'hidden', 
                boxShadow: '0 8px 30px rgba(23, 23, 19, 0.08)' 
              }} 
            >
              <img 
                src="/images/about-story.jpg" 
                alt="ARK Spaces Chennai Living Studio" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE-COLUMN STATISTICS ROW (Directly matching PDF Page 2) */}
      <section className="about-stats-section" style={{ backgroundColor: 'var(--color-warm-ivory)', borderTop: '1px solid var(--color-stone-border)', borderBottom: '1px solid var(--color-stone-border)', padding: '3.5rem 0' }}>
        <div className="container">
          <div 
            className="about-stats-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
              gap: '2rem',
              textAlign: 'center'
            }}
          >
            <div className="about-stat-item">
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.6rem, 4.5vw, 3.4rem)', color: 'var(--color-deep-charcoal)', fontWeight: 400, lineHeight: 1 }}>
                10+
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-charcoal-muted)', marginTop: '0.65rem' }}>
                Years of Experience
              </div>
            </div>

            <div className="about-stat-item">
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.6rem, 4.5vw, 3.4rem)', color: 'var(--color-deep-charcoal)', fontWeight: 400, lineHeight: 1 }}>
                200+
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-charcoal-muted)', marginTop: '0.65rem' }}>
                Projects Completed
              </div>
            </div>

            <div className="about-stat-item">
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.6rem, 4.5vw, 3.4rem)', color: 'var(--color-deep-charcoal)', fontWeight: 400, lineHeight: 1 }}>
                100+
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-charcoal-muted)', marginTop: '0.65rem' }}>
                Happy Clients
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR PHILOSOPHY SECTION (Directly matching PDF Page 2) */}
      <section className="section-py about-philosophy-section" style={{ backgroundColor: 'var(--color-warm-ivory)', overflow: 'hidden' }}>
        <div className="container">
          <div 
            className="about-split-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(2rem, 5vw, 4.5rem)',
              alignItems: 'center'
            }}
          >
            {/* Left Photo */}
            <div 
              className="img-zoom-container about-philosophy-image"
              style={{ 
                height: '420px', 
                borderRadius: '4px', 
                overflow: 'hidden', 
                boxShadow: '0 8px 30px rgba(23, 23, 19, 0.08)' 
              }} 
            >
              <img 
                src="/images/about-philosophy.jpg" 
                alt="ARK Spaces Design Philosophy Studio" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            {/* Right Text */}
            <div className="about-philosophy-content">
              <span 
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-warm-taupe)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.5rem'
                }}
              >
                OUR PHILOSOPHY
              </span>

              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 3.8vw, 2.85rem)', color: 'var(--color-deep-charcoal)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                Thoughtful design<br />for modern living.
              </h2>

              <p style={{ fontSize: '1.02rem', lineHeight: 1.85, color: 'var(--color-deep-charcoal)', marginBottom: '2rem' }}>
                We believe in creating spaces that are personal, functional and built to last. Every project is a collaboration, and we’re with you at every step.
              </p>

              <button 
                onClick={() => onNavigate('projects')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.86rem',
                  fontWeight: 500,
                  color: 'var(--color-deep-charcoal)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--color-deep-charcoal)',
                  paddingBottom: '2px'
                }}
              >
                Learn More <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DARK PHOTOGRAPHIC CONSULTATION CTA (Directly matching PDF Page 2) */}
      <section 
        className="about-cta-section"
        style={{
          position: 'relative',
          padding: '5.5rem 1.5rem',
          backgroundColor: '#171713',
          color: '#FFFFFF',
          textAlign: 'left',
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
          <div className="about-cta-content" style={{ maxWidth: '640px' }}>
            <h2 
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', 
                color: '#FFFFFF',
                marginBottom: '2rem',
                lineHeight: 1.2
              }}
            >
              Let’s create something<br />beautiful together.
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

      {/* Responsive layout styles for mobile viewports */}
      <style>{`
        @media (max-width: 768px) {
          .about-split-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .about-story-image, .about-philosophy-image {
            height: 320px !important;
          }
        }
        @media (max-width: 480px) {
          .about-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>

    </div>
  );
};
