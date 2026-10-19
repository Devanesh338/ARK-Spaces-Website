import React from 'react';
import { PageId } from '../types';
import { COMPANY_INFO } from '../data/mockData';

interface FooterProps {
  onNavigate: (page: PageId, projectId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (id: PageId | 'contact') => {
    if (id === 'contact') {
      onNavigate('consultation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    onNavigate(id as PageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { id: PageId | 'contact'; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'process', label: 'Process' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer style={{ backgroundColor: '#171713', color: '#EDEAE4', paddingTop: '3.5rem', paddingBottom: '2.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div className="container">
        
        {/* Top Horizontal Row: Logo, Links, Socials (Directly matching PDF footer) */}
        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: '2rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          {/* Brand Wordmark */}
          <button 
            onClick={() => handleNavClick('home')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              fontFamily: 'var(--font-serif)',
              fontSize: '1.4rem',
              letterSpacing: '0.18em',
              color: '#FFFFFF'
            }}
          >
            ARK SPACES
          </button>

          {/* Center Links */}
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem 1.6rem', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.45rem 0.35rem',
                  cursor: 'pointer',
                  fontSize: '0.84rem',
                  color: 'rgba(237, 234, 228, 0.72)',
                  letterSpacing: '0.04em',
                  transition: 'color 0.2s ease',
                  minHeight: '44px',
                  display: 'inline-flex',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 234, 228, 0.72)')}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Social Icons (Instagram, LinkedIn, Facebook / Pinterest) */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <a 
              href={COMPANY_INFO.socials.instagram} 
              target="_blank" 
              rel="noreferrer"
              aria-label="Instagram"
              style={{ 
                color: 'rgba(237, 234, 228, 0.75)', 
                transition: 'color 0.2s ease',
                width: '44px',
                height: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 234, 228, 0.75)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            <a 
              href={COMPANY_INFO.socials.linkedin} 
              target="_blank" 
              rel="noreferrer"
              aria-label="LinkedIn"
              style={{ 
                color: 'rgba(237, 234, 228, 0.75)', 
                transition: 'color 0.2s ease',
                width: '44px',
                height: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 234, 228, 0.75)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>

            <a 
              href={COMPANY_INFO.socials.facebook} 
              target="_blank" 
              rel="noreferrer"
              aria-label="Facebook"
              style={{ 
                color: 'rgba(237, 234, 228, 0.75)', 
                transition: 'color 0.2s ease',
                width: '44px',
                height: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237, 234, 228, 0.75)')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom Line: Copyright on Left, "Designed with care." on Right */}
        <div 
          style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            gap: '1rem',
            paddingTop: '1.75rem',
            fontSize: '0.78rem',
            color: 'rgba(237, 234, 228, 0.45)'
          }}
        >
          <div>
            © 2025 ARK Spaces. All rights reserved.
          </div>
          <div>
            Designed with care.
          </div>
        </div>

      </div>
    </footer>
  );
};
