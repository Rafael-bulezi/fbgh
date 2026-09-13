// FleetObservatory.tsx - Refined Luxury Edition
import React, { useState, useRef, useEffect } from 'react';
import { FLEET_DATA, type Vehicle } from '../../data/fleetData';
import {
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Shield,
  Car,
  Sparkles
} from 'lucide-react';
import { VehicleDossier } from './VehicleDossier';
import { VehicleModal } from './VehicleModal';

interface FleetObservatoryProps {
  onBookVehicle: (vehicle: Vehicle) => void;
  onOpenBooking: () => void;
}

export const FleetObservatory: React.FC<FleetObservatoryProps> = ({
  onBookVehicle,
  onOpenBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [passengerFilter, setPassengerFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [activeAngle, setActiveAngle] = useState<'front' | 'rear' | 'interior' | 'cockpit'>('front');
  const [stripMode, setStripMode] = useState<'angles' | 'vehicles'>('angles');
  const [selectedVehicleForDossier, setSelectedVehicleForDossier] = useState<Vehicle | null>(null);
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState<Vehicle | null>(null);

  const observatoryRef = useRef<HTMLDivElement>(null);

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
    }, 160);
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

  const handleOpenDossier = (vehicle: Vehicle) => {
    setSelectedVehicleForDossier(vehicle);
    setTimeout(() => {
      const dossierEl = document.getElementById('vehicle-dossier');
      if (dossierEl) {
        dossierEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const handleCloseDossier = () => {
    if (observatoryRef.current) {
      observatoryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
      setSelectedVehicleForDossier(null);
    }, 400);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedVehicleForModal) {
        if (e.key === 'Escape') setSelectedVehicleForModal(null);
        return;
      }
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVehicleList.length, selectedVehicleForModal]);

  const paddedIndex = String(currentIndex + 1).padStart(2, '0');
  const totalCount = String(activeVehicleList.length).padStart(2, '0');

  return (
    <section
      ref={observatoryRef}
      className="w-full bg-obsidian text-warm-ivory pt-6 pb-20 px-4 sm:px-8 lg:px-14 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* COMPACT OBSERVATORY HEADER */}
        <div className="flex flex-wrap items-end justify-between border-b border-white/10 pb-4 gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-champagne-gold font-medium">
                FLEET OBSERVATORY // {activeVehicleList.length} VEHICLES AVAILABLE
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-warm-ivory tracking-wide leading-none">
              The Bespoke Collection. <span className="italic font-light gold-gradient-text">Curated & Chauffeured.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-muted-gray">
            <span className="text-warm-ivory font-semibold text-sm">{paddedIndex}</span>
            <span className="text-white/30">/</span>
            <span>{totalCount}</span>
          </div>
        </div>

        {/* ENHANCED FILTER BAR */}
        <div className="luxury-glass-dark rounded-xl p-4 sm:p-5 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
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
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentIndex(0);
                    }}
                    className={`relative py-1.5 px-3.5 sm:px-4 text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 ${
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

            {/* Capacity Filter */}
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
                      type="button"
                      onClick={() => {
                        setPassengerFilter(cap.id);
                        setCurrentIndex(0);
                      }}
                      className={`px-3 py-1 text-[10px] font-mono tracking-wider rounded-sm transition-all duration-300 border ${
                        isActive
                          ? 'bg-champagne-gold/20 border-champagne-gold text-champagne-gold font-bold shadow-[0_0_15px_rgba(201,164,92,0.4)]'
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

        {/* MASTER VEHICLE SHOWCASE CARD WITH VERTICAL STRIP */}
        <div className="luxury-glass-dark border border-white/10 rounded-xl p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.8)] relative vehicle-card-reflection">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Vertical Strip + Main Vehicle Stage (7 cols) */}
            <div className="lg:col-span-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
              
              {/* Vertical Strip */}
              <div className="flex sm:flex-col gap-2 flex-shrink-0 w-full sm:w-20 lg:w-24 overflow-x-auto sm:overflow-visible no-scrollbar">
                
                {/* Mode Switcher: Views vs Fleet */}
                <div className="hidden sm:flex items-center justify-between pb-1.5 border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setStripMode('angles')}
                    className={`text-[8.5px] font-mono tracking-wider uppercase transition-colors ${
                      stripMode === 'angles' ? 'text-champagne-gold font-bold' : 'text-muted-gray hover:text-warm-ivory'
                    }`}
                    title="View multi-angle gallery of current vehicle"
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
                    title="Browse fleet roster vertically"
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

                    {/* +8 Photos Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedVehicleForModal(currentVehicle)}
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
                  /* Fleet Roster Mode */
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

                {/* Sub-bar */}
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

            {/* Right Column: Technical Card & CTAs (5 cols) */}
            <div
              className={`lg:col-span-5 space-y-6 lg:pl-4 transition-all duration-400 ${
                isTransitioning ? 'opacity-20 translate-x-2' : 'opacity-100 translate-x-0'
              }`}
            >
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-warm-ivory tracking-wide leading-tight">
                  {currentVehicle.name}
                </h2>
                <span className="text-[10px] font-mono tracking-[0.3em] text-champagne-gold uppercase font-medium mt-2 inline-block">
                  {currentVehicle.categoryLabel}
                </span>
              </div>

              {/* 4 Circular Spec Chips */}
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

              {/* IDEAL FOR */}
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

              {/* Action Buttons */}
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
                  onClick={() => handleOpenDossier(currentVehicle)}
                  className="pb-btn pb-btn-outline inline-flex items-center gap-2"
                >
                  <span>VIEW FULL DOSSIER</span>
                  <span className="text-xs">↓</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* 100VH VEHICLE LOOKBOOK DOSSIER SECTION (Smooth in-page reveal) */}
        {selectedVehicleForDossier && (
          <VehicleDossier
            vehicle={selectedVehicleForDossier}
            onBookVehicle={onBookVehicle}
            onClose={handleCloseDossier}
          />
        )}

        {/* Bottom Concierge Callout */}
        <div className="luxury-glass-dark border border-white/10 p-6 sm:p-8 rounded-xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 relative z-10 max-w-xl">
            <h3 className="font-serif text-xl sm:text-2xl text-warm-ivory tracking-wide">
              NOT SURE WHAT YOU NEED?
            </h3>
            <p className="text-xs sm:text-sm text-muted-gray leading-relaxed tracking-wide">
              Our 24/7 dedicated fleet concierge will analyze your passenger count, luggage load, itinerary, and protocol requirements to assign the perfect vehicle.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0">
            <button
              onClick={onOpenBooking}
              className="pb-btn pb-btn-primary inline-flex items-center gap-2"
            >
              <span>SPEAK WITH CONCIERGE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Full-Screen Vehicle Modal */}
      <VehicleModal
        vehicle={selectedVehicleForModal}
        onClose={() => setSelectedVehicleForModal(null)}
        onBookVehicle={onBookVehicle}
      />
    </section>
  );
};
