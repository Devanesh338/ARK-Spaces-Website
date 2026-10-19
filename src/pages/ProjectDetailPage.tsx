import React, { useRef } from 'react';
import { PageId, Project } from '../types';
import { PROJECTS } from '../data/mockData';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailPageProps {
  projectId: string;
  onNavigate: (page: PageId, projectId?: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectId, onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const project: Project = PROJECTS.find(p => p.id === projectId) || PROJECTS[0];

  useGsapContext(containerRef, () => {
    // 1. Hero Entrance
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.85 } });
    heroTl.from('.detail-hero-breadcrumb', { y: 15, opacity: 0, delay: 0.1 })
          .from('.detail-hero-title', { y: 30, opacity: 0 }, '-=0.6')
          .from('.detail-hero-sub', { y: 20, opacity: 0 }, '-=0.6');

    // 2. Metadata Grid Stagger
    gsap.from('.detail-meta-item', {
      scrollTrigger: {
        trigger: '.project-metadata-grid',
        start: 'top 88%',
        toggleActions: 'play none none none'
      },
      y: 20,
      opacity: 0,
      duration: 0.65,
      stagger: 0.1,
      ease: 'power2.out'
    });

    // 3. The Vision Section (Safe vertical reveal on mobile)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    gsap.from('.detail-vision-text', {
      scrollTrigger: {
        trigger: '.detail-vision-section',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      x: isMobile ? 0 : -30,
      y: isMobile ? 25 : 0,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    gsap.from('.detail-vision-image', {
      scrollTrigger: {
        trigger: '.detail-vision-section',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      x: isMobile ? 0 : 30,
      y: isMobile ? 25 : 0,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });

    // 4. Design Highlights Checklist Stagger
    gsap.from('.detail-highlight-item', {
      scrollTrigger: {
        trigger: '.detail-highlights-section',
        start: 'top 82%',
        toggleActions: 'play none none none'
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });

    gsap.from('.detail-highlights-image', {
      scrollTrigger: {
        trigger: '.detail-highlights-section',
        start: 'top 82%',
        toggleActions: 'play none none none'
      },
      scale: 0.95,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out'
    });

    // 5. Material Palette Swatches Stagger
    gsap.from('.detail-material-swatch', {
      scrollTrigger: {
        trigger: '.detail-materials-section',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'back.out(1.5)'
    });

    // 6. CTA Section
    gsap.from('.detail-cta-content', {
      scrollTrigger: {
        trigger: '.detail-cta-section',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 25,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });
  }, [projectId]);

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-warm-ivory)' }}>
      
      {/* 1. FULL-WIDTH PHOTOGRAPHIC HERO (Directly matching PDF Page 4) */}
      <section 
        style={{ 
          position: 'relative', 
          minHeight: '60vh', 
          display: 'flex',
          alignItems: 'flex-end',
          width: '100%', 
          overflow: 'hidden',
          backgroundColor: '#171713',
          color: '#FFFFFF'
        }}
      >
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${project.heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.45)',
            transform: 'scale(1.02)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '5rem 1.5rem 3.5rem' }}>
          <div style={{ maxWidth: '700px' }}>
            {/* Breadcrumb */}
            <div className="detail-hero-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '1.25rem' }}>
              <button 
                onClick={() => onNavigate('projects')}
                style={{ background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.7)', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                <ArrowLeft size={14} /> Projects
              </button>
              <span>/</span>
              <span style={{ color: '#FFFFFF' }}>{project.title}</span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="detail-hero-title" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', color: '#FFFFFF', marginBottom: '0.65rem', lineHeight: 1.15 }}>
              {project.title}
            </h1>
            <p className="detail-hero-sub" style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.15rem' }}>
              {project.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 2. PROJECT INFORMATION ROW (Directly matching PDF Page 4) */}
      <section style={{ backgroundColor: 'var(--color-warm-ivory)', borderBottom: '1px solid var(--color-stone-border)', padding: '2.5rem 0' }}>
        <div className="container">
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2rem'
            }}
            className="project-metadata-grid"
          >
            <div className="detail-meta-item">
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-charcoal-light)', marginBottom: '0.35rem' }}>
                Type
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-deep-charcoal)' }}>
                {project.category}
              </div>
            </div>

            <div className="detail-meta-item">
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-charcoal-light)', marginBottom: '0.35rem' }}>
                Location
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-deep-charcoal)' }}>
                {project.location}
              </div>
            </div>

            <div className="detail-meta-item">
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-charcoal-light)', marginBottom: '0.35rem' }}>
                Year
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-deep-charcoal)' }}>
                {project.year}
              </div>
            </div>

            <div className="detail-meta-item">
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-charcoal-light)', marginBottom: '0.35rem' }}>
                Size
              </div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-deep-charcoal)' }}>
                {project.size}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE VISION SECTION (Directly matching PDF Page 4) */}
      <section className="section-py detail-vision-section" style={{ backgroundColor: 'var(--color-warm-ivory)', overflow: 'hidden' }}>
        <div className="container">
          <div 
            className="detail-vision-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(2rem, 5vw, 4.5rem)',
              alignItems: 'center'
            }}
          >
            <div className="detail-vision-text">
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'var(--color-deep-charcoal)', marginBottom: '1.5rem' }}>
                The Vision
              </h2>
              <p style={{ fontSize: '1.02rem', lineHeight: 1.85, color: 'var(--color-deep-charcoal)' }}>
                {project.visionText}
              </p>
            </div>

            <div 
              style={{ 
                height: '380px', 
                borderRadius: '4px', 
                overflow: 'hidden', 
                boxShadow: '0 8px 30px rgba(23, 23, 19, 0.08)' 
              }} 
              className="img-zoom-container detail-vision-image"
            >
              <img 
                src={project.visionImage} 
                alt={`${project.title} Architectural Vision`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. DESIGN HIGHLIGHTS SECTION (Directly matching PDF Page 4) */}
      <section className="section-py detail-highlights-section" style={{ backgroundColor: 'var(--color-warm-ivory)', borderTop: '1px solid var(--color-stone-border)', overflow: 'hidden' }}>
        <div className="container">
          <div 
            className="detail-highlights-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: 'clamp(2rem, 5vw, 4.5rem)',
              alignItems: 'center'
            }}
          >
            {/* Highlights List */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'var(--color-deep-charcoal)', marginBottom: '1.75rem' }}>
                Design Highlights
              </h2>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: 0 }}>
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="detail-highlight-item" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'rgba(36, 41, 29, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={12} color="var(--color-dark-olive)" />
                    </div>
                    <span style={{ fontSize: '0.98rem', color: 'var(--color-deep-charcoal)' }}>
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlights Image */}
            <div 
              style={{ 
                height: '380px', 
                borderRadius: '4px', 
                overflow: 'hidden', 
                boxShadow: '0 8px 30px rgba(23, 23, 19, 0.08)' 
              }} 
              className="img-zoom-container detail-highlights-image"
            >
              <img 
                src={project.highlightsImage} 
                alt={`${project.title} Highlights`} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. MATERIAL PALETTE (Directly matching PDF Page 4) */}
      <section className="section-py-sm detail-materials-section" style={{ backgroundColor: 'var(--color-warm-ivory)', borderTop: '1px solid var(--color-stone-border)' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', color: 'var(--color-deep-charcoal)', marginBottom: '2.5rem' }}>
            Material Palette
          </h2>

          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2.5rem'
            }}
          >
            {project.materials.map((mat, idx) => (
              <div 
                key={idx}
                className="detail-material-swatch"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'left'
                }}
              >
                {/* Circular Swatch with hover scaling */}
                <div 
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    backgroundColor: mat.colorHex || '#D9CCBA',
                    backgroundImage: mat.texture ? `url(${mat.texture})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '2px solid rgba(23, 23, 19, 0.08)',
                    boxShadow: '0 4px 12px rgba(23, 23, 19, 0.08)',
                    marginBottom: '0.75rem',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(23, 23, 19, 0.16)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(23, 23, 19, 0.08)';
                  }}
                />
                <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-deep-charcoal)' }}>
                  {mat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CLOSING DARK CONSULTATION CTA (Directly matching PDF Page 4) */}
      <section 
        className="detail-cta-section"
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
          <div className="detail-cta-content" style={{ maxWidth: '640px' }}>
            <h2 
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2.2rem, 4.2vw, 3.2rem)', 
                color: '#FFFFFF',
                marginBottom: '0.75rem',
                lineHeight: 1.2
              }}
            >
              Have a project in mind?
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Let’s create something beautiful together.
            </p>

            <button 
              onClick={() => {
                onNavigate('consultation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
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

      {/* Responsive layout for metadata grid and split sections */}
      <style>{`
        @media (max-width: 768px) {
          .detail-vision-grid, .detail-highlights-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .detail-vision-image, .detail-highlights-image {
            height: 300px !important;
          }
        }
        @media (max-width: 640px) {
          .project-metadata-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 440px) {
          .project-metadata-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
        }
      `}</style>

    </div>
  );
};
