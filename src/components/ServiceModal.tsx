import React, { useEffect, useRef } from 'react';
import { ServiceItem, PageId } from '../types';
import { X, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { getLenis } from '../lib/lenis';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onNavigate: (page: PageId, projectId?: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onNavigate }) => {
  const modalCardRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and pause Lenis smooth scroll while modal is active
  useEffect(() => {
    if (!service) return;

    // 1. Pause Lenis smooth scrolling so wheel events don't scroll background
    const lenis = getLenis();
    lenis?.stop();

    // 2. Lock document body scroll
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // 3. Escape key to close
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      lenis?.start();
    };
  }, [service, onClose]);

  if (!service) return null;

  // Curate 3 to 4 high-value key inclusions from existing features/deliverables
  const keyInclusions = service.deliverables && service.deliverables.length > 0
    ? service.deliverables.slice(0, 4)
    : service.features.slice(0, 4);

  return (
    <div 
      className="service-modal-backdrop"
      onClick={onClose}
      data-lenis-prevent="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(23, 23, 19, 0.78)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        overflow: 'hidden',
        overscrollBehavior: 'contain'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div 
        ref={modalCardRef}
        className="service-modal-card"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent="true"
        style={{
          backgroundColor: 'var(--color-warm-ivory)',
          borderRadius: '6px',
          width: '100%',
          maxWidth: '860px',
          maxHeight: 'min(90vh, 680px)',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          WebkitOverflowScrolling: 'touch',
          position: 'relative',
          padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid var(--color-stone-border)'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(23, 23, 19, 0.06)',
            border: 'none',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            zIndex: 10
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(23, 23, 19, 0.12)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(23, 23, 19, 0.06)')}
          aria-label="Close modal"
        >
          <X size={18} color="var(--color-deep-charcoal)" />
        </button>

        {/* Compact Balanced Grid: Left Photography, Right Content */}
        <div className="service-modal-layout">
          
          {/* Left Column: Prominent Photography & Key Metadata */}
          <div className="service-modal-media-col">
            <div 
              style={{
                width: '100%',
                height: '240px',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 6px 20px rgba(23, 23, 19, 0.08)',
                marginBottom: '1rem',
                backgroundColor: '#1E1E1C'
              }}
            >
              <img 
                src={service.image} 
                alt={service.title} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  display: 'block'
                }} 
              />
            </div>

            {/* Expected Timeline Pill */}
            {service.timeline && (
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 0.9rem',
                  backgroundColor: '#FAF8F5',
                  borderRadius: '4px',
                  border: '1px solid var(--color-stone-border)',
                  fontSize: '0.82rem',
                  color: 'var(--color-charcoal-muted)'
                }}
              >
                <Clock size={15} color="var(--color-dark-olive)" style={{ flexShrink: 0 }} />
                <span>
                  <strong style={{ color: 'var(--color-deep-charcoal)', fontWeight: 600 }}>Timeline:</strong> {service.timeline}
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Title, Description, Inclusions & Actions */}
          <div className="service-modal-content-col">
            
            {/* Category Eyebrow */}
            <span 
              style={{ 
                fontSize: '0.72rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.16em', 
                fontWeight: 600, 
                color: 'var(--color-warm-taupe)',
                display: 'block',
                marginBottom: '0.35rem'
              }}
            >
              ARK SPACES • INTERIOR DESIGN
            </span>

            {/* Service Title */}
            <h2 
              id="service-modal-title"
              style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)', 
                lineHeight: 1.18, 
                marginBottom: '0.35rem',
                color: 'var(--color-deep-charcoal)'
              }}
            >
              {service.title}
            </h2>

            {/* Tagline */}
            <p 
              style={{ 
                fontStyle: 'italic', 
                color: 'var(--color-charcoal-muted)', 
                fontSize: '0.92rem',
                marginBottom: '0.9rem',
                lineHeight: 1.4
              }}
            >
              {service.tagline}
            </p>

            {/* Concise 2-3 sentence description */}
            <p 
              style={{ 
                fontSize: '0.92rem', 
                lineHeight: 1.65, 
                color: 'var(--color-deep-charcoal)', 
                marginBottom: '1.25rem' 
              }}
            >
              {service.description}
            </p>

            {/* Key Inclusions List */}
            <div style={{ marginBottom: '1.5rem' }}>
              <span 
                style={{ 
                  display: 'block',
                  fontSize: '0.75rem', 
                  letterSpacing: '0.12em', 
                  textTransform: 'uppercase', 
                  color: 'var(--color-deep-charcoal)', 
                  fontWeight: 600,
                  marginBottom: '0.65rem'
                }}
              >
                Key Inclusions
              </span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {keyInclusions.map((item, idx) => (
                  <li 
                    key={idx} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '0.55rem', 
                      fontSize: '0.85rem', 
                      color: 'var(--color-charcoal-muted)',
                      lineHeight: 1.45
                    }}
                  >
                    <CheckCircle2 size={15} color="var(--color-dark-olive)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Row */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                flexWrap: 'wrap',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--color-stone-border)'
              }}
            >
              <button 
                onClick={() => {
                  onClose();
                  onNavigate('consultation');
                }}
                className="btn-primary"
                style={{ 
                  fontSize: '0.82rem', 
                  padding: '0.75rem 1.6rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                Book a Consultation <ArrowRight size={15} />
              </button>
              <button 
                onClick={onClose}
                className="btn-secondary"
                style={{ 
                  fontSize: '0.82rem', 
                  padding: '0.75rem 1.25rem',
                  border: '1px solid var(--color-stone-border)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-deep-charcoal)',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>

          </div>

        </div>

        {/* Responsive CSS for Modal */}
        <style>{`
          .service-modal-layout {
            display: grid;
            grid-template-columns: 320px 1fr;
            gap: 2rem;
            align-items: start;
          }
          @media (max-width: 767px) {
            .service-modal-layout {
              grid-template-columns: 1fr;
              gap: 1.25rem;
            }
            .service-modal-media-col {
              margin-bottom: 0.25rem;
            }
          }
        `}</style>

      </div>
    </div>
  );
};

