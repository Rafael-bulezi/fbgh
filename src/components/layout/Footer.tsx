import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import { useSubtleParallax } from '../../hooks/useSubtleParallax';

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
  const [footerImgRef, footerParallaxY] = useSubtleParallax<HTMLImageElement>({
    speed: 0.04,
    maxOffset: 24,
  });

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
      {/* ── 00. CURVED HERO INTEGRATION: TOP WAVE CURVE & CINEMATIC BACKDROP ── */}
      {/* Top Wave Curve Transition */}
      <div className="absolute top-0 inset-x-0 overflow-hidden leading-none z-20 pointer-events-none -translate-y-[1px]">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="w-full h-10 sm:h-14 text-[#08080A] fill-current">
          <path d="M0,0 L1440,0 L1440,24 C1180,60 920,8 680,38 C440,68 200,12 0,42 Z" />
        </svg>
      </div>

      {/* Cinematic Parallax Photography Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <img
          ref={footerImgRef}
          src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1920&auto=format&fit=crop"
          alt="Faith Based Global Holdings Fleet"
          className="w-full h-full object-cover object-center will-change-transform scale-105 opacity-[0.14]"
          style={{
            transform: `translate3d(0, ${footerParallaxY}px, 0) scale(1.04)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0A08]/90 via-[#0D0A08]/80 to-[#060504]" />
      </div>

      {/* Luminous Champagne Hairline Top Border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E0A852]/50 to-transparent z-20" />
      <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-[#E0A852]/[0.03] to-transparent pointer-events-none" />

      {/* Exquisite Architectural Micro-Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
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
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] pointer-events-none opacity-35 blur-[120px]"
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

      <div className="max-w-7xl mx-auto w-full space-y-16 sm:space-y-20 relative z-10">
        
        {/* ── 01. MONUMENTAL HEADLINE AREA WITH BIG CENTERED LOGO ──────── */}
        <div className="text-center flex flex-col items-center justify-center footer-shimmer-trigger pt-4 sm:pt-6">
          
          {/* Subtle Eyebrow */}
          <span className="font-display text-[10.5px] sm:text-xs tracking-[0.38em] uppercase text-white/50 mb-6 sm:mb-8 font-semibold">
            CHOOSE YOUR JOURNEY
          </span>

          {/* Big, Very Big Centered Golden Monogram Crest */}
          <div
            onClick={scrollToTop}
            className="relative mb-6 sm:mb-8 cursor-pointer group"
            title="Faith Based Global Holdings"
          >
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-b from-[#241c15] to-[#120e0b] border border-[#E0A852]/50 flex items-center justify-center shadow-[0_0_50px_rgba(224,168,82,0.3)] group-hover:scale-105 group-hover:border-[#E0A852] transition-all duration-500 backdrop-blur-md">
              <svg
                width="84"
                height="84"
                viewBox="0 0 1599 1599"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Faith Based Global Holdings Logo"
                className="w-14 h-14 sm:w-20 sm:h-20 md:w-22 md:h-22 drop-shadow-[0_4px_24px_rgba(224,168,82,0.5)] transition-transform duration-500 group-hover:scale-105"
              >
                <path
                  fill="#E0A852"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M 1171.00,392.00 L 1103.00,340.00 L 1023.00,314.00 L 364.00,310.00 L 364.00,327.00 L 421.00,341.00 L 441.00,384.00 L 440.00,1103.00 L 418.00,1146.00 L 365.00,1160.00 L 364.00,1178.00 L 646.00,1178.00 L 645.00,1158.00 L 591.00,1146.00 L 568.00,1111.00 L 568.00,726.00 L 703.00,733.00 L 738.00,758.00 L 749.00,782.00 L 737.00,1147.00 L 724.00,1183.00 L 672.00,1208.00 L 672.00,1221.00 L 1050.00,1216.00 L 1143.00,1191.00 L 1218.00,1142.00 L 1266.00,1078.00 L 1293.00,995.00 L 1292.00,896.00 L 1270.00,836.00 L 1230.00,784.00 L 1167.00,739.00 L 1119.00,721.00 L 985.00,706.00 L 1106.00,682.00 L 1186.00,611.00 L 1208.00,559.00 L 1213.00,500.00 L 1203.00,448.00 L 1171.00,392.00 Z M 1055.00,741.00 L 1089.00,759.00 L 1121.00,789.00 L 1146.00,830.00 L 1160.00,872.00 L 1166.00,908.00 L 1166.00,961.00 L 1156.00,1017.00 L 1140.00,1063.00 L 1104.00,1119.00 L 1071.00,1149.00 L 1033.00,1170.00 L 983.00,1185.00 L 954.00,1189.00 L 944.00,1187.00 L 943.00,1190.00 L 886.00,1191.00 L 856.00,1184.00 L 835.00,1161.00 L 830.00,1145.00 L 825.00,1099.00 L 814.00,865.00 L 815.00,824.00 L 825.00,786.00 L 838.00,764.00 L 860.00,744.00 L 876.00,735.00 L 909.00,726.00 L 983.00,725.00 L 1026.00,732.00 L 1055.00,741.00 Z M 791.00,654.00 L 793.00,656.00 L 794.00,663.00 L 796.00,666.00 L 798.00,674.00 L 810.00,690.00 L 815.00,694.00 L 828.00,701.00 L 840.00,704.00 L 847.00,704.00 L 849.00,706.00 L 847.00,708.00 L 836.00,709.00 L 825.00,713.00 L 809.00,724.00 L 802.00,733.00 L 794.00,751.00 L 793.00,759.00 L 790.00,763.00 L 788.00,761.00 L 785.00,746.00 L 778.00,731.00 L 764.00,716.00 L 765.00,715.00 L 762.00,716.00 L 755.00,712.00 L 752.00,712.00 L 750.00,710.00 L 742.00,708.00 L 731.00,708.00 L 729.00,706.00 L 731.00,704.00 L 743.00,704.00 L 754.00,701.00 L 771.00,691.00 L 781.00,679.00 L 788.00,658.00 L 791.00,654.00 Z M 1069.00,424.00 L 1082.00,456.00 L 1089.00,493.00 L 1090.00,532.00 L 1085.00,569.00 L 1062.00,627.00 L 1036.00,657.00 L 1017.00,670.00 L 982.00,683.00 L 951.00,687.00 L 907.00,685.00 L 869.00,674.00 L 848.00,660.00 L 827.00,635.00 L 815.00,609.00 L 805.00,559.00 L 776.00,559.00 L 757.00,631.00 L 741.00,655.00 L 721.00,672.00 L 678.00,685.00 L 577.00,685.00 L 566.00,681.00 L 568.00,344.00 L 837.00,345.00 L 879.00,353.00 L 931.00,377.00 L 931.00,341.00 L 955.00,341.00 L 991.00,352.00 L 1026.00,372.00 L 1052.00,398.00 L 1069.00,424.00 Z"
                />
              </svg>
            </div>
          </div>

          {/* Refined Headline Hierarchy: Faith Based (compact display) & Global Holdings (smaller & gold) */}
          <div
            onClick={scrollToTop}
            className="group relative flex flex-col items-center cursor-pointer px-4 select-none"
            title="Faith Based Global Holdings"
          >
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase leading-[1.05] text-[#F4EDE4] text-center">
              FAITH BASED
            </h2>
            <span className="font-display text-lg sm:text-2xl md:text-3xl lg:text-4xl tracking-[0.25em] font-bold text-[#E0A852] uppercase mt-1 sm:mt-2 text-center">
              GLOBAL HOLDINGS
            </span>
          </div>

          {/* ── 02. INTERACTIVE PILL SWITCHER ───────────────────────────────── */}
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