import React from 'react';
import { useSubtleParallax } from '../../hooks/useSubtleParallax';

export interface HeroCta {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'outline';
  icon?: React.ReactNode;
}

export interface HeroStatChip {
  label: string;
}

export interface CurvedHeroProps {
  eyebrow?: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  image: string;
  imageAlt?: string;
  imagePosition?: string;
  curveVariant?: 'gentle-wave' | 'sharp-diagonal' | 'circular-arc' | 's-curve' | 'swoop' | 'asymmetric';
  theme?: 'light' | 'dark';
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  statChips?: HeroStatChip[];
  minHeight?: string;
  enableParallax?: boolean;
  slogan?: string;
}

export const CurvedHero: React.FC<CurvedHeroProps> = ({
  titleLine1,
  titleLine2,
  description,
  slogan,
  image,
  imageAlt = 'Faith Based Global Holdings',
  imagePosition = 'object-center',
  curveVariant = 'gentle-wave',
  theme = 'light',
  minHeight = 'min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen lg:h-screen',
  enableParallax = true,
}) => {
  const firstSentence = description.split(/(?<=[.?!])\s+/)[0] || description;
  const [imgRef, parallaxY, textParallaxY] = useSubtleParallax<HTMLImageElement>({
    speed: 0.12,
    maxOffset: 70,
    disabled: !enableParallax,
  });

  const isLight = theme === 'light';
  const bgColor = isLight ? '#FAF8F5' : '#0C0C0E';

  // Desktop SVG curve paths (1440x800 coordinate box)
  const getDesktopCurvePath = () => {
    switch (curveVariant) {
      case 'sharp-diagonal':
        return 'M0,0 L660,0 L885,800 L0,800 Z';
      case 'circular-arc':
        return 'M0,0 L620,0 Q860,400 680,800 L0,800 Z';
      case 's-curve':
        return 'M0,0 L680,0 C820,180 840,420 720,620 C660,720 700,780 750,800 L0,800 Z';
      case 'swoop':
        return 'M0,0 L760,0 C710,240 850,560 690,800 L0,800 Z';
      case 'gentle-wave':
      default:
        return 'M0,0 L660,0 C740,160 820,330 765,510 C715,670 735,750 785,800 L0,800 Z';
    }
  };

  // Mobile SVG curve paths (430x760 coordinate box) - raised to reveal >60% of vehicle photography
  const getMobileCurvePath = () => {
    switch (curveVariant) {
      case 'sharp-diagonal':
        return 'M0,0 L430,0 L430,260 L0,340 Z';
      case 'circular-arc':
        return 'M0,0 L430,0 L430,270 Q215,340 0,280 Z';
      case 'gentle-wave':
      default:
        return 'M0,0 L430,0 L430,280 C320,335 180,260 0,305 Z';
    }
  };

  const getDesktopPositionClass = (pos: string) => {
    if (pos.includes('top')) return 'sm:object-top';
    if (pos.includes('bottom')) return 'sm:object-bottom';
    if (pos.includes('right')) return 'sm:object-right';
    if (pos.includes('left')) return 'sm:object-left';
    return 'sm:object-center';
  };

  return (
    <section
      className={`relative w-full ${minHeight} flex items-start lg:items-center overflow-hidden select-none`}
      style={{ backgroundColor: bgColor }}
    >
      {/* 1. Photography layer with subtle parallax: 60vw on desktop, right-anchored. Positioned towards top on mobile for faces */}
      <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[60vw] h-full overflow-hidden z-0">
        <img
          ref={imgRef}
          src={image}
          alt={imageAlt}
          className={`w-full h-full object-cover object-[center_10%] ${getDesktopPositionClass(imagePosition)} will-change-transform scale-105 opacity-95`}
          style={{
            transform: `translate3d(0, ${parallaxY}px, 0) scale(1.08)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
        {/* Subtle dark ambient lighting scrim only for dark theme (no white haze) */}
        {!isLight && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, rgba(12,12,14,0.5) 0%, transparent 60%)',
            }}
          />
        )}
      </div>

      {/* 2. Desktop Organic Curved / Diagonal Panel */}
      <div className="hidden lg:block absolute inset-0 z-[1] pointer-events-none">
        <svg
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          className="w-full h-full block filter drop-shadow-[15px_0_35px_rgba(0,0,0,0.08)]"
        >
          <path d={getDesktopCurvePath()} fill={bgColor} />
        </svg>
      </div>

      {/* 3. Mobile / Tablet Responsive Curve Panel */}
      <div className="lg:hidden absolute inset-0 z-[1] pointer-events-none">
        <svg
          viewBox="0 0 430 760"
          preserveAspectRatio="none"
          className="w-full h-full block filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
        >
          <path d={getMobileCurvePath()} fill={bgColor} />
        </svg>
      </div>

      {/* 5. Editorial Content Layer with Differential Text Parallax */}
      <div 
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-20 sm:pt-32 lg:pt-24 pb-8 sm:pb-24 lg:py-24 flex items-center will-change-transform"
        style={{
          transform: `translate3d(0, ${textParallaxY}px, 0)`,
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div className="max-w-md sm:max-w-lg lg:max-w-xl space-y-3 sm:space-y-5">
          {/* Headline */}
          <h1
            className={`font-display font-black text-3xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[84px] tracking-tight leading-[0.94] sm:leading-[0.92] ${
              isLight ? 'text-[#141416]' : 'text-[#F4EDE4]'
            }`}
          >
            {titleLine1}
            <br />
            <span className="text-[#C5A059]">{titleLine2}</span>
          </h1>

          {/* Description — on desktop sits cleanly under headline */}
          <p
            className={`hidden sm:block text-sm md:text-base leading-relaxed font-normal max-w-lg ${
              isLight ? 'text-[#4A4A4F]' : 'text-warm-ivory/80'
            }`}
          >
            {description}
          </p>

          {slogan && (
            <p className="hidden sm:block font-mono text-[10px] tracking-[0.35em] text-[#C5A059] uppercase font-medium pt-1">
              {slogan}
            </p>
          )}

        </div>
      </div>

      {/* Mobile paragraph positioned on the lower side of the hero so faces & photography remain 100% unobstructed */}
      <div className="sm:hidden absolute bottom-4 inset-x-4 z-20 flex justify-center pointer-events-none">
        <div className="bg-[#0c0d0e]/85 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.6)] max-w-xs text-center">
          <p className="text-[11px] leading-snug font-normal text-[#F4EDE4]/90">
            {firstSentence}
          </p>
        </div>
      </div>
    </section>
  );
};
