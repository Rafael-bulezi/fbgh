import React from 'react';
import { Logo } from '../common/Logo';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="w-full bg-[#070708] text-[#F4F1EA] pt-20 sm:pt-28 pb-12 px-6 sm:px-12 lg:px-20 relative overflow-hidden select-none border-t border-white/10">
      {/* Subtle Ambient Gold Radial Depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#C5A059]/[0.05] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-16 sm:space-y-20 relative z-10">
        
        {/* ── 1. MONUMENTAL CENTER TITLE WITH DUAL INTERSECTING TEXT SHIMMER ──────── */}
        <div className="text-center flex flex-col items-center justify-center footer-shimmer-trigger">
          <div
            className="group relative inline-block cursor-pointer px-4 py-2"
            title="Faith Based Global Holdings"
          >
            {/* Monumental Headline with True Text-Clipped Dual Shimmer */}
            <h2 className="footer-text-shimmer font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] tracking-[0.08em] sm:tracking-[0.12em] uppercase font-normal leading-[0.98]">
              FAITH BASED<br />
              GLOBAL HOLDINGS
            </h2>
          </div>

          {/* Slogan framed with dual gold hairline rules */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 sm:mt-10 max-w-xl mx-auto w-full">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C5A059]/50 to-[#C5A059]" />
            <span className="font-mono text-[9.5px] sm:text-[11px] tracking-[0.35em] uppercase text-[#C5A059] font-medium whitespace-nowrap">
              PRIVATE TRANSPORTATION • MOBILITY • LIFESTYLE
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C5A059]/50 to-[#C5A059]" />
          </div>
        </div>

        {/* ── 2. HORIZONTAL 3-PANEL NAVIGATION & CONCIERGE ROW ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 py-10 border-y border-white/10 items-center">
          
          {/* Left Column: Horizontal Navigation Links */}
          <div className="md:col-span-5 flex flex-wrap items-center gap-6 sm:gap-8">
            {[
              { id: 'fleet', label: 'FLEET' },
              { id: 'services', label: 'SERVICES' },
              { id: 'experience', label: 'EXPERIENCE' },
              { id: 'about', label: 'ABOUT' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="font-sans text-xs tracking-[0.24em] text-white/70 hover:text-[#C5A059] transition-colors uppercase font-medium cursor-pointer"
              >
                {item.label}
              </button>
            ))}

            <button
              type="button"
              onClick={onOpenBooking}
              className="font-sans text-xs tracking-[0.24em] text-[#C5A059] hover:text-white transition-colors uppercase font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>BOOK A RIDE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Center Column: Concierge & Reservations */}
          <div className="md:col-span-4 border-t md:border-t-0 md:border-l md:border-r border-white/10 pt-6 md:pt-0 md:px-8 space-y-2.5">
            <span className="font-mono text-[9.5px] text-[#C5A059] tracking-[0.3em] uppercase block font-semibold">
              CONCIERGE &amp; RESERVATIONS
            </span>
            
            <div className="space-y-1.5 text-xs text-white/75 font-light">
              <a
                href="tel:+19295650100"
                className="flex items-center gap-2 hover:text-[#C5A059] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                <span>+1 (929) 565-0100</span>
              </a>

              <a
                href="mailto:concierge@fbglobalholdings.com"
                className="flex items-center gap-2 hover:text-[#C5A059] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                <span>concierge@fbglobalholdings.com</span>
              </a>

              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" />
                <span>New York · Philadelphia, PA · Global</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dispatch & Monogram */}
          <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-3 text-left md:text-right">
            <div className="flex items-center gap-2">
              <Logo size="md" variant="dark" showText={false} />
              <div className="text-right">
                <span className="font-serif text-base tracking-widest text-[#F4F1EA] block font-light leading-none">
                  FBGH
                </span>
                <span className="font-mono text-[9px] text-[#C5A059] tracking-widest uppercase">
                  EST. 2026
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono text-white/50 tracking-wider pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>24/7 ACTIVE DISPATCH</span>
            </div>
          </div>

        </div>

        {/* ── 3. BOTTOM LEGAL BAR ───────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10.5px] font-mono text-white/40 tracking-widest pt-2">
          <p>© 2026 FAITH BASED GLOBAL HOLDINGS. ALL RIGHTS RESERVED.</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY POLICY</span>
            <span>—</span>
            <span className="hover:text-white transition-colors cursor-pointer">TERMS &amp; CONDITIONS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};