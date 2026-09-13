import React, { useRef, useEffect, useState } from 'react';

interface HomeExperienceSectionProps {
  onNavigate?: (page: string) => void;
}

export const HomeExperienceSection: React.FC<HomeExperienceSectionProps> = ({ onNavigate }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSeq, setActiveSeq] = useState<number>(0);
  const [isUserHovering, setIsUserHovering] = useState<boolean>(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sequential automatic loop: 0 -> 1 -> 2 -> 3 -> 0 every 2.4s
  useEffect(() => {
    if (isUserHovering) return;
    const interval = setInterval(() => {
      setActiveSeq((prev) => (prev + 1) % 4);
    }, 2400);

    return () => clearInterval(interval);
  }, [isUserHovering]);

  const handleHowItWorksClick = () => {
    const hiwEl = document.getElementById('how-it-works');
    if (hiwEl) {
      hiwEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      onNavigate?.('experience');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home-experience-section"
      className="home-experience-section w-full h-screen min-h-[640px] max-h-[1080px] bg-[#ECE5D8] text-[#111111] py-5 sm:py-7 lg:py-8 px-6 sm:px-12 lg:px-20 relative overflow-hidden select-none border-y border-[#D8CFBF] flex flex-col justify-between"
    >
      {/* ── 1. BACKGROUND MONUMENTAL WATERMARK ("STANDARD") ───────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <span className="font-serif font-light text-[17vw] tracking-[0.14em] text-[#3B3428]/[0.035] uppercase whitespace-nowrap leading-none">
          STANDARD
        </span>
      </div>

      {/* ── 2. BOTTOM-RIGHT SOPHISTICATED VEHICLE SPECULAR ACCENT ──────── */}
      {/* Exact soft metallic curvature highlight gradient from reference design */}
      <div 
        className="absolute -bottom-10 -right-10 w-[420px] sm:w-[540px] lg:w-[680px] h-[240px] sm:h-[300px] lg:h-[380px] pointer-events-none select-none z-0"
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 90% 90%, rgba(255,255,255,0.7) 0%, rgba(240,234,224,0.45) 30%, rgba(216,204,188,0.2) 55%, transparent 80%)'
        }}
      >
        {/* Soft specular swept horizon light */}
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.85) 68%, rgba(201,164,92,0.15) 78%, transparent 92%)',
            filter: 'blur(12px)'
          }}
        />
      </div>

      {/* ── 3. TOP HEADER BAR: THE FBGH STANDARD & 01 / 04 ───────────── */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex items-center justify-between pb-3 sm:pb-5 border-b border-[#D4CABB]/60 shrink-0">
        <div className="flex items-center gap-3">
          <span className="w-[1.5px] h-4 bg-[#111111]" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#111111] font-medium">
            THE FBGH STANDARD
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-[#7A7366] tracking-widest">
          <span>01 / 04</span>
          <span className="w-5 h-px bg-[#7A7366]" />
        </div>
      </div>

      {/* ── 4. ARCHITECTURAL RETICLE & 4-QUADRANT COMPOSITION ───────────── */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex-grow flex items-center justify-center my-auto min-h-[460px]">
        
        {/* CENTERPIECE: PERFECTLY CENTERED RETICLE CIRCLE + CROSSHAIRS */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px] rounded-full border border-[#C5A059]/25 relative flex items-center justify-center">
            {/* Vertical Crosshair Line */}
            <div className="absolute -top-12 -bottom-12 w-px bg-gradient-to-b from-transparent via-[#C5A059]/30 to-transparent" />
            {/* Horizontal Crosshair Line */}
            <div className="absolute -left-12 -right-12 h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent" />
          </div>
        </div>

        {/* CENTERPIECE: PERFECTLY CENTERED HEADLINE LOCKUP */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-center select-none">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.75rem] tracking-[0.02em] text-[#111111] font-normal leading-[0.95]">
            EVERYTHING<br />
            <span className="text-[#B89658] font-normal">CONSIDERED.</span>
          </h2>

          {/* Sub-reticle motto right below the circle boundary */}
          <p className="font-mono text-[8.5px] sm:text-[9.5px] lg:text-[10px] tracking-[0.32em] text-[#967C52] uppercase font-medium mt-6 sm:mt-8">
            SO THE JOURNEY FEELS EFFORTLESS.
          </p>
        </div>

        {/* 4 QUADRANT FEATURE BLOCKS — POSITIONED IN THE 4 CORNERS OF THE GRID */}
        <div
          onMouseEnter={() => setIsUserHovering(true)}
          onMouseLeave={() => setIsUserHovering(false)}
          className="w-full h-full flex flex-col justify-between py-2 sm:py-4 relative z-20 pointer-events-auto"
        >
          {/* TOP ROW: QUADRANTS 1 & 2 */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            
            {/* ── QUADRANT 1: TOP-LEFT (PUNCTUALITY) ── */}
            <div
              tabIndex={0}
              onClick={handleHowItWorksClick}
              className={`exp-card group flex items-start gap-4 sm:gap-5 cursor-pointer focus:outline-none max-w-sm ${
                activeSeq === 0 ? 'is-active' : ''
              }`}
            >
              <div className="icon-container w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-[#C5A059]/40 bg-[#F7F3EC]/70 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-[#C5A059] group-hover:shadow-[0_8px_20px_rgba(197,160,89,0.18)]">
                <svg className="icon-svg w-6 h-6 sm:w-7 sm:h-7 stroke-[#111111] fill-none" viewBox="0 0 48 48">
                  <circle className="orbit-ring stroke-[#C5A059]" cx="24" cy="24" r="20" strokeLinecap="round" />
                  <circle cx="24" cy="24" r="15" stroke="currentColor" />
                  <circle cx="24" cy="24" r="1.5" fill="currentColor" stroke="none" />
                  <line x1="24" y1="24" x2="24" y2="15" stroke="currentColor" strokeLinecap="round" />
                  <line className="clock-hand stroke-[#C5A059]" x1="24" y1="24" x2="31" y2="24" strokeLinecap="round" />
                  <line x1="24" y1="5" x2="24" y2="7" stroke="currentColor" strokeLinecap="round" />
                  <line x1="43" y1="24" x2="41" y2="24" stroke="currentColor" strokeLinecap="round" />
                  <line x1="24" y1="43" x2="24" y2="41" stroke="currentColor" strokeLinecap="round" />
                  <line x1="5" y1="24" x2="7" y2="24" stroke="currentColor" strokeLinecap="round" />
                </svg>
              </div>

              <div className="space-y-1 flex-grow">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#967C52] uppercase font-medium">
                    PUNCTUALITY
                  </span>
                  <span className="h-px flex-grow bg-[#D8CFC2]/70 max-w-[80px]" />
                </div>

                <h3 className="font-serif text-lg sm:text-2xl text-[#111111] font-normal tracking-wide group-hover:text-[#B89658] transition-colors">
                  Guaranteed Arrival
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#5C5549] leading-relaxed font-light">
                  Your vehicle is ready before you are.
                </p>

                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-[#967C52] uppercase group-hover:text-[#111111] transition-colors">
                    <span>HOW IT WORKS</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1 text-[#B89658]">→</span>
                  </span>
                </div>
              </div>
            </div>

            {/* ── QUADRANT 2: TOP-RIGHT (COMFORT) ── */}
            <div
              tabIndex={0}
              onClick={handleHowItWorksClick}
              className={`exp-card group flex items-start gap-4 sm:gap-5 cursor-pointer focus:outline-none max-w-sm ${
                activeSeq === 1 ? 'is-active' : ''
              }`}
            >
              <div className="icon-container w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-[#C5A059]/40 bg-[#F7F3EC]/70 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-[#C5A059] group-hover:shadow-[0_8px_20px_rgba(197,160,89,0.18)]">
                <svg className="icon-svg w-6 h-6 sm:w-7 sm:h-7 stroke-[#111111] fill-none" viewBox="0 0 48 48">
                  <path
                    className="sparkle-center stroke-[#C5A059]"
                    d="M24 8 C24 16, 16 24, 8 24 C16 24, 24 32, 24 40 C24 32, 32 24, 40 24 C32 24, 24 16, 24 8 Z"
                    strokeLinejoin="round"
                  />
                  <path
                    className="sparkle-star sparkle-star-1 stroke-[#E8C280]"
                    d="M36 8 C36 11, 33 14, 30 14 C33 14, 36 17, 36 20 C36 17, 39 14, 42 14 C39 14, 36 11, 36 8 Z"
                    strokeLinejoin="round"
                  />
                  <path
                    className="sparkle-star sparkle-star-2 stroke-[#C5A059]"
                    d="M12 30 C12 32, 10 34, 8 34 C10 34, 12 36, 12 38 C12 36, 14 34, 16 34 C14 34, 12 32, 12 30 Z"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="space-y-1 flex-grow">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#967C52] uppercase font-medium">
                    COMFORT
                  </span>
                  <span className="h-px flex-grow bg-[#D8CFC2]/70 max-w-[80px]" />
                </div>

                <h3 className="font-serif text-lg sm:text-2xl text-[#111111] font-normal tracking-wide group-hover:text-[#B89658] transition-colors">
                  Tailored Comfort
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#5C5549] leading-relaxed font-light">
                  A quieter, more comfortable way to travel.
                </p>

                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-[#967C52] uppercase group-hover:text-[#111111] transition-colors">
                    <span>HOW IT WORKS</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1 text-[#B89658]">→</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM ROW: QUADRANTS 3 & 4 */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 pt-6">
            
            {/* ── QUADRANT 3: BOTTOM-LEFT (PRECISION) ── */}
            <div
              tabIndex={0}
              onClick={handleHowItWorksClick}
              className={`exp-card group flex items-start gap-4 sm:gap-5 cursor-pointer focus:outline-none max-w-sm ${
                activeSeq === 2 ? 'is-active' : ''
              }`}
            >
              <div className="icon-container w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-[#C5A059]/40 bg-[#F7F3EC]/70 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-[#C5A059] group-hover:shadow-[0_8px_20px_rgba(197,160,89,0.18)]">
                <svg className="icon-svg w-6 h-6 sm:w-7 sm:h-7 stroke-[#111111] fill-none" viewBox="0 0 48 48">
                  <circle className="radar-ring stroke-[#C5A059]" cx="24" cy="24" r="18" strokeLinecap="round" />
                  <path
                    d="M24 6 L38 12 V22 C38 32 28 39 24 42 C20 39 10 32 10 22 V12 L24 6 Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    className="shield-check stroke-[#C5A059]"
                    d="M17 24 L22 29 L31 18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="space-y-1 flex-grow">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#967C52] uppercase font-medium">
                    PRECISION
                  </span>
                  <span className="h-px flex-grow bg-[#D8CFC2]/70 max-w-[80px]" />
                </div>

                <h3 className="font-serif text-lg sm:text-2xl text-[#111111] font-normal tracking-wide group-hover:text-[#B89658] transition-colors">
                  Absolute Precision
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#5C5549] leading-relaxed font-light">
                  Every journey planned around the details.
                </p>

                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-[#967C52] uppercase group-hover:text-[#111111] transition-colors">
                    <span>HOW IT WORKS</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1 text-[#B89658]">→</span>
                  </span>
                </div>
              </div>
            </div>

            {/* ── QUADRANT 4: BOTTOM-RIGHT (DISCRETION) ── */}
            <div
              tabIndex={0}
              onClick={handleHowItWorksClick}
              className={`exp-card group flex items-start gap-4 sm:gap-5 cursor-pointer focus:outline-none max-w-sm ${
                activeSeq === 3 ? 'is-active' : ''
              }`}
            >
              <div className="icon-container w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-[#C5A059]/40 bg-[#F7F3EC]/70 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-[#C5A059] group-hover:shadow-[0_8px_20px_rgba(197,160,89,0.18)]">
                <svg className="icon-svg w-6 h-6 sm:w-7 sm:h-7 stroke-[#111111] fill-none" viewBox="0 0 48 48">
                  <circle className="ripple-wave ripple-wave-1 stroke-[#C5A059]" cx="24" cy="34" r="10" strokeLinecap="round" />
                  <circle className="ripple-wave ripple-wave-2 stroke-[#E8C280]" cx="24" cy="34" r="16" strokeLinecap="round" />
                  <g className="location-pin">
                    <path
                      d="M24 6 C17.37 6 12 11.37 12 18 C12 26 24 36 24 36 C24 36 36 26 36 18 C36 11.37 30.63 6 24 6 Z"
                      strokeLinejoin="round"
                    />
                    <circle cx="24" cy="17" r="4" className="fill-[#C5A059] stroke-[#C5A059]" />
                  </g>
                </svg>
              </div>

              <div className="space-y-1 flex-grow">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#967C52] uppercase font-medium">
                    DISCRETION
                  </span>
                  <span className="h-px flex-grow bg-[#D8CFC2]/70 max-w-[80px]" />
                </div>

                <h3 className="font-serif text-lg sm:text-2xl text-[#111111] font-normal tracking-wide group-hover:text-[#B89658] transition-colors">
                  Total Discretion
                </h3>

                <p className="font-sans text-xs sm:text-sm text-[#5C5549] leading-relaxed font-light">
                  Privacy respected from pickup to arrival.
                </p>

                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.2em] text-[#967C52] uppercase group-hover:text-[#111111] transition-colors">
                    <span>HOW IT WORKS</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1 text-[#B89658]">→</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ── 5. BOTTOM CENTER MONOGRAM ACCENT (— FB —) ───────────── */}
      <div className="max-w-7xl mx-auto w-full relative z-10 pt-2 sm:pt-3 flex items-center justify-center gap-5 shrink-0">
        <span className="h-px w-12 sm:w-16 bg-[#D8CFC2]" />
        <span className="font-serif italic text-sm sm:text-base text-[#B89658] tracking-widest">
          FB
        </span>
        <span className="h-px w-12 sm:w-16 bg-[#D8CFC2]" />
      </div>
    </section>
  );
};
