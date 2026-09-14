import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';

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
            <h2 className="footer-text-shimmer font-display text-4xl sm:text-6xl md:text-8xl lg:text-[7.25rem] tracking-tight uppercase font-extrabold leading-[0.92] text-[#F4EDE4]">
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

        {/* ── 03. BRAND IDENTITY & DIRECT CONCIERGE ACCESS ──────────────── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 pt-8 pb-12 border-t border-white/[0.08]">
          
          {/* Left: Brand Identity & Narrative */}
          <div className="space-y-4 max-w-lg text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#1F1913] border border-[#E0A852]/40 flex items-center justify-center shadow-md">
                <Logo size="sm" variant="dark" showText={false} />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-[#F4EDE4] font-bold tracking-tight">
                FBGH
              </h3>
            </div>
            <p className="font-sans text-sm text-white/60 leading-relaxed font-light">
              The original standard in private transportation and curated vehicle rental. 
              Refined until effortless. Lifts friction, secures discretion, and quietly elevates your schedule like it was never there.
            </p>
          </div>

          {/* Right: Direct Contact Details & Immediate Concierge Action */}
          <div className="space-y-3.5 text-xs font-sans text-white/70 text-left md:text-right">
            <a
              href="tel:+19295650100"
              className="flex md:justify-end items-center gap-2.5 hover:text-[#E0A852] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E0A852] shrink-0" />
              <span className="font-mono tracking-wider">+1 (929) 565-0100</span>
            </a>
            <a
              href="mailto:concierge@fbglobalholdings.com"
              className="flex md:justify-end items-center gap-2.5 hover:text-[#E0A852] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#E0A852] shrink-0" />
              <span className="font-sans">concierge@fbglobalholdings.com</span>
            </a>
            <div className="flex md:justify-end items-center gap-2.5 text-white/50">
              <MapPin className="w-3.5 h-3.5 text-[#E0A852] shrink-0" />
              <span>New York · Philadelphia · Washington D.C. · Global</span>
            </div>
            <div className="pt-2 flex md:justify-end">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#E0A852]/50 text-[#F4EDE4] hover:bg-[#E0A852] hover:text-[#0D0A08] font-display text-[10.5px] tracking-widest uppercase font-semibold transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(224,168,82,0.3)]"
              >
                <span>REQUEST A RIDE</span>
              </button>
            </div>
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
          <div className="order-3 flex flex-wrap items-center justify-center gap-4 sm:gap-5 font-mono">
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