import React from 'react';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  italicGold?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  as: Component = 'h1',
  delay = 0,
}) => {
  return (
    <Component
      className={`font-serif tracking-tight text-warm-ivory leading-[0.95] transition-all duration-700 ${className}`}
      style={{
        animation: `fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both`,
      }}
    >
      {children}
    </Component>
  );
};
