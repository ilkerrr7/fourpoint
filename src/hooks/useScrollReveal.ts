import { useEffect, useRef, useState } from 'react';

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px 0px -60px 0px' } = options;
  const ref = useRef<T>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  
  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsRevealed(true);
      return;
    }
    
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(element); // One-way reveal
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);
  
  return { ref, isRevealed };
}
