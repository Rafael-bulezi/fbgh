import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface PinnedExperienceTransitionProps {
  onOpenBooking: () => void;
}

const SCENES = [
  {
    id: 'choose',
    number: '01',
    word: 'CHOOSE',
    line: 'Find the vehicle that fits your plans.',
    sub: 'Browse 30+ vehicles across sedans, SUVs, vans and prestige models.',
    image: 'https://images.unsplash.com/photo-1441148345475-03a2e82f9719?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 'take',
    number: '02',
    word: 'TAKE',
    line: 'Take ownership of the journey.',
    sub: 'Your vehicle. Your keys. Prepared, clean, and ready.',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 'go',
    number: '03',
    word: 'GO',
    line: 'The road is yours.',
    sub: 'No schedules. No waiting. Just you and the miles ahead.',
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=1920&auto=format&fit=crop',
  },
  {
    id: 'yours',
    number: '04',
    word: 'MAKE IT YOURS',
    line: 'Your journey. Your way.',
    sub: 'Business. Weekend. Family. Occasion. Whatever the day demands.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1920&auto=format&fit=crop',
  },
];

export const PinnedExperienceTransition: React.FC<PinnedExperienceTransitionProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState<number>(0);
  const [scrollFraction, setScrollFraction] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
      if (totalHeight <= 0) return;

      const progress = Math.min(Math.max(-rect.top / totalHeight, 0), 1);
      setScrollFraction(progress);

      const index = Math.min(Math.floor(progress * 4), 3);
      setActiveScene(index);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scene = SCENES[activeScene];

  return (
    <div ref={containerRef} className="relative w-full h-[320vh] bg-[#08080A]">
      {/* Sticky Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col">

        {/* Background images — crossfade between scenes */}
        <div className="absolute inset-0 z-0">
          {SCENES.map((s, idx) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === activeScene ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={s.image}
                alt={s.word}
                className="w-full h-full object-cover luminous-media"
              />
              {/* Deep gradient: bottom-heavy so text breathes */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/55 to-[#08080A]/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#08080A]/70 via-transparent to-transparent" />
            </div>
          ))}
          {/* Ambient gold glow */}
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-[#C5A059]/[0.06] blur-[100px] pointer-events-none" />
        </div>

        {/* ── Top bar: scene index dots ── */}
        <div className="relative z-10 flex items-center justify-between px-8 sm:px-14 pt-8">
          <span className="text-[10px] font-mono tracking-[0.35em] text-[#C5A059]/80 uppercase">
            THE RENTAL STORY
          </span>
          <div className="flex items-center gap-2">
            {SCENES.map((_, idx) => (
              <div
                key={idx}
                className={`h-[2px] transition-all duration-500 ${
                  idx === activeScene
                    ? 'w-8 bg-[#C5A059]'
                    : idx < activeScene
                    ? 'w-3 bg-[#C5A059]/50'
                    : 'w-3 bg-white/15'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Main cinematic content ── */}
        <div className="relative z-10 flex-1 flex flex-col justify-end px-8 sm:px-14 pb-20">

          {/* Scene number — large typographic anchor */}
          <div className="mb-2">
            <span
              key={`num-${scene.id}`}
              className="font-mono text-[13vw] sm:text-[10vw] lg:text-[8vw] leading-none text-white/[0.04] select-none font-light"
            >
              {scene.number}
            </span>
          </div>

          {/* Word / Title */}
          <div className="overflow-hidden mb-4">
            <h2
              key={`title-${scene.id}`}
              className="font-display font-extrabold text-5xl sm:text-7xl lg:text-[92px] text-[#F4EDE4] leading-[0.92] tracking-tight animate-fadeIn uppercase"
            >
              {scene.word}
            </h2>
          </div>

          {/* One-line scene statement */}
          <div className="overflow-hidden mb-3 max-w-xl">
            <p
              key={`line-${scene.id}`}
              className="font-sans text-xl sm:text-2xl text-[#E0B268] font-normal tracking-wide animate-fadeIn"
            >
              {scene.line}
            </p>
          </div>

          {/* Sub copy */}
          <div className="overflow-hidden max-w-md mb-10">
            <p
              key={`sub-${scene.id}`}
              className="text-sm text-white/60 font-light leading-relaxed animate-fadeIn"
            >
              {scene.sub}
            </p>
          </div>

          {/* CTA only on last scene */}
          {activeScene === 3 && (
            <div className="animate-fadeIn">
              <button
                onClick={onOpenBooking}
                className="pb-btn pb-btn-primary"
              >
                <span>EXPLORE THE FLEET</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* ── Bottom progress bar ── */}
        <div className="relative z-10 px-8 sm:px-14 pb-6">
          <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
            <div
              className="h-full bg-[#C5A059] transition-all duration-100 ease-out"
              style={{ width: `${scrollFraction * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[9px] font-mono tracking-[0.2em] text-white/25 uppercase">
              SCROLL TO CONTINUE
            </span>
            <span className="text-[9px] font-mono tracking-[0.2em] text-white/25 uppercase">
              {activeScene + 1} / {SCENES.length}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
