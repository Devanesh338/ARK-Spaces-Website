import React, { useRef, useState, useEffect } from 'react';
import { PageId } from '../types';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useGsapContext } from '../hooks/useGsapContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CinematicScrollVideoProps {
  onNavigate: (page: PageId, projectId?: string) => void;
}

export const CinematicScrollVideo: React.FC<CinematicScrollVideoProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check viewport width for responsive tuning
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Monitor video loading states
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setVideoLoaded(true);
      ScrollTrigger.refresh();
    };

    const handleError = () => {
      // Gracefully switch to poster-based architectural fallback
      setHasVideoError(true);
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1) {
      setVideoLoaded(true);
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true });
      video.addEventListener('error', handleError, { once: true });
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // GSAP ScrollTrigger timeline configuration
  useGsapContext(sectionRef, () => {
    const video = videoRef.current;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion) {
      // In reduced motion mode, present static architectural showcase without pinned scrub
      return;
    }

    // Scroll scrub distance: 320% on desktop for an organic cinematic pace, 200% on tablet/mobile
    const scrollDistance = isMobile ? '+=200%' : '+=340%';

    // Master Timeline pinned to section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: scrollDistance,
        pin: true,
        scrub: isMobile ? 0.4 : 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Frame-accurate video seek mapped directly to scroll progress
          if (video && !hasVideoError && video.readyState >= 1 && !isNaN(video.duration) && video.duration > 0) {
            const targetTime = Math.min(Math.max(self.progress * video.duration, 0), video.duration);
            // Throttle seek delta to prevent decoder thrashing while maintaining fluid seek
            if (Math.abs(video.currentTime - targetTime) > 0.035) {
              video.currentTime = targetTime;
            }
          }
        }
      }
    });

    // If using poster fallback, add a subtle cinematic Ken-Burns parallax drift
    if (hasVideoError || !videoLoaded) {
      tl.to('.cinematic-poster-bg', {
        scale: 1.12,
        yPercent: -4,
        ease: 'none',
        duration: 1
      }, 0);
    }

    // --- Storyboard Overlays Orchestration ---

    // 1. Opening: "Spaces That Feel Like Home" + Scroll Prompt
    // Active from 0.0 to 0.25; fades out by 0.30
    tl.to('.cinematic-story-1', {
      opacity: 0,
      y: -28,
      duration: 0.12,
      ease: 'power2.inOut'
    }, 0.22);

    tl.to('.cinematic-scroll-prompt', {
      opacity: 0,
      y: -15,
      duration: 0.1,
      ease: 'power2.inOut'
    }, 0.16);

    // 2. Middle: "Designed Around You" & "Thoughtful Materials. Timeless Details."
    // Enters at 0.32, holds until 0.62, fades out by 0.70
    tl.fromTo('.cinematic-story-2',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.12, ease: 'power2.out' },
      0.32
    );
    tl.to('.cinematic-story-2', {
      opacity: 0,
      y: -28,
      duration: 0.12,
      ease: 'power2.in'
    }, 0.62);

    // 3. Final: "Your Space. Your Story." + "Explore Our Projects" CTA
    // Enters at 0.72 and holds firmly until 1.0 (release of pin)
    tl.fromTo('.cinematic-story-3',
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.14, ease: 'power2.out' },
      0.72
    );

  }, [videoLoaded, hasVideoError, isMobile]);

  return (
    <section 
      ref={sectionRef}
      className="cinematic-scroll-section"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        backgroundColor: '#171713',
        color: '#FFFFFF',
        overflow: 'hidden',
        zIndex: 15
      }}
      aria-label="Cinematic Interior Walkthrough"
    >
      {/* 1. Underlying Video Player for Scroll Scrubbing */}
      <video
        ref={videoRef}
        className="cinematic-video-element"
        playsInline
        muted
        preload="auto"
        poster="/images/ark-interior-poster.webp"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          opacity: videoLoaded && !hasVideoError ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: 'none'
        }}
      >
        <source src="/videos/ark-interior-scroll.mp4" type="video/mp4" />
        <source src="/videos/ark-interior-scroll.webm" type="video/webm" />
      </video>

      {/* 2. High-Fidelity Poster Fallback (Displayed when loading, error, or reduced motion) */}
      <div 
        className="cinematic-poster-bg"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/ark-interior-poster.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 45%',
          zIndex: videoLoaded && !hasVideoError ? 0 : 1,
          opacity: 0.95,
          filter: 'brightness(0.72)',
          transform: 'scale(1.02)',
          transformOrigin: 'center center'
        }}
      />

      {/* 3. Subtle Vignette & Gradient Overlays for Architectural Contrast */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(23, 23, 19, 0.45) 0%, rgba(23, 23, 19, 0.25) 45%, rgba(23, 23, 19, 0.75) 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 35%, rgba(23, 23, 19, 0.55) 100%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* 4. Storyboard HTML Overlays */}
      <div 
        className="container"
        style={{
          position: 'relative',
          zIndex: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2rem 1.5rem'
        }}
      >

        {/* --- MILESTONE 1: Opening (0% - 25%) --- */}
        <div 
          className="cinematic-story-1"
          style={{
            position: 'absolute',
            width: '90%',
            maxWidth: '820px',
            willChange: 'transform, opacity'
          }}
        >
          <span 
            style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--color-warm-taupe)',
              fontWeight: 600,
              marginBottom: '1rem'
            }}
          >
            STEP INTO THE SPACE
          </span>

          <h2 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
              fontWeight: 400,
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
              marginBottom: '1.25rem'
            }}
          >
            Spaces That Feel Like Home
          </h2>

          <p 
            style={{
              fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '560px',
              margin: '0 auto',
              fontWeight: 300,
              lineHeight: 1.6
            }}
          >
            Experience the harmony of proportion, materiality, and light in this architectural walkthrough.
          </p>
        </div>

        {/* --- MILESTONE 2: Middle (35% - 65%) --- */}
        <div 
          className="cinematic-story-2"
          style={{
            position: 'absolute',
            width: '90%',
            maxWidth: '780px',
            opacity: 0,
            willChange: 'transform, opacity'
          }}
        >
          <span 
            style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--color-warm-taupe)',
              fontWeight: 600,
              marginBottom: '1rem'
            }}
          >
            SPATIAL HARMONY
          </span>

          <h2 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.3rem, 5vw, 3.8rem)',
              fontWeight: 400,
              color: '#FFFFFF',
              lineHeight: 1.15,
              marginBottom: '1rem'
            }}
          >
            Designed Around You
          </h2>

          <p 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
              fontStyle: 'italic',
              color: 'var(--color-warm-taupe)',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: 1.5
            }}
          >
            &ldquo;Thoughtful Materials. Timeless Details.&rdquo;
          </p>
        </div>

        {/* --- MILESTONE 3: Final (75% - 100%) --- */}
        <div 
          className="cinematic-story-3"
          style={{
            position: 'absolute',
            width: '90%',
            maxWidth: '780px',
            opacity: 0,
            willChange: 'transform, opacity'
          }}
        >
          <span 
            style={{
              display: 'inline-block',
              fontSize: '0.72rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--color-warm-taupe)',
              fontWeight: 600,
              marginBottom: '1rem'
            }}
          >
            A LIVING ARCHITECTURE
          </span>

          <h2 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5.2vw, 4rem)',
              fontWeight: 400,
              color: '#FFFFFF',
              lineHeight: 1.15,
              marginBottom: '1.25rem'
            }}
          >
            Your Space. Your Story.
          </h2>

          <p 
            style={{
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.82)',
              maxWidth: '540px',
              margin: '0 auto 2.2rem auto',
              fontWeight: 300,
              lineHeight: 1.6
            }}
          >
            Every detail is designed to elevate your everyday rituals into moments of calm and delight.
          </p>

          <button 
            onClick={() => onNavigate('projects')}
            className="btn-light-outline"
            style={{
              padding: '0.85rem 2.2rem',
              fontSize: '0.82rem',
              borderRadius: '2px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.5)',
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
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
          >
            <span>Explore Our Projects</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* 5. Persistent "SCROLL TO EXPLORE" Indicator (Active during Opening) */}
        <div 
          className="cinematic-scroll-prompt"
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            color: 'rgba(255, 255, 255, 0.72)',
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 500,
            pointerEvents: 'none'
          }}
        >
          <span>SCROLL TO EXPLORE</span>
          <div className="scroll-chevron-bounce">
            <ChevronDown size={16} color="var(--color-warm-taupe)" />
          </div>
        </div>

      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes scrollBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }
        .scroll-chevron-bounce {
          animation: scrollBounce 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
