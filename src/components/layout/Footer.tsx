import React, { useState } from 'react';
import { Phone, Mail, MapPin, ArrowUp, ShieldCheck } from 'lucide-react';
import { RentalPolicyModal } from '../common/RentalPolicyModal';
import { Logo } from '../common/Logo';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

const NAV_PAGES = [
  { id: 'home',         label: 'HOME',         route: 'home' },
  { id: 'services',     label: 'SERVICES',     route: 'services' },
  { id: 'fleet',        label: 'FLEET',        route: 'fleet' },
  { id: 'experience',   label: 'EXPERIENCE',   route: 'experience' },
  { id: 'destinations', label: 'DESTINATIONS', route: 'destinations' },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [showPolicyModal, setShowPolicyModal] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="w-full text-[#F4EDE4] pt-20 sm:pt-28 pb-12 px-6 sm:px-12 lg:px-20 relative overflow-hidden select-none"
      style={{
        background: 'radial-gradient(130% 90% at 50% 0%, #15110E 0%, #0D0A08 40%, #060504 100%)'
      }}
    >
      {/* ── 00. CURVED DIVIDER TRANSITION AT TOP (NO STRAIGHT LINE) ── */}
      <div className="absolute top-0 inset-x-0 overflow-hidden leading-none z-20 pointer-events-none -translate-y-[1px]">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="w-full h-12 sm:h-16 md:h-20 text-[#0E0C0A] fill-current">
          <path d="M0,0 L1440,0 L1440,30 C1160,78 880,10 640,48 C400,86 180,15 0,54 Z" />
        </svg>
      </div>

      {/* Luminous Champagne Hairline Top Border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E0A852]/60 to-transparent z-20" />
      <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#E0A852]/[0.03] to-transparent pointer-events-none" />

      {/* Soft Multi-Layered Champagne Ambient Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] pointer-events-none opacity-25 blur-[120px]"
        style={{
          background: 'radial-gradient(ellipse at center, #E0A852 0%, #6E441D 45%, transparent 75%)'
        }}
      />
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1100px] h-[280px] pointer-events-none opacity-15 blur-[140px]"
        style={{
          background: 'radial-gradient(ellipse at center, #C9A45C 0%, transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto w-full space-y-16 sm:space-y-20 relative z-10">
        
        {/* ── 01. MONUMENTAL HEADLINE AREA WITH BIG CENTERED LOGO ──────── */}
        <div className="text-center flex flex-col items-center justify-center footer-shimmer-trigger pt-4 sm:pt-6">
          
          {/* Big, Very Big Centered Golden Monogram Crest — with flowing liquid gold animation */}
          <div
            onClick={scrollToTop}
            className="relative mb-6 sm:mb-8 cursor-pointer group flex items-center justify-center"
            title="Faith Based Global Holdings"
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 drop-shadow-[0_4px_30px_rgba(224,168,82,0.4)] transition-transform duration-500 group-hover:scale-105 flex items-center justify-center [&>div]:w-full [&>div]:h-full [&>div>svg]:w-full [&>div>svg]:h-full">
              <Logo
                size="hero"
                showText={false}
                animate={true}
                variant="dark"
                className="w-full h-full flex items-center justify-center"
              />
            </div>
          </div>

          {/* Refined Headline Hierarchy: Faith Based (~10% smaller) & Global Holdings (smaller & gold) */}
          <div
            onClick={scrollToTop}
            className="group relative flex flex-col items-center cursor-pointer px-4 select-none"
            title="Faith Based Global Holdings"
          >
            <h2 className="font-display text-[2.8rem] sm:text-[4rem] md:text-[4.5rem] lg:text-[6.75rem] xl:text-[7.65rem] font-black tracking-tight uppercase leading-[0.92] text-[#F4EDE4] text-center">
              FAITH BASED
            </h2>
            <span className="font-display text-sm sm:text-lg md:text-2xl lg:text-3xl tracking-[0.28em] font-bold text-[#E0A852] uppercase mt-2 sm:mt-4 text-center">
              GLOBAL HOLDINGS
            </span>
            <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-[#F4EDE4]/80 uppercase mt-2.5 text-center font-semibold">
              PEOPLE · PURPOSE · PROSPERITY
            </span>
          </div>

          {/* ── 02. NAV PAGE BUTTONS — styled like pb-btn-outline (gold border, left-to-right fill) ── */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 max-w-3xl mx-auto">
            {NAV_PAGES.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => {
                  onNavigate(page.route);
                  scrollToTop();
                }}
                className="pb-btn pb-btn-outline !px-6 !py-2.5 !text-[10.5px] cursor-pointer"
              >
                {page.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── 03. CENTERED CONCIERGE INFORMATION BLOCK (Real Business Card Details) ── */}
        <div className="flex flex-col items-center justify-center text-center space-y-6 pt-10 pb-12 border-t border-white/[0.08] max-w-4xl mx-auto">
          
          {/* Direct Concierge Eyebrow */}
          <div className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#E0A852]" />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#E0A852] uppercase font-bold">
              DIRECT CONCIERGE ACCESS
            </span>
            <span className="w-1.5 h-1.5 rounded-[1px] bg-[#E0A852]" />
          </div>

          {/* Business Card Phone Numbers */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a
              href="tel:+12676424616"
              className="font-mono text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#F4EDE4] hover:text-[#E0A852] transition-colors duration-300 drop-shadow-[0_2px_24px_rgba(224,168,82,0.25)] flex items-center justify-center gap-2.5 sm:gap-3"
            >
              <Phone className="w-5 h-5 sm:w-7 sm:h-7 text-[#E0A852] shrink-0" />
              <span>+1 (267) 642-4616</span>
            </a>
            <span className="hidden sm:inline text-white/20">|</span>
            <a
              href="tel:+14458671578"
              className="font-mono text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#F4EDE4]/90 hover:text-[#E0A852] transition-colors duration-300 flex items-center justify-center gap-2.5"
            >
              <span>+1 (445) 867-1578</span>
            </a>
          </div>

          {/* Business Card Emails & Corridors */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm sm:text-base font-semibold text-[#F4EDE4] font-sans">
            <a
              href="mailto:amfbgh@gmail.com"
              className="inline-flex items-center gap-2 hover:text-[#E0A852] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#E0A852] shrink-0" />
              <span>amfbgh@gmail.com</span>
            </a>
            <span className="hidden sm:inline text-white/20">·</span>
            <a
              href="mailto:office1@cleas4less.com"
              className="inline-flex items-center gap-2 hover:text-[#E0A852] transition-colors"
            >
              <Mail className="w-4 h-4 text-[#E0A852] shrink-0" />
              <span>office1@cleas4less.com</span>
            </a>
            <span className="hidden sm:inline text-white/20">·</span>
            <div className="inline-flex items-center gap-2 text-[#F4EDE4]/90">
              <MapPin className="w-4 h-4 text-[#E0A852] shrink-0" />
              <span>New York · Philadelphia · Washington D.C. · Global</span>
            </div>
          </div>

          {/* Prominent Brand Note — Clean & Viewable (Removed redundant Request a Ride button) */}
          <p className="font-sans text-sm sm:text-base md:text-lg text-[#F4EDE4]/85 max-w-2xl leading-relaxed pt-2 font-normal text-center">
            The standard in private transportation and curated vehicle rental. 
            Refined until effortless. Lifts friction, secures discretion, and quietly elevates your schedule.
          </p>

        </div>

        {/* ── 04. BOTTOM BAR WITH SCROLL-TO-TOP & RENTAL POLICY ────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/[0.08] text-[10.5px] font-sans text-white/40 tracking-wider">
          
          {/* Copyright */}
          <p className="order-2 md:order-1 font-mono">
            © 2026 FAITH BASED GLOBAL HOLDINGS INC. ALL RIGHTS RESERVED.
          </p>

          {/* Interactive Scroll to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="order-1 md:order-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-[3px] border border-white/10 hover:border-[#E0A852]/60 text-white/50 hover:text-[#E0A852] transition-all duration-300 cursor-pointer group"
          >
            <div className="w-4 h-4 rounded-[2px] border border-current flex items-center justify-center group-hover:-translate-y-0.5 transition-transform">
              <ArrowUp className="w-2.5 h-2.5" />
            </div>
            <span className="font-display tracking-[0.2em] uppercase font-semibold text-[9.5px]">
              SCROLL TO TOP
            </span>
          </button>

          {/* Policies & Official FBGH Rental Policy Modal Trigger */}
          <div className="order-3 flex flex-wrap items-center justify-center gap-4 sm:gap-5 font-mono">
            <button
              type="button"
              onClick={() => setShowPolicyModal(true)}
              className="hover:text-[#E0A852] text-[#E0A852] transition-colors cursor-pointer inline-flex items-center gap-1.5 font-bold tracking-wider"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#E0A852]" />
              <span>RENTAL POLICY</span>
            </button>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">TERMS</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">DISCRETION PROTOCOL</span>
          </div>

        </div>

      </div>

      {/* Official FBGH Rental Car Policy Modal */}
      <RentalPolicyModal
        isOpen={showPolicyModal}
        onClose={() => setShowPolicyModal(false)}
      />
    </footer>
  );
};