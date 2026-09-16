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
    description: 'Full-size luxury SUV with commanding presence and generous luggage space. Smooth ride and quiet comfort for up to 6 passengers.',
    exteriorPhoto: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop',
    interiorPhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    thumbImg: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop',
  },
  {
    vehicleId: 'kia-carnival-vip',
    brand: 'KIA',
    model: 'CARNIVAL',
    subModel: '',
    mpg: 'UP TO 26 MPG',
    description: 'Executive passenger travel with reclining captain chairs, power footrests, and quiet privacy for up to 6 passengers.',
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
    description: 'Ultra-luxury 4-passenger SUV featuring executive rear massage seating, private climate controls, and whisper-quiet ride quality.',
    exteriorPhoto: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop',
    interiorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    thumbImg: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop',
  },
  {
    vehicleId: 'mercedes-sprinter-jet-edition',
    brand: 'MERCEDES-BENZ',
    model: 'SPRINTER',
    subModel: '',
    mpg: 'UP TO 19 MPG',
    description: 'First-class luxury van for groups and families of up to 8 passengers. High ceiling, leather captain chairs, and ample luggage room.',
    exteriorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    interiorPhoto: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
    thumbImg: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop',
  },
];

export const FleetObservatory: React.FC<FleetObservatoryProps> = ({ onBookVehicle }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [photoMode, setPhotoMode] = useState<'exterior' | 'interior'>('exterior');
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);
  const [lightboxVehicle, setLightboxVehicle] = useState<Vehicle | null>(null);

  const mainImgRef = useRef<HTMLDivElement>(null);

  const showcase = SHOWCASE_CARS[activeIdx];
  const vehicle = FLEET_DATA.find((v) => v.id === showcase.vehicleId) || FLEET_DATA[0];

  // 3 stacked photos synced with the active photoMode
  const exteriorPhotos = (vehicle.exteriorGallery && vehicle.exteriorGallery.length >= 3)
    ? vehicle.exteriorGallery.slice(0, 3)
    : [showcase.exteriorPhoto, vehicle.image, showcase.thumbImg];

  const interiorPhotos = (vehicle.interiorGallery && vehicle.interiorGallery.length >= 3)
    ? vehicle.interiorGallery.slice(0, 3)
    : [showcase.interiorPhoto, vehicle.interiorImage, showcase.interiorPhoto];

  const activePhotoList = photoMode === 'exterior' ? exteriorPhotos : interiorPhotos;
  const currentPhoto = activePhotoList[selectedPhotoIdx] || activePhotoList[0];

  useEffect(() => {
    setPhotoMode('exterior');
    setSelectedPhotoIdx(0);
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

  return (
    <section className="w-full bg-[#0E0C0A] min-h-screen flex flex-col justify-center px-5 sm:px-10 lg:px-14 py-8 lg:py-14 box-border">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between my-auto gap-6 lg:gap-8">

        {/* ── TWO-COLUMN SHOWCASE ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">

          {/* LEFT: vehicle info */}
          <div className="lg:col-span-4 space-y-5 text-[#F4EDE4]">
            
            {/* BRAND NAME: BIG AND BOLD */}
            <div className="flex items-center gap-3">
              <span className="w-6 h-[2px] bg-[#C5A059]" />
              <span className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#C5A059] tracking-wider uppercase leading-none">
                {showcase.brand}
              </span>
            </div>

            {/* CAR MODEL: ALL IN PURE WHITE */}
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-none flex items-baseline gap-3 flex-wrap">
                <span>{showcase.model}</span>
                {showcase.subModel && (
                  <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white/80 font-light uppercase">
                    {showcase.subModel}
                  </span>
                )}
              </h2>
            </div>

            {/* NATURAL, DOWN-TO-EARTH DESCRIPTION */}
            <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-md font-light">
              {showcase.description}
            </p>

            {/* EVEN BIGGER SPEC ICONS */}
            <div className="flex items-center gap-7 pt-3 text-white">
              <div className="flex items-center gap-3">
                <Users className="w-7 h-7 text-[#C5A059] flex-shrink-0" />
                <span className="font-mono text-sm uppercase tracking-wider font-bold text-white">
                  {vehicle.passengers} PASS.
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="w-7 h-7 text-[#C5A059] flex-shrink-0" />
                <span className="font-mono text-sm uppercase tracking-wider font-bold text-white">
                  {vehicle.luggage} BAGS
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Fuel className="w-7 h-7 text-[#C5A059] flex-shrink-0" />
                <span className="font-mono text-sm uppercase tracking-wider font-bold text-white">
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

                {/* View mode label */}
                <div className="absolute bottom-4 left-4 text-white/90 font-mono text-[10px] tracking-widest uppercase bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/10">
                  {photoMode === 'exterior' ? 'EXTERIOR' : 'INTERIOR CABIN'}
                </div>
              </div>

              {/* 3 stacked thumbnails — synced with exterior/interior and equal height via flex column */}
              <div className="w-28 sm:w-36 lg:w-44 flex flex-col gap-2.5 h-full">
                {activePhotoList.map((photoUrl, pIdx) => {
                  const isSelected = selectedPhotoIdx === pIdx;
                  return (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setSelectedPhotoIdx(pIdx)}
                      className={`flex-1 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C5A059] ring-2 ring-[#C5A059]/50 scale-[1.02] opacity-100 shadow-md'
                          : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={photoUrl}
                        alt={`${photoMode === 'exterior' ? 'Exterior' : 'Interior'} view ${pIdx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BUTTON BAR: EXTERIOR, INTERIOR, AND VIEW GALLERY WITH IMAGES ICON */}
            <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPhotoMode('exterior');
                    setSelectedPhotoIdx(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-[11px] font-mono tracking-wider uppercase transition-all cursor-pointer ${photoMode === 'exterior' ? 'bg-[#F4EDE4] text-[#141416] font-bold shadow-md' : 'bg-white/5 hover:bg-white/10 text-white/60'}`}
                >
                  EXTERIOR
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhotoMode('interior');
                    setSelectedPhotoIdx(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-[11px] font-mono tracking-wider uppercase transition-all cursor-pointer ${photoMode === 'interior' ? 'bg-[#F4EDE4] text-[#141416] font-bold shadow-md' : 'bg-white/5 hover:bg-white/10 text-white/60'}`}
                >
                  INTERIOR
                </button>
                
                {/* VIEW GALLERY BUTTON (WITH IMAGES ICON) */}
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#B38D45] text-white px-4 py-1.5 rounded-lg text-[11px] font-mono tracking-wider uppercase transition-all shadow-md cursor-pointer ml-1"
                >
                  <Images className="w-3.5 h-3.5 text-white" />
                  <span>VIEW GALLERY</span>
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

        {/* ── VEHICLE CAROUSEL: 4 CARS, 25% TALLER, VIBRANT (NO SEPIA/MUDDINESS) ── */}
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
                  style={{ height: 'clamp(120px, 15vh, 160px)' }}
                >
                  <img
                    src={s.thumbImg}
                    alt={s.model}
                    className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-all duration-300"
                    style={{ filter: 'none' }}
                  />
                  {/* Subtle dark gradient only behind the bottom text so cars stay clear & colorful */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-0 inset-x-0 p-3">
                    <p className="font-display font-bold text-xs sm:text-sm text-white tracking-tight leading-tight truncate">
                      {s.model} {s.subModel ? s.subModel : ''}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-[#C5A059] font-mono tracking-wider uppercase opacity-90 truncate">
                      {s.brand} · {v.passengers} PASS
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
              className="w-8 sm:w-9 h-[56px] rounded-lg border border-white/15 hover:border-[#C5A059] text-white/60 hover:text-[#C5A059] flex items-center justify-center transition-all cursor-pointer bg-white/5 hover:bg-white/10"
              aria-label="Previous vehicle"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="w-8 sm:w-9 h-[56px] rounded-lg border border-white/15 hover:border-[#C5A059] text-white/60 hover:text-[#C5A059] flex items-center justify-center transition-all cursor-pointer bg-white/5 hover:bg-white/10"
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
