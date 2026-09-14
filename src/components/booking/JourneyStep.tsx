import React from 'react';
import {
  Plane,
  Briefcase,
  Clock,
  CalendarDays,
  MapPin,
  Sparkles,
  Plus,
  Trash2,
  ArrowRight,
  Check
} from 'lucide-react';
import { useBooking, type ServiceTypeId } from '../../context/BookingContext';

interface ServiceOption {
  id: ServiceTypeId;
  label: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICES: ServiceOption[] = [
  {
    id: 'airport',
    label: 'Airport Transfer',
    subtitle: 'Radar-tracked runway meets & arrivals',
    icon: Plane,
  },
  {
    id: 'executive',
    label: 'Executive Travel',
    subtitle: 'Mobile boardroom for corporate itineraries',
    icon: Briefcase,
  },
  {
    id: 'hourly',
    label: 'Hourly Chauffeur',
    subtitle: 'Dedicated on-demand standby as directed',
    icon: Clock,
  },
  {
    id: 'event',
    label: 'Event / Occasion',
    subtitle: 'Galas, private premieres & gatherings',
    icon: CalendarDays,
  },
  {
    id: 'city',
    label: 'City-to-City',
    subtitle: 'Long-range intercity executive transit',
    icon: MapPin,
  },
  {
    id: 'other',
    label: 'Other Custom Journey',
    subtitle: 'Bespoke multi-destination coordination',
    icon: Sparkles,
  },
];

export const JourneyStep: React.FC = () => {
  const { bookingData, updateBookingData, setStep } = useBooking();

  const handleSelectService = (id: ServiceTypeId) => {
    updateBookingData({ serviceType: id });
  };

  const handleAddStop = () => {
    updateBookingData({
      stops: [...bookingData.stops, ''],
    });
  };

  const handleUpdateStop = (index: number, val: string) => {
    const updated = [...bookingData.stops];
    updated[index] = val;
    updateBookingData({ stops: updated });
  };

  const handleRemoveStop = (index: number) => {
    const updated = bookingData.stops.filter((_, i) => i !== index);
    updateBookingData({ stops: updated });
  };

  const canContinue = bookingData.pickup.trim().length > 0;

  return (
    <div className="w-full flex-grow flex flex-col justify-between py-2 sm:py-4">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        
        {/* LEFT COLUMN: What are you traveling for? */}
        <div className="lg:col-span-5 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.25em] text-champagne-gold uppercase">
              STEP 01 OF 03
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F4EDE4] tracking-tight">
              WHAT ARE YOU TRAVELING FOR?
            </h3>
            <p className="text-xs text-warm-ivory/50 font-light">
              Select your travel classification to optimize vehicle staging and chauffeur protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 pt-2">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              const isSelected = bookingData.serviceType === s.id;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectService(s.id)}
                  className={`w-full text-left p-3 sm:p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-champagne-gold/15 border-champagne-gold text-warm-ivory shadow-[0_0_20px_rgba(201,164,92,0.15)]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04] text-warm-ivory/80'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-champagne-gold text-obsidian'
                          : 'bg-white/5 text-champagne-gold group-hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium tracking-wide flex items-center gap-2">
                        <span>{s.label}</span>
                      </div>
                      <div className="text-[11px] text-warm-ivory/50 font-light line-clamp-1">
                        {s.subtitle}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-champagne-gold bg-champagne-gold text-obsidian scale-105'
                        : 'border-white/20 group-hover:border-white/40'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Where are we taking you? */}
        <div className="lg:col-span-7 space-y-6 lg:pl-6 lg:border-l lg:border-white/10">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.25em] text-champagne-gold uppercase">
              ROUTING &amp; DISPATCH
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F4EDE4] tracking-tight">
              WHERE ARE WE TAKING YOU?
            </h3>
            <p className="text-xs text-warm-ivory/50 font-light">
              Enter pickup address, private FBO airfield, or destination corridor.
            </p>
          </div>

          <div className="space-y-5 pt-1">
            {/* PICKUP */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-gold" />
                  PICKUP LOCATION
                </span>
                <span className="text-warm-ivory/40 font-normal">REQUIRED</span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-champagne-gold pointer-events-none">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={bookingData.pickup}
                  onChange={(e) => updateBookingData({ pickup: e.target.value })}
                  placeholder="e.g. John F. Kennedy International Airport (Terminal 4) or 740 Park Ave"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-warm-ivory placeholder-warm-ivory/30 focus:outline-none focus:border-champagne-gold transition-colors"
                />
              </div>
            </div>

            {/* INTERMEDIATE STOPS */}
            {bookingData.stops.map((stop, idx) => (
              <div key={idx} className="space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-warm-ivory/60 uppercase">
                  <span>ADDITIONAL STOP 0{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStop(idx)}
                    className="text-red-400/70 hover:text-red-400 flex items-center gap-1 text-[10px] tracking-wider transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> REMOVE
                  </button>
                </div>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-warm-ivory/40 pointer-events-none">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={stop}
                    onChange={(e) => handleUpdateStop(idx, e.target.value)}
                    placeholder="Enter intermediate stop or pickup address"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-warm-ivory placeholder-warm-ivory/30 focus:outline-none focus:border-champagne-gold transition-colors"
                  />
                </div>
              </div>
            ))}

            {/* DESTINATION */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-champagne-gold" />
                  {bookingData.serviceType === 'hourly'
                    ? 'PRIMARY SERVICE AREA / AS DIRECTED'
                    : 'FINAL DESTINATION'}
                </span>
                <span className="text-warm-ivory/40 font-normal">
                  {bookingData.serviceType === 'hourly' ? 'FLEXIBLE' : 'REQUIRED'}
                </span>
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-champagne-gold pointer-events-none">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={bookingData.destination}
                  onChange={(e) => updateBookingData({ destination: e.target.value })}
                  placeholder={
                    bookingData.serviceType === 'hourly'
                      ? 'e.g. Manhattan & Tribeca (As Directed)'
                      : 'e.g. The Ritz-Carlton, Philadelphia, PA or Private Residence'
                  }
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-warm-ivory placeholder-warm-ivory/30 focus:outline-none focus:border-champagne-gold transition-colors"
                />
              </div>
            </div>

            {/* ADD STOP BUTTON */}
            <div>
              <button
                type="button"
                onClick={handleAddStop}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.15em] text-champagne-gold hover:text-warm-ivory transition-colors uppercase py-1 group"
              >
                <Plus className="w-3.5 h-3.5 transition-transform group-hover:rotate-90" />
                <span>+ ADD ANOTHER STOP</span>
              </button>
            </div>

            {/* ROUTING HELPER BADGE */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs text-warm-ivory/60 font-light">
              <span>Flight delays and route traffic telemetry tracked continuously in real time.</span>
              <span className="text-champagne-gold text-[10px] font-mono tracking-widest uppercase">
                ACTIVE RADAR
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER ACTION BAR */}
      <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4">
        <div className="text-[11px] font-mono text-warm-ivory/40 hidden sm:block">
          STAGE 01 OF 03 · JOURNEY OVERVIEW
        </div>

        <button
          type="button"
          onClick={() => {
            if (canContinue) setStep(2);
          }}
          disabled={!canContinue}
          className={`ml-auto px-8 py-3.5 rounded-full font-mono text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
            canContinue
              ? 'bg-champagne-gold text-obsidian hover:bg-warm-ivory hover:shadow-[0_0_20px_rgba(201,164,92,0.4)]'
              : 'bg-white/10 text-warm-ivory/30 cursor-not-allowed'
          }`}
        >
          <span>CONTINUE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
