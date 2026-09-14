import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
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
  eyebrow: string;
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
}

export const CurvedHero: React.FC<CurvedHeroProps> = ({
  eyebrow,
  titleLine1,
  titleLine2,
  description,
  image,
  imageAlt = 'Faith Based Global Holdings',
  imagePosition = 'object-center',
  curveVariant = 'gentle-wave',
  theme = 'light',
  primaryCta,
  secondaryCta,
  statChips,
  minHeight = 'min-h-[85vh] sm:min-h-[90vh] lg:min-h-screen lg:h-screen',
  enableParallax = true,
}) => {
  const [showInfo, setShowInfo] = useState(false);
  const [imgRef, parallaxY] = useSubtleParallax<HTMLImageElement>({
    speed: 0.05,
    maxOffset: 28,
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

  return (
    <section
      className={`relative w-full ${minHeight} flex items-start lg:items-center overflow-hidden select-none`}
      style={{ backgroundColor: bgColor }}
    >
      {/* 1. Photography layer with subtle parallax: 60vw on desktop, right-anchored */}
      <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[60vw] h-full overflow-hidden z-0">
        <img
          ref={imgRef}
          src={image}
          alt={imageAlt}
          className={`w-full h-full object-cover ${imagePosition} will-change-transform scale-105 opacity-95`}
          style={{
            transform: `translate3d(0, ${parallaxY}px, 0) scale(1.04)`,
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

      {/* 5. Editorial Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-20 sm:pt-32 lg:pt-24 pb-8 sm:pb-24 lg:py-24 flex items-center">
        <div className="max-w-md sm:max-w-lg lg:max-w-xl space-y-3 sm:space-y-5">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span className="text-[10px] sm:text-[10.5px] font-mono tracking-[0.35em] text-[#C5A059] uppercase font-bold">
              {eyebrow}
            </span>
          </div>

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

          {/* Description with Mobile Collapsible Toggle */}
          <p
            className={`text-xs sm:text-sm md:text-base leading-relaxed font-normal transition-all max-w-lg ${
              isLight ? 'text-[#4A4A4F]' : 'text-warm-ivory/80'
            } ${showInfo ? '' : 'line-clamp-2 sm:line-clamp-none'}`}
          >
            {description}
          </p>
          <button
            className="sm:hidden font-mono text-[9px] tracking-widest text-[#C5A059] uppercase block mt-1 cursor-pointer"
            onClick={() => setShowInfo(!showInfo)}
          >
            {showInfo ? '− LESS' : '+ MORE'}
          </button>

          {/* Stat Chips (if provided) */}
          {statChips && statChips.length > 0 && (
            <div className="hidden sm:flex flex-wrap items-center gap-3 sm:gap-5 pt-1 sm:pt-2 font-mono text-[9.5px] sm:text-[10px] tracking-[0.2em] text-[#66666E] uppercase font-semibold">
              {statChips.map((chip, i) => (
                <React.Fragment key={chip.label}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
                    <span>{chip.label}</span>
                  </div>
                  {i < statChips.length - 1 && <span className="text-[#B0B0B5]">·</span>}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Action CTAs — hidden on mobile to maximize visible photography */}
          {(primaryCta || secondaryCta) && (
            <div className="hidden sm:flex flex-row items-center gap-2.5 sm:gap-4 pt-2">
              {primaryCta && (
                <button
                  onClick={primaryCta.onClick}
                  className="pb-btn pb-btn-primary !px-3 sm:!px-7 !py-2.5 sm:!py-3.5 !text-[9.5px] sm:!text-xs whitespace-nowrap cursor-pointer shadow-md hover:shadow-lg flex items-center gap-1.5"
                >
                  <span>{primaryCta.label}</span>
                  {primaryCta.icon ?? <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              )}

              {secondaryCta && (
                <button
                  onClick={secondaryCta.onClick}
                  className={`pb-btn pb-btn-outline !px-3 sm:!px-7 !py-2.5 sm:!py-3.5 !text-[9.5px] sm:!text-xs whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 ${
                    isLight
                      ? '!text-[#141416] !border-[#C5A059] hover:!bg-[#C5A059] hover:!text-obsidian bg-white/70'
                      : '!text-warm-ivory !border-[#C5A059] hover:!bg-[#C5A059] hover:!text-obsidian'
                  }`}
                >
                  <span>{secondaryCta.label}</span>
                  {secondaryCta.icon ?? <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
