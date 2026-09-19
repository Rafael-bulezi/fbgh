import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, Key, DollarSign, Car } from 'lucide-react';

interface OurPromiseSectionProps {
  onLearnMore?: () => void;
  onNavigate?: (page: string) => void;
  onOpenBooking?: () => void;
}

interface KineticStage {
  id: number;
  act: string;
  tag: string;
  badge: string;
  headlineWord1: string;
  headlineWord2: string;
  headlineWord3?: string;
  subheading: string;
  body: string;
  highlightTag: string;
  icon: React.ReactNode;
}

export const OurPromiseSection: React.FC<OurPromiseSectionProps> = ({
  onLearnMore,
  onNavigate,
}) => {
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  // 5 High-Impact Kinetic Stages telling why FBGH exists, transparent pricing, and effortless rental
  const STAGES: KineticStage[] = [
    {
      id: 1,
      act: 'ACT I — THE PURPOSE',
      tag: '01 // WHY WE EXIST',
      badge: 'UNCOMPROMISING PURPOSE',
      headlineWord1: 'PRIVATE TRAVEL,',
      headlineWord2: 'HONESTLY',
      headlineWord3: 'REDEFINED.',
      subheading: 'Built to eliminate friction, hidden hurdles, and false promises.',
      body: 'Faith Based Global Holdings was founded on a singular conviction: luxury mobility should be dependable, honorable, and effortless. No surge manipulation, no opaque dispatch, no excuses.',
      highlightTag: 'DIRECT CHAUFFEUR & RENTAL AUTHORITY',
      icon: <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-champagne-gold" />,
    },
    {
      id: 2,
      act: 'ACT II — ACCESSIBLE VALUE',
      tag: '02 // HONEST PRICING',
      badge: 'PRICES FOR ALL CATEGORIES',
      headlineWord1: 'RATES FOR',
      headlineWord2: 'EVERY',
      headlineWord3: 'TIER.',
      subheading: 'Premium sedans to presidential armored SUVs, priced with absolute clarity.',
      body: 'We do not believe luxury should require speculative estimates. From cost-efficient corporate transfers in refined sedans to flagship Maybachs and 14-passenger Jet Sprinters, you receive transparent upfront pricing before you travel.',
      highlightTag: 'ZERO SURGE • FLAT HOURLY & CITY-TO-CITY RATES',
      icon: <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-champagne-gold" />,
    },
    {
      id: 3,
      act: 'ACT III — EFFORTLESS ACCESS',
      tag: '03 // DUAL FREEDOM',
      badge: 'EFFORTLESS SELF-DRIVE & CHAUFFEUR',
      headlineWord1: 'TAKE THE WHEEL',
      headlineWord2: 'OR RELAX',
      headlineWord3: 'IN BACK.',
      subheading: 'Rent the vehicle directly or command a dedicated private chauffeur.',
      body: 'Need total self-drive independence? Rent your preferred vehicle with quick digital identity verification in minutes. Prefer a quiet sanctuary? Summon our NDA-bound executive chauffeurs. Two experiences, one effortless concierge desk.',
      highlightTag: 'DIGITAL CHECKOUT IN UNDER 3 MINUTES',
      icon: <Key className="w-6 h-6 sm:w-7 sm:h-7 text-champagne-gold" />,
    },
    {
      id: 4,
      act: 'ACT IV — THE FLEET AUTHORITY',
      tag: '04 // OVER 30 VESSELS',
      badge: 'COMPANY-OWNED FLEET',
      headlineWord1: '30+ VEHICLES.',
      headlineWord2: 'PREPARED &',
      headlineWord3: 'READY.',
      subheading: 'Every vehicle sanitized, climate-stabilized, and precision-inspected.',
      body: 'We own and maintain our inventory. Executive Escalades, Mercedes S-Class, BMW X7, Lincoln Navigators, and customized Mercedes Sprinter VIP lounges ready for immediate deployment across New York City and Philadelphia.',
      highlightTag: 'INSPECTED & DISPATCHED WITHIN 15 MINUTES',
      icon: <Car className="w-6 h-6 sm:w-7 sm:h-7 text-champagne-gold" />,
    },
    {
      id: 5,
      act: 'ACT V — THE RESOLUTION',
      tag: '05 // THE ARRIVAL',
      badge: 'YOUR TERMS ALWAYS',
      headlineWord1: 'EVERY DETAIL,',
      headlineWord2: 'PERFECTLY',
      headlineWord3: 'CONSIDERED.',
      subheading: 'The standard of private mobility you have been waiting for.',
      body: 'Whether planning a transatlantic flight transition, attending an executive summit, or taking a weekend retreat, FBGH ensures you arrive with clear intention and effortless peace of mind.',
      highlightTag: 'BOOK ONLINE OR CONTACT CONCIERGE 24/7',
      icon: <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-champagne-gold" />,
    },
  ];

  // 3x Speed Continuous Loop: advances every 1800ms (fast, fluid, responsive)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % STAGES.length);
    }, 1900);

    return () => clearInterval(timer);
  }, [isPaused, STAGES.length]);

  const active = STAGES[currentStage];

  return (
    <section
      ref={sectionRef}
      id="our-promise"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="w-full bg-[#F7F5F0] text-[#111110] py-16 sm:py-24 px-4 sm:px-8 lg:px-16 relative overflow-hidden select-none border-b border-[#E8E2D6]"
    >
      {/* ── 1. BACKGROUND ARCHITECTURAL PARALLAX TEXTURE ───────────── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span className="font-serif font-light text-[22vw] text-[#111110]/[0.025] uppercase whitespace-nowrap leading-none tracking-widest transition-all duration-700">
          {currentStage === 0 && 'FBGH'}
          {currentStage === 1 && 'VALUES'}
          {currentStage === 2 && 'RENTAL'}
          {currentStage === 3 && 'FLEET'}
          {currentStage === 4 && 'ARRIVE'}
        </span>
      </div>

      {/* ── 2. MAIN CINEMATIC KINETIC CONTENT ───────────── */}
      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col justify-between min-h-[420px]">

        {/* CENTER KINETIC TYPOGRAPHY STAGE */}
        <div className="my-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Column: Explosive Kinetic Serif Typography */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Tag line with animated icon */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center flex-shrink-0 transition-transform duration-500 hover:scale-110">
                {active.icon}
              </div>
              <span className="font-mono text-[11px] tracking-[0.28em] text-[#C5A059] uppercase font-semibold">
                {active.tag}
              </span>
            </div>

            {/* Dynamic Kinetic Headline Mask */}
            <div className="overflow-hidden">
              <h2
                key={`headline-${active.id}`}
                className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#111110] leading-[1.02] tracking-tight animate-fadeIn"
              >
                <span>{active.headlineWord1} </span>
                <span className="text-[#C5A059] font-bold">
                  {active.headlineWord2}{' '}
                </span>
                {active.headlineWord3 && (
                  <span>{active.headlineWord3}</span>
                )}
              </h2>
            </div>

            {/* Subheading Rule */}
            <div className="flex items-center gap-3 pt-1">
              <div className="w-12 sm:w-16 h-0.5 bg-[#C5A059]" />
              <p className="text-xs sm:text-sm font-mono tracking-wider text-[#967C52] uppercase font-medium">
                {active.subheading}
              </p>
            </div>

            {/* Descriptive Editorial Body */}
            <p
              key={`body-${active.id}`}
              className="text-sm sm:text-base text-[#111110]/80 font-light leading-relaxed max-w-xl pt-2 animate-fadeIn"
            >
              {active.body}
            </p>

            {/* Micro Highlight Tag */}
            <div className="pt-2">
              <span className="inline-block text-[10px] font-mono tracking-widest text-[#111110]/70 bg-[#111110]/5 px-3 py-1 rounded border border-[#C5A059]/20 uppercase">
                {active.highlightTag}
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Quick-Action Slate */}
          <div className="lg:col-span-5 bg-[#111110] text-[#F7F5F0] rounded-2xl p-6 sm:p-8 border border-[#C5A059]/30 shadow-2xl relative overflow-hidden group">
            {/* Ambient Shimmer Beam */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A059]/10 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-[10px] text-[#C5A059] tracking-[0.25em] uppercase">
                  WHAT YOU CAN EXPECT
                </span>
                <span className="text-[10px] font-mono text-white/50">NO BARRIERS</span>
              </div>

              <ul className="space-y-3.5 text-xs text-white/90 font-light">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white font-medium">All Fleet Categories Covered:</strong> Premium Sedans, Luxury SUVs, and 14-Pax Jet Sprinters.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Fast Self-Drive Rental:</strong> Reserve & verify online in seconds, or request private chauffeur dispatch.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white font-medium">Guaranteed Pricing:</strong> Zero hidden surcharges, transparent receipts, and dedicated VIP support.
                  </span>
                </li>
              </ul>

              {/* Action Button */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate?.('fleet')}
                  className="px-5 py-2.5 rounded bg-[#C5A059] hover:bg-[#D4B06A] text-[#111110] font-sans font-semibold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>EXPLORE FLEET</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ── 4. MINIMAL 5-STAGE PROGRESS TICK BAR (NO CLUTTER) ───────────── */}
        <div className="border-t border-[#C5A059]/20 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Stage Switcher Pills */}
          <div className="flex items-center gap-2">
            {STAGES.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentStage(idx)}
                title={`Jump to Stage 0${s.id}: ${s.badge}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentStage === idx
                    ? 'w-10 bg-[#C5A059] shadow-[0_0_8px_rgba(197,160,89,0.7)]'
                    : 'w-3 bg-[#111110]/20 hover:bg-[#C5A059]/60'
                }`}
                aria-label={`Jump to stage ${s.id}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 text-[10px] font-mono text-[#967C52]">
            <span>HOVER TO PAUSE</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => onLearnMore ? onLearnMore() : onNavigate?.('experience')}
              className="hover:text-[#111110] transition-colors underline uppercase"
            >
              LEARN ABOUT OUR PHILOSOPHY &rarr;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
