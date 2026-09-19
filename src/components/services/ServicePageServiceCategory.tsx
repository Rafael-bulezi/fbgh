import React, { useState } from "react";
import {
  Plane, Briefcase, Clock, CalendarDays, Map,
  ArrowRight, Check, ChevronRight
} from "lucide-react";

interface ServicePageServiceCategoryProps {
  onOpenBooking: (serviceId?: string) => void;
  onNavigate?: (page: string) => void;
}

interface ServiceCategoryItem {
  id: string;
  num: string;
  title: string;
  shortLabel: string;
  icon: React.ElementType;
  tag: string;
  image: string;
  headline: string;
  summary: string;
  description: string;
  rate: string;
  features: string[];
  vehicle: string;
  location: string;
}

const SERVICE_TIERS: ServiceCategoryItem[] = [
  {
    id: "airport",
    num: "01",
    title: "Airport Transfers",
    shortLabel: "Airport",
    icon: Plane,
    tag: "Flight-Aware Radar Telemetry",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=1600&auto=format&fit=crop",
    headline: "Seamless arrivals. Every runway.",
    summary: "Commercial terminal meet-and-greet & private FBO tarmac escort with live FAA radar tracking.",
    description: "Live FAA flight telemetry tracks your inbound journey in real time. Your chauffeur is staged curbside 15 minutes before touchdown, greeting you inside the terminal with baggage porterage and chilled spring water.",
    rate: "$165 flat",
    features: [
      "Live flight radar monitoring",
      "Terminal meet & greet with placard",
      "60-min complimentary wait buffer",
      "Direct private FBO tarmac access"
    ],
    vehicle: "Cadillac Escalade ESV · Mercedes-Benz S 580",
    location: "JFK · LGA · EWR · PHL · TEB FBO"
  },
  {
    id: "executive",
    num: "02",
    title: "Executive Travel",
    shortLabel: "Executive",
    icon: Briefcase,
    tag: "Acoustic Boardroom Sanctuary",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop",
    headline: "A mobile boardroom. Always ready.",
    summary: "Confidential corporate transportation for C-suite roadshows, meetings and high-stakes travel.",
    description: "Acoustically insulated passenger cabins equipped with encrypted Wi-Fi, 110V AC power, and privacy partitions. Chauffeurs operate under strict non-disclosure agreements for complete boardroom confidentiality.",
    rate: "$140 / hr",
    features: [
      "Strict NDA chauffeur protocol",
      "Acoustic privacy partition & glass",
      "High-speed encrypted onboard Wi-Fi",
      "Multi-stop financial roadshow logistics"
    ],
    vehicle: "Mercedes Sprinter Jet Lounge · BMW 760i",
    location: "Manhattan · Center City Philadelphia · Financial Corridors"
  },
  {
    id: "hourly",
    num: "03",
    title: "Hourly Chauffeur",
    shortLabel: "Hourly",
    icon: Clock,
    tag: "Curbside Dedicated Standby",
    image: "https://res.cloudinary.com/dv9jpkgrs/image/upload/v1788494961/ChatGPT_Image_Sep_4_2026_04_42_01_AM_dbjdk1.png",
    headline: "Your chauffeur. On your schedule.",
    summary: "Continuous vehicle and driver standby with unlimited stops and zero peak pricing multipliers.",
    description: "Enjoy complete freedom of movement. Whether moving between boutique meetings, dining, or evening appointments, your chauffeur remains staged curbside, instantly responsive via direct line or concierge dispatch.",
    rate: "$125 / hr (3-hr min)",
    features: [
      "Unlimited stops within service corridor",
      "Immediate curbside response on call",
      "Zero peak surge price multipliers",
      "Dedicated personal chauffeur all day"
    ],
    vehicle: "Kia Carnival VIP · Mercedes-Maybach GLS 600",
    location: "New York Metro · Greater Philadelphia"
  },
  {
    id: "event",
    num: "04",
    title: "Events & Occasions",
    shortLabel: "Events",
    icon: CalendarDays,
    tag: "Black-Tie Red Carpet Protocol",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1600&auto=format&fit=crop",
    headline: "Arrive in formation. Leave in style.",
    summary: "Pristine motorcade arrivals, red carpet positioning, and synchronized multi-vehicle logistics.",
    description: "From high-society galas and private weddings to premieres and black-tie galas, we deliver synchronized multi-vehicle convoys, white-glove door opening, and umbrella escort service for an indelible entrance.",
    rate: "$175 / hr",
    features: [
      "Synchronized convoy logistics",
      "VIP red-carpet perimeter staging",
      "White-glove door opening & umbrella escort",
      "Pristine evening detailing"
    ],
    vehicle: "Rolls-Royce Ghost · Rolls-Royce Cullinan · Jet Sprinter",
    location: "Met Gala · Lincoln Center · Academy of Music · Estates"
  },
  {
    id: "city",
    num: "05",
    title: "City-to-City Travel",
    shortLabel: "City-to-City",
    icon: Map,
    tag: "Interstate Non-Stop Sanctuary",
    image: "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=1600&auto=format&fit=crop",
    headline: "New York. Philadelphia. Beyond.",
    summary: "Door-to-door direct interstate travel in reclining executive comfort without airport friction.",
    description: "Bypass regional rail hubs and crowded commercial security lines. Travel door-to-door within New York City and Philadelphia in a tranquil, reclining private cabin.",
    rate: "$480 fixed corridor",
    features: [
      "Direct door-to-door interstate transit",
      "Zero luggage limits or security queues",
      "Power reclining captain chairs with massage",
      "All turnpike tolls & fees included"
    ],
    vehicle: "Cadillac Escalade ESV · Lincoln Navigator L",
    location: "NYC ⇄ Philadelphia"
  }
];

export const ServicePageServiceCategory: React.FC<ServicePageServiceCategoryProps> = ({
  onOpenBooking,
  onNavigate
}) => {
  const [activeId, setActiveId] = useState<string>("airport");

  const currentTier = SERVICE_TIERS.find((t) => t.id === activeId) || SERVICE_TIERS[0];

  return (
    <section id="service-categories" className="w-full bg-[#08080A] text-[#F4F1EA] py-20 sm:py-28 px-6 sm:px-12 lg:px-20 border-b border-white/10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#C5A059]/[0.05] to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        
        {/* ── Section Header ────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#C5A059]" />
              <span className="text-[10px] font-mono tracking-[0.35em] text-[#C5A059] uppercase font-medium">
                SERVICE DISCIPLINES
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#F4EDE4] tracking-tight leading-[1.04]">
              Tailored for every occasion.
            </h2>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-xl font-light">
              Select a mobility tier below to explore tailored vehicle assignments, protocol standards, and transparent corridor rates.
            </p>
          </div>

          <button
            onClick={() => onNavigate?.("fleet")}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#E0B268] uppercase hover:text-white transition-colors cursor-pointer self-start md:self-end group"
          >
            <span>VIEW FLEET SPECIFICATIONS</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* ── Editorial Interactive Split: Typographic Menu & Cinematic Canvas ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left: Clean Typographic Accordion List (Zero chunky boxes!) */}
          <div className="lg:col-span-6 space-y-2">
            {SERVICE_TIERS.map((tier) => {
              const isActive = tier.id === activeId;
              const Icon = tier.icon;

              return (
                <div
                  key={tier.id}
                  onClick={() => setActiveId(tier.id)}
                  className={`transition-all duration-300 border-b border-white/10 cursor-pointer ${
                    isActive ? "py-6" : "py-4 hover:border-white/30"
                  }`}
                >
                  {/* Header Row */}
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className={`font-mono text-xs sm:text-sm transition-colors ${
                        isActive ? "text-[#E0B268] font-bold" : "text-white/40 group-hover:text-white"
                      }`}>
                        {tier.num}
                      </span>
                      
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 transition-colors ${
                          isActive ? "text-[#E0B268]" : "text-white/40 group-hover:text-[#E0B268]"
                        }`} />
                        <h3 className={`font-display font-bold text-xl sm:text-2xl lg:text-3xl uppercase tracking-tight transition-colors ${
                          isActive ? "text-[#F4EDE4]" : "text-white/60 group-hover:text-white"
                        }`}>
                          {tier.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-[#E0B268] font-medium hidden sm:inline-block">
                        {tier.rate}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                        isActive ? "rotate-90 text-[#E0B268]" : "text-white/30 group-hover:text-white"
                      }`} />
                    </div>
                  </div>

                  {/* Expanded Content Drawer */}
                  {isActive && (
                    <div className="pt-5 pl-4 sm:pl-12 space-y-5 animate-fadeIn">
                      <p className="font-sans text-base sm:text-lg text-[#E0B268] font-medium">
                        {tier.headline}
                      </p>

                      <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-light">
                        {tier.description}
                      </p>

                      {/* Key Protocol Features */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                        {tier.features.map((feat) => (
                          <div key={feat} className="flex items-start gap-2 text-xs text-white/90">
                            <Check className="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Fleet Assignment & Route */}
                      <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-white/60">
                        <div>
                          <span className="text-[#C5A059] font-mono font-medium">VEHICLE: </span>
                          <span>{tier.vehicle}</span>
                        </div>
                        <div>
                          <span className="text-[#C5A059] font-mono font-medium">CORRIDOR: </span>
                          <span>{tier.location}</span>
                        </div>
                      </div>

                      {/* Primary Action Button using .pb-btn-primary with authentic button shimmer! */}
                      <div className="pt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenBooking(tier.id);
                          }}
                          className="pb-btn pb-btn-primary w-full sm:w-auto"
                        >
                          <span>REQUEST THIS SERVICE</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: The Cinematic Canvas (Single large image, zero mini-cards clutter!) */}
          <div className="lg:col-span-6 sticky top-28">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full rounded-sm overflow-hidden border border-white/15 shadow-2xl bg-[#121215]">
              
              <img
                key={currentTier.id}
                src={currentTier.image}
                alt={currentTier.title}
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
              />

              {/* Refined Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#08080A]/40 via-transparent to-transparent" />

              {/* Live Status Badge */}
              <div className="absolute top-5 left-5">
                <div className="inline-flex items-center gap-2 bg-[#08080A]/85 backdrop-blur-md border border-[#C5A059]/40 px-3.5 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] tracking-[0.25em] text-[#F4F1EA] uppercase font-medium">
                    {currentTier.tag}
                  </span>
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
                <div className="bg-[#08080A]/85 backdrop-blur-md border border-white/15 px-4 py-3 rounded-sm max-w-xs">
                  <div className="font-mono text-[9px] tracking-[0.25em] text-[#C5A059] uppercase font-semibold">
                    DISPATCH ACTIVE
                  </div>
                  <div className="font-display font-bold text-sm text-[#F4EDE4] uppercase tracking-wide mt-0.5">
                    {currentTier.title}
                  </div>
                  <div className="font-mono text-[10px] text-white/50 mt-0.5">
                    {currentTier.location}
                  </div>
                </div>

                <div className="bg-[#08080A]/85 backdrop-blur-md border border-white/15 px-3 py-2 rounded-sm text-right">
                  <div className="font-mono text-[9px] text-[#C5A059] tracking-wider uppercase">
                    RATES FROM
                  </div>
                  <div className="font-mono text-sm font-semibold text-white">
                    {currentTier.rate}
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
