import React, { useState } from 'react';
import type { Vehicle } from '../../data/fleetData';
import { X, Users, Briefcase, ShieldCheck, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

interface VehicleModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onBookVehicle: (vehicle: Vehicle) => void;
}

export const VehicleModal: React.FC<VehicleModalProps> = ({
  vehicle,
  onClose,
  onBookVehicle,
}) => {
  const [activeTab, setActiveTab] = useState<'exterior' | 'interior'>('exterior');

  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md transition-opacity">
      <div 
        className="relative w-full max-w-4xl bg-soft-black border border-champagne-gold/30 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-obsidian">
          <div className="flex items-center gap-3">
            <span className="text-[10px] tracking-[0.25em] text-champagne-gold uppercase font-medium">
              FLEET SPECIFICATION
            </span>
            <span className="text-white/20">?</span>
            <span className="text-xs text-muted-gray tracking-wider uppercase">
              {vehicle.categoryLabel}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-muted-gray hover:text-champagne-gold transition-colors focus:outline-none"
            aria-label="Close vehicle details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 no-scrollbar">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs tracking-[0.2em] text-champagne-gold uppercase font-mono">
                {vehicle.class}
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-[#F4EDE4] tracking-tight mt-1">
                {vehicle.name}
              </h2>
              <p className="text-sm text-muted-gray mt-1 font-sans">
                {vehicle.tagline}
              </p>
            </div>

            <div className="flex items-center gap-4 bg-obsidian/80 px-4 py-3 border border-white/5">
              <div className="flex items-center gap-2 text-xs tracking-wider text-warm-ivory">
                <Users className="w-4 h-4 text-champagne-gold" />
                <span>{vehicle.passengers} PASSENGERS</span>
              </div>
              <span className="text-white/20">|</span>
              <div className="flex items-center gap-2 text-xs tracking-wider text-warm-ivory">
                <Briefcase className="w-4 h-4 text-champagne-gold" />
                <span>{vehicle.luggage} LUGGAGE</span>
              </div>
            </div>
          </div>

          <div className="relative border border-white/10 overflow-hidden group bg-black">
            <div className="aspect-[16/9] w-full relative">
              <img
                src={activeTab === 'exterior' ? vehicle.image : vehicle.interiorImage}
                alt={`${vehicle.name} ${activeTab}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="absolute bottom-4 left-4 flex gap-2 z-10">
              <button
                onClick={() => setActiveTab('exterior')}
                className={`px-3 py-1.5 text-[11px] tracking-widest uppercase transition-colors ${
                  activeTab === 'exterior'
                    ? 'bg-champagne-gold text-obsidian font-semibold'
                    : 'bg-black/70 text-warm-ivory hover:bg-black/90'
                }`}
              >
                Exterior View
              </button>
              <button
                onClick={() => setActiveTab('interior')}
                className={`px-3 py-1.5 text-[11px] tracking-widest uppercase transition-colors ${
                  activeTab === 'interior'
                    ? 'bg-champagne-gold text-obsidian font-semibold'
                    : 'bg-black/70 text-warm-ivory hover:bg-black/90'
                }`}
              >
                Interior Lounge
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-sans tracking-[0.2em] text-champagne-gold uppercase">
              VEHICLE OVERVIEW
            </h3>
            <p className="text-sm text-warm-ivory/90 leading-relaxed font-light">
              {vehicle.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-obsidian/60 p-4 border border-white/5 space-y-3">
              <h4 className="text-[11px] tracking-[0.2em] text-champagne-gold uppercase flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                CABIN AMENITIES
              </h4>
              <ul className="space-y-2">
                {vehicle.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-warm-ivory/80">
                    <CheckCircle className="w-3.5 h-3.5 text-champagne-gold/70 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-obsidian/60 p-4 border border-white/5 space-y-3">
              <h4 className="text-[11px] tracking-[0.2em] text-champagne-gold uppercase flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                RECOMMENDED FOR
              </h4>
              <ul className="space-y-2">
                {vehicle.idealFor.map((ideal, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-warm-ivory/80">
                    <span className="w-1.5 h-1.5 bg-champagne-gold rounded-full flex-shrink-0" />
                    <span>{ideal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between bg-warm-charcoal/50 p-4 border border-champagne-gold/20">
            <div>
              <span className="text-[10px] tracking-widest uppercase text-muted-gray">
                ESTIMATED CHARTER RATE
              </span>
              <p className="text-lg font-display text-[#F4EDE4]">
                <span className="text-champagne-gold font-sans font-medium">${vehicle.hourlyRate}</span> / hour
                <span className="text-xs text-muted-gray font-sans ml-2">or ${vehicle.mileageRate}/mi</span>
              </p>
            </div>
            <span className="text-[10px] tracking-wider text-muted-gray italic">
              *Includes chauffeur, fuel & tolls
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t border-white/10 bg-obsidian">
          <button
            onClick={onClose}
            className="pb-btn-text text-xs tracking-[0.2em] font-mono text-muted-gray uppercase"
          >
            <span>RETURN TO FLEET</span>
          </button>

          <button
            onClick={() => {
              onBookVehicle(vehicle);
              onClose();
            }}
            className="pb-btn pb-btn-primary"
          >
            <span>BOOK THIS VEHICLE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
