import React from 'react';
import { CheckCircle2, ShieldCheck, MapPin, Calendar, Users, Car } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { FLEET_DATA } from '../../data/fleetData';

export const ConfirmationStep: React.FC = () => {
  const { bookingData, closeBooking, resetBooking } = useBooking();

  const vehicle =
    FLEET_DATA.find((v) => v.id === bookingData.selectedVehicleId) || FLEET_DATA[0];

  return (
    <div className="w-full flex-grow flex flex-col justify-center items-center py-6 sm:py-10 max-w-2xl mx-auto text-center space-y-6 animate-fadeIn">
      {/* MINIMAL ELEGANT GOLD CHECKMARK CIRCLE */}
      <div className="w-16 h-16 rounded-full bg-champagne-gold/15 border border-champagne-gold/60 flex items-center justify-center text-champagne-gold shadow-[0_0_35px_rgba(201,164,92,0.25)]">
        <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-champagne-gold">
          CONCIERGE DISPATCH ACTIVE
        </span>
        <h3 className="font-display font-black text-3xl sm:text-4xl text-[#F4EDE4] tracking-tight">
          REQUEST RECEIVED.
        </h3>
        <p className="text-xs sm:text-sm text-warm-ivory/60 font-light max-w-md mx-auto leading-relaxed">
          We&apos;ll review your journey and confirm availability shortly. Your dedicated executive chauffeur will be assigned and calibrated in advance.
        </p>
      </div>

      {/* CONFIRMATION CODE PILL */}
      <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-champagne-gold/40">
        <span className="text-[10px] font-mono text-warm-ivory/50 tracking-widest uppercase">
          CONFIRMATION CODE
        </span>
        <span className="font-mono text-xs font-bold text-champagne-gold tracking-widest">
          {bookingData.confirmationCode || 'FBGH-742195'}
        </span>
      </div>

      <p className="text-[11px] font-mono text-warm-ivory/40">
        A formal itinerary confirmation has been dispatched to{' '}
        <span className="text-warm-ivory font-medium">{bookingData.email}</span>
      </p>

      {/* COMPACT JOURNEY RECAP */}
      <div className="w-full p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-left space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-3">
            <Car className="w-4 h-4 text-champagne-gold" />
            <span className="font-display text-sm text-[#F4EDE4] font-bold">
              {vehicle.name}
            </span>
          </div>
          <span className="text-[10px] font-mono text-champagne-gold uppercase tracking-wider">
            {vehicle.categoryLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-3.5 h-3.5 text-champagne-gold shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-mono text-warm-ivory/40 uppercase">FROM</div>
              <div className="text-warm-ivory font-light line-clamp-1">{bookingData.pickup}</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin className="w-3.5 h-3.5 text-champagne-gold shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-mono text-warm-ivory/40 uppercase">TO</div>
              <div className="text-warm-ivory font-light line-clamp-1">{bookingData.destination}</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Calendar className="w-3.5 h-3.5 text-champagne-gold shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-mono text-warm-ivory/40 uppercase">DATE &amp; TIME</div>
              <div className="text-warm-ivory font-light">
                {bookingData.date} at {bookingData.time}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Users className="w-3.5 h-3.5 text-champagne-gold shrink-0 mt-0.5" />
            <div>
              <div className="text-[10px] font-mono text-warm-ivory/40 uppercase">PARTY</div>
              <div className="text-warm-ivory font-light">
                {bookingData.passengers} Guests · {bookingData.luggage} Bags
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-warm-ivory/40">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-champagne-gold" />
            Staged 15 min early · Flight-aware telemetry
          </span>
          <span className="font-mono text-champagne-gold uppercase">CONFIRMED</span>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
        <button
          type="button"
          onClick={closeBooking}
          className="w-full sm:w-auto px-10 py-3.5 bg-champagne-gold text-obsidian rounded-full font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-warm-ivory hover:shadow-[0_0_20px_rgba(201,164,92,0.4)] transition-all duration-300 cursor-pointer"
        >
          CLOSE CONCIERGE
        </button>

        <button
          type="button"
          onClick={resetBooking}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-white/15 text-warm-ivory/70 font-mono text-xs font-medium tracking-wider uppercase hover:border-white/30 hover:text-warm-ivory transition-colors cursor-pointer"
        >
          START NEW REQUEST
        </button>
      </div>
    </div>
  );
};
