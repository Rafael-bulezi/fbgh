// FleetPage.tsx - Premium Enhanced Version
import React, { useState, useRef, useEffect } from 'react';
import {
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  X,
  Shield,
  Clock,
  Car,
  Sparkles,
  Star,
  Mail,
  Phone
} from 'lucide-react';
import { FLEET_DATA, type Vehicle } from '../data/fleetData';

interface FleetPageProps {
  onBookVehicle: (vehicle: Vehicle) => void;
  onOpenBooking: () => void;
}

const TOP_CHOICES = [
  {
    category: 'EXECUTIVE',
    name: 'Mercedes-Benz S-Class',
    desc: 'The benchmark of serene chauffeur refinement.',
    vehicleId: 'mercedes-s-class-s580',
    img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=800&auto=format&fit=crop',
  },
  {
    category: 'FAMILY & GROUP',
    name: 'Chevrolet Suburban',
    desc: 'Uncompromising space and luggage authority for delegations.',
    vehicleId: 'cadillac-escalade-esv',
    img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=800&auto=format&fit=crop',
  },
  {
    category: 'LUXURY SUV',
    name: 'BMW X7',
    desc: 'Dynamic road command with whisper-quiet ride comfort.',
    vehicleId: 'bmw-x7-m60i',
    img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=800&auto=format&fit=crop',
  },
  {
    category: 'EVENTS & GROUPS',
    name: 'Mercedes-Benz Sprinter',
    desc: 'First-class aviation jet cabin for corporate entourages.',
    vehicleId: 'mercedes-sprinter-jet-edition',
    img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800&auto=format&fit=crop',
  },
];

export const FleetPage: React.FC<FleetPageProps> = ({ onBookVehicle, onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [passengerFilter, setPassengerFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [activeAngle, setActiveAngle] = useState<'front' | 'rear' | 'interior' | 'cockpit'>('front');
  const [stripMode, setStripMode] = useState<'angles' | 'vehicles'>('angles');
  const [lightboxVehicle, setLightboxVehicle] = useState<Vehicle | null>(null);
  const [lightboxTab, setLightboxTab] = useState<'exterior' | 'interior'>('exterior');
  const [rentalInquiryVehicle, setRentalInquiryVehicle] = useState<Vehicle | null>(null);

  const explorerRef = useRef<HTMLDivElement>(null);

  const filteredVehicles = FLEET_DATA.filter((vehicle) => {
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'specialty') {
        if (vehicle.category !== 'electric' && !vehicle.class.toLowerCase().includes('special')) {
          return false;
        }
      } else if (vehicle.category !== selectedCategory) {
        return false;
      }
    }
    if (passengerFilter === '1-3' && vehicle.passengers > 3) return false;
    if (passengerFilter === '4-6' && (vehicle.passengers < 4 || vehicle.passengers > 6)) return false;
    if (passengerFilter === '7+' && vehicle.passengers < 7) return false;
    return true;
  });

  const activeVehicleList = filteredVehicles.length > 0 ? filteredVehicles : FLEET_DATA;
  const currentVehicle = activeVehicleList[currentIndex % activeVehicleList.length] || FLEET_DATA[0];

  const getVehicleAngleImage = (vehicle: Vehicle, angle: 'front' | 'rear' | 'interior' | 'cockpit') => {
    switch (angle) {
      case 'interior':
        return vehicle.interiorImage;
      case 'rear':
        return 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop';
      case 'cockpit':
        return 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop';
      case 'front':
      default:
        return vehicle.image;
    }
  };

  const vehicleAngles = [
    { id: 'front', label: 'Front Exterior', img: currentVehicle.image },
    { id: 'rear', label: 'Rear Profile', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=400&auto=format&fit=crop' },
    { id: 'interior', label: 'Executive Suite', img: currentVehicle.interiorImage },
    { id: 'cockpit', label: 'Cockpit & Tech', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=400&auto=format&fit=crop' },
  ];

  const triggerCameraCut = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setActiveAngle('front');
      setIsTransitioning(false);
    }, 180);
  };

  const handleNext = () => {
    triggerCameraCut(() => {
      setCurrentIndex((prev) => (prev + 1) % activeVehicleList.length);
    });
  };

  const handlePrev = () => {
    triggerCameraCut(() => {
      setCurrentIndex((prev) => (prev - 1 + activeVehicleList.length) % activeVehicleList.length);
    });
  };

  const handleSelectVehicle = (index: number) => {
    if (index === currentIndex) return;
    triggerCameraCut(() => {
      setCurrentIndex(index);
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxVehicle) {
        if (e.key === 'Escape') setLightboxVehicle(null);
        return;
      }
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVehicleList.length, lightboxVehicle]);

  const paddedIndex = String(currentIndex + 1).padStart(2, '0');
  const totalCount = String(activeVehicleList.length).padStart(2, '0');

  return (
    <div className="w-full bg-obsidian text-warm-ivory selection:bg-champagne-gold selection:text-obsidian pt-16">
      
      {/* 1. CINEMATIC FLEET INTRODUCTION */}
      <section className="relative pt-20 pb-16 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-soft-black to-obsidian pointer-events-none" />
        
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-3/5 opacity-40 pointer-events-none overflow-hidden">
          <img
            src="/images/fleet-hero-banner.jpg"
            alt="Faith Based Global Holdings Fleet Lineup"
            className="w-full h-full object-cover object-center luminous-media"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-champagne-gold" />
              <span className="text-[10px] font-mono tracking-[0.4em] text-champagne-gold uppercase font-medium">
                THE PREMIER FLEET
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-warm-ivory tracking-wide leading-none">
              MORE THAN<br />
              <span className="italic font-light gold-gradient-text">30 VEHICLES.</span>
            </h1>

            <p className="text-sm sm:text-base text-warm-ivory/70 max-w-xl leading-relaxed font-light">
              An exclusive collection of luxury sedans, SUVs, and executive vans—each meticulously maintained and ready for your journey.
            </p>
          </div>

          <div className="flex items-center gap-8 pt-4 font-mono text-[10px] tracking-[0.25em] text-muted-gray uppercase">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-champagne-gold shadow-[0_0_12px_rgba(201,164,92,0.8)]" />
              <span>30+ VEHICLES</span>
            </div>
            <span className="text-white/20">·</span>
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-champagne-gold shadow-[0_0_12px_rgba(201,164,92,0.8)]" />
              <span>CHAUFFEURED & SELF-DRIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PREMIUM FLEET EXPLORER */}
      <section
        ref={explorerRef}
        id="fleet-explorer"
        className="w-full min-h-[92vh] flex flex-col justify-between py-8 px-4 sm:px-8 lg:px-14 bg-obsidian relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full space-y-6 flex-1 flex flex-col justify-between">
          
          {/* Enhanced Filter Bar */}
          <div className="luxury-glass-dark rounded-xl p-5 sm:p-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', label: 'ALL' },
                  { id: 'suv', label: 'SUVS' },
                  { id: 'sedan', label: 'SEDANS' },
                  { id: 'van', label: 'VANS' },
                  { id: 'specialty', label: 'SPECIALTY' },
                ].map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setCurrentIndex(0);
                      }}
                      className={`relative py-2 px-4 sm:px-5 text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 ${
                        isActive 
                          ? 'text-champagne-gold font-semibold' 
                          : 'text-warm-ivory/60 hover:text-warm-ivory'
                      }`}
                    >
                      {cat.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-champagne-gold via-champagne-gold-light to-champagne-gold shadow-[0_0_12px_rgba(201,164,92,0.8)]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono tracking-[0.25em] text-muted-gray uppercase">
                  CAPACITY:
                </span>
                <div className="flex items-center gap-1.5">
                  {[
                    { id: 'all', label: 'ANY' },
                    { id: '1-3', label: '1–3' },
                    { id: '4-6', label: '4–6' },
                    { id: '7+', label: '7+' },
                  ].map((cap) => {
                    const isActive = passengerFilter === cap.id;
                    return (
                      <button
                        key={cap.id}
                        onClick={() => {
                          setPassengerFilter(cap.id);
                          setCurrentIndex(0);
                        }}
                        className={`px-3.5 py-1.5 text-[10px] font-mono tracking-wider rounded-sm transition-all duration-300 border ${
                          isActive
                            ? 'bg-champagne-gold/20 border-champagne-gold text-champagne-gold font-bold shadow-[0_0_15px_rgba(201,164,92,0.5)]'
                            : 'bg-white/5 border-white/10 text-warm-ivory/60 hover:border-white/30 hover:text-warm-ivory'
                        }`}
                      >
                        {cap.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Master Vehicle Showcase */}
          <div className="luxury-glass-dark border border-white/10 rounded-xl p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.8)] relative my-auto vehicle-card-reflection">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
                
                {/* Vertical Strip */}
                <div className="flex sm:flex-col gap-2 flex-shrink-0 w-full sm:w-20 lg:w-24 overflow-x-auto sm:overflow-visible no-scrollbar">
                  
                  <div className="hidden sm:flex items-center justify-between pb-2 border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => setStripMode('angles')}
                      className={`text-[8.5px] font-mono tracking-wider uppercase transition-colors ${
                        stripMode === 'angles' ? 'text-champagne-gold font-bold' : 'text-muted-gray hover:text-warm-ivory'
                      }`}
                    >
                      VIEWS
                    </button>
                    <span className="text-white/20 text-[9px]">|</span>
                    <button
                      type="button"
                      onClick={() => setStripMode('vehicles')}
                      className={`text-[8.5px] font-mono tracking-wider uppercase transition-colors ${
                        stripMode === 'vehicles' ? 'text-champagne-gold font-bold' : 'text-muted-gray hover:text-warm-ivory'
                      }`}
                    >
                      FLEET
                    </button>
                  </div>

                  {stripMode === 'angles' ? (
                    <>
                      {vehicleAngles.map((thumb) => {
                        const isActive = activeAngle === thumb.id;
                        return (
                          <button
                            key={thumb.id}
                            type="button"
                            onClick={() => setActiveAngle(thumb.id as any)}
                            className={`relative aspect-[16/10] sm:aspect-[16/11] w-16 sm:w-full rounded-sm overflow-hidden border transition-all duration-300 flex-shrink-0 group cursor-pointer ${
                              isActive
                                ? 'border-champagne-gold ring-2 ring-champagne-gold/60 shadow-[0_0_20px_rgba(201,164,92,0.6)] scale-[1.03] opacity-100'
                                : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
                            }`}
                            title={thumb.label}
                          >
                            <img
                              src={thumb.img}
                              alt={thumb.label}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {isActive && (
                              <div className="absolute inset-0 border-2 border-champagne-gold pointer-events-none" />
                            )}
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() => setLightboxVehicle(currentVehicle)}
                        className="aspect-[16/10] sm:aspect-[16/11] w-16 sm:w-full rounded-sm bg-gradient-to-br from-champagne-gold/10 to-champagne-gold/5 border border-champagne-gold/30 flex flex-col items-center justify-center text-champagne-gold hover:from-champagne-gold/20 hover:to-champagne-gold/10 hover:border-champagne-gold transition-all flex-shrink-0 group cursor-pointer"
                        title="View full high-resolution dossier & interior gallery"
                      >
                        <span className="font-mono text-xs font-semibold group-hover:scale-110 transition-transform">
                          +8
                        </span>
                        <span className="text-[7.5px] font-mono tracking-widest text-muted-gray uppercase">
                          PHOTOS
                        </span>
                      </button>
                    </>
                  ) : (
                    <div className="flex sm:flex-col gap-1.5 max-h-[320px] overflow-y-auto no-scrollbar">
                      {activeVehicleList.map((vehicle, idx) => {
                        const isCurrent = idx === currentIndex;
                        return (
                          <button
                            key={vehicle.id}
                            type="button"
                            onClick={() => handleSelectVehicle(idx)}
                            className={`relative aspect-[16/11] w-16 sm:w-full rounded-sm overflow-hidden border transition-all duration-300 flex-shrink-0 text-left group cursor-pointer ${
                              isCurrent
                                ? 'border-champagne-gold ring-2 ring-champagne-gold/60 shadow-[0_0_20px_rgba(201,164,92,0.6)] opacity-100'
                                : 'border-white/15 opacity-55 hover:opacity-100 hover:border-white/40'
                            }`}
                            title={vehicle.name}
                          >
                            <img
                              src={vehicle.image}
                              alt={vehicle.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-obsidian/90 px-1.5 py-1 text-[7px] font-mono text-warm-ivory truncate">
                              {vehicle.name}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Main Vehicle Stage */}
                <div className="flex-1 flex flex-col justify-between space-y-3">
                  
                  <div
                    className={`relative aspect-[16/10] w-full overflow-hidden bg-soft-black border border-white/10 rounded-sm shadow-2xl transition-all duration-500 ease-out group ${
                      isTransitioning
                        ? 'opacity-25 scale-[0.98]'
                        : 'opacity-100 scale-100'
                    }`}
                  >
                    <img
                      src={getVehicleAngleImage(currentVehicle, activeAngle)}
                      alt={`${currentVehicle.name} - ${activeAngle}`}
                      className="w-full h-full object-cover luminous-media transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-obsidian/80 to-transparent pointer-events-none" />
                  </div>

                  <div className="flex items-center justify-between pt-2 px-1 text-xs font-mono text-muted-gray">
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="text-warm-ivory font-semibold text-base">{paddedIndex}</span>
                      <span className="text-white/25">/</span>
                      <span>{totalCount}</span>
                    </div>

                    <div className="flex-1 mx-4 sm:mx-6 flex items-center justify-center gap-1.5 overflow-hidden">
                      {activeVehicleList.slice(0, 12).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSelectVehicle(i)}
                          className={`h-0.5 rounded-full transition-all duration-300 ${
                            (currentIndex % Math.min(activeVehicleList.length, 12)) === i
                              ? 'w-7 sm:w-9 bg-gradient-to-r from-champagne-gold to-champagne-gold-light shadow-[0_0_10px_rgba(201,164,92,0.8)]'
                              : 'w-2 sm:w-3 bg-white/20 hover:bg-white/50'
                          }`}
                          aria-label={`Jump to vehicle ${i + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/20 hover:border-champagne-gold hover:text-champagne-gold flex items-center justify-center text-warm-ivory transition-all hover:shadow-[0_0_15px_rgba(201,164,92,0.4)]"
                        aria-label="Previous vehicle"
                      >
                        <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/20 hover:border-champagne-gold hover:text-champagne-gold flex items-center justify-center text-warm-ivory transition-all hover:shadow-[0_0_15px_rgba(201,164,92,0.4)]"
                        aria-label="Next vehicle"
                      >
                        <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>

              {/* Right Column */}
              <div
                className={`lg:col-span-5 space-y-6 lg:pl-4 transition-all duration-400 ${
                  isTransitioning ? 'opacity-20 translate-x-2' : 'opacity-100 translate-x-0'
                }`}
              >
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-[2rem] text-warm-ivory tracking-wide leading-tight line-clamp-2">
                    {currentVehicle.name}
                  </h2>
                  <span className="text-[10px] font-mono tracking-[0.3em] text-champagne-gold uppercase font-medium mt-2 inline-block">
                    {currentVehicle.categoryLabel}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-white/10 font-mono">
                  <div className="flex items-start gap-2.5 text-warm-ivory">
                    <div className="w-9 h-9 rounded-full bg-champagne-gold/15 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-champagne-gold" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-warm-ivory leading-none">
                        {currentVehicle.passengers}
                      </div>
                      <div className="text-[8.5px] text-muted-gray uppercase tracking-widest mt-1.5">
                        PASSENGERS
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-warm-ivory">
                    <div className="w-9 h-9 rounded-full bg-champagne-gold/15 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-4 h-4 text-champagne-gold" />
                    </div>
                    <div>
                      <div className="text-base font-bold text-warm-ivory leading-none">
                        {currentVehicle.luggage}
                      </div>
                      <div className="text-[8.5px] text-muted-gray uppercase tracking-widest mt-1.5">
                        LUGGAGE
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-warm-ivory">
                    <div className="w-9 h-9 rounded-full bg-champagne-gold/15 flex items-center justify-center flex-shrink-0">
                      <Car className="w-4 h-4 text-champagne-gold" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-warm-ivory leading-none uppercase">
                        AUTOMATIC
                      </div>
                      <div className="text-[8.5px] text-muted-gray uppercase tracking-widest mt-1.5">
                        TRANSMISSION
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-warm-ivory">
                    <div className="w-9 h-9 rounded-full bg-champagne-gold/15 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-champagne-gold" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-warm-ivory leading-none uppercase">
                        AWD
                      </div>
                      <div className="text-[8.5px] text-muted-gray uppercase tracking-widest mt-1.5">
                        DRIVE
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-warm-ivory/80 leading-relaxed font-light">
                  {currentVehicle.description}
                </p>

                <div className="space-y-3">
                  <span className="text-[9.5px] font-mono tracking-[0.3em] text-champagne-gold uppercase font-semibold">
                    IDEAL FOR
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentVehicle.idealFor.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono bg-white/5 border border-white/10 px-3.5 py-1.5 text-warm-ivory/80 rounded-sm hover:border-champagne-gold/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onBookVehicle(currentVehicle)}
                    className="pb-btn pb-btn-primary inline-flex items-center gap-2"
                  >
                    <span>REQUEST THIS VEHICLE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setRentalInquiryVehicle(currentVehicle)}
                    className="pb-btn pb-btn-outline inline-flex items-center gap-2"
                  >
                    <span>RENT THIS VEHICLE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. TOP CHOICES - ENHANCED */}
      <section className="bg-soft-black border-t border-white/5 py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="border-b border-white/10 pb-6">
            <div className="flex items-center gap-3 mb-3">
              <Star className="w-4 h-4 text-champagne-gold" />
              <span className="text-[10px] font-mono tracking-[0.35em] text-champagne-gold uppercase">
                TOP CHOICES FOR EVERY JOURNEY
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-warm-ivory tracking-wide">
              The right vehicle for what matters.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_CHOICES.map((item) => {
              const matchedVehicle = FLEET_DATA.find((v) => v.id === item.vehicleId) || currentVehicle;
              return (
                <div
                  key={item.category}
                  onClick={() => {
                    const idx = activeVehicleList.findIndex((v) => v.id === item.vehicleId);
                    if (idx !== -1) {
                      setCurrentIndex(idx);
                      explorerRef.current?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      setLightboxVehicle(matchedVehicle);
                    }
                  }}
                  className="group luxury-glass-dark border border-white/10 hover:border-champagne-gold/50 p-6 rounded-xl transition-all duration-500 cursor-pointer flex flex-col justify-between space-y-4 hover:-translate-y-2 shadow-xl hover:shadow-[0_20px_60px_rgba(201,164,92,0.2)]"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-lg relative">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover luminous-media transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
                  </div>

                  <div className="space-y-2 flex-1">
                    <span className="text-[9px] font-mono tracking-[0.3em] text-champagne-gold uppercase font-semibold">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-xl text-warm-ivory group-hover:gold-gradient-text transition-all">
                      {item.name}
                    </h3>
                    <p className="text-xs text-muted-gray leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono tracking-[0.25em] uppercase text-champagne-gold">
                    <span>EXPLORE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CAN'T DECIDE? - ENHANCED */}
      <section className="bg-obsidian border-t border-white/5 py-16 px-6 sm:px-10 lg:px-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-champagne-gold/5 via-transparent to-champagne-gold/5 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-center gap-6 max-w-2xl">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden flex-shrink-0 border border-white/15 relative shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=400&auto=format&fit=crop"
                alt="Faith Based Global Holdings Chauffeur Service"
                className="w-full h-full object-cover luminous-media"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent pointer-events-none" />
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <span className="text-[10px] font-mono tracking-[0.35em] text-champagne-gold uppercase font-medium">
                CAN'T DECIDE?
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-warm-ivory tracking-wide leading-tight">
                We'll help you find the perfect match.
              </h2>
              <p className="text-sm text-muted-gray leading-relaxed font-light">
                Tell us about your trip and we'll recommend the best vehicle for your needs.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenBooking}
            className="pb-btn pb-btn-primary flex-shrink-0 inline-flex items-center gap-2"
          >
            <span>FIND MY VEHICLE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 5. ENHANCED TRUST GUARANTEES */}
      <section className="bg-soft-black border-t border-white/5 py-12 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Users, title: 'PROFESSIONAL DRIVERS', desc: 'Experienced & Courteous' },
            { icon: Clock, title: 'ON TIME, EVERY TIME', desc: 'Reliability you can count on' },
            { icon: Shield, title: 'EXCEPTIONAL COMFORT', desc: 'Vehicles maintained to perfection' },
            { icon: Car, title: 'BOOK WITH CONFIDENCE', desc: 'Simple, secure & flexible' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-champagne-gold/20 to-champagne-gold/10 flex items-center justify-center text-champagne-gold flex-shrink-0 border border-champagne-gold/30 group-hover:shadow-[0_0_20px_rgba(201,164,92,0.4)] transition-all">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono tracking-wider uppercase text-warm-ivory font-semibold">
                  {title}
                </div>
                <div className="text-xs text-muted-gray leading-relaxed">
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. ENHANCED LIGHTBOX */}
      {lightboxVehicle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
        >
          <div className="relative w-full max-w-6xl luxury-glass-dark border border-champagne-gold/40 rounded-xl shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-obsidian">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono tracking-[0.35em] text-champagne-gold uppercase">
                  VEHICLE DOSSIER
                </span>
                <span className="text-white/20">·</span>
                <span className="text-[10px] font-mono text-muted-gray uppercase">
                  {lightboxVehicle.categoryLabel}
                </span>
              </div>

              <button
                onClick={() => setLightboxVehicle(null)}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-warm-ivory hover:text-champagne-gold hover:border-champagne-gold transition-all hover:shadow-[0_0_15px_rgba(201,164,92,0.4)]"
                aria-label="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-black border border-white/10 relative shadow-2xl">
                    <img
                      src={lightboxTab === 'exterior' ? lightboxVehicle.image : lightboxVehicle.interiorImage}
                      alt={lightboxVehicle.name}
                      className="w-full h-full object-cover luminous-media"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setLightboxTab('exterior')}
                      className={`px-4 py-2 text-[10px] font-mono tracking-wider uppercase border rounded-sm transition-all ${
                        lightboxTab === 'exterior'
                          ? 'bg-gradient-to-r from-champagne-gold to-champagne-gold-light text-obsidian border-champagne-gold font-bold shadow-[0_0_20px_rgba(201,164,92,0.5)]'
                          : 'bg-white/5 text-warm-ivory/70 border-white/10 hover:border-white/30'
                      }`}
                    >
                      EXTERIOR
                    </button>
                    <button
                      onClick={() => setLightboxTab('interior')}
                      className={`px-4 py-2 text-[10px] font-mono tracking-wider uppercase border rounded-sm transition-all ${
                        lightboxTab === 'interior'
                          ? 'bg-gradient-to-r from-champagne-gold to-champagne-gold-light text-obsidian border-champagne-gold font-bold shadow-[0_0_20px_rgba(201,164,92,0.5)]'
                          : 'bg-white/5 text-warm-ivory/70 border-white/10 hover:border-white/30'
                      }`}
                    >
                      INTERIOR SUITE
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-5">
                  <div>
                    <span className="text-[10px] font-mono tracking-[0.3em] text-champagne-gold uppercase">
                      {lightboxVehicle.class}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-warm-ivory mt-2">
                      {lightboxVehicle.name}
                    </h3>
                    <p className="text-sm text-muted-gray italic font-serif mt-2">
                      "{lightboxVehicle.tagline}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/10 text-xs font-mono text-warm-ivory/90">
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-champagne-gold" />
                      <span>{lightboxVehicle.passengers} PASSENGERS</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Briefcase className="w-4 h-4 text-champagne-gold" />
                      <span>{lightboxVehicle.luggage} LUGGAGE</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Car className="w-4 h-4 text-champagne-gold" />
                      <span>AUTOMATIC</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Shield className="w-4 h-4 text-champagne-gold" />
                      <span>AWD DRIVE</span>
                    </div>
                  </div>

                  <p className="text-sm text-warm-ivory/80 leading-relaxed font-light">
                    {lightboxVehicle.description}
                  </p>

                  <div className="space-y-2">
                    <span className="text-[9px] font-mono tracking-[0.25em] text-champagne-gold uppercase font-semibold">
                      IDEAL FOR:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {lightboxVehicle.idealFor.map((item) => (
                        <span
                          key={item}
                          className="text-[10px] font-mono bg-white/5 border border-white/10 px-3 py-1 text-warm-ivory/80 rounded-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <button
                      onClick={() => {
                        setLightboxVehicle(null);
                        onBookVehicle(lightboxVehicle);
                      }}
                      className="pb-btn pb-btn-primary w-full justify-center inline-flex items-center gap-2"
                    >
                      <span>REQUEST THIS VEHICLE (CHAUFFEURED)</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        const v = lightboxVehicle;
                        setLightboxVehicle(null);
                        setRentalInquiryVehicle(v);
                      }}
                      className="pb-btn pb-btn-outline w-full justify-center inline-flex items-center gap-2"
                    >
                      <span>RENT THIS VEHICLE (SELF-DRIVE)</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RENT A CAR — DEDICATED SELF-DRIVE LUXURY DESK MODAL */}
      {rentalInquiryVehicle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setRentalInquiryVehicle(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#0c0d0e] border border-champagne-gold/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl text-warm-ivory relative"
          >
            <button
              onClick={() => setRentalInquiryVehicle(null)}
              className="absolute top-5 right-5 text-warm-ivory/60 hover:text-warm-ivory transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.25em] text-champagne-gold uppercase">
                RENT A CAR · SELF-DRIVE DESK
              </span>
              <h3 className="font-serif text-2xl text-warm-ivory">
                {rentalInquiryVehicle.name}
              </h3>
              <p className="text-xs text-warm-ivory/60 leading-relaxed font-light">
                Private client self-drive leasing and short-term rentals are arranged exclusively through our dedicated Fleet Management Desk.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-warm-ivory/50">Classification</span>
                <span className="text-warm-ivory font-medium">{rentalInquiryVehicle.categoryLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-ivory/50">Minimum Driver Age</span>
                <span className="text-warm-ivory font-medium">25 Years (Valid License)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-warm-ivory/50">Insurance Coverage</span>
                <span className="text-warm-ivory font-medium">Comprehensive Collision Required</span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-2">
                <span className="text-warm-ivory/50">Estimated Daily Lease</span>
                <span className="text-champagne-gold font-mono font-bold">
                  ${rentalInquiryVehicle.hourlyRate * 8} / 24-Hour Day
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href={`mailto:rentals@fbglobalholdings.com?subject=Self-Drive Rental Inquiry: ${encodeURIComponent(
                  rentalInquiryVehicle.name
                )}`}
                className="pb-btn pb-btn-primary w-full justify-center inline-flex items-center gap-2 py-3.5"
              >
                <Mail className="w-4 h-4" />
                <span>INQUIRE VIA FLEET DESK EMAIL</span>
              </a>

              <a
                href="tel:+19175550198"
                className="pb-btn pb-btn-outline w-full justify-center inline-flex items-center gap-2 py-3"
              >
                <Phone className="w-4 h-4" />
                <span>CALL CONCIERGE: +1 (917) 555-0198</span>
              </a>
            </div>

            <p className="text-[10px] font-mono text-center text-warm-ivory/40 uppercase tracking-wider">
              FAITH BASED GLOBAL HOLDINGS · PRIVATE LEASE DIVISION
            </p>
          </div>
        </div>
      )}
    </div>
  );
};