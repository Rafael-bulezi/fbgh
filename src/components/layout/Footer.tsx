import React, { useState } from 'react';
import { Phone, Mail, MapPin, ArrowUp, ShieldCheck } from 'lucide-react';
import { RentalPolicyModal } from '../common/RentalPolicyModal';

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
          
          {/* Big, Very Big Centered Golden Monogram Crest — Direct SVG without circle */}
          <div
            onClick={scrollToTop}
            className="relative mb-6 sm:mb-8 cursor-pointer group flex items-center justify-center"
            title="Faith Based Global Holdings"
          >
            <svg
              viewBox="0 0 1599 1599"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Faith Based Global Holdings Logo"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 drop-shadow-[0_4px_30px_rgba(224,168,82,0.4)] transition-transform duration-500 group-hover:scale-105"
            >
              <path
                fill="#E0A852"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M 1171.00,392.00 L 1103.00,340.00 L 1023.00,314.00 L 364.00,310.00 L 364.00,327.00 L 421.00,341.00 L 441.00,384.00 L 440.00,1103.00 L 418.00,1146.00 L 365.00,1160.00 L 364.00,1178.00 L 646.00,1178.00 L 645.00,1158.00 L 591.00,1146.00 L 568.00,1111.00 L 568.00,726.00 L 703.00,733.00 L 738.00,758.00 L 749.00,782.00 L 737.00,1147.00 L 724.00,1183.00 L 672.00,1208.00 L 672.00,1221.00 L 1050.00,1216.00 L 1143.00,1191.00 L 1218.00,1142.00 L 1266.00,1078.00 L 1293.00,995.00 L 1292.00,896.00 L 1270.00,836.00 L 1230.00,784.00 L 1167.00,739.00 L 1119.00,721.00 L 985.00,706.00 L 1106.00,682.00 L 1186.00,611.00 L 1208.00,559.00 L 1213.00,500.00 L 1203.00,448.00 L 1171.00,392.00 Z M 1055.00,741.00 L 1089.00,759.00 L 1121.00,789.00 L 1146.00,830.00 L 1160.00,872.00 L 1166.00,908.00 L 1166.00,961.00 L 1156.00,1017.00 L 1140.00,1063.00 L 1104.00,1119.00 L 1071.00,1149.00 L 1033.00,1170.00 L 983.00,1185.00 L 954.00,1189.00 L 944.00,1187.00 L 943.00,1190.00 L 886.00,1191.00 L 856.00,1184.00 L 835.00,1161.00 L 830.00,1145.00 L 825.00,1099.00 L 814.00,865.00 L 815.00,824.00 L 825.00,786.00 L 838.00,764.00 L 860.00,744.00 L 876.00,735.00 L 909.00,726.00 L 983.00,725.00 L 1026.00,732.00 L 1055.00,741.00 Z M 791.00,654.00 L 793.00,656.00 L 794.00,663.00 L 796.00,666.00 L 798.00,674.00 L 810.00,690.00 L 815.00,694.00 L 828.00,701.00 L 840.00,704.00 L 847.00,704.00 L 849.00,706.00 L 847.00,708.00 L 836.00,709.00 L 825.00,713.00 L 809.00,724.00 L 802.00,733.00 L 794.00,751.00 L 793.00,759.00 L 790.00,763.00 L 788.00,761.00 L 785.00,746.00 L 778.00,731.00 L 764.00,716.00 L 765.00,715.00 L 762.00,716.00 L 755.00,712.00 L 752.00,712.00 L 750.00,710.00 L 742.00,708.00 L 731.00,708.00 L 729.00,706.00 L 731.00,704.00 L 743.00,704.00 L 754.00,701.00 L 771.00,691.00 L 781.00,679.00 L 788.00,658.00 L 791.00,654.00 Z M 1069.00,424.00 L 1082.00,456.00 L 1089.00,493.00 L 1090.00,532.00 L 1085.00,569.00 L 1062.00,627.00 L 1036.00,657.00 L 1017.00,670.00 L 982.00,683.00 L 951.00,687.00 L 907.00,685.00 L 869.00,674.00 L 848.00,660.00 L 827.00,635.00 L 815.00,609.00 L 805.00,559.00 L 776.00,559.00 L 757.00,631.00 L 741.00,655.00 L 721.00,672.00 L 678.00,685.00 L 577.00,685.00 L 566.00,681.00 L 568.00,344.00 L 837.00,345.00 L 879.00,353.00 L 931.00,377.00 L 931.00,341.00 L 955.00,341.00 L 991.00,352.00 L 1026.00,372.00 L 1052.00,398.00 L 1069.00,424.00 Z"
              />
            </svg>
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