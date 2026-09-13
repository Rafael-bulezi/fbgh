import React, { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, pageKey }) => {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (pageKey) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setIsTransitioning(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [pageKey, children]);

  return (
    <div className="relative w-full min-h-screen">
      {/* Gold Bridge Razor Transition Line */}
      <div
        className={`fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne-gold to-transparent z-[100] pointer-events-none transition-transform duration-500 ease-out ${
          isTransitioning ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
        }`}
        style={{ transformOrigin: 'center' }}
      />

      {/* Iris Curtain Fade */}
      <div
        className={`transition-all duration-500 ease-out ${
          isTransitioning
            ? 'opacity-0 scale-[0.99] filter brightness-75 translate-y-2'
            : 'opacity-100 scale-100 filter brightness-100 translate-y-0'
        }`}
      >
        {displayChildren}
      </div>
    </div>
  );
};
