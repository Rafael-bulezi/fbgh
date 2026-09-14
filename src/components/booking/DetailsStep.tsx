import React from 'react';
import {
  Calendar,
  Clock,
  Users,
  Briefcase,
  Plane,
  ShieldCheck,
  Wifi,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus
} from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const DetailsStep: React.FC = () => {
  const { bookingData, updateBookingData, setStep } = useBooking();

  const handlePassengerChange = (delta: number) => {
    const next = Math.max(1, Math.min(14, bookingData.passengers + delta));
    updateBookingData({ passengers: next });
  };

  const handleLuggageChange = (delta: number) => {
    const next = Math.max(0, Math.min(10, bookingData.luggage + delta));
    updateBookingData({ luggage: next });
  };

  const handleDurationChange = (delta: number) => {
    const next = Math.max(2, Math.min(24, bookingData.hourlyDuration + delta));
    updateBookingData({ hourlyDuration: next });
  };

  return (
    <div className="w-full flex-grow flex flex-col justify-between py-2 sm:py-4">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        
        {/* LEFT COLUMN: When are you traveling? */}
        <div className="lg:col-span-6 space-y-5">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.25em] text-champagne-gold uppercase">
              STEP 02 OF 03
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F4EDE4] tracking-tight">
              WHEN ARE YOU TRAVELING?
            </h3>
            <p className="text-xs text-warm-ivory/50 font-light">
              Schedule your exact departure or arrival timeline. Chauffeurs stage 15 minutes in advance.
            </p>
          </div>

          <div className="space-y-4 pt-1">
            {/* DATE & TIME ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* DATE */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase block">
                  TRAVEL DATE
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-champagne-gold pointer-events-none">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={bookingData.date}
                    onChange={(e) => updateBookingData({ date: e.target.value })}
                    placeholder="e.g. 24 Sep 2026"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-warm-ivory placeholder-warm-ivory/30 focus:outline-none focus:border-champagne-gold transition-colors"
                  />
                </div>
              </div>

              {/* TIME */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase block">
                  PICKUP TIME
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-champagne-gold pointer-events-none">
                    <Clock className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={bookingData.time}
                    onChange={(e) => updateBookingData({ time: e.target.value })}
                    placeholder="e.g. 10:30 AM"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-warm-ivory placeholder-warm-ivory/30 focus:outline-none focus:border-champagne-gold transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* TRIP TYPE */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase block">
                TRIP TYPE
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateBookingData({ tripType: 'one-way' })}
                  className={`py-3 px-4 rounded-xl border text-xs font-mono tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    bookingData.tripType === 'one-way'
                      ? 'bg-champagne-gold text-obsidian font-bold border-champagne-gold shadow-md'
                      : 'bg-white/[0.03] border-white/10 text-warm-ivory/70 hover:border-white/20'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current opacity-75" />
                  <span>ONE WAY</span>
                </button>

                <button
                  type="button"
                  onClick={() => updateBookingData({ tripType: 'round-trip' })}
                  className={`py-3 px-4 rounded-xl border text-xs font-mono tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    bookingData.tripType === 'round-trip'
                      ? 'bg-champagne-gold text-obsidian font-bold border-champagne-gold shadow-md'
                      : 'bg-white/[0.03] border-white/10 text-warm-ivory/70 hover:border-white/20'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current opacity-75" />
                  <span>ROUND TRIP</span>
                </button>
              </div>
            </div>

            {/* SERVICE ADAPTIVE INPUTS */}
            {bookingData.serviceType === 'airport' && (
              <div className="space-y-2 pt-1 animate-fadeIn">
                <label className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase">
                  <span>FLIGHT NUMBER (RADAR TELEMETRY)</span>
                  <span className="text-emerald-400 text-[9px]">LIVE SYNC</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-champagne-gold pointer-events-none">
                    <Plane className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={bookingData.flightNumber}
                    onChange={(e) => updateBookingData({ flightNumber: e.target.value })}
                    placeholder="e.g. AA 1024 or DL 482 (Commercial or Tail # for Private FBO)"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-warm-ivory placeholder-warm-ivory/30 focus:outline-none focus:border-champagne-gold transition-colors"
                  />
                </div>
                <p className="text-[11px] text-warm-ivory/40 font-light">
                  Our dispatch monitors gate arrival and runway touchdown in real-time. No charge for delays.
                </p>
              </div>
            )}

            {bookingData.serviceType === 'hourly' && (
              <div className="space-y-2 pt-1 animate-fadeIn">
                <label className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase">
                  <span>CHARTER DURATION (HOURS)</span>
                  <span className="text-warm-ivory/40 font-normal">MIN 2 HOURS</span>
                </label>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-champagne-gold" />
                    <span className="text-sm text-warm-ivory font-medium">
                      {bookingData.hourlyDuration} Hours Reserved
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleDurationChange(-1)}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-warm-ivory hover:bg-white/10 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-mono text-sm font-bold text-champagne-gold">
                      {bookingData.hourlyDuration}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDurationChange(1)}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-warm-ivory hover:bg-white/10 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {bookingData.serviceType === 'event' && (
              <div className="space-y-2 pt-1 animate-fadeIn">
                <label className="text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase block">
                  EVENT DETAILS / VENUE
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-champagne-gold pointer-events-none">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={bookingData.eventType}
                    onChange={(e) => updateBookingData({ eventType: e.target.value })}
                    placeholder="e.g. Met Gala, Lincoln Center Opening, Private Estate Gala"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-warm-ivory placeholder-warm-ivory/30 focus:outline-none focus:border-champagne-gold transition-colors"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Your Party */}
        <div className="lg:col-span-6 space-y-6 lg:pl-6 lg:border-l lg:border-white/10">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.25em] text-champagne-gold uppercase">
              CAPACITY REQUIREMENTS
            </span>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F4EDE4] tracking-tight">
              YOUR PARTY &amp; CARGO
            </h3>
            <p className="text-xs text-warm-ivory/50 font-light">
              We match you with vehicles configured with ample legroom and luggage capacity.
            </p>
          </div>

          <div className="space-y-4 pt-1">
            {/* PASSENGERS STEPPER */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-champagne-gold/10 text-champagne-gold flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-warm-ivory">Passengers</div>
                  <div className="text-[11px] text-warm-ivory/50 font-light">
                    Total guest count in cabin
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handlePassengerChange(-1)}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-warm-ivory hover:bg-white/10 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-mono text-base font-bold text-champagne-gold">
                  {bookingData.passengers}
                </span>
                <button
                  type="button"
                  onClick={() => handlePassengerChange(1)}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-warm-ivory hover:bg-white/10 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* LUGGAGE STEPPER */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-champagne-gold/10 text-champagne-gold flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-medium text-warm-ivory">Luggage Pieces</div>
                  <div className="text-[11px] text-warm-ivory/50 font-light">
                    Full-size suitcases &amp; carry-ons
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleLuggageChange(-1)}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-warm-ivory hover:bg-white/10 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-mono text-base font-bold text-champagne-gold">
                  {bookingData.luggage}
                </span>
                <button
                  type="button"
                  onClick={() => handleLuggageChange(1)}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-warm-ivory hover:bg-white/10 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* INCLUSION BADGES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-champagne-gold shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-medium text-warm-ivory">Discreet Executive Chauffeur</div>
                  <div className="text-[11px] text-warm-ivory/50 font-light mt-0.5">
                    Strict NDA adherence &amp; defensive chauffeur certification.
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                <Wifi className="w-4 h-4 text-champagne-gold shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-medium text-warm-ivory">Connected Sanctuary</div>
                  <div className="text-[11px] text-warm-ivory/50 font-light mt-0.5">
                    Encrypted Wi-Fi, fast USB-C ports, and cold spring water.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER ACTION BAR */}
      <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="px-6 py-3 rounded-full border border-white/15 text-warm-ivory/80 font-mono text-xs font-medium tracking-wider uppercase hover:border-white/40 hover:text-warm-ivory transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK</span>
        </button>

        <button
          type="button"
          onClick={() => setStep(3)}
          className="px-8 py-3.5 bg-champagne-gold text-obsidian rounded-full font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-warm-ivory hover:shadow-[0_0_20px_rgba(201,164,92,0.4)] transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
        >
          <span>CONTINUE TO VEHICLE SELECTION</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
