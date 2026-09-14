import React, { useRef } from "react";
import {
  ArrowRight, ArrowDown, Shield, Star
} from "lucide-react";
import { ServicePageServiceCategory } from "../components/services/ServicePageServiceCategory";

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

  const scrollToCategories = () => {
    const el = document.getElementById("service-categories");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full bg-[#08080A] text-[#F4F1EA] selection:bg-champagne-gold selection:text-obsidian">

      {/* ── 1. HERO: CINEMATIC CHAUFFEUR HOSPITALITY ───────────── */}
      <section className="relative min-h-[64vh] flex items-end overflow-hidden border-b border-white/10">
        <img
          src="https://res.cloudinary.com/dv9jpkgrs/image/upload/v1788494961/ChatGPT_Image_Sep_4_2026_04_42_01_AM_dbjdk1.png"
          alt="Luxury chauffeur opening door for executive passenger"
          className="absolute inset-0 w-full h-full object-cover object-center luminous-media opacity-95"
        />
        {/* Scrim: cinematic dark gradient preserving text legibility on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/90 via-obsidian/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-transparent to-obsidian/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-16 pt-36 w-full">
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-3">
              <span className="w-6 h-[1px] bg-champagne-gold" />
              <span className="text-[10px] font-mono tracking-[0.35em] text-champagne-gold uppercase font-medium text-contrast-eyebrow">
                SERVICES
              </span>
            </div>

            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-[80px] text-[#F4EDE4] leading-[0.95] tracking-tight text-contrast-title">
              YOUR JOURNEY,<br />
              <span className="text-[#E0B268]">OUR SERVICE.</span>
            </h1>

            <p className="text-sm sm:text-base text-warm-ivory/85 leading-relaxed text-contrast-body max-w-lg">
              Airport transfers, executive travel, hourly chauffeur service, private events and journeys between cities.
              Whatever the occasion, FBGH delivers effortless mobility and flawless discretion.
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-2">
              <button
                onClick={scrollToCategories}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 border border-champagne-gold text-champagne-gold text-[11px] tracking-[0.2em] uppercase font-sans font-medium hover:bg-champagne-gold hover:text-obsidian transition-all duration-300 group cursor-pointer"
              >
                <span>EXPLORE SERVICES</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onOpenBooking()}
                className="pb-btn pb-btn-primary"
              >
                <span>REQUEST A RIDE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Floating Trust Badge — Bottom Right */}
          <div className="absolute right-8 sm:right-16 bottom-12 hidden md:block bg-obsidian/80 backdrop-blur-md border border-white/10 p-5 rounded-sm max-w-xs shadow-2xl text-left">
            <div className="text-[9px] tracking-[0.25em] text-warm-ivory font-mono uppercase font-semibold leading-relaxed">
              DISCREET. PROFESSIONAL. ALWAYS ON TIME.
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-3 h-3 fill-champagne-gold text-champagne-gold" />
                ))}
              </div>
              <span className="text-xs font-mono text-warm-ivory font-semibold">5.0</span>
            </div>
            <div className="text-[10px] text-muted-gray mt-0.5">Client satisfaction rating</div>
          </div>
        </div>

        {/* Bottom Left Crest Emblem */}
        <div className="absolute bottom-6 left-8 sm:left-16 hidden lg:flex items-center gap-3 z-10 opacity-90">
          <div className="w-7 h-7 rounded-full border border-champagne-gold/60 flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-champagne-gold" />
          </div>
          <div>
            <div className="text-[8px] tracking-[0.25em] text-champagne-gold uppercase font-mono font-medium">
              PREMIUM TRANSPORTATION
            </div>
            <div className="text-[8px] tracking-[0.2em] text-warm-ivory/70 uppercase">
              NEW YORK · PHILADELPHIA · BEYOND
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. DEDICATED SERVICE CATEGORY SHOWCASE COMPONENT ────── */}
      <div ref={categoryRef}>
        <ServicePageServiceCategory
          onOpenBooking={onOpenBooking}
          onNavigate={onNavigate}
        />
      </div>

      {/* ── 3. FROM REQUEST TO ARRIVAL: REFINED TIMELINE (NO EMOJIS) ── */}
      <section className="bg-[#0C0C0E] border-b border-white/10 py-20 px-6 sm:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#C5A059] uppercase font-medium">
                THE DISPATCH PROCESS
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#F4EDE4] tracking-tight">
                From Request To Arrival
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/60 max-w-md font-light">
              We orchestrate every detail in advance so you enjoy an uninterrupted journey.
            </p>
          </div>

          {/* Minimalist 5-Step Process Track */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative">
            {JOURNEY_STEPS.map((step) => (
              <div key={step.num} className="space-y-3 relative group">
                {/* Step Index Numeral & Top Rule */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 group-hover:border-[#E0B268]/50 transition-colors">
                  <span className="font-mono text-sm font-semibold text-[#E0B268]">
                    {step.num}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#E0B268] transition-colors" />
                </div>

                <h4 className="font-display font-bold text-lg text-[#F4EDE4] tracking-tight uppercase group-hover:text-[#E0B268] transition-colors">
                  {step.title}
                </h4>

                <p className="text-xs text-white/60 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. READY WHEN YOU ARE + FLEET PREVIEW ─────────────── */}
      <section className="bg-obsidian border-b border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">

          {/* Left: READY WHEN YOU ARE. */}
          <div className="relative p-8 sm:p-14 flex flex-col justify-between overflow-hidden min-h-[440px]">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
              alt="Executive silhouette looking over city skyline at dusk"
              className="absolute inset-0 w-full h-full object-cover luminous-media opacity-40"
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
