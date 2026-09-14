import React, { useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { PinnedExperienceTransition } from '../components/common/PinnedExperienceTransition';

interface ExperiencePageProps {
  onOpenBooking: () => void;
  onNavigate?: (page: string) => void;
}

/* ─── Use-case selector data ──────────────────────────────────────────── */
const USE_CASES = [
  {
    id: 'business',
    label: 'BUSINESS',
    headline: 'Arrive. Work. Move.',
    body: 'Comfortable, clean, and professional. A vehicle that keeps up with your schedule.',
    cta: 'VIEW EXECUTIVE VEHICLES',
    fleet: 'fleet',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'weekend',
    label: 'WEEKEND',
    headline: 'More room. More freedom.',
    body: 'Pack everything. Go everywhere. A larger vehicle makes the difference.',
    cta: 'VIEW SUVS',
    fleet: 'fleet',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'family',
    label: 'FAMILY',
    headline: 'Space for everyone.',
    body: 'Luggage, car seats, and all the things that come with family travel — handled.',
    cta: 'VIEW VANS & LARGE SUVS',
    fleet: 'fleet',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'event',
    label: 'EVENT',
    headline: 'A vehicle worth arriving in.',
    body: 'First impressions matter. Choose something that matches the occasion.',
    cta: 'VIEW PRESTIGE VEHICLES',
    fleet: 'fleet',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 'longerstay',
    label: 'LONGER STAY',
    headline: 'Make it yours for longer.',
    body: 'Extended rentals with consistent access to the same class of vehicle.',
    cta: 'VIEW ALL VEHICLES',
    fleet: 'fleet',
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=1600&auto=format&fit=crop',
  },
];

/* ─── Process steps ────────────────────────────────────────────────────── */
const STEPS = [
  { num: '01', title: 'CHOOSE', desc: 'Select the vehicle that fits your trip.' },
  { num: '02', title: 'RESERVE', desc: 'Tell us your dates and requirements.' },
  { num: '03', title: 'PICK UP', desc: 'Collect your vehicle. Keys in hand.' },
  { num: '04', title: 'RETURN', desc: 'Complete the journey. Simple.' },
];

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ onOpenBooking, onNavigate }) => {
  const [activeCase, setActiveCase] = useState('business');
  const [showInfo, setShowInfo] = useState(false);
  const currentCase = USE_CASES.find((u) => u.id === activeCase) || USE_CASES[0];

  return (
    <div className="w-full bg-[#08080A] text-[#F4F1EA] selection:bg-champagne-gold selection:text-obsidian">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          01. HERO — ~45vh, left-aligned, rental imagery
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden border-b border-white/10">
        <img
          src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1920&auto=format&fit=crop"
          alt="Person loading luggage into rental SUV on open road"
          className="absolute inset-0 w-full h-full object-cover luminous-media opacity-90"
        />
        {/* Cinematic scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080A]/90 via-[#08080A]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A]/80 via-transparent to-[#08080A]/25" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-14 lg:px-20 pb-12 sm:pb-16 pt-28 sm:pt-36">
          <div className="max-w-xl space-y-4 sm:space-y-6">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 sm:gap-3">
              <span className="w-6 h-[1px] bg-[#C5A059]" />
              <span className="text-[9.5px] sm:text-[10px] font-mono tracking-[0.35em] text-[#C5A059] uppercase font-medium">
                THE EXPERIENCE
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-[76px] text-[#F4EDE4] leading-[0.98] tracking-tight">
              MORE FREEDOM.<br />
              <span className="text-[#E0B268]">MORE YOURS.</span>
            </h1>

            {/* Body */}
            <p className={`text-xs sm:text-base text-[#F4F1EA]/80 leading-relaxed max-w-md font-light transition-all ${showInfo ? '' : 'line-clamp-2 sm:line-clamp-none'}`}>
              From choosing your vehicle to getting back on the road, FBGH keeps the rental experience
              clear, comfortable and easy to navigate.
            </p>
            <button
              className="sm:hidden font-mono text-[9px] tracking-widest text-[#E0B268] uppercase mt-1"
              onClick={() => setShowInfo(!showInfo)}
            >
              {showInfo ? '− LESS' : '+ MORE'}
            </button>

            {/* CTAs */}
            <div className="flex flex-row items-center gap-2 sm:gap-4 pt-2">
              <button
                onClick={() => onNavigate?.('fleet')}
                className="inline-flex items-center justify-center gap-1.5 !px-2.5 sm:!px-6 !py-2 sm:!py-3.5 border border-[#C5A059] text-[#C5A059] !text-[9px] sm:!text-[11px] tracking-[0.2em] uppercase font-sans font-medium hover:bg-[#C5A059] hover:text-obsidian transition-all duration-300 group cursor-pointer whitespace-nowrap"
              >
                <span>EXPLORE FLEET</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => onOpenBooking()}
                className="pb-btn pb-btn-primary justify-center !px-2.5 sm:!px-6 !py-2 sm:!py-3.5 !text-[9px] sm:!text-xs whitespace-nowrap"
              >
                <span>RENT A CAR</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          02. CINEMATIC FILM — CHOOSE → TAKE → GO → MAKE IT YOURS
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <PinnedExperienceTransition onOpenBooking={() => onNavigate?.('fleet')} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          03. WHAT RENTING WITH FBGH FEELS LIKE — Clear / Ready / Supported
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#0C0C0E] border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">

          {/* Left: editorial text block */}
          <div className="px-8 sm:px-14 lg:px-16 py-20 sm:py-28 flex flex-col justify-center">
            <div className="space-y-2 mb-14">
              <div className="inline-flex items-center gap-3">
                <span className="w-6 h-[1px] bg-[#C5A059]" />
                <span className="text-[10px] font-mono tracking-[0.35em] text-[#C5A059] uppercase">
                  BUILT AROUND THE RENTAL
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#F4EDE4] tracking-tight leading-[1.05]">
                What renting with<br />
                <span className="text-[#E0B268]">FBGH should feel like.</span>
              </h2>
            </div>

            <div className="space-y-0 divide-y divide-white/10">
              {[
                {
                  title: 'CLEAR',
                  body: "Straightforward vehicle information and rental details. Know exactly what you're getting before you commit.",
                },
                {
                  title: 'READY',
                  body: 'Vehicles presented clean, sanitized, and prepared for the road. No surprises at pickup.',
                },
                {
                  title: 'SUPPORTED',
                  body: "A clear path to assistance when you need it. Whether it's before, during, or after your rental.",
                },
              ].map((pillar, idx) => (
                <div key={pillar.title} className="py-8 group">
                  <div className="flex items-start gap-6">
                    <span className="font-mono text-[10px] text-[#E0B268]/70 mt-1 shrink-0 w-6">
                      0{idx + 1}
                    </span>
                    <div className="space-y-2">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4EDE4] tracking-tight group-hover:text-[#E0B268] transition-colors duration-300">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed font-light max-w-sm">
                        {pillar.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: large cinematic image */}
          <div className="relative min-h-[420px] lg:min-h-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
              alt="Vehicle prepared and ready for rental"
              className="absolute inset-0 w-full h-full object-cover luminous-media opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0E] via-[#0C0C0E]/20 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-transparent" />
            {/* Bottom scrim for mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E] via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          04. FROM BOOKING TO ROAD — horizontal process
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#08080A] border-b border-white/10 py-20 sm:py-28 px-8 sm:px-14 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-14">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-3">
                <span className="w-6 h-[1px] bg-[#C5A059]" />
                <span className="text-[10px] font-mono tracking-[0.35em] text-[#C5A059] uppercase">
                  THE PROCESS
                </span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F4EDE4] tracking-tight">
                From booking to road.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/50 max-w-xs font-light leading-relaxed">
              Four simple steps. Everything else is already taken care of.
            </p>
          </div>

          {/* Steps — horizontal desktop, vertical mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 lg:divide-x divide-white/10">
            {STEPS.map((step, idx) => (
              <div key={step.num} className="relative group lg:px-10 first:lg:pl-0 last:lg:pr-0 py-8 lg:py-0">
                {/* Mobile connector line */}
                {idx < STEPS.length - 1 && (
                  <div className="absolute left-6 top-full w-[1px] h-8 bg-white/10 lg:hidden" />
                )}

                <div className="space-y-4">
                  {/* Number */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl sm:text-3xl font-light text-[#E0B268] leading-none">
                      {step.num}
                    </span>
                    <div className="flex-1 h-[1px] bg-white/10 group-hover:bg-[#E0B268]/40 transition-colors" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F4EDE4] tracking-tight group-hover:text-[#E0B268] transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-xs text-white/55 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          05. ONE FLEET. MANY JOURNEYS. — use-case word selector
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#0C0C0E] border-b border-white/10 py-20 sm:py-28 px-8 sm:px-14 lg:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-14">

          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#C5A059]" />
              <span className="text-[10px] font-mono tracking-[0.35em] text-[#C5A059] uppercase">
                FIND YOUR JOURNEY
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F4EDE4] tracking-tight">
              One fleet.<br />
              <span className="text-[#E0B268]">Many journeys.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: selectable use-case words */}
            <div className="space-y-1">
              {USE_CASES.map((uc) => {
                const isActive = uc.id === activeCase;
                return (
                  <button
                    key={uc.id}
                    onClick={() => setActiveCase(uc.id)}
                    className={`w-full text-left group transition-all duration-300 py-4 border-b border-white/10 cursor-pointer flex items-center justify-between ${
                      isActive ? 'border-[#E0B268]/50' : 'hover:border-white/25'
                    }`}
                  >
                    <span
                      className={`font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight transition-all duration-300 ${
                        isActive
                          ? 'text-[#E0B268]'
                          : 'text-white/35 group-hover:text-white/70'
                      }`}
                    >
                      {uc.label}
                    </span>
                    <ArrowRight
                      className={`w-5 h-5 transition-all duration-300 ${
                        isActive ? 'text-[#E0B268] translate-x-1' : 'text-white/20 opacity-0 group-hover:opacity-100'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right: live image + copy */}
            <div className="relative">
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-[#121215]">
                {USE_CASES.map((uc) => (
                  <img
                    key={uc.id}
                    src={uc.image}
                    alt={uc.label}
                    className={`absolute inset-0 w-full h-full object-cover luminous-media transition-opacity duration-700 ${
                      uc.id === activeCase ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E]/80 via-transparent to-transparent" />
              </div>

              {/* Copy panel below image */}
              <div className="mt-6 space-y-3">
                <h3
                  key={`headline-${currentCase.id}`}
                  className="font-display font-bold text-2xl sm:text-3xl text-[#F4EDE4] tracking-tight animate-fadeIn"
                >
                  {currentCase.headline}
                </h3>
                <p
                  key={`body-${currentCase.id}`}
                  className="text-sm text-white/60 font-light leading-relaxed animate-fadeIn"
                >
                  {currentCase.body}
                </p>
                <button
                  onClick={() => onNavigate?.(currentCase.fleet)}
                  className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.2em] text-[#E0B268] uppercase hover:text-white transition-colors cursor-pointer group"
                >
                  <span>{currentCase.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          06. FLEET BRIDGE — short, quiet
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-[#08080A] border-b border-white/10 py-16 px-8 sm:px-14 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-[#F4EDE4] tracking-tight">
              Found your vehicle?
            </h2>
            <p className="text-xs text-white/45 font-light">
              Explore the complete FBGH collection — 30+ vehicles across every category.
            </p>
          </div>
          <button
            onClick={() => onNavigate?.('fleet')}
            className="inline-flex items-center gap-2.5 text-[11px] font-mono tracking-[0.25em] text-[#E0B268] uppercase hover:text-white transition-colors cursor-pointer group shrink-0"
          >
            <span>VIEW THE FLEET</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          07. FINAL CTA — full-width departure image
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441148345475-03a2e82f9719?q=80&w=1920&auto=format&fit=crop"
          alt="Vehicle departing on an open road"
          className="absolute inset-0 w-full h-full object-cover luminous-media opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A]/90 via-[#08080A]/50 to-[#08080A]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080A]/60 via-transparent to-transparent" />

        <div className="relative z-10 text-center px-8 sm:px-14 space-y-8 max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[#C5A059]" />
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#C5A059] uppercase">
              FBGH RENTAL
            </span>
            <span className="w-6 h-[1px] bg-[#C5A059]" />
          </div>

          {/* Headline */}
          <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-[88px] text-[#F4EDE4] leading-[0.92] tracking-tight uppercase">
            READY TO MOVE?
          </h2>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate?.('fleet')}
              className="inline-flex items-center gap-2.5 px-8 py-4 border border-[#C5A059] text-[#C5A059] text-[11px] tracking-[0.2em] uppercase font-sans font-medium hover:bg-[#C5A059] hover:text-obsidian transition-all duration-300 group cursor-pointer"
            >
              <span>EXPLORE THE FLEET</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => onOpenBooking()}
              className="pb-btn pb-btn-primary"
            >
              <span>RENT A CAR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Chauffeur secondary */}
          <div className="pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-white/35 uppercase hover:text-white/70 transition-colors cursor-pointer group"
            >
              <Phone className="w-3 h-3" />
              <span>Need a chauffeur instead? Request a Ride →</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
