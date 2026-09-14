import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { Phone, Mail, MapPin, ArrowRight, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

const PILL_CATEGORIES = [
  { id: 'all', label: 'ALL FLEET', route: 'fleet' },
  { id: 'sedans', label: 'EXECUTIVE SEDANS', route: 'fleet' },
  { id: 'suvs', label: 'LUXURY SUVS', route: 'fleet' },
  { id: 'services', label: 'CHAUFFEUR SERVICES', route: 'services' },
  { id: 'experience', label: 'THE RENTAL EXPERIENCE', route: 'experience' },
];

/* Concentric radar circle icon matching the reference design */
const ConcentricRadarIcon: React.FC<{ className?: string }> = ({ className = "text-[#E0B268]" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2.5 3" opacity="0.6" />
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.2" opacity="0.85" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const [activePill, setActivePill] = useState<string>('all');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="w-full text-[#F4EDE4] pt-24 pb-12 px-6 sm:px-12 lg:px-20 relative overflow-hidden select-none border-t border-white/[0.06]"
      style={{
        background: 'radial-gradient(130% 90% at 50% 0%, #15110E 0%, #0D0A08 40%, #060504 100%)'
      }}
    >
      {/* Luminous Champagne Hairline Top Border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E0A852]/50 to-transparent z-20" />
      <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#E0A852]/[0.03] to-transparent pointer-events-none" />

      {/* Exquisite Architectural Micro-Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #E0A852 1px, transparent 1px),
            linear-gradient(to bottom, #E0A852 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 20%, black 20%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 20%, black 20%, transparent 85%)',
        }}
      />

      {/* Haute-Couture Diagonal Weave Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #FFFFFF 0, #FFFFFF 1px, transparent 0, transparent 24px)',
          maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 10%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, black 10%, transparent 70%)',
        }}
      />

      {/* Soft Multi-Layered Champagne Ambient Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] pointer-events-none opacity-30 blur-[120px]"
        style={{
          background: 'radial-gradient(ellipse at center, #E0A852 0%, #6E441D 45%, transparent 75%)'
        }}
      />
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[280px] pointer-events-none opacity-20 blur-[140px]"
        style={{
          background: 'radial-gradient(ellipse at center, #C9A45C 0%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto w-full space-y-20 relative z-10">
        
        {/* ── 01. MONUMENTAL HEADLINE AREA (MATCHING ORYZO REFERENCE) ──────── */}
        <div className="text-center flex flex-col items-center justify-center footer-shimmer-trigger">
          
          {/* Subtle Eyebrow */}
          <span className="font-display text-[11px] sm:text-xs tracking-[0.38em] uppercase text-white/50 mb-4 font-semibold">
            CHOOSE YOUR JOURNEY
          </span>

          {/* Monumental Headline in Modern Sleek Display Sans (Outfit) */}
          <div
            onClick={scrollToTop}
            className="group relative inline-block cursor-pointer px-4 py-2"
            title="Faith Based Global Holdings"
          >
            <h2 className="footer-text-shimmer font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.25rem] tracking-tight uppercase font-extrabold leading-[0.92] text-[#F4EDE4]">
              FAITH BASED<br />
              GLOBAL HOLDINGS
            </h2>
          </div>

          {/* ── 02. INTERACTIVE PILL SWITCHER (Directly from reference) ───────── */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-8 sm:mt-10 max-w-4xl mx-auto">
            {PILL_CATEGORIES.map((pill) => {
              const isActive = pill.id === activePill;
              return (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => {
                    setActivePill(pill.id);
                    onNavigate(pill.route);
                    scrollToTop();
                  }}
                  className={`px-5 sm:px-7 py-2.5 sm:py-3 rounded-full font-display text-[11px] sm:text-xs tracking-wider uppercase font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#22180F] border border-[#E0A852] text-[#F4EDE4] shadow-[0_0_24px_rgba(224,168,82,0.3)] scale-105'
                      : 'bg-[#141210]/70 border border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/[0.04]'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 03. THREE-COLUMN EDITORIAL SHOWCASE (Directly from reference) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 pt-6 pb-12 items-center border-t border-white/[0.08]">
          
          {/* Left Column: Brand Identity & Narrative */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="space-y-3">
              <h3 className="font-display text-2xl sm:text-3xl text-[#F4EDE4] font-bold tracking-tight">
                FBGH
              </h3>
              <p className="font-sans text-sm text-white/60 leading-relaxed font-light max-w-sm">
                The original standard in private transportation and curated vehicle rental. 
                Refined until effortless. Lifts friction, secures discretion, and quietly elevates your schedule like it was never there.
              </p>
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-2 pt-2 text-xs font-sans text-white/70">
              <a
                href="tel:+19295650100"
                className="flex items-center gap-2.5 hover:text-[#E0A852] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#E0A852] shrink-0" />
                <span className="font-mono tracking-wider">+1 (929) 565-0100</span>
              </a>
              <a
                href="mailto:concierge@fbglobalholdings.com"
                className="flex items-center gap-2.5 hover:text-[#E0A852] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#E0A852] shrink-0" />
                <span className="font-sans">concierge@fbglobalholdings.com</span>
              </a>
              <div className="flex items-center gap-2.5 text-white/50">
                <MapPin className="w-3.5 h-3.5 text-[#E0A852] shrink-0" />
                <span>New York · Philadelphia · Washington D.C. · Global</span>
              </div>
            </div>
          </div>

          {/* Center Column: Framed Showcase Card with Dashed Border (Like Image 2) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-full max-w-sm bg-[#13110E]/90 border border-dashed border-white/20 rounded-lg p-8 sm:p-10 flex flex-col items-center text-center space-y-6 shadow-2xl relative group hover:border-[#E0A852]/60 transition-all duration-500">
              {/* Subtle amber ambient glow behind card */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#E0A852]/[0.08] to-transparent rounded-lg pointer-events-none" />

              {/* Monogram Crest */}
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-[#1F1913] border border-[#E0A852]/50 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <Logo size="md" variant="dark" showText={false} />
                </div>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#080706] animate-pulse" />
              </div>

              {/* Badge & Caption */}
              <div className="space-y-1 relative z-10">
                <span className="font-display text-[10px] tracking-[0.3em] uppercase text-[#E0A852] font-semibold block">
                  ACTIVE 24/7 DISPATCH
                </span>
                <h4 className="font-display text-lg text-[#F4EDE4] font-bold tracking-tight">
                  Curbside &amp; Tarmac Readiness
                </h4>
                <p className="text-xs text-white/50 font-light">
                  Fleet staged 15 minutes ahead of schedule.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2 w-full relative z-10">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="pb-btn pb-btn-primary w-full justify-center"
                >
                  <span>REQUEST A VEHICLE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Bullet Features with Concentric Radar Circles (Image 1) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            {[
              {
                title: 'Guaranteed departure readiness',
                desc: 'Every vehicle sanitized, detailed, and staged ahead of your arrival.',
              },
              {
                title: 'Fixed corridor pricing',
                desc: 'All turnpike tolls, fees, and wait buffers included with zero peak surcharges.',
              },
              {
                title: 'Dedicated personal concierge',
                desc: 'Direct human dispatch liaison available around the clock for all itineraries.',
              },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4 group">
                <ConcentricRadarIcon className="text-[#E0A852] group-hover:scale-110 transition-transform duration-300 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-display text-sm sm:text-base text-[#F4EDE4] font-semibold tracking-tight group-hover:text-[#E0A852] transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-white/55 font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ── 04. BOTTOM BAR WITH SCROLL-TO-TOP (Like Image 2) ─────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/[0.08] text-[10.5px] font-sans text-white/40 tracking-wider">
          
          {/* Copyright */}
          <p className="order-2 md:order-1 font-mono">
            © 2026 FAITH BASED GLOBAL HOLDINGS. ALL RIGHTS RESERVED.
          </p>

          {/* Interactive Scroll to Top Pill (Inspired by Image 2's scroll cue) */}
          <button
            type="button"
            onClick={scrollToTop}
            className="order-1 md:order-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 hover:border-[#E0A852]/60 text-white/50 hover:text-[#E0A852] transition-all duration-300 cursor-pointer group"
          >
            <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center group-hover:-translate-y-0.5 transition-transform">
              <ArrowUp className="w-2.5 h-2.5" />
            </div>
            <span className="font-display tracking-[0.2em] uppercase font-semibold text-[9.5px]">
              SCROLL TO TOP
            </span>
          </button>

          {/* Policies */}
          <div className="order-3 flex items-center gap-5 font-mono">
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">TERMS</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">DISCRETION PROTOCOL</span>
          </div>

        </div>

      </div>
    </footer>
  );
};