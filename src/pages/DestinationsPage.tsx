import React, { useRef, useState } from 'react';
import {
  ArrowUpRight,
  Clock3,
  Compass,
  Luggage,
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

const CHAPTER_META = [
  { label: 'CITY ARRIVAL', title: <>JFK TO<br /><span className="text-[#C5A059]">MIDTOWN.</span></>, detail: 'AIRPORT TO THE CITY. SEAMLESSLY.' },
  { label: 'EXECUTIVE TRANSFER', title: <>HISTORIC ROOTS.<br /><span className="text-[#C5A059]">MODERN ARRIVALS.</span></>, detail: 'CULTURE. BUSINESS. HOME.' },
  { label: 'PRIVATE AVIATION', title: <>RUNWAY TO<br /><span className="text-[#C5A059]">REFINED.</span></>, detail: 'FROM TARMAC TO THE CITY, WITHOUT THE FRICTION.' },
  { label: 'PRIVATE ESCAPE', title: <>THE LONG WAY<br /><span className="text-[#C5A059]">HOME.</span></>, detail: 'COASTAL RETREATS, CONSIDERED.' },
];

const SERVICE_PROOF = [
  { icon: Plane, title: 'AIRPORT HANDOFF', body: 'From terminal to vehicle, every transition is handled.' },
  { icon: Luggage, title: 'LUGGAGE EASE', body: 'The details move with you, without becoming your problem.' },
  { icon: Clock3, title: 'TIMING CONFIDENCE', body: 'Real-time updates. No guesswork. No unnecessary noise.' },
  { icon: Sparkles, title: 'PREPARED CABIN', body: 'Comfort, privacy, and attention calibrated to the journey.' },
];

const ChapterImage: React.FC<{ destination: (typeof DESTINATIONS_DATA)[0]; index: number; active: boolean }> = ({ destination, index, active }) => {
  const [imgRef, parallaxY] = useSubtleParallax<HTMLImageElement>({ speed: 0.06, maxOffset: 24 });

  return (
    <div className={`relative aspect-[1.18/1] overflow-hidden bg-[#E8E2D8] transition-all duration-500 sm:aspect-[1.35/1] ${active ? 'ring-1 ring-[#C5A059] ring-offset-8 ring-offset-[#F2EEE6]' : ''}`}>
      <img
        ref={imgRef}
        src={destination.image}
        alt={`${destination.name} destination corridor`}
        loading={index === 0 ? 'eager' : 'lazy'}
        className="h-full w-full object-cover scale-[1.06] luminous-media"
        style={{ transform: `translate3d(0, ${parallaxY}px, 0) scale(1.06)`, transition: 'transform 0.1s ease-out' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E]/65 via-transparent to-transparent" />
      <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[9px] font-mono tracking-[0.2em] text-white/90 uppercase">
        <Compass className="h-3.5 w-3.5 text-[#C5A059]" />
        {destination.coordinates}
      </div>
      <div className="absolute right-5 top-5 text-[9px] font-mono tracking-[0.2em] text-white/70">0{index + 1} / 04</div>
    </div>
  );
};

const RouteFacts: React.FC<{ destination: (typeof DESTINATIONS_DATA)[0]; index: number }> = ({ destination, index }) => {
  const route = destination.popularRoutes[0];
  const meta = CHAPTER_META[index];

  return (
    <div className="pt-1 lg:pt-5">
      <div className="flex items-center gap-3 text-[9px] font-mono tracking-[0.28em] text-[#967C52] uppercase"><span>{meta.label}</span><span className="h-px w-8 bg-[#C5A059]" /></div>
      <h3 className="mt-4 max-w-xl font-display text-4xl font-black leading-[0.88] tracking-[-0.06em] text-[#141416] sm:text-6xl">{meta.title}</h3>
      <p className="mt-5 max-w-sm text-xs font-medium tracking-[0.14em] text-[#55555C] uppercase">{meta.detail}</p>
      <div className="mt-7 grid max-w-md grid-cols-[1fr_auto_1fr] items-center gap-3 border-y border-[#D9D3C8] py-5">
        <div><span className="block text-[9px] font-mono tracking-[0.2em] text-[#8B8478] uppercase">PICKUP</span><span className="mt-2 block text-sm font-semibold text-[#141416]">{route.from}</span></div>
        <MoveRight className="h-4 w-4 text-[#C5A059]" />
        <div className="text-right"><span className="block text-[9px] font-mono tracking-[0.2em] text-[#8B8478] uppercase">ARRIVAL</span><span className="mt-2 block text-sm font-semibold text-[#141416]">{route.to}</span></div>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-mono tracking-[0.18em] text-[#8B8478] uppercase"><span>{route.typicalDuration}</span><span>FROM {route.startingRate}</span></div>
      <p className="mt-6 max-w-lg text-sm leading-relaxed text-[#55555C]">{destination.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">{destination.keyHubs.slice(0, 3).map((hub) => <span key={hub} className="border border-[#D9D3C8] px-3 py-2 text-[9px] font-mono tracking-[0.12em] text-[#7B746A] uppercase">{hub}</span>)}</div>
      <button type="button" className="pb-btn pb-btn-text mt-7 text-[10px]">Read the corridor <ArrowUpRight className="h-3.5 w-3.5" /></button>
    </div>
  );
};

const JourneyChapter: React.FC<{ destination: (typeof DESTINATIONS_DATA)[0]; index: number; active: boolean; chapterRef: (node: HTMLElement | null) => void; onSelect: () => void }> = ({ destination, index, active, chapterRef, onSelect }) => (
  <article ref={chapterRef} className={`relative scroll-mt-32 grid grid-cols-1 gap-7 lg:grid-cols-[1fr_48px_1fr] lg:gap-8 ${active ? '' : 'opacity-60 hover:opacity-100'} transition-opacity duration-500`}>
    <div className={index % 2 === 0 ? 'lg:order-1' : 'lg:order-3'}>
      <button type="button" onClick={onSelect} className="block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#C5A059]"><ChapterImage destination={destination} index={index} active={active} /></button>
    </div>
    <div className="relative hidden lg:order-2 lg:flex lg:justify-center">
      <span className="absolute top-0 bottom-0 w-px bg-[#C5A059]/45" />
      <button type="button" aria-label={`Select ${destination.name}`} onClick={onSelect} className={`relative z-10 mt-8 h-5 w-5 rounded-full border bg-[#F2EEE6] transition-all ${active ? 'border-[#C5A059] shadow-[0_0_0_8px_rgba(197,160,89,0.14)]' : 'border-[#B6AA96]'}`}><span className={`absolute inset-1.5 rounded-full bg-[#C5A059] transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`} /></button>
      {index < DESTINATIONS_DATA.length - 1 && <span className="absolute -bottom-7 text-[9px] font-mono tracking-[0.18em] text-[#A49784]">0{index + 2} / 04</span>}
    </div>
    <div className={`${index % 2 === 0 ? 'lg:order-3 lg:pl-4' : 'lg:order-1 lg:pr-4'}`}><RouteFacts destination={destination} index={index} /></div>
  </article>
);

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ onOpenBooking }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);

  const selectChapter = (index: number, shouldScroll = true) => {
    setActiveIndex(index);
    if (shouldScroll) chapterRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full overflow-hidden bg-[#FAF8F5] text-[#141416] selection:bg-[#C5A059] selection:text-[#0C0C0E]">
      <CurvedHero eyebrow="DESTINATIONS" titleLine1="THE ROUTE IS PART" titleLine2="OF THE SERVICE." description="We do not just get you there. We protect the distance between places — so you can focus on what matters most." image="/images/destination-hero-concept.jpg" imageAlt="Chauffeur opening an executive SUV at a private terminal" curveVariant="s-curve" theme="light" mobileImagePosition="object-[68%_center]" imagePosition="object-center" slogan="NEW YORK · PHILADELPHIA · PRIVATE AVIATION · BEYOND" />

      <section className="px-6 py-24 sm:px-12 sm:py-32 lg:px-20 lg:py-40"><div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24"><div className="flex items-center gap-3 lg:col-span-3 lg:items-start lg:pt-4"><span className="h-px w-8 bg-[#C5A059]" /><span className="text-[10px] font-mono tracking-[0.3em] text-[#967C52] uppercase">THE FBGH DIFFERENCE</span></div><div className="lg:col-span-9"><h2 className="max-w-6xl font-display text-5xl font-black leading-[0.86] tracking-[-0.07em] sm:text-7xl lg:text-[8.5vw]">The distance is<br /><span className="text-[#C5A059]">part of the service.</span></h2><div className="mt-10 grid max-w-4xl grid-cols-1 gap-8 text-base leading-relaxed text-[#414148] sm:text-lg md:grid-cols-2 md:gap-16 lg:mt-14"><p>Every journey has a visible destination and an invisible standard. The vehicle is ready, the route is read, and the next handoff is already considered.</p><p>That is what makes distance feel different with FBGH: less uncertainty, less noise, and more room to arrive as the day asks you to.</p></div></div></div></section>

      <CurvedDivider variant="gentle-wave" fromColor="#FAF8F5" toColor="#F2EEE6" height="clamp(40px, 5vw, 80px)" />

      <section className="bg-[#F2EEE6] px-6 py-20 sm:px-12 sm:py-28 lg:px-20 lg:py-32"><div className="mx-auto max-w-7xl"><div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end sm:mb-16"><div><div className="mb-5 flex items-center gap-3"><span className="h-px w-8 bg-[#C5A059]" /><span className="text-[10px] font-mono tracking-[0.3em] text-[#967C52] uppercase">THE PRIVATE ITINERARY</span></div><h2 className="max-w-3xl font-display text-5xl font-black leading-[0.88] tracking-[-0.07em] sm:text-7xl">Follow the<br /><span className="text-[#C5A059]">arrival line.</span></h2></div><p className="max-w-xs text-sm leading-relaxed text-[#6F6A62]">Choose a corridor. The route, image, and service context move with you.</p></div>
        <div className="sticky top-16 z-20 mb-16 overflow-x-auto border-y border-[#D9D3C8] bg-[#F2EEE6]/95 backdrop-blur-md sm:mb-20"><div className="flex min-w-max items-center gap-1 py-2">{DESTINATIONS_DATA.map((destination, index) => <button key={destination.id} type="button" aria-current={index === activeIndex ? 'step' : undefined} onClick={() => selectChapter(index)} className={`flex items-center gap-3 px-4 py-3 text-left transition-colors ${index === activeIndex ? 'text-[#141416]' : 'text-[#8B8478] hover:text-[#141416]'}`}><span className={`font-mono text-[10px] ${index === activeIndex ? 'text-[#C5A059]' : 'text-[#B5A994]'}`}>0{index + 1}</span><span className="text-[10px] font-bold tracking-[0.16em] uppercase">{destination.name}</span>{index < DESTINATIONS_DATA.length - 1 && <span className="hidden h-px w-5 bg-[#C5A059]/50 sm:block" />}</button>)}</div></div>
        <div className="space-y-20 sm:space-y-28 lg:space-y-32">{DESTINATIONS_DATA.map((destination, index) => <JourneyChapter key={destination.id} destination={destination} index={index} active={index === activeIndex} chapterRef={(node) => { chapterRefs.current[index] = node; }} onSelect={() => selectChapter(index, false)} />)}</div>
      </div></section>

      <CurvedDivider variant="s-curve" fromColor="#F2EEE6" toColor="#0C0C0E" height="clamp(45px, 6vw, 95px)" />

      <section className="bg-[#0C0C0E] px-6 py-24 text-[#F4EDE4] sm:px-12 sm:py-32 lg:px-20 lg:py-36"><div className="mx-auto max-w-7xl"><div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end sm:mb-16"><div><div className="mb-5 flex items-center gap-3"><span className="h-px w-8 bg-[#C5A059]" /><span className="text-[10px] font-mono tracking-[0.3em] text-[#C5A059] uppercase">THE FBGH STANDARD</span></div><h2 className="font-display text-5xl font-black leading-[0.88] tracking-[-0.07em] sm:text-7xl">What we make<br /><span className="text-[#C5A059]">effortless.</span></h2></div><p className="max-w-xs text-sm leading-relaxed text-white/45">The scenic part of a journey is easy to photograph. The standard behind it is what you feel.</p></div><div className="grid grid-cols-1 border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">{SERVICE_PROOF.map(({ icon: Icon, title, body }) => <div key={title} className="border-b border-white/15 px-1 py-8 sm:border-r sm:px-6 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0"><Icon className="h-7 w-7 text-[#C5A059]" strokeWidth={1.2} /><h3 className="mt-7 text-[10px] font-mono font-bold tracking-[0.2em] text-[#F4EDE4] uppercase">{title}</h3><p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-white/45">{body}</p></div>)}</div><div className="mt-12 flex items-center gap-3 text-[10px] font-mono tracking-[0.22em] text-white/35 uppercase"><ShieldCheck className="h-4 w-4 text-[#C5A059]" /> Prepared before the door opens</div></div></section>

      <CurvedDivider variant="asymmetric" fromColor="#0C0C0E" toColor="#FAF8F5" height="clamp(45px, 6vw, 95px)" />
      <section className="relative overflow-hidden bg-[#FAF8F5] px-6 py-28 sm:px-12 sm:py-36 lg:px-20"><div className="absolute right-[-5vw] top-1/2 hidden -translate-y-1/2 text-[25vw] font-display font-black leading-none tracking-[-0.12em] text-[#EDE7DC] lg:block">FB</div><div className="relative z-10 mx-auto max-w-7xl"><div className="max-w-3xl"><div className="mb-8 flex items-center gap-3"><span className="h-px w-8 bg-[#C5A059]" /><span className="text-[10px] font-mono tracking-[0.3em] text-[#967C52] uppercase">CONCIERGE</span></div><h2 className="font-display text-6xl font-black leading-[0.82] tracking-[-0.08em] sm:text-8xl lg:text-[9vw]">Your destination is<br /><span className="text-[#C5A059]">not on the list.</span></h2><p className="mt-10 max-w-xl text-base leading-relaxed text-[#55555C] sm:text-lg">Special requests. Multi-stop itineraries. Uncommon destinations. Tell us where the day begins and where it needs to end.</p><div className="mt-10 flex flex-wrap gap-4"><button type="button" onClick={onOpenBooking} className="pb-btn pb-btn-primary"><span>Plan a private journey</span><ArrowUpRight className="h-4 w-4" /></button><a href="tel:9295650100" className="pb-btn pb-btn-outline"><Phone className="h-3.5 w-3.5" /><span>Talk to a concierge</span></a></div></div></div></section>
    </div>
  );
};
