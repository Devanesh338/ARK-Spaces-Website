import React from 'react';
import { JournalArticle, PageId } from '../types';
import { X, Calendar, Clock, ArrowRight } from 'lucide-react';

interface ArticleModalProps {
  article: JournalArticle | null;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, onNavigate }) => {
  if (!article) return null;

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(23, 23, 19, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflowY: 'auto'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--color-warm-ivory)',
          borderRadius: '6px',
          width: '100%',
          maxWidth: '800px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: ' clamp(1.5rem, 4vw, 3rem)',
          boxShadow: 'var(--shadow-elevated)'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(23, 23, 19, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          aria-label="Close article"
        >
          <X size={20} />
        </button>

        {/* Category & Metadata */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span 
            style={{ 
              fontSize: '0.75rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.12em', 
              fontWeight: 600, 
              color: 'var(--color-warm-taupe)',
              backgroundColor: 'rgba(182, 165, 142, 0.15)',
              padding: '0.35rem 0.8rem',
              borderRadius: '20px'
            }}
          >
            {article.category}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--color-charcoal-light)' }}>
            <Calendar size={14} />
            <span>{article.date}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--color-charcoal-light)' }}>
            <Clock size={14} />
            <span>{article.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', lineHeight: 1.2, marginBottom: '1.5rem' }}>
          {article.title}
        </h2>

        {/* Image */}
        <div style={{ height: '320px', borderRadius: '4px', overflow: 'hidden', marginBottom: '2rem' }}>
          <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Article Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {article.content.map((p, idx) => (
            <p key={idx} style={{ fontSize: '1rem', lineHeight: 1.8, color: 'var(--color-deep-charcoal)' }}>
              {p}
            </p>
          ))}
        </div>

        {/* CTA Bar */}
        <div 
          style={{
            backgroundColor: '#FAF8F5',
            padding: '1.5rem',
            borderRadius: '4px',
            border: '1px solid var(--color-stone-border)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}
        >
          <div>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.25rem' }}>
              Have questions about your project?
            </h4>
            <p style={{ fontSize: '0.88rem', margin: 0 }}>
              Speak with our senior interior design team in Chennai.
            </p>
          </div>
          <button 
            onClick={() => {
              onClose();
              onNavigate('consultation');
            }}
            className="btn-primary"
            style={{ fontSize: '0.8rem', padding: '0.65rem 1.4rem' }}
          >
            Book Consultation <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
