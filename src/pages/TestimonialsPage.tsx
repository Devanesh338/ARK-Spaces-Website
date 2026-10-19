import React, { useRef } from 'react';
import { PageId } from '../types';
import { TESTIMONIALS, REVIEW_SUMMARY } from '../data/testimonialsData';
import { Star, Quote, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialsPageProps {
  onNavigate: (page: PageId, projectId?: string) => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Exactly the four strongest, most useful verified testimonials from TESTIMONIALS data
  const selectedTestimonialIds = ['test-1', 'test-2', 'test-3', 'test-4'];
  const displayReviews = selectedTestimonialIds
    .map(id => TESTIMONIALS.find(t => t.id === id))
    .filter((t): t is typeof TESTIMONIALS[0] => t !== undefined)
    .slice(0, 4);

  // GSAP Animations with scoped cleanup
  useGsapContext(containerRef, () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // 1. Hero Entrance Animation
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });
    heroTl.from('.testimonials-hero-eyebrow', { y: 24, opacity: 0, delay: 0.1 })
          .from('.testimonials-hero-title', { y: 32, opacity: 0 }, '-=0.6')
          .from('.testimonials-hero-sub', { y: 24, opacity: 0 }, '-=0.6')
          .from('.testimonials-hero-meta', { y: 20, opacity: 0 }, '-=0.5');

    // 2. Review Summary Bar Entrance
    gsap.from('.review-summary-card', {
      scrollTrigger: {
        trigger: '.review-summary-card',
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // 3. Staggered 4 Testimonial Cards Reveal
    gsap.from('.testimonial-card-item', {
      scrollTrigger: {
        trigger: '.testimonials-grid-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out'
    });

    // 4. Closing CTA Reveal
    gsap.from('.testimonials-cta-content', {
      scrollTrigger: {
        trigger: '.testimonials-cta-section',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-warm-ivory)', overflowX: 'hidden' }}>
      
      {/* SECTION 1 — HERO */}
      <section 
        style={{
          position: 'relative',
          minHeight: '58vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF',
          textAlign: 'center',
          backgroundColor: '#171713',
          overflow: 'hidden',
          paddingTop: '6rem',
          paddingBottom: '5rem'
        }}
      >
        {/* Background Image with Dark Overlay */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/about-story.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            opacity: 0.32,
            filter: 'contrast(1.05)'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(23, 23, 19, 0.7) 0%, rgba(23, 23, 19, 0.92) 100%)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
          <span 
            className="testimonials-hero-eyebrow"
            style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-warm-taupe)',
              fontWeight: 500,
              marginBottom: '1.25rem'
            }}
          >
            CLIENT EXPERIENCES
          </span>

          <h1 
            className="testimonials-hero-title"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
              fontWeight: 400,
              lineHeight: 1.15,
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              marginBottom: '1.5rem'
            }}
          >
            Real Stories, Real Spaces.
          </h1>

          <p 
            className="testimonials-hero-sub"
            style={{
              fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
              lineHeight: 1.7,
              color: 'rgba(255, 255, 255, 0.82)',
              maxWidth: '680px',
              margin: '0 auto 2rem auto',
              fontWeight: 300
            }}
          >
            Discover how ARK Spaces translates homeowner and business aspirations into enduring, beautifully executed interiors across Chennai — told through the authentic words of our clients.
          </p>

          <div 
            className="testimonials-hero-meta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.65rem 1.25rem',
              maxWidth: '100%',
              padding: '0.65rem 1.4rem',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(12px)',
              borderRadius: '40px',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#D4AF37" stroke="#D4AF37" />
              ))}
            </div>
            <span style={{ fontSize: '0.85rem', color: '#FFFFFF', fontWeight: 500, letterSpacing: '0.02em' }}>
              {REVIEW_SUMMARY.rating.toFixed(1)} Rating on {REVIEW_SUMMARY.source}
            </span>
            <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>•</span>
            <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              {REVIEW_SUMMARY.totalReviews}+ Verified Reviews
            </span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — REVIEW SUMMARY & TRUST BAR */}
      <section style={{ transform: 'translateY(-30px)', position: 'relative', zIndex: 10, marginBottom: '2rem' }}>
        <div className="container">
          <div 
            className="review-summary-card"
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-stone-border)',
              borderRadius: '4px',
              padding: '2rem 2.5rem',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem'
            }}
          >
            {/* Left: Score & Star Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center', paddingRight: '1.8rem', borderRight: '1px solid var(--color-stone-border-light)' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem', fontWeight: 500, lineHeight: 1, color: 'var(--color-deep-charcoal)' }}>
                  {REVIEW_SUMMARY.rating.toFixed(1)}
                </div>
                <div style={{ display: 'flex', gap: '2px', marginTop: '0.4rem', justifyContent: 'center' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#D4AF37" stroke="#D4AF37" />
                  ))}
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: 'var(--color-deep-charcoal)', marginBottom: '0.3rem' }}>
                  Official {REVIEW_SUMMARY.source} Score
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
                  Based on {REVIEW_SUMMARY.totalReviews}+ verified reviews from satisfied homeowners and commercial partners in Chennai.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--color-warm-taupe)', fontWeight: 500 }}>
                  <CheckCircle2 size={13} color="var(--color-warm-taupe)" />
                  <span>Sourced directly from arkspaces.com & Google Maps listing</span>
                </div>
              </div>
            </div>

            {/* Right: Direct Review Link Button */}
            <div>
              <a 
                href={REVIEW_SUMMARY.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.75rem 1.6rem',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: 'var(--color-deep-charcoal)',
                  backgroundColor: 'var(--color-warm-ivory)',
                  border: '1px solid var(--color-stone-border)',
                  borderRadius: '2px',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-deep-charcoal)';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.borderColor = 'var(--color-deep-charcoal)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-warm-ivory)';
                  e.currentTarget.style.color = 'var(--color-deep-charcoal)';
                  e.currentTarget.style.borderColor = 'var(--color-stone-border)';
                }}
              >
                <span>Read all on Google</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — CURATED FOUR TESTIMONIALS (BALANCED 2-COLUMN DESKTOP / 1-COLUMN MOBILE) */}
      <section className="section-py testimonials-grid-section">
        <div className="container">
          
          <div style={{ maxWidth: '720px', marginBottom: '3rem' }}>
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
              FEATURED CLIENT REVIEWS
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.8vw, 2.9rem)', color: 'var(--color-deep-charcoal)' }}>
              Verified Client Feedback
            </h2>
            <p style={{ fontSize: '0.98rem', color: 'var(--color-charcoal-muted)', marginTop: '0.6rem', lineHeight: 1.7 }}>
              Read authentic feedback from private homeowners and institutional clients who entrusted ARK Spaces with their residential and commercial spaces.
            </p>
          </div>

          {/* Clean, balanced 2-column grid on desktop, single-column on mobile */}
          <div 
            className="testimonials-four-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: '2rem'
            }}
          >
            {displayReviews.map((testimonial) => (
              <div
                key={testimonial.id}
                className="testimonial-card-item"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-stone-border)',
                  borderRadius: '4px',
                  padding: 'clamp(2rem, 4vw, 2.75rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-subtle)',
                  transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                  e.currentTarget.style.borderColor = 'var(--color-warm-taupe)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-subtle)';
                  e.currentTarget.style.borderColor = 'var(--color-stone-border)';
                }}
              >
                <div>
                  {/* Card Header: 5 Stars + Quote Icon */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '3px' }}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="#D4AF37" stroke="#D4AF37" />
                      ))}
                    </div>
                    <Quote size={28} color="var(--color-warm-taupe)" opacity={0.35} />
                  </div>

                  {/* Testimonial Quote */}
                  <p 
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.18rem, 1.6vw, 1.4rem)',
                      lineHeight: 1.6,
                      color: 'var(--color-deep-charcoal)',
                      fontStyle: 'italic',
                      marginBottom: '2rem'
                    }}
                  >
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>

                {/* Card Attribution Footer */}
                <div 
                  style={{ 
                    borderTop: '1px solid var(--color-stone-border)', 
                    paddingTop: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--color-deep-charcoal)', fontSize: '1rem' }}>
                      {testimonial.author}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-charcoal-light)', marginTop: '0.2rem' }}>
                      {testimonial.roleOrCompany ? `${testimonial.roleOrCompany} • ` : ''}
                      {testimonial.category} • {testimonial.location || 'Chennai'}
                    </div>
                  </div>

                  <div 
                    style={{
                      fontSize: '0.74rem',
                      color: 'var(--color-charcoal-light)',
                      backgroundColor: 'rgba(23, 23, 19, 0.05)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '20px',
                      fontWeight: 500
                    }}
                  >
                    Verified on Google
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Verification notice indicating this is a curated set of 4 from 175+ reviews */}
          <div 
            style={{
              marginTop: '3.5rem',
              padding: '1.5rem 2rem',
              backgroundColor: '#FAF8F5',
              border: '1px solid var(--color-stone-border)',
              borderRadius: '4px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle2 size={18} color="var(--color-warm-taupe)" style={{ flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-charcoal-muted)' }}>
                Displaying 4 selected verified reviews from our complete portfolio of <strong style={{ color: 'var(--color-deep-charcoal)' }}>{REVIEW_SUMMARY.totalReviews}+ five-star Google reviews</strong>.
              </p>
            </div>

            <a 
              href={REVIEW_SUMMARY.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--color-deep-charcoal)',
                borderBottom: '1px solid var(--color-deep-charcoal)',
                paddingBottom: '2px'
              }}
            >
              <span>Explore all {REVIEW_SUMMARY.totalReviews}+ reviews on Google Maps</span>
              <ExternalLink size={13} />
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 4 — CLOSING CONSULTATION CTA */}
      <section 
        className="testimonials-cta-section"
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
            inset: 0,
            backgroundImage: 'url(/images/cta-warm.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.35)',
            transform: 'scale(1.02)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="testimonials-cta-content" style={{ maxWidth: '640px' }}>
            <h2 
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', 
                color: '#FFFFFF',
                marginBottom: '1.25rem',
                lineHeight: 1.2
              }}
            >
              Ready to write your own<br />design story?
            </h2>

            <p style={{ fontSize: '1.05rem', color: 'rgba(255, 255, 255, 0.82)', marginBottom: '2rem', lineHeight: 1.7 }}>
              Book a consultation with ARK Spaces today and let our Chennai team turn your dream home into reality.
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
