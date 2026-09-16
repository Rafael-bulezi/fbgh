import React from "react";
import { ArrowRight } from "lucide-react";
import { ServicePageServiceCategory } from "../components/services/ServicePageServiceCategory";
import { CurvedHero } from "../components/common/CurvedHero";
import { CurvedDivider } from "../components/common/CurvedDivider";

interface ServicesPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigate?: (page: string) => void;
}

const JOURNEY_STEPS = [
  { num: '01', title: 'REQUEST', desc: 'Book in seconds — online, phone, or email. We confirm fast.' },
  { num: '02', title: 'CONFIRM', desc: 'You get a full trip summary with driver details before the day.' },
  { num: '03', title: 'DISPATCH', desc: 'Your driver is on the road well ahead of time.' },
  { num: '04', title: 'ARRIVE', desc: 'We track your flight or schedule and adjust in real time.' },
  { num: '05', title: 'DELIVERED', desc: 'Door-to-door, on time, every single time.' },
];

const FLEET_CATEGORIES = [
  {
    id: 'sedan',
    label: 'LUXURY SEDANS',
    img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'suv',
    label: 'EXECUTIVE SUVs',
    img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'van',
    label: 'EXECUTIVE VANS',
    img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'maybach',
    label: 'ULTRA LUXURY',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop',
  },
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking, onNavigate }) => {
  return (
    <div className="w-full bg-[#08080A] text-[#F4F1EA] selection:bg-champagne-gold selection:text-obsidian">

      {/* ── 1. HERO ───────────────────────────────────────────────── */}
      <CurvedHero
        eyebrow="SERVICES"
        titleLine1="YOUR JOURNEY,"
        titleLine2="OUR SERVICE."
        description="Airport transfers, executive travel, hourly chauffeur, private events and city-to-city rides. Whatever the occasion, we've got you covered."
        image="https://res.cloudinary.com/dv9jpkgrs/image/upload/v1788494961/ChatGPT_Image_Sep_4_2026_04_42_01_AM_dbjdk1.png"
        imageAlt="Luxury chauffeur opening door for executive passenger"
        curveVariant="circular-arc"
        theme="light"
      />

      {/* ── TRANSITION: HERO → CATEGORIES ── */}
      <CurvedDivider
        variant="circular-arc"
        fromColor="#FAF8F5"
        toColor="#08080A"
        height="clamp(40px, 5vw, 80px)"
      />

      {/* ── 2. SERVICE CATEGORIES ──────────────────────────────────── */}
      <div>
        <ServicePageServiceCategory
          onOpenBooking={onOpenBooking}
          onNavigate={onNavigate}
        />
      </div>

      {/* ── TRANSITION: CATEGORIES → TIMELINE ── */}
      <CurvedDivider
        variant="s-curve"
        fromColor="#08080A"
        toColor="#FAF8F5"
        flip
        height="clamp(40px, 5vw, 80px)"
      />

      {/* ── 3. HOW IT WORKS ───────────────────────────────────────── */}
      <section className="bg-[#FAF8F5] text-ink-black py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E8E2D6] pb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#C5A059] uppercase font-bold">
                THE DISPATCH PROCESS
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#141416] tracking-tight">
                From Request To Arrival
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#55555C] max-w-md font-light">
              We handle every detail so your ride is always smooth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {JOURNEY_STEPS.map((step) => (
              <div key={step.num} className="space-y-3 group">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6] group-hover:border-[#C5A059] transition-colors">
                  <span className="font-mono text-sm font-bold text-[#C5A059]">{step.num}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/40 group-hover:bg-[#C5A059] transition-colors" />
                </div>
                <h4 className="font-display font-bold text-lg text-[#141416] tracking-tight uppercase group-hover:text-[#C5A059] transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs text-[#55555C] leading-relaxed font-light">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── TRANSITION: TIMELINE → READY SECTION ── */}
      <CurvedDivider
        variant="gentle-wave"
        fromColor="#FAF8F5"
        toColor="#0E0C0A"
        height="clamp(40px, 5vw, 80px)"
      />

      {/* ── 4. READY WHEN YOU ARE ─────────────────────────────────── */}
      <section className="bg-obsidian border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">

          {/* Left panel */}
          <div className="relative p-8 sm:p-14 flex flex-col justify-between overflow-hidden min-h-[440px]">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
              alt="Executive interior"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/70 to-transparent" />

            <div className="relative z-10 space-y-4 max-w-sm">
              <h2 className="font-display font-black text-4xl sm:text-6xl text-[#F4EDE4] leading-[0.95] tracking-tight">
                READY WHEN<br />
                <span className="text-[#E0B268]">YOU ARE.</span>
              </h2>
              <p className="text-xs sm:text-sm text-muted-gray leading-relaxed">
                Tell us where you're going. We'll take care of the rest.
              </p>
            </div>

            <div className="relative z-10 pt-8">
              <button
                onClick={() => onNavigate?.('fleet')}
                className="pb-btn pb-btn-primary inline-flex items-center gap-2"
              >
                <span>EXPLORE FLEET</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right panel */}
          <div className="p-8 sm:p-14 flex flex-col justify-between space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.3em] text-champagne-gold uppercase">
                THE FLEET
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F4EDE4] tracking-tight">
                THE RIGHT FLEET FOR EVERY JOURNEY
              </h3>
              <p className="text-xs text-muted-gray leading-relaxed max-w-md">
                From luxury sedans to executive vans — pick what fits.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {FLEET_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => onNavigate?.('fleet')}
                  className="group cursor-pointer space-y-2 text-center"
                >
                  <div className="aspect-[4/3] bg-soft-black border border-white/10 rounded-sm overflow-hidden p-2 flex items-center justify-center group-hover:border-champagne-gold/60 transition-all duration-300">
                    <img
                      src={cat.img}
                      alt={cat.label}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 rounded-sm"
                    />
                  </div>
                  <div className="text-[9px] font-mono tracking-wider text-warm-ivory uppercase group-hover:text-champagne-gold transition-colors">
                    {cat.label}
                  </div>
                </div>
              ))}
            </div>

            <div>
              <button
                onClick={() => onNavigate?.('fleet')}
                className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase hover:underline cursor-pointer"
              >
                <span>EXPLORE OUR FLEET</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
