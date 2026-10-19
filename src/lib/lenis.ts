import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

/**
 * Initializes smooth scrolling using Lenis, coordinated with GSAP and ScrollTrigger.
 */
export const initLenis = (): Lenis | null => {
  if (typeof window === 'undefined') return null;

  // Respect reduced-motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  // Initialize Lenis with subtle, premium inertia
  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.2,
  });

  // Synchronize ScrollTrigger with Lenis scroll events
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Single coordinated animation loop through GSAP ticker (prevents duplicate rAF loops)
  tickerCallback = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  if (typeof window !== 'undefined') {
    (window as any).__ScrollTrigger = ScrollTrigger;
    (window as any).__lenis = lenisInstance;
    (window as any).__gsap = gsap;
  }

  return lenisInstance;
};

/**
 * Retrieves the active Lenis instance.
 */
export const getLenis = (): Lenis | null => lenisInstance;

/**
 * Smoothly scrolls to the top of the document.
 */
export const scrollToTop = (immediate: boolean = false) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
  }
};

/**
 * Smoothly scrolls to a target selector or element.
 */
export const scrollToTarget = (target: string | HTMLElement, offset: number = -80) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.2 });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

/**
 * Safely destroys Lenis instance and cleans up event listeners.
 */
export const destroyLenis = () => {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
};
