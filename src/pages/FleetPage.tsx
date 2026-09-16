import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Briefcase,
  Fuel,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Shield,
  Phone,
  Images
} from 'lucide-react';
import { FLEET_DATA, type Vehicle } from '../data/fleetData';
import { CurvedHero } from '../components/common/CurvedHero';
import { CurvedDivider } from '../components/common/CurvedDivider';

interface FleetPageProps {
  onBookVehicle?: (vehicle: Vehicle) => void;
  onOpenBooking?: () => void;
}

// The main showcase vehicles — each maps to a real FLEET_DATA entry
const SHOWCASE: {
  vehicleId: string;
  mpg: string;
  exteriorPhoto: string;
  interiorPhoto: string;
  thumbImg: string;
}[] = [
  {
    vehicleId: 'cadillac-escalade-esv',
    mpg: 'UP TO 21 MPG',
    exteriorPhoto: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop',
    interiorPhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    thumbImg: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop',
  },
  {
    vehicleId: 'kia-carnival-vip',
    mpg: 'UP TO 26 MPG',
    exteriorPhoto: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
    interiorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    thumbImg: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop',
  },
  {
    vehicleId: 'mercedes-maybach-gls600',
    mpg: 'UP TO 20 MPG',
    exteriorPhoto: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop',
    interiorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    thumbImg: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop',
  },
  {
    vehicleId: 'range-rover-sv-long',
    mpg: 'UP TO 22 MPG',
    exteriorPhoto: 'https://images.unsplash.com/photo-1541348263662-e0c86629c983?q=80&w=1600&auto=format&fit=crop',
    interiorPhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    thumbImg: 'https://images.unsplash.com/photo-1541348263662-e0c86629c983?q=80&w=600&auto=format&fit=crop',
  },
  {
    vehicleId: 'mercedes-sprinter-jet-edition',
    mpg: 'UP TO 19 MPG',
    exteriorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    interiorPhoto: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
    thumbImg: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop',
  },
];

export const FleetPage: React.FC<FleetPageProps> = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [photoMode, setPhotoMode] = useState<'exterior' | 'interior'>('exterior');
  const [lightboxVehicle, setLightboxVehicle] = useState<Vehicle | null>(null);

  const mainImgRef = useRef<HTMLDivElement>(null);

  const showcase = SHOWCASE[activeIdx];
  const vehicle = FLEET_DATA.find((v) => v.id === showcase.vehicleId) || FLEET_DATA[0];
  const currentPhoto = photoMode === 'exterior' ? showcase.exteriorPhoto : showcase.interiorPhoto;

  useEffect(() => {
    setPhotoMode('exterior');
  }, [activeIdx]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxVehicle && e.key === 'Escape') setLightboxVehicle(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxVehicle]);

  const prev = () => setActiveIdx((i) => (i === 0 ? SHOWCASE.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === SHOWCASE.length - 1 ? 0 : i + 1));

  const openModal = () => setLightboxVehicle(vehicle);

  return (
    <div className="w-full bg-[#FAF8F5] text-ink-black select-none overflow-x-hidden">

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <CurvedHero
        eyebrow="THE PREMIER FLEET"
        titleLine1="MORE THAN"
        titleLine2="30 VEHICLES."
        description="Luxury sedans, SUVs, and executive vans—maintained and ready for your journey."
        image="/images/fleet-hero-banner.jpg"
        imageAlt="Faith Based Global Holdings Fleet Lineup"
        curveVariant="sharp-diagonal"
        theme="light"
        minHeight="h-[54vh] min-h-[420px] max-h-[580px]"
      />

      {/* ── CURVE: IVORY → DARK ─────────────────────────────────────────────── */}
      <CurvedDivider
        variant="sharp-diagonal"
        fromColor="#FAF8F5"
        toColor="#0E0C0A"
        height="clamp(28px, 3vw, 50px)"
      />

      {/* ── 2. OBSERVATORY: fits in remaining space, ~100vh total with hero ── */}
      <section className="w-full bg-[#0E0C0A] px-5 sm:px-10 lg:px-14 pt-6 pb-8">
        <div className="max-w-7xl mx-auto">

          {/* ── TWO-COLUMN LAYOUT ────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">

            {/* LEFT: vehicle info */}
            <div className="lg:col-span-4 space-y-3 text-[#F4EDE4] pt-1">
              <div className="flex items-center gap-2">
                <span className="w-4 h-[1.5px] bg-[#C5A059]" />
                <span className="text-[9px] font-mono tracking-[0.28em] text-[#C5A059] uppercase font-bold">
                  FEATURED VEHICLE
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight leading-none">
                {vehicle.name}
              </h2>

              <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-[#967C52] uppercase font-semibold">
                {vehicle.tagline}
              </p>

              <p className="text-xs text-white/65 leading-relaxed max-w-sm font-light">
                {vehicle.description.split('.').slice(0, 2).join('.').trim()}.
              </p>

              {/* Specs */}
              <div className="flex items-center gap-5 pt-1 text-white/80">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="font-mono text-[10px] uppercase tracking-wider">{vehicle.passengers} PASS.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="font-mono text-[10px] uppercase tracking-wider">{vehicle.luggage} BAG</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Fuel className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="font-mono text-[10px] uppercase tracking-wider">{showcase.mpg}</span>
                </div>
              </div>

              {/* View Details button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#B38D45] text-white px-5 py-2.5 rounded-lg text-[11px] font-mono tracking-widest uppercase transition-all shadow-md cursor-pointer"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* RIGHT: photo area */}
            <div className="lg:col-span-8 flex flex-col gap-3">

              {/* Main photo + 3 stacked thumbnails side by side, equal height */}
              <div className="flex gap-3" style={{ height: 'clamp(220px, 28vh, 360px)' }}>

                {/* Main Photo */}
                <div
                  ref={mainImgRef}
                  className="flex-1 rounded-xl overflow-hidden relative group bg-black/20 border border-white/10"
                >
                  <img
                    src={currentPhoto}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Gallery overlay button */}
                  <button
                    type="button"
                    onClick={openModal}
                    className="absolute top-3 right-3 bg-black/55 hover:bg-black/75 text-white backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase inline-flex items-center gap-1.5 transition-all border border-white/15 cursor-pointer"
                  >
                    <Images className="w-3 h-3 text-[#C5A059]" />
                    <span>VIEW GALLERY</span>
                  </button>

                  {/* View mode label */}
                  <div className="absolute bottom-3 left-3 text-white/80 font-mono text-[9px] tracking-widest uppercase bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
                    {photoMode === 'exterior' ? 'EXTERIOR' : 'INTERIOR CABIN'}
                  </div>
                </div>

                {/* 3 stacked thumbnails — same height as main via flex column */}
                <div className="w-28 sm:w-32 lg:w-36 flex flex-col gap-2 h-full">
                  {/* Exterior thumbnail */}
                  <button
                    type="button"
                    onClick={() => setPhotoMode('exterior')}
                    className={`flex-1 rounded-lg overflow-hidden border transition-all cursor-pointer ${photoMode === 'exterior' ? 'border-[#C5A059] ring-1 ring-[#C5A059]/50' : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={showcase.exteriorPhoto} alt="Exterior" className="w-full h-full object-cover" />
                  </button>

                  {/* Interior thumbnail */}
                  <button
                    type="button"
                    onClick={() => setPhotoMode('interior')}
                    className={`flex-1 rounded-lg overflow-hidden border transition-all cursor-pointer ${photoMode === 'interior' ? 'border-[#C5A059] ring-1 ring-[#C5A059]/50' : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={showcase.interiorPhoto} alt="Interior" className="w-full h-full object-cover" />
                  </button>

                  {/* Gallery thumb */}
                  <button
                    type="button"
                    onClick={openModal}
                    className="flex-1 rounded-lg overflow-hidden border border-white/10 hover:border-[#C5A059]/60 opacity-70 hover:opacity-100 transition-all cursor-pointer relative group"
                  >
                    <img src={vehicle.exteriorGallery?.[1] || showcase.exteriorPhoto} alt="Gallery" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white font-mono text-[8px] tracking-widest uppercase">GALLERY</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Exterior / Interior toggle row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPhotoMode('exterior')}
                    className={`px-3.5 py-1.5 rounded-md text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${photoMode === 'exterior' ? 'bg-[#F4EDE4] text-[#141416] font-bold' : 'bg-white/5 hover:bg-white/10 text-white/60'}`}
                  >
                    EXTERIOR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhotoMode('interior')}
                    className={`px-3.5 py-1.5 rounded-md text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${photoMode === 'interior' ? 'bg-[#F4EDE4] text-[#141416] font-bold' : 'bg-white/5 hover:bg-white/10 text-white/60'}`}
                  >
                    INTERIOR
                  </button>
                </div>

                <button
                  type="button"
                  onClick={openModal}
                  className="text-[10px] font-mono tracking-wider uppercase text-[#967C52] hover:text-[#C5A059] inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>FULL SPECS</span>
                  <ArrowRight className="w-2.5 h-2.5" />
                </button>
              </div>

              {/* ── VEHICLE CAROUSEL (actual cars, not categories) ────────── */}
              <div className="flex gap-2.5 sm:gap-3 mt-1">
                {SHOWCASE.map((s, idx) => {
                  const v = FLEET_DATA.find((f) => f.id === s.vehicleId) || FLEET_DATA[0];
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`flex-1 relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 group ${isActive ? 'border-[#C5A059] ring-2 ring-[#C5A059]/30 scale-[1.03]' : 'border-white/10 hover:border-white/30'}`}
                      style={{ height: '90px' }}
                    >
                      <img
                        src={s.thumbImg}
                        alt={v.name}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 inset-x-0 p-2">
                        <p className="font-display font-bold text-[10px] sm:text-[11px] text-white tracking-tight leading-tight truncate">
                          {v.name.split(' ').slice(0, 2).join(' ')}
                        </p>
                        <p className="text-[8px] sm:text-[9px] text-[#C5A059] font-mono tracking-wider uppercase opacity-80 truncate">
                          {v.categoryLabel}
                        </p>
                      </div>
                      {isActive && (
                        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                      )}
                    </button>
                  );
                })}
                {/* Prev/Next arrows */}
                <div className="flex flex-col gap-1.5 justify-center">
                  <button
                    type="button"
                    onClick={prev}
                    className="w-7 h-[42px] rounded-md border border-white/15 hover:border-[#C5A059] text-white/60 hover:text-[#C5A059] flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="w-7 h-[42px] rounded-md border border-white/15 hover:border-[#C5A059] text-white/60 hover:text-[#C5A059] flex items-center justify-center transition-all cursor-pointer"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

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

      {/* ── VEHICLE DETAIL MODAL ─────────────────────────────────────────────── */}
      {lightboxVehicle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxVehicle(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#111114] border border-[#C5A059]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold">VEHICLE SPECS</span>
                <span className="text-white/20">·</span>
                <span className="text-xs text-white/70 font-mono">{lightboxVehicle.categoryLabel}</span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxVehicle(null)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[#C5A059] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/40 border border-white/10">
                <img src={lightboxVehicle.image} alt={lightboxVehicle.name} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">{lightboxVehicle.name}</h3>
                <p className="text-xs text-[#C5A059] font-mono tracking-widest uppercase">{lightboxVehicle.tagline}</p>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed pt-1">{lightboxVehicle.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/10 text-xs font-mono text-white/80">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C5A059]" />
                  <span>{lightboxVehicle.passengers} PASS.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#C5A059]" />
                  <span>{lightboxVehicle.luggage} BAG</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#C5A059]" />
                  <span>SANITIZED</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold block">HIGHLIGHTS</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/70">
                  {lightboxVehicle.features.slice(0, 6).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-black/40 text-xs">
              <button
                type="button"
                onClick={() => setLightboxVehicle(null)}
                className="text-white/60 hover:text-white font-mono tracking-wider uppercase cursor-pointer"
              >
                CLOSE
              </button>
              <a
                href="tel:2676424616"
                className="inline-flex items-center gap-2 text-[#C5A059] hover:underline font-mono tracking-wider uppercase cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>(267) 642-4616</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
