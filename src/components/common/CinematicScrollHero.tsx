import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface CinematicScrollHeroProps {
  onOpenBooking: () => void;
  onExploreFleet: () => void;
}

export const CinematicScrollHero: React.FC<CinematicScrollHeroProps> = ({
  onOpenBooking,
  onExploreFleet,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [showInfoA, setShowInfoA] = useState(false);
  const [showInfoB, setShowInfoB] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let targetProgress = 0;
    let currentProgress = 0;
    const ease = 0.08;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      
      const currentScroll = -rect.top;
      const p = Math.min(Math.max(currentScroll / totalHeight, 0), 1);
      targetProgress = p;
    };

    const render = () => {
      currentProgress += (targetProgress - currentProgress) * ease;
      setProgress(currentProgress);
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    render();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Helper map function
  const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
  const map = (val: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    if (inMax === inMin) return outMin;
    const t = clamp((val - inMin) / (inMax - inMin), 0, 1);
    return outMin + (outMax - outMin) * t;
  };

  const p = progress;

  // Scene A transforms (Maintains bright, crisp image clarity)
  const scaleA = map(p, 0, 0.8, 1, 1.08);
  const brightA = map(p, 0.3, 0.75, 1.05, 0.9);
  const opacityA = map(p, 0.45, 0.85, 1, 0);
  const yA = map(p, 0.1, 0.5, 0, -50);

  // Scene B transforms (Vibrant cabin interior)
  const scaleB = map(p, 0.2, 0.9, 1.12, 1);
  const brightB = map(p, 0.2, 0.7, 0.88, 1.05);
  const opacityB = map(p, 0.25, 0.65, 0, 1);
  const yB = map(p, 0.4, 0.85, 60, 0);

  // Gold bridge line
  const bridgeScale = p < 0.5 ? map(p, 0.3, 0.5, 0, 1) : map(p, 0.5, 0.7, 1, 0);
  const bridgeOrigin = p < 0.5 ? 'left' : 'right';
  const bridgeOp = p > 0.25 && p < 0.75 ? 1 : 0;

  return (
    <div ref={containerRef} className="relative w-full h-[280vh] bg-obsidian">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-obsidian">
        
        {/* Architectural Background Slogan Layer — barely visible texture */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10 transition-opacity duration-700"
          style={{ opacity: p < 0.05 ? 0 : map(p, 0.05, 0.4, 0.06, 0.01) }}
        >
          <span className="font-display font-extrabold text-[13vw] uppercase tracking-[0.15em] text-center text-warm-ivory leading-none mix-blend-overlay">
            ARRIVE WITH<br />INTENTION
          </span>
        </div>

        {/* SCENE A: Visual layer only – bright, crisp, high-fidelity */}
        <div 
          className="absolute inset-0 will-change-transform z-20 pointer-events-none"
          style={{ opacity: opacityA }}
        >
          <div 
            className="w-full h-full relative luminous-media"
            style={{ 
              transform: `scale(${scaleA})`,
              filter: `brightness(${brightA})`
            }}
          >
            <img
              src="https://res.cloudinary.com/dv9jpkgrs/image/upload/v1788409702/ChatGPT_Image_Sep_3_2026_05_22_22_AM_cft0se.png"
              alt="PB Luxury Chauffeur Vehicle on Wet Pavement"
              className="w-full h-full object-cover object-center"
            />
            {/* Single clean gradient — left-bottom text legibility only */}
            <div className="absolute inset-0 bg-gradient-to-tr from-obsidian/70 via-obsidian/20 to-transparent" />
          </div>
        </div>

        {/* SCENE A: Text + Buttons interactive overlay with contrast protection */}
        <div 
          className="absolute inset-0 flex flex-col justify-end p-5 sm:p-14 lg:p-20 z-30 max-w-4xl pointer-events-none pb-12 sm:pb-20"
          style={{ 
            transform: `translateY(${yA}px)`,
            opacity: map(p, 0.15, 0.45, 1, 0),
            display: p > 0.55 ? 'none' : 'flex'
          }}
        >
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2.5 sm:gap-3 text-champagne-gold text-[9.5px] sm:text-[10px] tracking-[0.3em] uppercase font-medium mb-2.5 sm:mb-3 text-contrast-eyebrow">
              <span className="w-6 sm:w-8 h-[1px] bg-champagne-gold" />
              <span>PRIVATE TRANSPORTATION • ELEVATED</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-[76px] text-[#F4EDE4] leading-[0.98] tracking-tight mb-3 sm:mb-4 text-contrast-title">
              ARRIVE WITH<br />
              <span className="text-[#E0B268]">INTENTION.</span>
            </h1>

            <div className="mb-3 sm:mb-8">
              <p className={`text-xs sm:text-sm text-warm-ivory max-w-lg leading-relaxed font-normal text-contrast-body ${showInfoA ? '' : 'line-clamp-2 sm:line-clamp-none'}`}>
                A bespoke private transportation fleet crafted for discerning executives, international travelers, and defining arrivals.
              </p>
              <button
                type="button"
                onClick={() => setShowInfoA(!showInfoA)}
                className="sm:hidden font-mono text-[9px] tracking-widest text-[#E0B268] uppercase mt-1 pointer-events-auto cursor-pointer"
              >
                {showInfoA ? '− LESS' : '+ MORE'}
              </button>
            </div>

            <div className="flex flex-row items-center gap-2 sm:gap-4 pointer-events-auto">
              <button
                type="button"
                onClick={onOpenBooking}
                className="pb-btn pb-btn-primary !px-2.5 sm:!px-7 !py-2 sm:!py-3.5 !text-[9px] sm:!text-xs whitespace-nowrap"
              >
                <span>REQUEST A RIDE</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>

              <button
                type="button"
                onClick={onExploreFleet}
                className="pb-btn pb-btn-outline !px-2.5 sm:!px-7 !py-2 sm:!py-3.5 !text-[9px] sm:!text-xs whitespace-nowrap"
              >
                <span>EXPLORE FLEET</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* SCENE B: Visual layer only – bright interior sanctuary */}
        <div 
          className="absolute inset-0 will-change-transform z-20 pointer-events-none"
          style={{ opacity: opacityB }}
        >
          <div 
            className="w-full h-full relative luminous-media"
            style={{ 
              transform: `scale(${scaleB})`,
              filter: `brightness(${brightB})`
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1920&auto=format&fit=crop"
              alt="PB Luxury Chauffeur Interior Lounge"
              className="w-full h-full object-cover object-center"
            />
            {/* Luminous Bottom Contrast Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-l from-obsidian/75 via-obsidian/25 to-transparent" />
          </div>
        </div>

        {/* SCENE B: Text + Button interactive overlay with contrast protection */}
        <div 
          className="absolute inset-0 flex flex-col justify-end items-end text-right p-5 sm:p-14 lg:p-20 z-30 pointer-events-none pb-12 sm:pb-20"
          style={{ 
            transform: `translateY(${yB}px)`,
            opacity: map(p, 0.45, 0.85, 0, 1),
            display: p < 0.4 ? 'none' : 'flex'
          }}
        >
          <div className="relative z-10 max-w-2xl text-right flex flex-col items-end">
            <div className="flex items-center flex-row-reverse gap-2.5 sm:gap-3 text-champagne-gold text-[9.5px] sm:text-[10px] tracking-[0.3em] uppercase font-medium mb-2.5 sm:mb-3 text-contrast-eyebrow">
              <span className="w-6 sm:w-8 h-[1px] bg-champagne-gold" />
              <span>CHAPTER 02 • THE STANDARD</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-[76px] text-[#F4EDE4] leading-[0.98] tracking-tight mb-3 sm:mb-4 text-contrast-title">
              OBSESSIVE<br />
              <span className="text-[#E0B268]">PRECISION.</span>
            </h1>

            <div className="mb-3 sm:mb-8 text-right">
              <p className={`text-xs sm:text-sm text-warm-ivory max-w-lg leading-relaxed font-normal text-contrast-body ${showInfoB ? '' : 'line-clamp-2 sm:line-clamp-none'}`}>
                Where quiet luxury meets relentless reliability. Every stitch, every route, and every moment is calibrated to perfection.
              </p>
              <button
                type="button"
                onClick={() => setShowInfoB(!showInfoB)}
                className="sm:hidden font-mono text-[9px] tracking-widest text-[#E0B268] uppercase mt-1 pointer-events-auto cursor-pointer"
              >
                {showInfoB ? '− LESS' : '+ MORE'}
              </button>
            </div>

            <div className="pointer-events-auto flex justify-end">
              <button
                type="button"
                onClick={onOpenBooking}
                className="pb-btn pb-btn-primary !px-3 sm:!px-7 !py-2 sm:!py-3.5 !text-[9px] sm:!text-xs whitespace-nowrap"
              >
                <span>RESERVE WITH INTENTION</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* The Signature Gold Bridge Line */}
        <div 
          className="absolute top-1/2 left-0 w-full h-[1px] bg-champagne-gold z-50 pointer-events-none shadow-[0_0_20px_rgba(201,164,92,0.5)] transition-opacity duration-300"
          style={{
            transform: `scaleX(${bridgeScale})`,
            transformOrigin: bridgeOrigin,
            opacity: bridgeOp
          }}
        />

        {/* Bottom Interactive UI: Progress Track & Scroll Prompt */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 pointer-events-none">
          <div className="w-32 h-[2px] bg-white/20 overflow-hidden">
            <div 
              className="h-full bg-champagne-gold transition-all duration-75 ease-out"
              style={{ width: `${p * 100}%` }}
            />
          </div>
          <span className="text-[9px] font-mono tracking-[0.25em] text-champagne-gold uppercase">
            {p < 0.5 ? '01 / ARRIVAL' : '02 / THE STANDARD'}
          </span>
        </div>

        <div 
          className="absolute bottom-6 right-8 sm:right-14 z-40 hidden sm:flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-warm-ivory/60 transition-opacity duration-500 pointer-events-none"
          style={{ opacity: map(p, 0, 0.15, 1, 0) }}
        >
          <span>SCROLL TO EXPLORE</span>
          <ChevronDown className="w-4 h-4 text-champagne-gold animate-bounce" />
        </div>

      </div>
    </div>
  );
};
