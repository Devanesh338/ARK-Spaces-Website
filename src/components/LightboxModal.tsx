import React from 'react';
import { X } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  caption?: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ isOpen, imageSrc, caption, onClose }) => {
  if (!isOpen || !imageSrc) return null;

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(23, 23, 19, 0.92)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          color: '#FFFFFF',
          background: 'rgba(255, 255, 255, 0.15)',
          border: 'none',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
        aria-label="Close image modal"
      >
        <X size={24} />
      </button>

      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '90vw', maxHeight: '85vh', textAlign: 'center' }}
      >
        <img 
          src={imageSrc} 
          alt={caption || 'ARK Spaces Project Image'} 
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: '4px',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)'
          }}
        />
        {caption && (
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginTop: '0.85rem', fontSize: '0.95rem' }}>
            {caption}
          </p>
        )}
      </div>
    </div>
  );
};
