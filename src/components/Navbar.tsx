import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PageId } from '../types';
import { 
  Home, 
  LayoutGrid, 
  Layers, 
  Star, 
  Menu, 
  X, 
  ArrowRight, 
  Phone, 
  Compass, 
  Briefcase, 
  Calendar 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';
import { getLenis } from '../lib/lenis';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, projectId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Lenis pause, body scroll lock, and Escape key handling for mobile drawer
  useEffect(() => {
    if (mobileMoreOpen) {
      const lenis = getLenis();
      lenis?.stop();
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMoreOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
        lenis?.start();
      };
    } else {
      document.body.style.overflow = '';
      getLenis()?.start();
    }
  }, [mobileMoreOpen]);

  const navLinks: { id: PageId | 'contact'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'process', label: 'Process' },
    { id: 'testimonials', label: 'Testimonials' },
  ];

  const handleNavClick = (id: PageId | 'contact') => {
    setMobileMoreOpen(false);

    if (id === 'contact') {
      onNavigate('consultation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    onNavigate(id as PageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check if More menu has an active item
  const isMoreActive = ['about', 'services', 'consultation'].includes(currentPage);

  return (
    <>
      {/* 1. TOP NAVBAR (Always Fixed, Stays permanently visible above pinned video and all pages) */}
      <header 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 1000,
          backgroundColor: isScrolled ? 'rgba(23, 23, 19, 0.95)' : 'rgba(23, 23, 19, 0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'background-color 0.3s ease, border-color 0.3s ease, height 0.3s ease',
          height: '72px',
          display: 'flex',
          alignItems: 'center'
        }}
        className="ark-top-header"
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          
          {/* Brand Wordmark */}
          <button 
            onClick={() => handleNavClick('home')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              padding: '0.4rem 0',
              display: 'flex',
              alignItems: 'center'
            }}
            aria-label="ARK SPACES Home"
          >
            <span style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(1.2rem, 3vw, 1.38rem)', 
              fontWeight: 500, 
              letterSpacing: '0.18em',
              color: '#FFFFFF',
              lineHeight: 1
            }}>
              ARK SPACES
            </span>
          </button>

          {/* Center Desktop Navigation Links */}
          <nav 
            style={{
              display: 'none',
              gap: '2.2rem',
              alignItems: 'center'
            }}
            className="desktop-nav"
            aria-label="Desktop Primary Navigation"
          >
            {navLinks.map((link) => {
              const isActive = 
                (link.id === currentPage) || 
                (link.id === 'projects' && currentPage === 'project-detail');

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`nav-link-item ${isActive ? 'active' : ''}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.84rem',
                    fontWeight: isActive ? 500 : 400,
                    letterSpacing: '0.04em',
                    color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.72)',
                    position: 'relative',
                    padding: '0.5rem 0',
                    transition: 'color 0.25s ease'
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  <span 
                    className="nav-underline"
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '1px',
                      backgroundColor: 'var(--color-warm-taupe)',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'center',
                      transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }} 
                  />
                </button>
              );
            })}
          </nav>

          {/* Right Desktop CTA Button */}
          <div style={{ display: 'none', alignItems: 'center' }} className="desktop-nav-cta">
            <button 
              onClick={() => handleNavClick('contact')}
              style={{
                padding: '0.55rem 1.3rem',
                fontSize: '0.78rem',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                letterSpacing: '0.03em',
                fontWeight: 400,
                cursor: 'pointer',
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
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
              }}
            >
              Book a Consultation
            </button>
          </div>

          {/* Mobile Header Quick Consultation Pill (Replacing three-dot menu with clear visible button) */}
          <div className="mobile-header-cta" style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => handleNavClick('contact')}
              style={{
                padding: '0.42rem 0.95rem',
                fontSize: '0.74rem',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.32)',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#FFFFFF',
                letterSpacing: '0.02em',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Calendar size={13} color="var(--color-warm-taupe)" />
              <span>Consultation</span>
            </button>
          </div>

        </div>
      </header>

      {/* 2. PERSISTENT MOBILE BOTTOM NAVIGATION BAR (Shown on screens < 900px) */}
      <nav 
        className="mobile-bottom-nav"
        aria-label="Mobile Navigation"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(23, 23, 19, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.35)',
          paddingTop: '6px',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)'
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            maxWidth: '560px',
            margin: '0 auto',
            padding: '0 0.5rem'
          }}
        >
          {/* 1. Home */}
          <button
            onClick={() => handleNavClick('home')}
            className={`mobile-tab-btn ${currentPage === 'home' ? 'active' : ''}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '56px',
              minHeight: '44px',
              padding: '0.25rem 0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: currentPage === 'home' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.55)',
              transition: 'color 0.2s ease'
            }}
            aria-label="Home"
            aria-current={currentPage === 'home' ? 'page' : undefined}
          >
            <Home size={19} strokeWidth={currentPage === 'home' ? 2.2 : 1.7} />
            <span style={{ fontSize: '0.64rem', letterSpacing: '0.04em', marginTop: '3px', fontWeight: currentPage === 'home' ? 600 : 400 }}>
              Home
            </span>
            <span 
              style={{
                width: '12px',
                height: '2px',
                backgroundColor: 'var(--color-warm-taupe)',
                borderRadius: '1px',
                marginTop: '2px',
                opacity: currentPage === 'home' ? 1 : 0,
                transform: currentPage === 'home' ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'all 0.25s ease'
              }} 
            />
          </button>

          {/* 2. Projects */}
          <button
            onClick={() => handleNavClick('projects')}
            className={`mobile-tab-btn ${currentPage === 'projects' || currentPage === 'project-detail' ? 'active' : ''}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '56px',
              minHeight: '44px',
              padding: '0.25rem 0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: (currentPage === 'projects' || currentPage === 'project-detail') ? '#FFFFFF' : 'rgba(255, 255, 255, 0.55)',
              transition: 'color 0.2s ease'
            }}
            aria-label="Projects"
            aria-current={(currentPage === 'projects' || currentPage === 'project-detail') ? 'page' : undefined}
          >
            <LayoutGrid size={19} strokeWidth={(currentPage === 'projects' || currentPage === 'project-detail') ? 2.2 : 1.7} />
            <span style={{ fontSize: '0.64rem', letterSpacing: '0.04em', marginTop: '3px', fontWeight: (currentPage === 'projects' || currentPage === 'project-detail') ? 600 : 400 }}>
              Projects
            </span>
            <span 
              style={{
                width: '12px',
                height: '2px',
                backgroundColor: 'var(--color-warm-taupe)',
                borderRadius: '1px',
                marginTop: '2px',
                opacity: (currentPage === 'projects' || currentPage === 'project-detail') ? 1 : 0,
                transform: (currentPage === 'projects' || currentPage === 'project-detail') ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'all 0.25s ease'
              }} 
            />
          </button>

          {/* 3. Process */}
          <button
            onClick={() => handleNavClick('process')}
            className={`mobile-tab-btn ${currentPage === 'process' ? 'active' : ''}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '56px',
              minHeight: '44px',
              padding: '0.25rem 0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: currentPage === 'process' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.55)',
              transition: 'color 0.2s ease'
            }}
            aria-label="Process"
            aria-current={currentPage === 'process' ? 'page' : undefined}
          >
            <Layers size={19} strokeWidth={currentPage === 'process' ? 2.2 : 1.7} />
            <span style={{ fontSize: '0.64rem', letterSpacing: '0.04em', marginTop: '3px', fontWeight: currentPage === 'process' ? 600 : 400 }}>
              Process
            </span>
            <span 
              style={{
                width: '12px',
                height: '2px',
                backgroundColor: 'var(--color-warm-taupe)',
                borderRadius: '1px',
                marginTop: '2px',
                opacity: currentPage === 'process' ? 1 : 0,
                transform: currentPage === 'process' ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'all 0.25s ease'
              }} 
            />
          </button>

          {/* 4. Reviews / Testimonials */}
          <button
            onClick={() => handleNavClick('testimonials')}
            className={`mobile-tab-btn ${currentPage === 'testimonials' ? 'active' : ''}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '56px',
              minHeight: '44px',
              padding: '0.25rem 0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: currentPage === 'testimonials' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.55)',
              transition: 'color 0.2s ease'
            }}
            aria-label="Testimonials"
            aria-current={currentPage === 'testimonials' ? 'page' : undefined}
          >
            <Star size={19} strokeWidth={currentPage === 'testimonials' ? 2.2 : 1.7} />
            <span style={{ fontSize: '0.64rem', letterSpacing: '0.04em', marginTop: '3px', fontWeight: currentPage === 'testimonials' ? 600 : 400 }}>
              Reviews
            </span>
            <span 
              style={{
                width: '12px',
                height: '2px',
                backgroundColor: 'var(--color-warm-taupe)',
                borderRadius: '1px',
                marginTop: '2px',
                opacity: currentPage === 'testimonials' ? 1 : 0,
                transform: currentPage === 'testimonials' ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'all 0.25s ease'
              }} 
            />
          </button>

          {/* 5. More (Accessible Drawer with About, Services, Materials, Contact) */}
          <button
            onClick={() => setMobileMoreOpen(true)}
            className={`mobile-tab-btn ${isMoreActive || mobileMoreOpen ? 'active' : ''}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '56px',
              minHeight: '44px',
              padding: '0.25rem 0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: (isMoreActive || mobileMoreOpen) ? '#FFFFFF' : 'rgba(255, 255, 255, 0.55)',
              transition: 'color 0.2s ease'
            }}
            aria-label="More destinations"
            aria-haspopup="dialog"
            aria-expanded={mobileMoreOpen}
          >
            <Menu size={19} strokeWidth={(isMoreActive || mobileMoreOpen) ? 2.2 : 1.7} />
            <span style={{ fontSize: '0.64rem', letterSpacing: '0.04em', marginTop: '3px', fontWeight: (isMoreActive || mobileMoreOpen) ? 600 : 400 }}>
              More
            </span>
            <span 
              style={{
                width: '12px',
                height: '2px',
                backgroundColor: 'var(--color-warm-taupe)',
                borderRadius: '1px',
                marginTop: '2px',
                opacity: (isMoreActive && !['home', 'projects', 'process', 'testimonials'].includes(currentPage)) ? 1 : 0,
                transform: (isMoreActive && !['home', 'projects', 'process', 'testimonials'].includes(currentPage)) ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'all 0.25s ease'
              }} 
            />
          </button>
        </div>
      </nav>

      {/* 3. MOBILE "MORE" DRAWER (Rendered via Portal on document.body for clean stacking) */}
      {mobileMoreOpen && typeof document !== 'undefined' &&
        createPortal(
          <div
            id="mobile-more-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Additional Navigation Options"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999999,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              animation: 'mobileDrawerFadeIn 0.22s ease-out forwards'
            }}
          >
            {/* Backdrop Layer */}
            <div
              onClick={() => setMobileMoreOpen(false)}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.72)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)'
              }}
            />

            {/* Bottom Sheet Body */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxHeight: '82vh',
                backgroundColor: 'var(--color-deep-charcoal)',
                color: '#EDEAE4',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                zIndex: 1,
                paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)'
              }}
            >
              {/* Sheet Header */}
              <div
                style={{
                  height: '64px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 1.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  flexShrink: 0
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 500,
                      letterSpacing: '0.12em',
                      color: '#FFFFFF'
                    }}
                  >
                    EXPLORE ARK SPACES
                  </span>
                </div>

                <button
                  onClick={() => setMobileMoreOpen(false)}
                  aria-label="Close menu"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: 'none',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    borderRadius: '50%'
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Destinations */}
              <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                
                {/* About Link */}
                <button
                  onClick={() => handleNavClick('about')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '52px',
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: currentPage === 'about' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                    <div style={{ color: 'var(--color-warm-taupe)' }}>
                      <Compass size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '0.98rem' }}>About Us</div>
                      <div style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.6)' }}>Our story, Chennai studio & design philosophy</div>
                    </div>
                  </div>
                  <ArrowRight size={16} color="var(--color-warm-taupe)" />
                </button>

                {/* Services Link */}
                <button
                  onClick={() => handleNavClick('services')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '52px',
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: currentPage === 'services' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                    <div style={{ color: 'var(--color-warm-taupe)' }}>
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: '0.98rem' }}>Services</div>
                      <div style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.6)' }}>Residential, Modular Kitchens, Turnkey fit-out</div>
                    </div>
                  </div>
                  <ArrowRight size={16} color="var(--color-warm-taupe)" />
                </button>

                {/* Primary Consultation Action */}
                <button
                  onClick={() => handleNavClick('contact')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    minHeight: '48px',
                    padding: '0.85rem 1rem',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-warm-taupe)',
                    color: '#171713',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    letterSpacing: '0.04em',
                    marginTop: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  <span>Book a Consultation</span>
                  <ArrowRight size={16} />
                </button>

                {/* Direct Call Quick Link */}
                <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
                  <a
                    href={`tel:${COMPANY_INFO.phone.replace(/[^0-9+]/g, '')}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: 'rgba(255, 255, 255, 0.75)',
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                      padding: '0.4rem 0.8rem'
                    }}
                  >
                    <Phone size={14} color="var(--color-warm-taupe)" />
                    <span>Direct: {COMPANY_INFO.phone}</span>
                  </a>
                </div>

              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Media Query and Keyframes for Navigation */}
      <style>{`
        .nav-link-item:hover {
          color: #FFFFFF !important;
        }
        .nav-link-item:hover .nav-underline {
          transform: scaleX(0.7) !important;
        }
        .nav-link-item.active .nav-underline {
          transform: scaleX(1) !important;
        }

        /* Desktop view >= 900px */
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-nav-cta {
            display: flex !important;
          }
          .mobile-header-cta {
            display: none !important;
          }
          .mobile-bottom-nav {
            display: none !important;
          }
        }

        /* Mobile / Tablet view < 900px */
        @media (max-width: 899px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-nav-cta {
            display: none !important;
          }
          .mobile-header-cta {
            display: flex !important;
          }
          .mobile-bottom-nav {
            display: block !important;
          }
        }

        @keyframes mobileDrawerFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};
