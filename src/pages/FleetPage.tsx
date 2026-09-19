import React from 'react';
import { Phone } from 'lucide-react';
import { type Vehicle } from '../data/fleetData';
import { CurvedHero } from '../components/common/CurvedHero';
import { CurvedDivider } from '../components/common/CurvedDivider';
import { FleetObservatory } from '../components/fleet/FleetObservatory';

interface FleetPageProps {
  onBookVehicle?: (vehicle: Vehicle) => void;
  onOpenBooking?: () => void;
}

export const FleetPage: React.FC<FleetPageProps> = ({ onBookVehicle, onOpenBooking }) => {
  return (
    <div className="w-full bg-[#FAF8F5] text-ink-black select-none overflow-x-hidden">

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <CurvedHero
        eyebrow="THE PREMIER FLEET"
        titleLine1="MORE THAN"
        titleLine2="30 VEHICLES."
        description="Luxury sedans, SUVs, and executive vans—maintained and ready for your journey."
        image="/images/fleet-hero-banner.webp"
        imageAlt="Faith Based Global Holdings Fleet Lineup"
        curveVariant="sharp-diagonal"
        theme="light"
        mobileImagePosition="object-[62%_center]"
        imagePosition="object-center"
        minHeight="h-[54vh] min-h-[420px] max-h-[580px]"
      />

      {/* ── CURVE: IVORY → DARK ─────────────────────────────────────────────── */}
      <CurvedDivider
        variant="sharp-diagonal"
        fromColor="#FAF8F5"
        toColor="#0E0C0A"
        height="clamp(30px, 3.5vw, 55px)"
      />

      {/* ── 2. OBSERVATORY (100VH, 4 CARS, REFINED COPY, MARQUEE, BIGGER ICONS) ── */}
      <FleetObservatory onBookVehicle={onBookVehicle} onOpenBooking={onOpenBooking} />

      {/* ── CURVE: DARK → IVORY ─────────────────────────────────────────────── */}
      <CurvedDivider
        variant="s-curve"
        fromColor="#0E0C0A"
        toColor="#FAF8F5"
        height="clamp(35px, 4.5vw, 70px)"
      />

      {/* ── 3. CAN'T PICK A CAR? ────────────────────────────────────────────── */}
      <section className="w-full bg-[#FAF8F5] text-ink-black py-20 sm:py-28 px-6 sm:px-12 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-5 h-[1.5px] bg-[#C5A059]" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#967C52] font-bold">
              FLEET CONCIERGE
            </span>
            <span className="w-5 h-[1.5px] bg-[#C5A059]" />
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#141416] tracking-tight leading-[0.95]">
            CAN&apos;T PICK A CAR?
          </h1>

          <p className="text-base sm:text-lg text-[#555] font-normal leading-relaxed max-w-xl mx-auto">
            Give us a call and we will help you choose the right ride.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:2676424616"
              className="inline-flex items-center gap-3 bg-[#C5A059] hover:bg-[#B38D45] text-white px-8 py-4 rounded-xl text-base font-mono tracking-wider font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <Phone className="w-5 h-5" />
              <span>(267) 642-4616</span>
            </a>
          </div>

          <p className="text-xs font-mono text-[#8C887B] tracking-wider uppercase pt-1">
            Alternate: +1 (445) 867-1578
          </p>
        </div>
      </section>

      {/* ── CURVE TO FOOTER ─────────────────────────────────────────────────── */}
      <CurvedDivider
        variant="gentle-wave"
        fromColor="#FAF8F5"
        toColor="#0E0C0A"
        height="clamp(35px, 4vw, 60px)"
      />

    </div>
  );
};
