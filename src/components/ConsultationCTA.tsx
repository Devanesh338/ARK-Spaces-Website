import React from 'react';
import { PageId } from '../types';
import { ArrowRight } from 'lucide-react';

interface ConsultationCTAProps {
  title?: string;
  subtitle?: string;
  onNavigate: (page: PageId) => void;
  bgImage?: string;
}

export const ConsultationCTA: React.FC<ConsultationCTAProps> = ({
  title = "Let's create something beautiful together.",
  subtitle = "Tell us what you're imagining. Let's explore what's possible.",
  onNavigate,
  bgImage = "/images/cta-warm.jpg"
}) => {
  return (
    <section 
      style={{
        position: 'relative',
        minHeight: '440px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#FFFFFF',
        textAlign: 'center',
        padding: '5rem 1.5rem'
      }}
    >
      {/* Background Image */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.35)',
          zIndex: 1,
          transform: 'scale(1.02)'
        }} 
      />

      {/* Content */}
      <div 
        className="container" 
        style={{ 
          position: 'relative', 
          zIndex: 2, 
          maxWidth: '780px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <span 
          style={{ 
            fontSize: '0.78rem', 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase', 
            color: 'var(--color-warm-taupe)',
            fontWeight: 600,
            marginBottom: '1rem'
          }}
        >
          START YOUR JOURNEY
        </span>

        <h2 
          style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)', 
            color: '#FFFFFF',
            lineHeight: 1.15,
            marginBottom: '1.25rem'
          }}
        >
          {title}
        </h2>

        <p 
          style={{ 
            color: 'rgba(255, 255, 255, 0.82)', 
            fontSize: '1.05rem', 
            maxWidth: '560px',
            marginBottom: '2.5rem'
          }}
        >
          {subtitle}
        </p>

        <button 
          onClick={() => {
            onNavigate('consultation');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="btn-light-outline"
          style={{
            padding: '1rem 2.2rem',
            fontSize: '0.9rem',
            borderRadius: '30px'
          }}
        >
          Book a Consultation <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};
