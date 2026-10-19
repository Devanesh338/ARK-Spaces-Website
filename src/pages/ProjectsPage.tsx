import React, { useState, useRef, useEffect } from 'react';
import { PageId, Project } from '../types';
import { PROJECTS } from '../data/mockData';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsPageProps {
  initialCategory?: string;
  onNavigate: (page: PageId, projectId?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ initialCategory = 'All', onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const categories = ['All', 'Residential', 'Modular Kitchens', 'Bedrooms', 'Workspaces'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS.slice(0, 6)
    : PROJECTS.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  useGsapContext(containerRef, () => {
    // 1. Hero Entrance
    gsap.from('.projects-hero-title', {
      y: 30,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out',
      delay: 0.1
    });
    gsap.from('.projects-hero-sub', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.25
    });

    // 2. Filter Pills Reveal
    gsap.fromTo('.project-filter-pill', 
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        delay: 0.2,
        clearProps: 'all'
      }
    );

    // 3. Project Cards Stagger
    gsap.from('.project-grid-card', {
      scrollTrigger: {
        trigger: '.projects-two-column-grid',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out'
    });
  }, [selectedCategory]);

  useEffect(() => {
    // Safety check: ensure filter pills are always visible across all viewports
    const timer = setTimeout(() => {
      document.querySelectorAll('.project-filter-pill').forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--color-warm-ivory)' }}>

      {/* 1. HERO SECTION (Directly matching PDF Page 3) */}
      <section 
        className="projects-hero-section"
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
            backgroundImage: 'url(/images/hero-home.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.38)',
            transform: 'scale(1.02)'
          }}
        />

        <div className="container projects-hero-container" style={{ position: 'relative', zIndex: 2, padding: '4.5rem 1.5rem' }}>
          <div style={{ maxWidth: '640px' }}>
            <h1 
              className="projects-hero-title"
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(2.6rem, 5vw, 4rem)', 
                color: '#FFFFFF',
                marginBottom: '0.65rem',
                lineHeight: 1.15
              }}
            >
              Our Projects
            </h1>
            <p className="projects-hero-sub" style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '1.15rem' }}>
              A collection of spaces we’ve had the privilege to design.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTERS & 2-COLUMN PROJECT GRID (Directly matching PDF Page 3) */}
      <section className="section-py projects-content-section" style={{ backgroundColor: 'var(--color-warm-ivory)' }}>
        <div className="container">

          {/* Centered Filter Pills */}
          <div 
            className="projects-filter-container"
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
                  className="project-filter-pill"
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

          {/* Exact 2-Column Desktop Grid with 6 Projects (Matching PDF Page 3) */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
              gap: 'clamp(2rem, 4vw, 3rem) 2.5rem'
            }}
            className="projects-two-column-grid"
          >
            {filteredProjects.map((project: Project) => (
              <div 
                key={project.id}
                onClick={() => onNavigate('project-detail', project.id)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                className="img-zoom-container project-grid-card"
              >
                {/* Large Project Image */}
                <div 
                  style={{ 
                    height: '340px', 
                    width: '100%', 
                    overflow: 'hidden', 
                    borderRadius: '4px',
                    boxShadow: '0 6px 20px rgba(23, 23, 19, 0.06)',
                    marginBottom: '1rem'
                  }}
                >
                  <img 
                    src={project.heroImage} 
                    alt={project.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>

                {/* Title & Metadata directly below */}
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.45rem', color: 'var(--color-deep-charcoal)', marginBottom: '0.2rem' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--color-charcoal-muted)' }}>
                    {project.category} | {project.year}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Responsive style for mobile view alone (preserves desktop completely) */}
      <style>{`
        .project-filter-pill {
          opacity: 1;
        }
        @media (max-width: 768px) {
          .projects-hero-section {
            min-height: auto !important;
          }
          .projects-hero-container {
            padding: 2.25rem 1.25rem !important;
          }
          .projects-hero-title {
            font-size: 2.2rem !important;
            margin-bottom: 0.35rem !important;
          }
          .projects-hero-sub {
            font-size: 0.98rem !important;
          }
          .projects-content-section {
            padding-top: 1.25rem !important;
            padding-bottom: 2.5rem !important;
          }
          .projects-filter-container {
            margin-bottom: 1.5rem !important;
            gap: 0.5rem !important;
          }
          .project-filter-pill {
            padding: 0.45rem 1.05rem !important;
            font-size: 0.78rem !important;
            opacity: 1 !important;
          }
          .projects-two-column-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
        }
      `}</style>

    </div>
  );
};
