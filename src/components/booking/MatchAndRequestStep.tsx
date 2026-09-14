import React, { useState, useMemo } from 'react';
import {
  Users,
  Briefcase,
  ArrowLeft,
  ArrowRight,
  Check,
  Mail,
  User,
  Phone,
  MessageSquare
} from 'lucide-react';
import { FLEET_DATA, type Vehicle } from '../../data/fleetData';
import { useBooking } from '../../context/BookingContext';

export const MatchAndRequestStep: React.FC = () => {
  const { bookingData, updateBookingData, setStep } = useBooking();

  // Selected vehicle & hover preview state
  const [hoveredVehicleId, setHoveredVehicleId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Recommended vehicles algorithm: 3 best matching vehicles based on passengers, luggage, and preselection
  const recommendedVehicles = useMemo(() => {
    // Candidates matching passenger & luggage capacity
    let matches = FLEET_DATA.filter(
      (v) =>
        v.passengers >= bookingData.passengers &&
        v.luggage >= Math.min(bookingData.luggage, 4)
    );

    if (matches.length < 3) {
      matches = FLEET_DATA;
    }

    // Curate prominent luxury models
    const preferredIds = [
      'bmw-x7-m60i',
      'mercedes-s-class-s580',
      'cadillac-escalade-esv',
      'mercedes-sprinter-jet-edition',
      'lexus-lx600-vip',
    ];

    // If a vehicle was specifically pre-selected (e.g. from Fleet page), ensure it comes first
    const list: Vehicle[] = [];
    if (bookingData.selectedVehicleId) {
      const selected = FLEET_DATA.find((v) => v.id === bookingData.selectedVehicleId);
      if (selected) list.push(selected);
    }

    // Add preferred or matching models up to 3
    for (const prefId of preferredIds) {
      if (list.length >= 3) break;
      const found = matches.find((v) => v.id === prefId && !list.some((item) => item.id === v.id));
      if (found) list.push(found);
    }

    // Fallback if still under 3
    for (const v of matches) {
      if (list.length >= 3) break;
      if (!list.some((item) => item.id === v.id)) {
        list.push(v);
      }
    }

    return list.slice(0, 3);
  }, [bookingData.passengers, bookingData.luggage, bookingData.selectedVehicleId]);

  // Active vehicle to preview (hovered or currently selected)
  const previewVehicleId = hoveredVehicleId || bookingData.selectedVehicleId || recommendedVehicles[0]?.id;
  const activePreviewVehicle =
    FLEET_DATA.find((v) => v.id === previewVehicleId) || recommendedVehicles[0];

  const handleSelectVehicle = (vehicle: Vehicle) => {
    updateBookingData({ selectedVehicleId: vehicle.id });
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.fullName.trim() || !bookingData.email.trim() || !bookingData.phone.trim()) {
      setErrorMsg('Please provide your full name, email address, and phone number.');
      return;
    }

    setErrorMsg(null);
    const code = 'FBGH-' + Math.floor(100000 + Math.random() * 900000);
    updateBookingData({ confirmationCode: code });
    setStep(4);
  };

  return (
    <form onSubmit={handleFinalSubmit} className="w-full flex-grow flex flex-col justify-between py-2 sm:py-4">
      <div className="space-y-6">
        
        {/* TOP SECTION: VEHICLE RECOMMENDATIONS */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-white/10 pb-3">
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] text-champagne-gold uppercase">
                STEP 03 OF 03 · FLEET MATCH
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F4EDE4] tracking-tight">
                CHOOSE YOUR VEHICLE
              </h3>
            </div>
            <p className="text-xs text-warm-ivory/50 font-light">
              Recommended for {bookingData.passengers} guests &amp; {bookingData.luggage} luggage pieces
            </p>
          </div>

          {/* 3 VEHICLE CARDS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {recommendedVehicles.map((vehicle) => {
              const isSelected = bookingData.selectedVehicleId === vehicle.id;
              const isHovered = hoveredVehicleId === vehicle.id;

              return (
                <div
                  key={vehicle.id}
                  onMouseEnter={() => setHoveredVehicleId(vehicle.id)}
                  onMouseLeave={() => setHoveredVehicleId(null)}
                  onClick={() => handleSelectVehicle(vehicle)}
                  className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative group ${
                    isSelected
                      ? 'bg-champagne-gold/15 border-champagne-gold shadow-[0_0_25px_rgba(201,164,92,0.2)]'
                      : isHovered
                      ? 'bg-white/[0.04] border-champagne-gold/50'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Selected Checkmark Badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-champagne-gold text-obsidian flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="h-28 w-full overflow-hidden rounded-lg bg-black/40 relative">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2 left-2 text-[10px] font-mono tracking-widest text-champagne-gold uppercase">
                        {vehicle.class || vehicle.category.toUpperCase()}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-display font-semibold text-base text-[#F4EDE4] tracking-tight group-hover:text-[#E0B268] transition-colors">
                        {vehicle.name}
                      </h4>
                      <p className="text-[11px] text-warm-ivory/50">
                        {vehicle.categoryLabel}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-warm-ivory/70 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-champagne-gold" />
                      {vehicle.passengers} Seats
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-champagne-gold" />
                      {vehicle.luggage} Bags
                    </span>
                    <span className="text-champagne-gold font-semibold">
                      {isSelected ? 'SELECTED' : 'SELECT'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* VEHICLE EXPANDED PREVIEW (ON HOVER / SELECT) */}
          {activePreviewVehicle && (
            <div className="p-4 rounded-xl bg-white/[0.03] border border-champagne-gold/30 flex flex-col md:flex-row items-center justify-between gap-4 animate-fadeIn">
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-white/10">
                  <img
                    src={activePreviewVehicle.image}
                    alt={activePreviewVehicle.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm text-[#F4EDE4] font-bold">
                      {activePreviewVehicle.name}
                    </span>
                    <span className="text-[10px] font-mono text-champagne-gold uppercase px-2 py-0.5 rounded bg-champagne-gold/10">
                      {activePreviewVehicle.categoryLabel}
                    </span>
                  </div>
                  <p className="text-xs text-warm-ivory/60 line-clamp-1 mt-0.5">
                    {activePreviewVehicle.description}
                  </p>
                </div>
              </div>

              {/* 4 COMPACT SPEC PILLS */}
              <div className="flex flex-wrap items-center gap-2 shrink-0 text-[10px] font-mono">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-warm-ivory/80">
                  {activePreviewVehicle.passengers} SEATS
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-warm-ivory/80">
                  {activePreviewVehicle.luggage} BAGS
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-warm-ivory/80">
                  PREMIUM COMFORT
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-champagne-gold">
                  ENCRYPTED WI-FI
                </span>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM SECTION: JOURNEY SUMMARY & CONTACT FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
          
          {/* LEFT: LIVE JOURNEY SUMMARY */}
          <div className="lg:col-span-5 p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-3.5">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <span className="text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase">
                YOUR JOURNEY SUMMARY
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-warm-ivory/50">Service</span>
                <span className="text-warm-ivory font-medium uppercase tracking-wider">
                  {bookingData.serviceType || 'Chauffeur Transit'}
                </span>
              </div>

              <div className="flex justify-between items-start gap-4">
                <span className="text-warm-ivory/50 shrink-0">Pickup</span>
                <span className="text-warm-ivory text-right font-light line-clamp-2">
                  {bookingData.pickup}
                </span>
              </div>

              <div className="flex justify-between items-start gap-4">
                <span className="text-warm-ivory/50 shrink-0">Destination</span>
                <span className="text-warm-ivory text-right font-light line-clamp-2">
                  {bookingData.destination}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-warm-ivory/50">Date &amp; Time</span>
                <span className="text-warm-ivory">
                  {bookingData.date} at {bookingData.time}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-warm-ivory/50">Trip Type</span>
                <span className="text-warm-ivory uppercase tracking-wider">
                  {bookingData.tripType === 'one-way' ? 'One Way' : 'Round Trip'}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-warm-ivory/50">Party / Luggage</span>
                <span className="text-warm-ivory">
                  {bookingData.passengers} Guests · {bookingData.luggage} Bags
                </span>
              </div>

              {activePreviewVehicle && (
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-warm-ivory/50">Assigned Model</span>
                  <span className="text-[#E0B268] font-semibold font-display">
                    {activePreviewVehicle.name}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: CONTACT DETAILS & SPECIAL REQUEST */}
          <div className="lg:col-span-7 space-y-4">
            <div className="border-b border-white/10 pb-2">
              <span className="text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase">
                CONTACT DETAILS &amp; INSTRUCTIONS
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* FULL NAME */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-[0.15em] text-warm-ivory/60 uppercase block">
                  FULL NAME
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-champagne-gold absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={bookingData.fullName}
                    onChange={(e) => updateBookingData({ fullName: e.target.value })}
                    placeholder="e.g. Alexander Vance"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-warm-ivory placeholder-warm-ivory/30 focus:outline-none focus:border-champagne-gold transition-colors"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-[0.15em] text-warm-ivory/60 uppercase block">
                  EMAIL ADDRESS
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-champagne-gold absolute left-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={bookingData.email}
                    onChange={(e) => updateBookingData({ email: e.target.value })}
                    placeholder="e.g. a.vance@vanceholdings.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-warm-ivory placeholder-warm-ivory/30 focus:outline-none focus:border-champagne-gold transition-colors"
                  />
                </div>
              </div>

              {/* PHONE */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[10px] font-mono tracking-[0.15em] text-warm-ivory/60 uppercase block">
                  CONTACT TELEPHONE
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-champagne-gold absolute left-3 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) => updateBookingData({ phone: e.target.value })}
                    placeholder="e.g. +1 (917) 555-0198"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-warm-ivory placeholder-warm-ivory/30 focus:outline-none focus:border-champagne-gold transition-colors"
                  />
                </div>
              </div>

              {/* SPECIAL REQUEST */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[10px] font-mono tracking-[0.15em] text-warm-ivory/60 uppercase block">
                  SPECIAL REQUESTS (OPTIONAL)
                </label>
                <div className="relative flex items-start">
                  <MessageSquare className="w-4 h-4 text-champagne-gold absolute left-3 top-3 pointer-events-none" />
                  <textarea
                    rows={2}
                    value={bookingData.specialRequest}
                    onChange={(e) => updateBookingData({ specialRequest: e.target.value })}
                    placeholder="e.g. Chilled sparkling water, child seat, FBO tarmac staging instructions..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-3 py-2 text-xs text-warm-ivory placeholder-warm-ivory/30 focus:outline-none focus:border-champagne-gold transition-colors resize-none"
                  />
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
          onClick={() => setStep(2)}
          className="px-6 py-3 rounded-full border border-white/15 text-warm-ivory/80 font-mono text-xs font-medium tracking-wider uppercase hover:border-white/40 hover:text-warm-ivory transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK</span>
        </button>

        <button
          type="submit"
          className="px-8 py-3.5 bg-champagne-gold text-obsidian rounded-full font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-warm-ivory hover:shadow-[0_0_20px_rgba(201,164,92,0.4)] transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
        >
          <span>REQUEST MY RIDE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
