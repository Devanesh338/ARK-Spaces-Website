import { useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Custom React hook for robust, leak-free GSAP animations with automatic cleanup.
 * Scopes all selectors to scopeRef and reverts all animations & ScrollTriggers on unmount.
 */
export const useGsapContext = (
  scopeRef: React.RefObject<HTMLElement | null>,
  callback: (context: gsap.Context) => void,
  deps: any[] = []
) => {
  useIsomorphicLayoutEffect(() => {
    if (!scopeRef.current) return;

    // Respect reduced-motion preferences
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Create scoped GSAP context
    const ctx = gsap.context(callback, scopeRef);

    // Refresh and sort ScrollTrigger after DOM has settled
    const timer = setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, deps);
};
