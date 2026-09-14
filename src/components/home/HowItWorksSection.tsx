import React, { useState, useEffect } from 'react';

interface HowItWorksSectionProps {
  onOpenBooking?: () => void;
}

const STEPS = [
  {
    num: '01',
    label: 'STEP 01',
    title: 'Request',
    action: 'Specify origin, destination & vehicle preferences',
    sub: 'DISPATCH',
  },
  {
    num: '02',
    label: 'STEP 02',
    title: 'Confirm',
    action: 'Chauffeur assigned & route calibrated in advance',
    sub: 'ALLOCATION',
  },
  {
    num: '03',
    label: 'STEP 03',
    title: 'Staging',
    action: 'Vehicle staged 15 mins prior with cabin pre-conditioned',
    sub: 'ARRIVAL',
  },
  {
    num: '04',
    label: 'STEP 04',
    title: 'Sanctuary',
    action: 'Total acoustic isolation & encrypted Wi-Fi amenities',
    sub: 'IN-TRANSIT',
  },
  {
    num: '05',
    label: 'STEP 05',
    title: 'Arrival',
    action: 'Direct private terminal or residence gate drop-off',
    sub: 'PRECISION',
  },
];

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  // Auto-cycle through the 5 steps seamlessly
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="how-it-works"
      className="w-full h-[42vh] min-h-[300px] max-h-[390px] lg:h-[45vh] lg:max-h-[420px] bg-[#070708] text-[#F7F5F0] px-4 sm:px-8 lg:px-14 relative overflow-hidden flex flex-col justify-between py-5 sm:py-7 lg:py-8 select-none border-y border-white/10"
    >
      {/* Background Subtle Ambient Gold Glow */}
      <div className="radial-gold-glow absolute inset-0 -z-10 pointer-events-none opacity-45" />

      {/* Kinetic Helix Canvas & 5 Horizontal Step Cards */}
      <div className="max-w-7xl w-full mx-auto relative flex-grow flex items-center justify-between my-auto">
        
        {/* SVG HELIX THREADS (Connecting all 5 steps horizontally) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 flex items-center">
          <svg
            className="w-full h-32 sm:h-44"
            viewBox="0 0 1000 140"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="helix-gold-large" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C5A059" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#F7F5F0" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#C5A059" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="helix-dim-large" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8e8e93" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#C5A059" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8e8e93" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Background Harmonized Stream Thread */}
            <path
              d="M 40,70 C 180,10 280,130 400,70 C 520,10 620,130 750,70 C 880,10 950,70 980,70"
              stroke="url(#helix-dim-large)"
              strokeWidth="2.5"
              className="animate-flow-slow"
              opacity="0.45"
            />

            {/* Core Bright Flowing Stream Thread */}
            <path
              d="M 20,70 C 150,130 250,10 380,70 C 500,130 600,10 720,70 C 840,130 930,30 980,70"
              stroke="url(#helix-gold-large)"
              strokeWidth="3.5"
              className="animate-flow-fast"
            />

            {/* Center Baseline Guide Line */}
            <line
              x1="30"
              y1="70"
              x2="970"
              y2="70"
              stroke="#C5A059"
              strokeWidth="1"
              strokeDasharray="5 7"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* 5 HORIZONTAL STEPS (Solid 85-90% Opaque Cards, Shrunk Transparency) */}
        <div className="w-full grid grid-cols-5 gap-2 sm:gap-4 lg:gap-6 relative z-10">
          {STEPS.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`group flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 relative ${
                  isActive
                    ? 'bg-[#1C1C20] border-2 border-[#C5A059] shadow-[0_12px_32px_rgba(197,160,89,0.3)] -translate-y-1.5'
                    : 'bg-[#121215]/95 border border-white/15 hover:border-[#C5A059]/60 hover:bg-[#161619]'
                }`}
              >
                {/* Glowing Circle Node */}
                <div className="relative flex items-center justify-center mb-2">
                  <span
                    className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full border text-xs sm:text-sm font-mono font-bold flex items-center justify-center transition-all duration-300 shadow-lg ${
                      isActive
                        ? 'bg-[#C5A059] text-black border-[#C5A059] scale-110'
                        : 'bg-[#070708] text-[#C5A059] border-[#C5A059]/40 group-hover:border-[#C5A059] group-hover:text-white'
                    }`}
                  >
                    {step.num}
                  </span>
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-[#C5A059]/40 animate-ping pointer-events-none" />
                  )}
                </div>

                {/* Step Title */}
                <span
                  className={`font-display text-sm sm:text-base lg:text-lg tracking-tight font-bold text-center truncate w-full transition-colors duration-200 ${
                    isActive ? 'text-[#E0B268]' : 'text-white/90 group-hover:text-white'
                  }`}
                >
                  {step.title}
                </span>

                {/* Sublabel */}
                <span className="text-[8.5px] sm:text-[9.5px] font-mono tracking-widest text-white/50 uppercase mt-0.5 truncate max-w-full">
                  {step.sub}
                </span>

                {/* Brief description on tablet/desktop */}
                <p className="hidden sm:block text-[11px] text-white/60 text-center font-light leading-snug line-clamp-2 mt-1.5 max-w-[150px]">
                  {step.action}
                </p>

                {/* Active Gold Indicator Bar */}
                <div
                  className={`h-0.5 sm:h-1 w-8 sm:w-14 rounded-full mt-2 transition-all duration-300 ${
                    isActive ? 'bg-[#C5A059] shadow-[0_0_8px_#C5A059]' : 'bg-transparent'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Mobile Active Description Strip */}
      <div className="max-w-7xl w-full mx-auto text-center sm:hidden z-10 shrink-0">
        <p className="font-mono text-[10px] text-[#C5A059] truncate tracking-wider">
          {STEPS[activeStep].num} • {STEPS[activeStep].action}
        </p>
      </div>
    </section>
  );
};
