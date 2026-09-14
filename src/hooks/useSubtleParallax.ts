import { useEffect, useRef, useState, type RefObject } from 'react';

interface SubtleParallaxOptions {
  speed?: number;       // Multiplier: e.g. 0.08 (moves down with scroll), -0.06 (moves up)
  maxOffset?: number;   // Maximum clamp in pixels (e.g. 35)
  disabled?: boolean;
}

export function useSubtleParallax<T extends HTMLElement>(
  options: SubtleParallaxOptions = {}
): [RefObject<T | null>, number] {
  const { speed = 0.06, maxOffset = 36, disabled = false } = options;
  const elementRef = useRef<T | null>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId: number;
    let targetOffset = 0;
    let currentOffset = 0;
    const ease = 0.1;

    const handleScroll = () => {
      const el = elementRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only calculate if element is anywhere near viewport
      if (rect.bottom >= -100 && rect.top <= windowHeight + 100) {
        // Center offset relative to viewport middle
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const delta = elementCenter - viewportCenter;
        
        const raw = delta * speed;
        targetOffset = Math.max(-maxOffset, Math.min(maxOffset, raw));
      }
    };

    const render = () => {
      currentOffset += (targetOffset - currentOffset) * ease;
      if (Math.abs(targetOffset - currentOffset) > 0.1) {
        setOffsetY(Number(currentOffset.toFixed(2)));
      }
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    render();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed, maxOffset, disabled]);

  return [elementRef, offsetY];
}
