import React, { useRef } from 'react';
import { PageId } from '../types';
import { PROCESS_STEPS } from '../data/mockData';
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Award, Users } from 'lucide-react';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProcessPageProps {
  onNavigate: (page: PageId, projectId?: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapContext(containerRef, () => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // 1. Hero Entrance
    gsap.from('.process-hero-eyebrow', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.1
    });

    gsap.from('.process-hero-title', {
      y: 30,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.2
    });

    gsap.from('.process-hero-sub', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.35
    });

    // 2. Pillars Bar Reveal
    gsap.from('.process-pillar-item', {
      scrollTrigger: {
        trigger: '.process-pillars-section',
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      y: 25,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // 3. Staggered Process Step Rows
    const stepRows = gsap.utils.toArray<HTMLElement>('.process-step-row');
    stepRows.forEach((row) => {
      gsap.from(row, {
        scrollTrigger: {
          trigger: row,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    // 4. Guarantee Card Reveal
    gsap.from('.process-guarantee-card', {
      scrollTrigger: {
        trigger: '.process-guarantee-card',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    // 5. CTA Content Reveal
    gsap.from('.process-cta-content', {
      scrollTrigger: {
        trigger: '.process-cta-section',
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
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-warm-ivory)', overflowX: 'hidden' }}>

      {/* 1. DARK PHOTOGRAPHIC HERO */}
      <section 
        style={{
          position: 'relative',
          minHeight: '52vh',
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
            backgroundImage: 'url(/images/hero-home.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35)',
            transform: 'scale(1.02)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '5.5rem 1.5rem 4.5rem' }}>
          <div style={{ maxWidth: '780px' }}>
            <span 
              className="process-hero-eyebrow"
              style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-warm-taupe)',
                fontWeight: 600,
                marginBottom: '1rem'
              }}
            >
              METHODOLOGY & EXECUTION
            </span>

            <h1 
              className="process-hero-title"
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2.5rem, 5.2vw, 4.2rem)', 
                color: '#FFFFFF',
                marginBottom: '1rem',
                lineHeight: 1.15
              }}
            >
              Our Seamless Process
            </h1>

            <p 
              className="process-hero-sub" 
              style={{ 
                color: 'rgba(255, 255, 255, 0.85)', 
                fontSize: 'clamp(1rem, 1.4vw, 1.18rem)',
                lineHeight: 1.7,
                maxWidth: '640px',
                fontWeight: 300
              }}
            >
              A disciplined, collaborative journey from discovery and 3D visualization to precision turnkey handover across Chennai.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PILLARS & TRUST METRICS BAR */}
      <section 
        className="process-pillars-section"
        style={{ 
          backgroundColor: '#FFFFFF', 
          borderBottom: '1px solid var(--color-stone-border)',
          padding: '2.5rem 0'
        }}
      >
        <div className="container">
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
              gap: '2rem',
              alignItems: 'center'
            }}
          >
            <div className="process-pillar-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
              <div style={{ color: 'var(--color-warm-taupe)', flexShrink: 0, marginTop: '2px' }}>
                <ShieldCheck size={26} strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-deep-charcoal)' }}>
                  120+ Quality Checks
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-charcoal-muted)', marginTop: '0.2rem' }}>
                  Rigorous multi-stage inspections on civil, carpentry & MEP
                </div>
              </div>
            </div>

            <div className="process-pillar-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
              <div style={{ color: 'var(--color-warm-taupe)', flexShrink: 0, marginTop: '2px' }}>
                <Clock size={26} strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-deep-charcoal)' }}>
                  Guaranteed Timelines
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-charcoal-muted)', marginTop: '0.2rem' }}>
                  Fixed handover milestones. If we fall short, we cover your rent
                </div>
              </div>
            </div>

            <div className="process-pillar-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
              <div style={{ color: 'var(--color-warm-taupe)', flexShrink: 0, marginTop: '2px' }}>
                <Users size={26} strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-deep-charcoal)' }}>
                  Dedicated Site Engineer
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-charcoal-muted)', marginTop: '0.2rem' }}>
                  Single point of contact with weekly photographic progress
                </div>
              </div>
            </div>

            <div className="process-pillar-item" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.9rem' }}>
              <div style={{ color: 'var(--color-warm-taupe)', flexShrink: 0, marginTop: '2px' }}>
                <Award size={26} strokeWidth={1.5} />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-deep-charcoal)' }}>
                  Transparent Pricing
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-charcoal-muted)', marginTop: '0.2rem' }}>
                  Detailed itemized BOQs with zero hidden costs or surprises
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP PROCESS WALKTHROUGH */}
      <section className="section-py" style={{ backgroundColor: 'var(--color-warm-ivory)' }}>
        <div className="container">
          
          <div style={{ maxWidth: '720px', marginBottom: '3.5rem' }}>
            <span 
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-warm-taupe)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '0.5rem'
              }}
            >
              STEP-BY-STEP BREAKDOWN
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.1rem, 3.8vw, 3rem)', color: 'var(--color-deep-charcoal)' }}>
              How We Bring Your Vision to Life
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-charcoal-muted)', marginTop: '0.75rem', lineHeight: 1.7 }}>
              We eliminate the stress of coordinating multiple contractors. Every phase of your project is handled with precision by in-house architects, engineers, and master craftsmen.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
            {PROCESS_STEPS.map((stepItem, index) => {
              const isEven = index % 2 === 1;

              return (
                <div 
                  key={stepItem.step}
                  className="process-step-row"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--color-stone-border)',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                    boxShadow: 'var(--shadow-subtle)',
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
                  }}
                >
                  {/* Visual Photographic Column */}
                  <div 
                    style={{ 
                      position: 'relative', 
                      minHeight: '340px', 
                      overflow: 'hidden',
                      order: isEven ? 2 : 1 
                    }}
                    className="process-img-container"
                  >
                    <img 
                      src={stepItem.image} 
                      alt={`ARK Spaces ${stepItem.title}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                      loading="lazy"
                    />
                    <div 
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(180deg, rgba(23, 23, 19, 0.1) 0%, rgba(23, 23, 19, 0.45) 100%)'
                      }}
                    />
                    
                    {/* Floating Step Number Badge */}
                    <div 
                      style={{
                        position: 'absolute',
                        top: '1.5rem',
                        left: '1.5rem',
                        backgroundColor: 'rgba(23, 23, 19, 0.85)',
                        backdropFilter: 'blur(8px)',
                        color: 'var(--color-warm-taupe)',
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.3rem',
                        fontWeight: 600,
                        padding: '0.4rem 1rem',
                        borderRadius: '2px',
                        letterSpacing: '0.08em',
                        border: '1px solid rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      PHASE {stepItem.step}
                    </div>

                    {/* Timeline Tag */}
                    <div 
                      style={{
                        position: 'absolute',
                        bottom: '1.5rem',
                        left: '1.5rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(6px)',
                        color: 'var(--color-deep-charcoal)',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '20px'
                      }}
                    >
                      Duration: {stepItem.duration}
                    </div>
                  </div>

                  {/* Editorial Detail Column */}
                  <div 
                    style={{ 
                      padding: 'clamp(2rem, 5vw, 3.5rem)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      order: isEven ? 1 : 2,
                      backgroundColor: '#FAF8F5'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <span 
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.8rem',
                            color: 'var(--color-warm-taupe)',
                            fontWeight: 600,
                            lineHeight: 1
                          }}
                        >
                          {stepItem.step}
                        </span>
                        <div style={{ height: '1px', flexGrow: 1, backgroundColor: 'var(--color-stone-border)' }} />
                      </div>

                      <h3 
                        style={{ 
                          fontFamily: 'var(--font-serif)', 
                          fontSize: 'clamp(1.7rem, 2.6vw, 2.2rem)', 
                          color: 'var(--color-deep-charcoal)',
                          marginBottom: '0.35rem'
                        }}
                      >
                        {stepItem.title}
                      </h3>

                      <p 
                        style={{ 
                          fontSize: '0.92rem', 
                          fontWeight: 500, 
                          color: 'var(--color-warm-taupe)', 
                          marginBottom: '1.25rem',
                          fontStyle: 'italic'
                        }}
                      >
                        {stepItem.subtitle}
                      </p>

                      <p 
                        style={{ 
                          fontSize: '0.96rem', 
                          lineHeight: 1.8, 
                          color: 'var(--color-deep-charcoal)',
                          marginBottom: '1.75rem' 
                        }}
                      >
                        {stepItem.description}
                      </p>

                      {/* Detail Checkpoints */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
                        {stepItem.details.map((detail, dIdx) => (
                          <div key={dIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                            <CheckCircle2 size={16} color="var(--color-warm-taupe)" style={{ flexShrink: 0, marginTop: '3px' }} />
                            <span style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-muted)', lineHeight: 1.5 }}>
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deliverables Footer */}
                    <div style={{ borderTop: '1px solid var(--color-stone-border)', paddingTop: '1.25rem' }}>
                      <span 
                        style={{ 
                          display: 'block', 
                          fontSize: '0.72rem', 
                          letterSpacing: '0.12em', 
                          textTransform: 'uppercase', 
                          color: 'var(--color-charcoal-light)', 
                          fontWeight: 600,
                          marginBottom: '0.5rem'
                        }}
                      >
                        KEY DELIVERABLES
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {stepItem.deliverables.map((deliv, delIdx) => (
                          <span 
                            key={delIdx}
                            style={{
                              fontSize: '0.78rem',
                              backgroundColor: 'rgba(23, 23, 19, 0.05)',
                              color: 'var(--color-deep-charcoal)',
                              padding: '0.3rem 0.75rem',
                              borderRadius: '2px',
                              fontWeight: 500
                            }}
                          >
                            {deliv}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. GUARANTEE & PEACE OF MIND CARD */}
      <section style={{ backgroundColor: 'var(--color-warm-ivory)', paddingBottom: '5rem' }}>
        <div className="container">
          <div 
            className="process-guarantee-card"
            style={{
              backgroundColor: 'var(--color-dark-olive)',
              color: '#FFFFFF',
              borderRadius: '4px',
              padding: 'clamp(2.5rem, 5vw, 4.5rem)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div>
              <span 
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--color-warm-taupe)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '0.75rem'
                }}
              >
                THE ARK SPACES COMMITMENT
              </span>

              <h2 
                style={{ 
                  fontFamily: 'var(--font-serif)', 
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', 
                  color: '#FAF8F5', 
                  lineHeight: 1.25,
                  marginBottom: '1.25rem' 
                }}
              >
                Zero-Compromise Craftsmanship. Guaranteed Delivery.
              </h2>

              <p style={{ fontSize: '0.96rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.8 }}>
                We believe your journey should be as serene as the completed home itself. With strict milestone accountability, weekly photographic updates, and our 120-point quality audit, we ensure your expectations are consistently exceeded.
              </p>
            </div>

            <div 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '4px',
                padding: '2rem',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '1rem' }}>
                Our Delivery Promise
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                  <CheckCircle2 size={18} color="var(--color-warm-taupe)" />
                  <span>On-time project delivery guarantee</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                  <CheckCircle2 size={18} color="var(--color-warm-taupe)" />
                  <span>No escalation on approved bill of quantities</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                  <CheckCircle2 size={18} color="var(--color-warm-taupe)" />
                  <span>10-year warranty on modular joinery</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                  <CheckCircle2 size={18} color="var(--color-warm-taupe)" />
                  <span>1-year complimentary post-handover service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONSULTATION CALL TO ACTION */}
      <section 
        className="process-cta-section"
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
          <div className="process-cta-content" style={{ maxWidth: '640px' }}>
            <h2 
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', 
                color: '#FFFFFF',
                marginBottom: '1.25rem',
                lineHeight: 1.2
              }}
            >
              Start your design journey today.
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.82)', marginBottom: '2rem', lineHeight: 1.7 }}>
              Schedule a private consultation with our principal designers in Chennai to discuss your layout, aspirations, and timeline.
            </p>

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

    </div>
  );
};
