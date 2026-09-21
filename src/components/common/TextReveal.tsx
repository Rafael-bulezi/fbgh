import React from 'react';
import { EditorialReveal } from './EditorialReveal';

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
    <EditorialReveal
      as={Component}
      delay={delay * 1000}
      className={`font-serif tracking-tight text-warm-ivory leading-[0.95] ${className}`}
    >
      <span className="editorial-line block">{children}</span>
    </EditorialReveal>
  );
};
