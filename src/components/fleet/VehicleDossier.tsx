import React, { useState } from 'react';
import type { Vehicle } from '../../data/fleetData';
import { Users, Briefcase, Wifi, ArrowRight, ArrowUp, Phone, Check } from 'lucide-react';

interface VehicleDossierProps {
  vehicle: Vehicle;
  onBookVehicle: (vehicle: Vehicle) => void;
  onClose: () => void;
}

export const VehicleDossier: React.FC<VehicleDossierProps> = ({
  vehicle,
  onBookVehicle,
  onClose,
}) => {
  const [viewTab, setViewTab] = useState<'exterior' | 'interior'>('exterior');

  return (
    <section 
      id="vehicle-dossier" 
      className="w-full min-h-screen py-16 px-4 sm:px-6 lg:px-12 bg-black text-warm-ivory border-t border-champagne-gold/30 relative flex flex-col justify-center"
    >
      {/* Subtle Background Watermark */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] text-[20vw] font-serif font-bold uppercase tracking-widest text-right leading-none">
        {vehicle.category}
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-8 relative z-10">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-champagne-gold font-medium">
              VEHICLE DOSSIER // 100VH LOOKBOOK
            </span>
            <span className="text-white/20">?</span>
            <span className="text-xs font-mono tracking-wider text-muted-gray uppercase">
              {vehicle.categoryLabel}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-muted-gray hover:text-champagne-gold transition-colors group cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            <span>RETURN TO OBSERVATORY</span>
          </button>
        </div>

        {/* Main 2-Column 100vh Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Full-Bleed Photography & View Switcher */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] w-full bg-soft-black border border-white/10 overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <img
                src={viewTab === 'exterior' ? vehicle.image : vehicle.interiorImage}
                alt={`${vehicle.name} ${viewTab}`}
                className="w-full h-full object-cover luminous-media transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-obsidian/70 to-transparent pointer-events-none" />

              {/* View Angle Switcher Tabs */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 z-20">
                <button
                  type="button"
                  onClick={() => setViewTab('exterior')}
                  className={`px-4 py-2 text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 ${
                    viewTab === 'exterior'
                      ? 'bg-champagne-gold text-obsidian font-bold shadow-luxury-gold'
                      : 'bg-obsidian/80 backdrop-blur-md text-warm-ivory border border-white/10 hover:border-champagne-gold'
                  }`}
                >
                  EXTERIOR PROFILE
                </button>
                <button
                  type="button"
                  onClick={() => setViewTab('interior')}
                  className={`px-4 py-2 text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 ${
                    viewTab === 'interior'
                      ? 'bg-champagne-gold text-obsidian font-bold shadow-luxury-gold'
                      : 'bg-obsidian/80 backdrop-blur-md text-warm-ivory border border-white/10 hover:border-champagne-gold'
                  }`}
                >
                  CABIN SANCTUARY
                </button>
              </div>

              {/* Class Watermark Tag */}
              <span className="absolute top-4 right-4 text-[9px] font-mono tracking-[0.25em] uppercase text-champagne-gold bg-obsidian/90 backdrop-blur-md border border-champagne-gold/30 px-3 py-1">
                {vehicle.class}
              </span>
            </div>

            {/* Micro Highlights Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-soft-black border border-white/5 flex items-center gap-3">
                <Users className="w-4 h-4 text-champagne-gold flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-muted-gray uppercase">CAPACITY</span>
                  <span className="text-xs font-medium text-warm-ivory tracking-wide">{vehicle.passengers} PASSENGERS</span>
                </div>
              </div>
              <div className="p-3 bg-soft-black border border-white/5 flex items-center gap-3">
                <Briefcase className="w-4 h-4 text-champagne-gold flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-muted-gray uppercase">LUGGAGE</span>
                  <span className="text-xs font-medium text-warm-ivory tracking-wide">{vehicle.luggage} CASES</span>
                </div>
              </div>
              <div className="p-3 bg-soft-black border border-white/5 flex items-center gap-3">
                <Wifi className="w-4 h-4 text-champagne-gold flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[9px] font-mono text-muted-gray uppercase">NETWORK</span>
                  <span className="text-xs font-medium text-warm-ivory tracking-wide">ENCRYPTED WI-FI</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Specification Sheet */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-champagne-gold">
                {vehicle.categoryLabel}
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-[#F4EDE4] tracking-tight mt-1">
                {vehicle.name}
              </h2>
              <p className="text-xs sm:text-sm text-muted-gray font-sans mt-1.5">
                "{vehicle.tagline}"
              </p>
            </div>

            <p className="text-xs text-warm-ivory/80 leading-relaxed font-light">
              {vehicle.description}
            </p>

            {/* Cabin Features Matrix */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-[0.25em] text-champagne-gold uppercase block">
                CABIN AMENITIES & PROTOCOLS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {vehicle.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-soft-black/80 border border-white/5 text-xs text-warm-ivory/90 font-light">
                    <Check className="w-3.5 h-3.5 text-champagne-gold flex-shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ideal Use Cases */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.25em] text-champagne-gold uppercase block">
                OPTIMIZED MISSION PROFILE
              </span>
              <div className="flex flex-wrap gap-2">
                {vehicle.idealFor.map((use, i) => (
                  <span key={i} className="text-[10px] font-mono tracking-wider uppercase bg-white/5 border border-white/10 px-2.5 py-1 text-muted-gray">
                    {use}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => onBookVehicle(vehicle)}
                className="pb-btn pb-btn-primary flex-1 justify-center"
              >
                <span>RESERVE THIS VEHICLE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="tel:9295650100"
                className="pb-btn pb-btn-outline justify-center inline-flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>CONCIERGE</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
