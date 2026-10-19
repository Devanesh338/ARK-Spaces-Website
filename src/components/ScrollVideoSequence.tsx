import React, { useRef, useEffect, useLayoutEffect, useState, useCallback } from 'react';
import { PageId } from '../types';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface ScrollVideoSequenceProps {
  onNavigate: (page: PageId, projectId?: string) => void;
}

export const ScrollVideoSequence: React.FC<ScrollVideoSequenceProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') return window.innerWidth < 768;
    return false;
  });

  const [initialFrameReady, setInitialFrameReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const totalFrames = 120;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedMapRef = useRef<boolean[]>([]);
  const currentFrameRef = useRef<number>(0);

  // Helper to format frame URL
  const getFrameUrl = useCallback((index: number, mobile: boolean) => {
    const padded = String(index + 1).padStart(4, '0');
    return mobile 
      ? `/frames/mobile/frame_${padded}.webp`
      : `/frames/desktop/frame_${padded}.webp`;
  }, []);

  // Update mobile status on resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      if (mobile !== isMobile) {
        setIsMobile(mobile);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  // Canvas drawing function with cover-style crop
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    currentFrameRef.current = frameIndex;

    // Find nearest loaded frame if target frame isn't ready
    let actualIdx = frameIndex;
    if (!loadedMapRef.current[frameIndex]) {
      for (let offset = 1; offset < totalFrames; offset++) {
        if (frameIndex - offset >= 0 && loadedMapRef.current[frameIndex - offset]) {
          actualIdx = frameIndex - offset;
          break;
        }
        if (frameIndex + offset < totalFrames && loadedMapRef.current[frameIndex + offset]) {
          actualIdx = frameIndex + offset;
          break;
        }
      }
    }

    const img = imagesRef.current[actualIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const targetPxW = Math.round(w * dpr);
    const targetPxH = Math.round(h * dpr);

    if (canvas.width !== targetPxW || canvas.height !== targetPxH) {
      canvas.width = targetPxW;
      canvas.height = targetPxH;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const hRatio = w / imgW;
    const vRatio = h / imgH;
    const ratio = Math.max(hRatio, vRatio); // CSS cover simulation

    const drawW = imgW * ratio;
    const drawH = imgH * ratio;
    const shiftX = (w - drawW) / 2;
    const shiftY = (h - drawH) / 2;

    ctx.drawImage(img, 0, 0, imgW, imgH, shiftX, shiftY, drawW, drawH);
    ctx.restore();
  }, [totalFrames]);

  // Progressive frame loading pipeline
  useEffect(() => {
    imagesRef.current = new Array(totalFrames);
    loadedMapRef.current = new Array(totalFrames).fill(false);
    let isCancelled = false;
    let loadedCount = 0;

    // 1. Instantly load Frame 1 (Hero opening frame)
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0, isMobile);
    imagesRef.current[0] = firstImg;

    firstImg.onload = () => {
      if (isCancelled) return;
      loadedMapRef.current[0] = true;
      loadedCount++;
      setInitialFrameReady(true);
      renderFrame(0);
      ScrollTrigger.refresh();
    };

    // 2. Priority load first 12 frames for immediate scrub responsiveness
    const priorityLimit = Math.min(15, totalFrames);
    for (let i = 1; i < priorityLimit; i++) {
      const img = new Image();
      img.src = getFrameUrl(i, isMobile);
      imagesRef.current[i] = img;
      img.onload = () => {
        if (isCancelled) return;
        loadedMapRef.current[i] = true;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
        // If current frame happens to be waiting for this image, redraw
        if (currentFrameRef.current === i) {
          renderFrame(i);
        }
      };
    }

    // 3. Batch load remaining frames in idle / rAF intervals
    let currentIndex = priorityLimit;
    const batchSize = 6;

    const loadNextBatch = () => {
      if (isCancelled || currentIndex >= totalFrames) return;

      const endIndex = Math.min(currentIndex + batchSize, totalFrames);
      for (let i = currentIndex; i < endIndex; i++) {
        const img = new Image();
        img.src = getFrameUrl(i, isMobile);
        imagesRef.current[i] = img;
        img.onload = () => {
          if (isCancelled) return;
          loadedMapRef.current[i] = true;
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / totalFrames) * 100));
          if (currentFrameRef.current === i) {
            renderFrame(i);
          }
        };
      }
      currentIndex = endIndex;

      if (currentIndex < totalFrames) {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(loadNextBatch, { timeout: 120 });
        } else {
          setTimeout(loadNextBatch, 35);
        }
      }
    };

    // Start batch loading after small initial mount delay
    const timer = setTimeout(loadNextBatch, 80);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [getFrameUrl, isMobile, renderFrame, totalFrames]);

  // Window resize handler to redraw canvas
  useEffect(() => {
    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // GSAP ScrollTrigger timeline configuration using isomorphic layout effect for synchronous DOM pinning
  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      renderFrame(0);
      return;
    }

    const ctx = gsap.context(() => {
      const playhead = { frame: 0 };
      const scrollDistance = isMobile ? '+=220%' : '+=340%';

      // Master Timeline pinned to landing page hero container
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: scrollDistance,
          pin: true,
          scrub: isMobile ? 0.35 : 0.65,
          anticipatePin: 1,
          refreshPriority: 10, // Ensure pinned spacer is calculated before downstream triggers
          onUpdate: () => {
            const frameIdx = Math.min(
              Math.max(Math.round(playhead.frame), 0),
              totalFrames - 1
            );
            renderFrame(frameIdx);
          }
        }
      });

      // 1. Scrub playhead from frame 0 to 119
      masterTl.to(playhead, {
        frame: totalFrames - 1,
        ease: 'none',
        duration: 1
      }, 0);

      // 2. Storyboard HTML Overlays Synchronized Timeline
      // Milestone 1: Opening (0% - 25%)
      masterTl.fromTo('.sequence-story-1', 
        { opacity: 1, y: 0 },
        { opacity: 0, y: -25, ease: 'power1.in', duration: 0.22 },
        0.18
      );

      // Milestone 2: Explore the interior (32% - 62%)
      masterTl.fromTo('.sequence-story-2',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.14 },
        0.30
      );
      masterTl.to('.sequence-story-2',
        { opacity: 0, y: -25, ease: 'power1.in', duration: 0.14 },
        0.58
      );

      // Milestone 3: Complete Space & CTA (72% - 100%)
      masterTl.fromTo('.sequence-story-3',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.18 },
        0.72
      );

      // Synchronize trigger ordering across the document
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isMobile, renderFrame, totalFrames]);

  return (
    <section 
      ref={containerRef}
      className="scroll-video-sequence-section"
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
      {/* 1. Underlying Canvas Rendering Image Sequence */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          zIndex: 1,
          backgroundColor: '#171713'
        }}
      />

      {/* Poster image fallback while initial frame loads */}
      {!initialFrameReady && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: isMobile 
              ? 'url(/frames/mobile/frame_0001.webp)' 
              : 'url(/frames/desktop/frame_0001.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 2,
            filter: 'brightness(0.7)'
          }}
        />
      )}

      {/* 2. Architectural Vignette Overlays for Maximum Contrast & Atmosphere */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(23, 23, 19, 0.45) 0%, rgba(23, 23, 19, 0.18) 45%, rgba(23, 23, 19, 0.72) 100%)',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 38%, rgba(23, 23, 19, 0.5) 100%)',
          zIndex: 3,
          pointerEvents: 'none'
        }}
      />

      {/* 3. Storyboard HTML Overlays (Real DOM text, perfectly responsive) */}
      <div 
        className="container"
        style={{
          position: 'relative',
          zIndex: 5,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2rem 1.25rem'
        }}
      >

        {/* --- MILESTONE 1: Opening (0% - 25%) --- */}
        <div 
          className="sequence-story-1"
          style={{
            position: 'absolute',
            width: '92%',
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
            ARK SPACES • INTERIORS
          </span>

          <h1 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5.5vw, 4.3rem)',
              fontWeight: 400,
              color: '#FFFFFF',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.65)'
            }}
          >
            Spaces That Feel Like Home
          </h1>

          <p 
            style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)',
              color: 'rgba(255, 255, 255, 0.88)',
              maxWidth: '560px',
              margin: '0 auto',
              fontWeight: 300,
              lineHeight: 1.6,
              textShadow: '0 1px 12px rgba(0, 0, 0, 0.7)'
            }}
          >
            Thoughtfully designed interiors. Crafted around the way you live.
          </p>

          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '2.5rem',
              color: 'var(--color-warm-taupe)',
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 500
            }}
          >
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={14} className="chevron-pulse" />
          </div>
        </div>

        {/* --- MILESTONE 2: Middle (32% - 62%) --- */}
        <div 
          className="sequence-story-2"
          style={{
            position: 'absolute',
            width: '92%',
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
              marginBottom: '1rem',
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.65)'
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
              lineHeight: 1.5,
              textShadow: '0 1px 12px rgba(0, 0, 0, 0.7)'
            }}
          >
            &ldquo;Thoughtful Materials. Timeless Details.&rdquo;
          </p>
        </div>

        {/* --- MILESTONE 3: Final Frame (72% - 100%) --- */}
        <div 
          className="sequence-story-3"
          style={{
            position: 'absolute',
            width: '92%',
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
              marginBottom: '1rem',
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.65)'
            }}
          >
            Your Space. Your Story.
          </h2>

          <p 
            style={{
              fontSize: 'clamp(0.92rem, 1.6vw, 1.1rem)',
              color: 'rgba(255, 255, 255, 0.88)',
              maxWidth: '520px',
              margin: '0 auto 2.25rem auto',
              lineHeight: 1.6,
              fontWeight: 300,
              textShadow: '0 1px 12px rgba(0, 0, 0, 0.7)'
            }}
          >
            Every detail is designed to elevate your everyday rituals into moments of calm and delight.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => onNavigate('projects')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: '#FFFFFF',
                color: '#171713',
                padding: '0.9rem 2.2rem',
                fontSize: '0.84rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                borderRadius: '30px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-warm-taupe)';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFFFFF';
                e.currentTarget.style.color = '#171713';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Explore Our Projects</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

      </div>

      {/* Subtle frame preload counter bar at bottom right (discreet indicator) */}
      {loadProgress < 100 && (
        <div
          style={{
            position: 'absolute',
            bottom: '1.25rem',
            right: '1.5rem',
            zIndex: 6,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            backgroundColor: 'rgba(23, 23, 19, 0.65)',
            backdropFilter: 'blur(8px)',
            padding: '0.35rem 0.75rem',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            pointerEvents: 'none'
          }}
        >
          <div 
            style={{
              width: '36px',
              height: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}
          >
            <div 
              style={{
                width: `${loadProgress}%`,
                height: '100%',
                backgroundColor: 'var(--color-warm-taupe)',
                transition: 'width 0.2s ease'
              }}
            />
          </div>
          <span style={{ fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.65)', letterSpacing: '0.05em' }}>
            {loadProgress}%
          </span>
        </div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes subtlePulse {
          0%, 100% { transform: translateY(0); opacity: 0.8; }
          50% { transform: translateY(4px); opacity: 1; }
        }
        .chevron-pulse {
          animation: subtlePulse 1.8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
