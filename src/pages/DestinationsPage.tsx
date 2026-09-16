import React from 'react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { Compass, Phone } from 'lucide-react';
import { CurvedHero } from '../components/common/CurvedHero';
import { CurvedDivider } from '../components/common/CurvedDivider';
import { useSubtleParallax } from '../hooks/useSubtleParallax';

interface DestinationsPageProps {
  onOpenBooking: () => void;
}

const DestinationCard: React.FC<{ dest: (typeof DESTINATIONS_DATA)[0]; onOpenBooking?: () => void }> = ({
  dest,
}) => {
  const [imgRef, parallaxY] = useSubtleParallax<HTMLImageElement>({ speed: 0.11, maxOffset: 65 });

  return (
    <div className="bg-white border border-[#E8E2D6] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center group hover:border-[#C5A059]/70 hover:shadow-2xl transition-all duration-500 rounded-xl shadow-sm">
      <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden">
        <img
          ref={imgRef}
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover luminous-media will-change-transform"
          style={{
            transform: `translate3d(0, ${parallaxY}px, 0) scale(1.08)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1 border border-white/20 text-[10px] font-mono text-[#E0A852] tracking-widest rounded">
          <Compass className="w-3 h-3" />
          <span>{dest.coordinates}</span>
        </div>
      </div>

      <div className="lg:col-span-6 p-6 sm:p-10 space-y-5 sm:space-y-6">
        <div className="space-y-1">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase font-bold">
            {dest.subtitle}
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#141416] tracking-tight">
            {dest.name}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-[#55555C] leading-relaxed font-light">
          {dest.description}
        </p>

        <div className="space-y-2.5 pt-2 border-t border-[#E8E2D6]">
          <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold block">
            POPULAR CORRIDORS & ESTIMATES
          </span>
          <div className="space-y-2">
            {dest.popularRoutes.map((route, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs p-3 bg-[#FAF8F5] border border-[#E8E2D6] gap-1 sm:gap-0 rounded-md">
                <div className="flex items-center gap-2 text-[#141416] font-medium">
                  <span>{route.from}</span>
                  <span className="text-[#C5A059] font-bold">→</span>
                  <span>{route.to}</span>
                </div>
                <div className="flex items-center gap-3 text-[#6A6A75] font-mono text-[11px]">
                  <span>{route.typicalDuration}</span>
                  <span className="text-[#C5A059] font-bold">{route.startingRate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="w-full bg-[#FAF8F5] text-ink-black">
      {/* 1. HERO: CURVED S-CURVE HERO — CRISP DAYLIGHT SKYLINE */}
      <CurvedHero
        eyebrow="REGIONAL & GLOBAL COVERAGE"
        titleLine1="DESTINATIONS &"
        titleLine2="TRAVEL CORRIDORS."
        description="Flawless navigation across New York, Philadelphia, major private aviation FBOs, and regional coastal estates."
        image="https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1920&auto=format&fit=crop"
        imageAlt="Metropolitan Destination Map Panorama"
        curveVariant="s-curve"
        theme="light"
      />

      {/* 2. DESTINATIONS CARDS GALLERY */}
      <section className="max-w-7xl mx-auto px-5 sm:px-12 lg:px-20 py-16 sm:py-24 space-y-12 sm:space-y-16">
        {DESTINATIONS_DATA.map((dest) => (
          <DestinationCard key={dest.id} dest={dest} onOpenBooking={onOpenBooking} />
        ))}
      </section>

      {/* TRANSITION TO CUSTOM CORRIDOR SECTION */}
      <CurvedDivider
        variant="gentle-wave"
        fromColor="#FAF8F5"
        toColor="#0E0C0A"
        height="clamp(45px, 6vw, 90px)"
      />

      <section className="w-full bg-[#0E0C0A] py-20 px-6 text-center space-y-4">
        <div className="max-w-4xl mx-auto space-y-5">
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F4EDE4] tracking-tight">
            Looking for a custom inter-city corridor?
          </h3>
          <p className="text-xs sm:text-sm text-white/60 max-w-lg mx-auto leading-relaxed font-light">
            We service bespoke routes between Washington D.C., Boston, the Hamptons, and private airfields.
          </p>
          <div className="pt-2">
            <a
              href="tel:9295650100"
              className="pb-btn pb-btn-outline !px-8 !py-3.5 !text-xs !border-white/20 !text-warm-ivory hover:!border-[#C5A059] hover:!text-[#C5A059] inline-flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>CALL CONCIERGE: (929) 565-0100</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
