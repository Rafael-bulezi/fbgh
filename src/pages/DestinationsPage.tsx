import React, { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Compass,
  MapPin,
  MoveRight,
  Phone,
  Plane,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { CurvedHero } from '../components/common/CurvedHero';
import { CurvedDivider } from '../components/common/CurvedDivider';
import { useSubtleParallax } from '../hooks/useSubtleParallax';

interface DestinationsPageProps {
  onOpenBooking: () => void;
}

const DESTINATION_LABELS = ['NEW YORK', 'PHILADELPHIA', 'AIRPORTS & FBOS', 'PRIVATE ESCAPES'];

const DestinationChapter: React.FC<{
  index: number;
  destination: (typeof DESTINATIONS_DATA)[0];
  isActive: boolean;
  onSelect: () => void;
}> = ({ index, destination, isActive, onSelect }) => {
  const [imgRef, parallaxY] = useSubtleParallax<HTMLImageElement>({ speed: 0.08, maxOffset: 38 });

  return (
    <article className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start border-t border-[#D9D3C8] pt-8 sm:pt-10 ${isActive ? '' : 'opacity-70 hover:opacity-100'} transition-opacity duration-500`}>
      <button type="button" onClick={onSelect} className="lg:col-span-2 flex lg:block items-center gap-4 text-left">
        <span className={`font-mono text-sm transition-colors ${isActive ? 'text-[#C5A059]' : 'text-[#8F897F]'}`}>0{index + 1}</span>
        <span className="hidden lg:block mt-10 w-10 h-px bg-[#C5A059] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </button>

      <div className="lg:col-span-5 relative aspect-[4/3] overflow-hidden bg-[#E9E4DB]">
        <img
          ref={imgRef}
          src={destination.image}
          alt={`${destination.name} destination corridor`}
          loading={index === 0 ? 'eager' : 'lazy'}
          className="w-full h-full object-cover scale-[1.08] transition-transform duration-700 group-hover:scale-[1.12]"
          style={{ transform: `translate3d(0, ${parallaxY}px, 0) scale(1.08)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E]/65 via-transparent to-transparent" />
        <div className="absolute left-5 bottom-5 flex items-center gap-2 text-[10px] font-mono tracking-[0.18em] text-white/80 uppercase">
          <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
          {destination.coordinates}
        </div>
      </div>

      <div className="lg:col-span-5 lg:pt-1">
        <button type="button" onClick={onSelect} className="text-left group/title">
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#967C52] uppercase">{destination.subtitle}</span>
          <h2 className="mt-3 font-display font-black text-4xl sm:text-6xl leading-[0.88] tracking-[-0.06em] text-[#141416] group-hover/title:text-[#A37F35] transition-colors">
            {destination.name}
          </h2>
        </button>
        <p className="mt-7 max-w-xl text-sm sm:text-base leading-relaxed text-[#55555C]">{destination.description}</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 border-t border-[#D9D3C8] pt-5">
          {destination.keyHubs.slice(0, 4).map((hub) => (
            <div key={hub} className="flex items-start gap-2 text-xs text-[#6F6A62] leading-relaxed">
              <MapPin className="w-3 h-3 mt-0.5 shrink-0 text-[#C5A059]" />
              <span>{hub}</span>
            </div>
          ))}
        </div>
        <button type="button" onClick={onSelect} className="pb-btn pb-btn-text mt-8 text-[10px]">
          Explore corridor <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </article>
  );
};

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ onOpenBooking }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeDestination = DESTINATIONS_DATA[activeIndex];
  const totalRoutes = useMemo(() => DESTINATIONS_DATA.reduce((sum, destination) => sum + destination.popularRoutes.length, 0), []);

  return (
    <div className="w-full bg-[#FAF8F5] text-[#141416] overflow-hidden selection:bg-[#C5A059] selection:text-[#0C0C0E]">
      <CurvedHero
        eyebrow="REGIONAL & GLOBAL COVERAGE"
        titleLine1="ARRIVE WITH"
        titleLine2="INTENTION."
        description="Flawless movement across the places that shape your day — from the private gate to the final curb, every corridor is considered before you enter it."
        image="/images/destination-hero-concept.jpg"
        imageAlt="Executive SUV moving toward a city and airport horizon at dusk"
        curveVariant="s-curve"
        theme="light"
        mobileImagePosition="object-[67%_center]"
        imagePosition="object-center"
        slogan="NEW YORK · PHILADELPHIA · PRIVATE AVIATION · BEYOND"
      />

      <section className="bg-[#FAF8F5] px-6 sm:px-12 lg:px-20 py-24 sm:py-36 lg:py-48">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-3 flex items-center gap-3 lg:pt-4">
            <span className="w-8 h-px bg-[#C5A059]" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#967C52] uppercase">THE FBGH MAP</span>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-[8.5vw] leading-[0.86] tracking-[-0.07em] max-w-6xl">
              The distance is<br />
              <span className="text-[#C5A059]">part of the service.</span>
            </h2>
            <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl">
              <p className="text-base sm:text-lg leading-relaxed text-[#414148]">A destination is more than a pin on a map. It is the timing of the curb, the quiet of the cabin, and the confidence that the next handoff has already been considered.</p>
              <p className="text-base sm:text-lg leading-relaxed text-[#414148]">Our coverage is built around the moments that matter: arrivals, departures, meetings, weekends away, and the space between two demanding parts of a day.</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 sm:mt-36 pt-6 border-t border-[#D9D3C8] grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            [DESTINATIONS_DATA.length.toString(), 'PRIMARY CORRIDORS'],
            [totalRoutes.toString(), 'ROUTE STARTING POINTS'],
            ['24 / 7', 'HUMAN OVERSIGHT'],
            ['01', 'CONCIERGE STANDARD'],
          ].map(([value, label]) => (
            <div key={label} className="space-y-2">
              <div className="font-display font-black text-3xl sm:text-4xl tracking-tight">{value}</div>
              <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.18em] text-[#8B8478] uppercase leading-relaxed">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <CurvedDivider variant="s-curve" fromColor="#FAF8F5" toColor="#0C0C0E" height="clamp(45px, 6vw, 95px)" />

      <section className="bg-[#0C0C0E] text-[#F4EDE4] px-6 sm:px-12 lg:px-20 py-24 sm:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
            <div className="flex items-center gap-3 mb-6"><span className="w-8 h-px bg-[#C5A059]" /><span className="text-[10px] font-mono tracking-[0.3em] text-[#C5A059] uppercase">THE CORRIDORS</span></div>
            <h2 className="font-display font-black text-5xl sm:text-7xl leading-[0.88] tracking-[-0.06em]">Move through<br /><span className="text-[#C5A059]">what matters.</span></h2>
            <p className="mt-8 max-w-sm text-sm sm:text-base text-white/55 leading-relaxed">Four distinct kinds of movement. One consistent standard of preparation, discretion, and human attention.</p>
            <div className="hidden lg:flex mt-12 items-center gap-4 text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase"><span className="text-[#C5A059]">0{activeIndex + 1}</span><span className="w-16 h-px bg-white/15" /><span>{DESTINATION_LABELS[activeIndex]}</span></div>
          </div>
          <div className="lg:col-span-8 space-y-12 sm:space-y-16">
            {DESTINATIONS_DATA.map((destination, index) => (
              <DestinationChapter key={destination.id} index={index} destination={destination} isActive={index === activeIndex} onSelect={() => setActiveIndex(index)} />
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider variant="gentle-wave" fromColor="#0C0C0E" toColor="#151518" height="clamp(35px, 5vw, 70px)" />

      <section className="bg-[#151518] text-[#F4EDE4] px-6 sm:px-12 lg:px-20 py-24 sm:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 sm:mb-20">
            <div>
              <div className="flex items-center gap-3 mb-5"><span className="w-8 h-px bg-[#C5A059]" /><span className="text-[10px] font-mono tracking-[0.3em] text-[#C5A059] uppercase">CORRIDOR INTELLIGENCE</span></div>
              <h2 className="font-display font-black text-5xl sm:text-7xl tracking-[-0.06em] leading-[0.9]">The route is<br /><span className="text-[#C5A059]">already considered.</span></h2>
            </div>
            <p className="max-w-xs text-sm text-white/45 leading-relaxed">Select a corridor to see the kind of movement FBGH is prepared to coordinate.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
            <div className="lg:col-span-4 flex lg:block overflow-x-auto no-scrollbar gap-2 pb-2 lg:pb-0">
              {DESTINATIONS_DATA.map((destination, index) => (
                <button key={destination.id} type="button" onClick={() => setActiveIndex(index)} className={`shrink-0 w-auto lg:w-full text-left border-t py-5 px-2 lg:px-0 transition-colors ${index === activeIndex ? 'border-[#C5A059] text-[#F4EDE4]' : 'border-white/15 text-white/35 hover:text-white/70'}`}>
                  <span className="font-mono text-[10px] tracking-[0.2em] mr-4 text-[#C5A059]">0{index + 1}</span><span className="text-xs tracking-[0.16em] uppercase">{destination.name}</span>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8 bg-[#0C0C0E] border border-white/10 p-6 sm:p-10 lg:p-12">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-white/10 pb-8">
                <div><div className="text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase mb-3">ACTIVE CORRIDOR</div><h3 className="font-display font-black text-4xl sm:text-6xl tracking-[-0.06em] leading-none">{activeDestination.name}</h3></div>
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.16em] text-white/40 uppercase"><ShieldCheck className="w-4 h-4 text-[#C5A059]" /> Prepared movement</div>
              </div>
              <div className="mt-8 space-y-3">
                {activeDestination.popularRoutes.map((route) => (
                  <div key={`${route.from}-${route.to}`} className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 sm:items-center border-b border-white/10 pb-4 text-sm">
                    <div className="flex items-center gap-3 text-white/75"><span>{route.from}</span><MoveRight className="w-4 h-4 text-[#C5A059]" /><span>{route.to}</span></div>
                    <div className="flex items-center gap-4 text-xs font-mono text-white/40"><span>{route.typicalDuration}</span><span className="text-[#C5A059]">FROM {route.startingRate}</span></div>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-white/45">
                <div className="flex items-start gap-3"><Plane className="w-4 h-4 text-[#C5A059] shrink-0" /><span>Airport and FBO handoffs considered in advance.</span></div>
                <div className="flex items-start gap-3"><Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" /><span>Prepared cabins for the pace of the day.</span></div>
                <div className="flex items-start gap-3"><Check className="w-4 h-4 text-[#C5A059] shrink-0" /><span>Clear communication from booking to arrival.</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CurvedDivider variant="circular-arc" fromColor="#151518" toColor="#FAF8F5" height="clamp(45px, 6vw, 95px)" />

      <section className="bg-[#FAF8F5] text-[#141416] px-6 sm:px-12 lg:px-20 py-28 sm:py-40">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8"><span className="w-8 h-px bg-[#C5A059]" /><span className="text-[10px] font-mono tracking-[0.3em] text-[#967C52] uppercase">THE UNMAPPED ROUTE</span><span className="w-8 h-px bg-[#C5A059]" /></div>
          <h2 className="font-display font-black text-6xl sm:text-8xl lg:text-[9vw] leading-[0.82] tracking-[-0.08em]">Your destination<br /><span className="text-[#C5A059]">is not on the list.</span></h2>
          <p className="max-w-xl mx-auto mt-10 text-base sm:text-lg leading-relaxed text-[#55555C]">Tell us where the day begins and where it needs to end. We will build the corridor around you.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button type="button" onClick={onOpenBooking} className="pb-btn pb-btn-primary"><span>Plan a journey</span><ArrowUpRight className="w-4 h-4" /></button>
            <a href="tel:9295650100" className="pb-btn pb-btn-outline"><Phone className="w-3.5 h-3.5" /><span>Call concierge</span></a>
          </div>
          <div className="mt-16 flex justify-center items-center gap-3 text-[10px] font-mono tracking-[0.24em] text-[#8B8478] uppercase"><ArrowDown className="w-3.5 h-3.5 text-[#C5A059]" /> Built around the way you move</div>
        </div>
      </section>
    </div>
  );
};
