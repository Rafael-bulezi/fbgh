import React from 'react';
import { ArrowRight, CalendarDays, Clock, MapPin, Plus, Trash2 } from 'lucide-react';
import { useBooking, type ServiceTypeId } from '../../context/BookingContext';

const SERVICES: Array<{ id: ServiceTypeId; label: string }> = [
  { id: 'airport', label: 'Airport transfer' },
  { id: 'executive', label: 'Executive travel' },
  { id: 'hourly', label: 'Hourly chauffeur' },
  { id: 'event', label: 'Event / occasion' },
  { id: 'city', label: 'City-to-city' },
  { id: 'other', label: 'Other custom journey' },
];

export const JourneyStep: React.FC = () => {
  const { bookingData, updateBookingData, setStep } = useBooking();
  const canContinue = bookingData.pickup.trim().length > 0 && bookingData.destination.trim().length > 0;

  const handleAddStop = () => updateBookingData({ stops: [...bookingData.stops, ''] });
  const handleUpdateStop = (index: number, value: string) => {
    const stops = [...bookingData.stops];
    stops[index] = value;
    updateBookingData({ stops });
  };
  const handleRemoveStop = (index: number) => updateBookingData({ stops: bookingData.stops.filter((_, i) => i !== index) });

  return (
    <div className="flex w-full flex-grow flex-col justify-between py-2 sm:py-4">
      <div className="grid items-start gap-7 lg:grid-cols-12 lg:gap-10">
        <div className="space-y-5 lg:col-span-7">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-[0.25em] text-champagne-gold uppercase">STEP 01 OF 03</span>
            <h3 className="font-display text-xl font-bold tracking-tight text-[#F4EDE4] sm:text-2xl">WHERE ARE WE TAKING YOU?</h3>
            <p className="text-xs font-light text-warm-ivory/50">Enter the route, date, and time for your New York or Philadelphia journey.</p>
          </div>

          <div className="space-y-4">
            <label className="block space-y-2">
              <span className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase"><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-champagne-gold" />PICKUP LOCATION</span><span className="font-normal text-warm-ivory/40">REQUIRED</span></span>
              <span className="relative flex items-center"><MapPin className="pointer-events-none absolute left-3.5 h-4 w-4 text-champagne-gold" /><input type="text" value={bookingData.pickup} onChange={(e) => updateBookingData({ pickup: e.target.value })} placeholder="e.g. JFK Terminal 4, 740 Park Avenue, or Rittenhouse Square" className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-warm-ivory placeholder-warm-ivory/30 transition-colors focus:border-champagne-gold focus:outline-none" /></span>
            </label>

            {bookingData.stops.map((stop, index) => (
              <label key={index} className="block space-y-2 animate-fadeIn">
                <span className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-warm-ivory/60 uppercase"><span>ADDITIONAL STOP 0{index + 1}</span><button type="button" onClick={() => handleRemoveStop(index)} className="flex items-center gap-1 text-[10px] tracking-wider text-red-400/70 transition-colors hover:text-red-400"><Trash2 className="h-3 w-3" /> REMOVE</button></span>
                <span className="relative flex items-center"><MapPin className="pointer-events-none absolute left-3.5 h-4 w-4 text-warm-ivory/40" /><input type="text" value={stop} onChange={(e) => handleUpdateStop(index, e.target.value)} placeholder="Enter intermediate stop or pickup address" className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-warm-ivory placeholder-warm-ivory/30 focus:border-champagne-gold focus:outline-none" /></span>
              </label>
            ))}

            <label className="block space-y-2">
              <span className="flex items-center justify-between text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase"><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-champagne-gold" />FINAL DESTINATION</span><span className="font-normal text-warm-ivory/40">REQUIRED</span></span>
              <span className="relative flex items-center"><MapPin className="pointer-events-none absolute left-3.5 h-4 w-4 text-champagne-gold" /><input type="text" value={bookingData.destination} onChange={(e) => updateBookingData({ destination: e.target.value })} placeholder="e.g. Midtown Manhattan, Center City Philadelphia, or a private residence" className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-warm-ivory placeholder-warm-ivory/30 transition-colors focus:border-champagne-gold focus:outline-none" /></span>
            </label>

            <button type="button" onClick={handleAddStop} className="inline-flex items-center gap-2 py-1 text-xs font-mono tracking-[0.15em] text-champagne-gold uppercase transition-colors hover:text-warm-ivory"><Plus className="h-3.5 w-3.5" /><span>+ ADD ANOTHER STOP</span></button>
          </div>
        </div>

        <div className="space-y-5 border-white/10 lg:col-span-5 lg:border-l lg:pl-7">
          <div className="grid grid-cols-2 gap-3">
            <label className="block space-y-2"><span className="block text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase">DATE</span><span className="relative flex items-center"><CalendarDays className="pointer-events-none absolute left-3.5 h-4 w-4 text-champagne-gold" /><input type="text" value={bookingData.date} onChange={(e) => updateBookingData({ date: e.target.value })} placeholder="Select date" className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-3 text-sm text-warm-ivory placeholder-warm-ivory/30 focus:border-champagne-gold focus:outline-none" /></span></label>
            <label className="block space-y-2"><span className="block text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase">TIME</span><span className="relative flex items-center"><Clock className="pointer-events-none absolute left-3.5 h-4 w-4 text-champagne-gold" /><input type="text" value={bookingData.time} onChange={(e) => updateBookingData({ time: e.target.value })} placeholder="Select time" className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-3 text-sm text-warm-ivory placeholder-warm-ivory/30 focus:border-champagne-gold focus:outline-none" /></span></label>
          </div>

          <label className="block space-y-2"><span className="block text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase">JOURNEY TYPE</span><select value={bookingData.serviceType} onChange={(e) => updateBookingData({ serviceType: e.target.value as ServiceTypeId })} className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm capitalize text-warm-ivory focus:border-champagne-gold focus:outline-none"><option value="" className="bg-[#0C0D0E]">Select service</option>{SERVICES.map((service) => <option key={service.id} value={service.id} className="bg-[#0C0D0E]">{service.label}</option>)}</select></label>

          <div className="space-y-2"><span className="block text-[10px] font-mono tracking-[0.2em] text-champagne-gold uppercase">TRIP TYPE</span><div className="grid grid-cols-2 gap-3"><button type="button" onClick={() => updateBookingData({ tripType: 'one-way' })} className={`rounded-xl border px-3 py-3 text-xs font-mono tracking-wider transition-all ${bookingData.tripType === 'one-way' ? 'border-champagne-gold bg-champagne-gold text-obsidian' : 'border-white/10 bg-white/[0.03] text-warm-ivory/70'}`}>ONE WAY</button><button type="button" onClick={() => updateBookingData({ tripType: 'round-trip' })} className={`rounded-xl border px-3 py-3 text-xs font-mono tracking-wider transition-all ${bookingData.tripType === 'round-trip' ? 'border-champagne-gold bg-champagne-gold text-obsidian' : 'border-white/10 bg-white/[0.03] text-warm-ivory/70'}`}>ROUND TRIP</button></div></div>

          <div className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 text-xs font-light text-warm-ivory/60"><span>Traffic and flight timing are monitored for every NYC and Philadelphia journey.</span><span className="shrink-0 text-[10px] font-mono tracking-widest text-champagne-gold uppercase">ACTIVE RADAR</span></div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-6"><div className="hidden text-[11px] font-mono text-warm-ivory/40 sm:block">STAGE 01 OF 03 · JOURNEY OVERVIEW</div><button type="button" onClick={() => canContinue && setStep(2)} disabled={!canContinue} className={`ml-auto flex items-center gap-2.5 rounded-full px-8 py-3.5 text-xs font-bold tracking-[0.2em] uppercase transition-all ${canContinue ? 'bg-champagne-gold text-obsidian hover:bg-warm-ivory' : 'cursor-not-allowed bg-white/10 text-warm-ivory/30'}`}><span>CONTINUE</span><ArrowRight className="h-4 w-4" /></button></div>
    </div>
  );
};
