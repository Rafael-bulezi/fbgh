import React, { useEffect, useRef, useState } from 'react';

type RevealElement = 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';

interface EditorialRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: RevealElement;
  delay?: number;
  threshold?: number;
  once?: boolean;
}

export const EditorialReveal: React.FC<EditorialRevealProps> = ({
  children,
  className = '',
  as: Component = 'div',
  delay = 0,
  threshold = 0.18,
  once = true,
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <Component
      ref={ref as React.Ref<never>}
      className={`editorial-reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Component>
  );
};
