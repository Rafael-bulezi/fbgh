import React, { useRef } from "react";
import {
  ArrowRight, ArrowDown
} from "lucide-react";
import { ServicePageServiceCategory } from "../components/services/ServicePageServiceCategory";
import { CurvedHero } from "../components/common/CurvedHero";
import { CurvedDivider } from "../components/common/CurvedDivider";
import { useSubtleParallax } from "../hooks/useSubtleParallax";

interface ServicesPageProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigate?: (page: string) => void;
}

const FLEET_CATEGORIES = [
  { id: "sedan", label: "LUXURY SEDANS", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=600&auto=format&fit=crop" },
  { id: "suv", label: "LUXURY SUVS", img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop" },
  { id: "van", label: "EXECUTIVE VANS", img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=600&auto=format&fit=crop" },
  { id: "specialty", label: "SPECIALTY VEHICLES", img: "https://images.unsplash.com/photo-1632245889029-e406faaa34cd?q=80&w=600&auto=format&fit=crop" },
];

const JOURNEY_STEPS = [
  {
    num: "01",
    title: "TELL US",
    desc: "Submit your route, time, party size and vehicle preferences.",
  },
  {
    num: "02",
    title: "WE MATCH",
    desc: "Immediate availability confirmation and vehicle reservation.",
  },
  {
    num: "03",
    title: "WE PREPARE",
    desc: "Vehicle sanitized, pre-cooled, and staged 15 minutes ahead.",
  },
  {
    num: "04",
    title: "WE ARRIVE",
    desc: "Your chauffeur meets you curbside or terminal with porterage.",
  },
  {
    num: "05",
    title: "YOU ARRIVE",
    desc: "Relax in total acoustic and climate-controlled sanctuary.",
  },
];

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking, onNavigate }) => {
  const categoryRef = useRef<HTMLDivElement>(null);
  const [readyImgRef, readyParallaxY] = useSubtleParallax<HTMLImageElement>({ speed: 0.05, maxOffset: 25 });

  const scrollToCategories = () => {
    const el = document.getElementById("service-categories");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full bg-[#08080A] text-[#F4F1EA] selection:bg-champagne-gold selection:text-obsidian">

      {/* ── 1. HERO: CINEMATIC CHAUFFEUR HOSPITALITY ───────────── */}
      <CurvedHero
        eyebrow="SERVICES"
        titleLine1="YOUR JOURNEY,"
        titleLine2="OUR SERVICE."
        description="Airport transfers, executive travel, hourly chauffeur service, private events and journeys between cities. Whatever the occasion, FBGH delivers effortless mobility and flawless discretion."
        image="https://res.cloudinary.com/dv9jpkgrs/image/upload/v1788494961/ChatGPT_Image_Sep_4_2026_04_42_01_AM_dbjdk1.png"
        imageAlt="Luxury chauffeur opening door for executive passenger"
        curveVariant="circular-arc"
        theme="light"
        primaryCta={{
          label: 'REQUEST A RIDE',
          onClick: () => onOpenBooking(),
        }}
        secondaryCta={{
          label: 'EXPLORE SERVICES',
          onClick: scrollToCategories,
          icon: <ArrowDown className="w-3.5 h-3.5" />,
        }}
      />

      {/* ── TRANSITION: HERO TO CATEGORIES ── */}
      <CurvedDivider
        variant="circular-arc"
        fromColor="#FAF8F5"
        toColor="#08080A"
        height="clamp(40px, 5vw, 80px)"
      />

      {/* ── 2. DEDICATED SERVICE CATEGORY SHOWCASE COMPONENT ────── */}
      <div ref={categoryRef}>
        <ServicePageServiceCategory
          onOpenBooking={onOpenBooking}
          onNavigate={onNavigate}
        />
      </div>

      {/* ── TRANSITION: CATEGORIES TO TIMELINE ── */}
      <CurvedDivider
        variant="s-curve"
        fromColor="#08080A"
        toColor="#FAF8F5"
        flip
        height="clamp(40px, 5vw, 80px)"
      />

      {/* ── 3. FROM REQUEST TO ARRIVAL: REFINED TIMELINE (CRISP WARM IVORY) ── */}
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
              We orchestrate every detail in advance so you enjoy an uninterrupted journey.
            </p>
          </div>

          {/* Minimalist 5-Step Process Track */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative">
            {JOURNEY_STEPS.map((step) => (
              <div key={step.num} className="space-y-3 relative group">
                {/* Step Index Numeral & Top Rule */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6] group-hover:border-[#C5A059] transition-colors">
                  <span className="font-mono text-sm font-bold text-[#C5A059]">
                    {step.num}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/40 group-hover:bg-[#C5A059] transition-colors" />
                </div>

                <h4 className="font-display font-bold text-lg text-[#141416] tracking-tight uppercase group-hover:text-[#C5A059] transition-colors">
                  {step.title}
                </h4>

                <p className="text-xs text-[#55555C] leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── TRANSITION: TIMELINE TO READY WHEN YOU ARE ── */}
      <CurvedDivider
        variant="gentle-wave"
        fromColor="#FAF8F5"
        toColor="#0E0C0A"
        height="clamp(40px, 5vw, 80px)"
      />

      {/* ── 4. READY WHEN YOU ARE + FLEET PREVIEW ─────────────── */}
      <section className="bg-obsidian border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">

          {/* Left: READY WHEN YOU ARE. */}
          <div className="relative p-8 sm:p-14 flex flex-col justify-between overflow-hidden min-h-[440px]">
            <img
              ref={readyImgRef}
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
              alt="Executive silhouette looking over city skyline at dusk"
              className="absolute inset-0 w-full h-full object-cover luminous-media opacity-40 will-change-transform"
              style={{
                transform: `translate3d(0, ${readyParallaxY}px, 0) scale(1.06)`,
                transition: 'transform 0.1s ease-out',
              }}
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
                onClick={() => onOpenBooking()}
                className="pb-btn pb-btn-primary"
              >
                <span>REQUEST A RIDE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: THE RIGHT FLEET FOR EVERY JOURNEY */}
          <div className="p-8 sm:p-14 flex flex-col justify-between space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.3em] text-champagne-gold uppercase">
                THE FLEET
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F4EDE4] tracking-tight">
                THE RIGHT FLEET FOR EVERY JOURNEY
              </h3>
              <p className="text-xs text-muted-gray leading-relaxed max-w-md">
                From luxury sedans to executive vans, choose the level of comfort and capacity you prefer.
              </p>
            </div>

            {/* 4 Vehicle Categories */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {FLEET_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => onNavigate?.("fleet")}
                  className="group cursor-pointer space-y-2 text-center"
                >
                  <div className="aspect-[4/3] bg-soft-black border border-white/10 rounded-sm overflow-hidden p-2 flex items-center justify-center group-hover:border-champagne-gold/60 transition-all duration-300">
                    <img
                      src={cat.img}
                      alt={cat.label}
                      className="w-full h-full object-cover luminous-media opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 rounded-sm"
                    />
                  </div>
                  <div className="text-[9px] font-mono tracking-wider text-warm-ivory uppercase group-hover:text-champagne-gold transition-colors">
                    {cat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Fleet Page Navigation Link */}
            <div>
              <button
                onClick={() => onNavigate?.("fleet")}
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
