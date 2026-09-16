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
import { FLEET_DATA, type Vehicle } from '../../data/fleetData';

export interface FleetObservatoryProps {
  onBookVehicle?: (vehicle: Vehicle) => void;
  onOpenBooking?: () => void;
}

export interface ShowcaseCar {
  vehicleId: string;
  brand: string;
  model: string;
  subModel: string;
  mpg: string;
  shortInfo: string;
  description: string;
  exteriorPhoto: string;
  interiorPhoto: string;
  thumbImg: string;
}

export const SHOWCASE_CARS: ShowcaseCar[] = [
  {
    vehicleId: 'cadillac-escalade-esv',
    brand: 'CADILLAC',
    model: 'ESCALADE',
    subModel: 'ESV',
    mpg: 'UP TO 21 MPG',
    shortInfo: 'Full-size luxury SUV with extra luggage room',
    description: 'Extended full-size luxury SUV with comfortable seating for up to 6 passengers and plenty of room for heavy luggage. Smooth ride, quiet cabin, and perfect for airport travel or long distances.',
    exteriorPhoto: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop',
    interiorPhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    thumbImg: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop',
  },
  {
    vehicleId: 'kia-carnival-vip',
    brand: 'KIA',
    model: 'CARNIVAL',
    subModel: 'VIP LOUNGE',
    mpg: 'UP TO 26 MPG',
    shortInfo: 'Executive VIP lounge with reclining captain seats',
    description: 'Executive travel with reclining second-row captain chairs, power footrests, and quiet privacy. Great for corporate roadshows or relaxing family trips for up to 6 passengers.',
    exteriorPhoto: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
    interiorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    thumbImg: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop',
  },
  {
    vehicleId: 'mercedes-maybach-gls600',
    brand: 'MERCEDES-BENZ',
    model: 'MAYBACH',
    subModel: 'GLS 600',
    mpg: 'UP TO 20 MPG',
    shortInfo: 'First-class luxury SUV with rear massage seating',
    description: 'Our most luxurious 4-passenger SUV. Equipped with executive rear massage seating, dedicated climate controls, and a smooth quiet ride for special occasions and VIP travel.',
    exteriorPhoto: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop',
    interiorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    thumbImg: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop',
  },
  {
    vehicleId: 'mercedes-sprinter-jet-edition',
    brand: 'MERCEDES-BENZ',
    model: 'SPRINTER',
    subModel: 'JET EDITION',
    mpg: 'UP TO 19 MPG',
    shortInfo: 'Spacious luxury van for families and groups of up to 8',
    description: 'First-class Mercedes-Benz van for a family or group of 8. High-ceiling cabin, leather captain chairs, encrypted Wi-Fi, and generous luggage space for everyone on board.',
    exteriorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    interiorPhoto: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
    thumbImg: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop',
  },
];

export const FleetObservatory: React.FC<FleetObservatoryProps> = ({ onBookVehicle }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [photoMode, setPhotoMode] = useState<'exterior' | 'interior'>('exterior');
  const [lightboxVehicle, setLightboxVehicle] = useState<Vehicle | null>(null);
  const [showDescriptionMore, setShowDescriptionMore] = useState(false);

  const mainImgRef = useRef<HTMLDivElement>(null);

  const showcase = SHOWCASE_CARS[activeIdx];
  const vehicle = FLEET_DATA.find((v) => v.id === showcase.vehicleId) || FLEET_DATA[0];
  const currentPhoto = photoMode === 'exterior' ? showcase.exteriorPhoto : showcase.interiorPhoto;

  useEffect(() => {
    setPhotoMode('exterior');
    setShowDescriptionMore(false);
  }, [activeIdx]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxVehicle && e.key === 'Escape') setLightboxVehicle(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxVehicle]);

  const prev = () => setActiveIdx((i) => (i === 0 ? SHOWCASE_CARS.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === SHOWCASE_CARS.length - 1 ? 0 : i + 1));

  const openModal = () => setLightboxVehicle(vehicle);

  // Marquee check: if title is more than 2 words
  const fullName = `${showcase.model} ${showcase.subModel}`.trim();
  const nameWords = fullName.split(' ');
  const isMarquee = nameWords.length > 2;

  return (
    <section className="w-full bg-[#0E0C0A] min-h-screen flex flex-col justify-center px-5 sm:px-10 lg:px-14 py-8 lg:py-14 box-border">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between my-auto gap-6 lg:gap-8">

        {/* ── TWO-COLUMN SHOWCASE ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">

          {/* LEFT: vehicle info */}
          <div className="lg:col-span-4 space-y-4 text-[#F4EDE4]">
            
            {/* BRAND & MODEL TAG (Replaced "FEATURED VEHICLE") */}
            <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-[#C5A059] uppercase font-bold">
              <span className="w-4 h-[1.5px] bg-[#C5A059]" />
              <span>BRAND: {showcase.brand}</span>
              <span className="text-white/30">·</span>
              <span>MODEL: {showcase.model}</span>
            </div>

            {/* CAR NAME WITH MARQUEE IF > 2 WORDS & SUBMODEL IN SMALLER LETTER */}
            <div className="min-h-[50px] flex items-center">
              {isMarquee ? (
                <div className="overflow-hidden whitespace-nowrap max-w-full relative group py-1">
                  <div className="inline-flex gap-10 animate-marquee-text group-hover:[animation-play-state:paused]">
                    <div className="flex items-baseline gap-2.5">
                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-none">
                        {showcase.model}
                      </h2>
                      <span className="font-serif text-xl sm:text-2xl text-[#C5A059] font-light tracking-wide uppercase">
                        {showcase.subModel}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2.5" aria-hidden="true">
                      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-none">
                        {showcase.model}
                      </h2>
                      <span className="font-serif text-xl sm:text-2xl text-[#C5A059] font-light tracking-wide uppercase">
                        {showcase.subModel}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-none">
                    {showcase.model}
                  </h2>
                  <span className="font-serif text-xl sm:text-2xl text-[#C5A059] font-light tracking-wide uppercase">
                    {showcase.subModel}
                  </span>
                </div>
              )}
            </div>

            {/* DOWN-TO-EARTH CAR INFO */}
            <p className="text-xs sm:text-sm font-mono tracking-wider text-[#C5A059] font-semibold">
              {showcase.shortInfo}
            </p>

            {/* CONSISTENT LENGTH DESCRIPTION WITH MORE / LESS TOGGLE */}
            <div className="space-y-1">
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-md font-light">
                {showDescriptionMore ? (
                  <>
                    {showcase.description}
                    <button
                      type="button"
                      onClick={() => setShowDescriptionMore(false)}
                      className="ml-2 text-[#C5A059] hover:underline font-mono text-[10px] uppercase font-bold cursor-pointer"
                    >
                      (less)
                    </button>
                  </>
                ) : (
                  <>
                    {showcase.description.length > 135
                      ? `${showcase.description.slice(0, 135)}...`
                      : showcase.description}
                    {showcase.description.length > 135 && (
                      <button
                        type="button"
                        onClick={() => setShowDescriptionMore(true)}
                        className="ml-2 text-[#C5A059] hover:underline font-mono text-[10px] uppercase font-bold cursor-pointer"
                      >
                        (more)
                      </button>
                    )}
                  </>
                )}
              </p>
            </div>

            {/* BIGGER SPECS ICONS */}
            <div className="flex items-center gap-6 pt-2 text-white/90">
              <div className="flex items-center gap-2.5">
                <Users className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
                <span className="font-mono text-xs uppercase tracking-wider font-medium">
                  {vehicle.passengers} PASS.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
                <span className="font-mono text-xs uppercase tracking-wider font-medium">
                  {vehicle.luggage} BAGS
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Fuel className="w-5 h-5 text-[#C5A059] flex-shrink-0" />
                <span className="font-mono text-xs uppercase tracking-wider font-medium">
                  {showcase.mpg}
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT: photo area */}
          <div className="lg:col-span-8 flex flex-col gap-3.5">

            {/* Main photo + 3 stacked thumbnails side by side, equal height */}
            <div className="flex gap-3 sm:gap-4" style={{ height: 'clamp(310px, 44vh, 480px)' }}>

              {/* Main Photo */}
              <div
                ref={mainImgRef}
                className="flex-1 rounded-2xl overflow-hidden relative group bg-black/20 border border-white/10 shadow-2xl"
              >
                <img
                  src={currentPhoto}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* Gallery overlay button */}
                <button
                  type="button"
                  onClick={openModal}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/85 text-white backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase inline-flex items-center gap-2 transition-all border border-white/15 cursor-pointer shadow-md"
                >
                  <Images className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>VIEW GALLERY</span>
                </button>

                {/* View mode label */}
                <div className="absolute bottom-4 left-4 text-white/90 font-mono text-[10px] tracking-widest uppercase bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10">
                  {photoMode === 'exterior' ? 'EXTERIOR' : 'INTERIOR CABIN'}
                </div>
              </div>

              {/* 3 stacked thumbnails — same height as main via flex column */}
              <div className="w-28 sm:w-36 lg:w-44 flex flex-col gap-2.5 h-full">
                {/* Exterior thumbnail */}
                <button
                  type="button"
                  onClick={() => setPhotoMode('exterior')}
                  className={`flex-1 rounded-xl overflow-hidden border transition-all cursor-pointer ${photoMode === 'exterior' ? 'border-[#C5A059] ring-2 ring-[#C5A059]/50 scale-[1.02]' : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'}`}
                >
                  <img src={showcase.exteriorPhoto} alt="Exterior" className="w-full h-full object-cover" />
                </button>

                {/* Interior thumbnail */}
                <button
                  type="button"
                  onClick={() => setPhotoMode('interior')}
                  className={`flex-1 rounded-xl overflow-hidden border transition-all cursor-pointer ${photoMode === 'interior' ? 'border-[#C5A059] ring-2 ring-[#C5A059]/50 scale-[1.02]' : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'}`}
                >
                  <img src={showcase.interiorPhoto} alt="Interior" className="w-full h-full object-cover" />
                </button>

                {/* Gallery thumb */}
                <button
                  type="button"
                  onClick={openModal}
                  className="flex-1 rounded-xl overflow-hidden border border-white/10 hover:border-[#C5A059]/60 opacity-70 hover:opacity-100 transition-all cursor-pointer relative group"
                >
                  <img src={vehicle.exteriorGallery?.[1] || showcase.exteriorPhoto} alt="Gallery" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-mono text-[9px] tracking-widest uppercase font-semibold">GALLERY</span>
                  </div>
                </button>
              </div>
            </div>

            {/* BUTTON BAR: EXTERIOR, INTERIOR, AND VIEW DETAILS MOVED HERE */}
            <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPhotoMode('exterior')}
                  className={`px-3.5 py-1.5 rounded-lg text-[11px] font-mono tracking-wider uppercase transition-all cursor-pointer ${photoMode === 'exterior' ? 'bg-[#F4EDE4] text-[#141416] font-bold shadow-md' : 'bg-white/5 hover:bg-white/10 text-white/60'}`}
                >
                  EXTERIOR
                </button>
                <button
                  type="button"
                  onClick={() => setPhotoMode('interior')}
                  className={`px-3.5 py-1.5 rounded-lg text-[11px] font-mono tracking-wider uppercase transition-all cursor-pointer ${photoMode === 'interior' ? 'bg-[#F4EDE4] text-[#141416] font-bold shadow-md' : 'bg-white/5 hover:bg-white/10 text-white/60'}`}
                >
                  INTERIOR
                </button>
                
                {/* VIEW DETAILS BUTTON RIGHT UNDER THE CAR */}
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#B38D45] text-white px-4 py-1.5 rounded-lg text-[11px] font-mono tracking-wider uppercase transition-all shadow-md cursor-pointer ml-1"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={openModal}
                className="text-xs font-mono tracking-wider uppercase text-[#967C52] hover:text-[#C5A059] inline-flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>FULL SPECS</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>

        {/* ── VEHICLE CAROUSEL: EXACTLY 4 CARS AT THE BOTTOM WITH AMPLE ROOM ── */}
        <div className="flex gap-3 sm:gap-4 pt-1 items-stretch">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 flex-1">
            {SHOWCASE_CARS.map((s, idx) => {
              const v = FLEET_DATA.find((f) => f.id === s.vehicleId) || FLEET_DATA[0];
              const isActive = idx === activeIdx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 group text-left ${isActive ? 'border-[#C5A059] ring-2 ring-[#C5A059]/40 scale-[1.02] shadow-xl' : 'border-white/10 hover:border-white/30'}`}
                  style={{ height: 'clamp(95px, 12vh, 125px)' }}
                >
                  <img
                    src={s.thumbImg}
                    alt={s.model}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-85 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-3">
                    <p className="font-display font-bold text-xs sm:text-sm text-white tracking-tight leading-tight truncate">
                      {s.model}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-[#C5A059] font-mono tracking-wider uppercase opacity-90 truncate">
                      {s.subModel} · {v.passengers} PASS
                    </p>
                  </div>
                  {isActive && (
                    <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#C5A059] shadow-sm" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Prev/Next arrows */}
          <div className="flex flex-col gap-2 justify-center">
            <button
              type="button"
              onClick={prev}
              className="w-8 sm:w-9 h-[46px] rounded-lg border border-white/15 hover:border-[#C5A059] text-white/60 hover:text-[#C5A059] flex items-center justify-center transition-all cursor-pointer bg-white/5 hover:bg-white/10"
              aria-label="Previous vehicle"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="w-8 sm:w-9 h-[46px] rounded-lg border border-white/15 hover:border-[#C5A059] text-white/60 hover:text-[#C5A059] flex items-center justify-center transition-all cursor-pointer bg-white/5 hover:bg-white/10"
              aria-label="Next vehicle"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

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
                <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold">VEHICLE DETAILS</span>
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
                  <span>{lightboxVehicle.passengers} PASSENGERS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#C5A059]" />
                  <span>{lightboxVehicle.luggage} LUGGAGE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#C5A059]" />
                  <span>SANITIZED</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold block">FEATURES</span>
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
              {onBookVehicle ? (
                <button
                  type="button"
                  onClick={() => {
                    setLightboxVehicle(null);
                    onBookVehicle(lightboxVehicle);
                  }}
                  className="inline-flex items-center gap-2 text-[#C5A059] hover:underline font-mono tracking-wider uppercase cursor-pointer"
                >
                  <span>SELECT THIS VEHICLE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <a
                  href="tel:2676424616"
                  className="inline-flex items-center gap-2 text-[#C5A059] hover:underline font-mono tracking-wider uppercase cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>(267) 642-4616</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
