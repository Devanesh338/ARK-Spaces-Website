import React from 'react';
import { MaterialItem, PageId } from '../types';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';

interface MaterialModalProps {
  material: MaterialItem | null;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose, onNavigate }) => {
  if (!material) return null;

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(23, 23, 19, 0.78)',
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
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
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
          aria-label="Close material modal"
        >
          <X size={20} />
        </button>

        {/* Category Header */}
        <span 
          style={{ 
            fontSize: '0.72rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            fontWeight: 600, 
            color: 'var(--color-warm-taupe)',
            display: 'block',
            marginBottom: '0.35rem'
          }}
        >
          MATERIAL SPECIFICATION • {material.category}
        </span>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: '1.25rem' }}>
          {material.name}
        </h2>

        {/* Swatch Display */}
        <div style={{ height: '240px', borderRadius: '4px', overflow: 'hidden', marginBottom: '1.5rem', backgroundColor: material.colorHex || '#E5E1DA', position: 'relative' }}>
          {material.image ? (
            <img src={material.image} alt={material.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', backgroundColor: material.colorHex, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: material.colorHex === '#F5F2EB' || material.colorHex === '#E5E1DA' ? '#171713' : '#FFFFFF', fontFamily: 'var(--font-serif)', fontSize: '1.5rem', letterSpacing: '0.08em' }}>
                {material.colorHex}
              </span>
            </div>
          )}
        </div>

        {/* Finish & Description */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--color-dark-olive)', fontWeight: 600, marginBottom: '0.5rem', backgroundColor: 'rgba(36, 41, 29, 0.08)', padding: '0.3rem 0.75rem', borderRadius: '15px' }}>
            <Sparkles size={14} /> Finish: {material.finish}
          </div>
          <p style={{ fontSize: '0.96rem', lineHeight: 1.7, color: 'var(--color-charcoal-muted)', marginTop: '0.5rem' }}>
            {material.description}
          </p>
        </div>

        {/* Characteristics */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginBottom: '0.75rem' }}>
            Key Architectural Properties
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {material.characteristics.map((c, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', padding: '0.4rem 0.85rem', backgroundColor: '#FAF8F5', border: '1px solid var(--color-stone-border)', borderRadius: '20px', color: 'var(--color-deep-charcoal)' }}>
                <Check size={14} color="var(--color-dark-olive)" /> {c}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button 
            onClick={() => {
              onClose();
              onNavigate('consultation');
            }}
            className="btn-primary"
            style={{ fontSize: '0.82rem', padding: '0.75rem 1.6rem' }}
          >
            Request Physical Sample <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
