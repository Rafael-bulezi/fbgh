import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Clock3, Luggage, MoveRight, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { CurvedDivider } from '../components/common/CurvedDivider';

interface DestinationsPageProps {
  onOpenBooking: () => void;
}

const ROUTE_META = [
  {
    eyebrow: 'NEW YORK',
    title: <>JFK TO<br /><span className="text-[#C5A059]">MIDTOWN.</span></>,
    detail: 'AIRPORT TO THE CITY. SEAMLESSLY.',
    pickup: 'JFK',
    arrival: 'MIDTOWN',
    distance: 'APPROX. 17 MILES',
  },
  {
    eyebrow: 'PHILADELPHIA / MAIN LINE',
    title: <>HISTORIC ROOTS.<br /><span className="text-[#C5A059]">MODERN ARRIVALS.</span></>,
    detail: 'CULTURE. BUSINESS. HOME.',
    pickup: 'PHL / CENTER CITY',
    arrival: 'MAIN LINE',
    distance: 'APPROX. 12 MILES',
  },
];

const STANDARD = [
  { icon: Clock3, title: 'TIMING CONFIDENCE', body: 'Real-time updates. No guesswork.' },
  { icon: Luggage, title: 'LUGGAGE EASE', body: 'We manage the details.' },
  { icon: ShieldCheck, title: 'DISCRETION', body: 'Privacy respected from pickup to arrival.' },
  { icon: Sparkles, title: 'PREPARED CABIN', body: 'Comfort, privacy, attention.' },
];

const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = '' }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.16 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`transition-[opacity,transform] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

const BubbleImage: React.FC<{ src: string; alt: string; side: 'left' | 'right'; index: number }> = ({ src, alt, side, index }) => (
  <Reveal delay={120} className="relative">
    <div className={`relative aspect-[1.28/0.9] overflow-hidden bg-[#E8E2D8] shadow-[0_22px_55px_rgba(56,43,28,0.10)] ${side === 'left' ? 'rounded-[52%_48%_47%_53%/44%_48%_52%_56%]' : 'rounded-[48%_52%_54%_46%/49%_43%_57%_51%]'}`}>
      <img src={src} alt={alt} loading={index === 0 ? 'eager' : 'lazy'} className="h-full w-full object-cover transition-transform duration-[1400ms] hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E]/35 via-transparent to-transparent" />
      <div className="absolute bottom-6 left-7 text-[9px] font-mono tracking-[0.24em] text-white/90 uppercase">0{index + 1} / 02</div>
    </div>
  </Reveal>
);

const CorridorFacts: React.FC<{ index: number }> = ({ index }) => {
  const destination = DESTINATIONS_DATA[index];
  const route = destination.popularRoutes[0];
  const meta = ROUTE_META[index];
  return (
    <Reveal delay={220} className="max-w-xl">
      <div className="flex items-center gap-3 text-[9px] font-mono tracking-[0.28em] text-[#967C52] uppercase"><span>{meta.eyebrow}</span><span className="h-px w-8 bg-[#C5A059]" /></div>
      <h2 className="mt-5 font-display text-4xl font-black leading-[0.86] tracking-[-0.065em] text-[#141416] sm:text-6xl">{meta.title}</h2>
      <p className="mt-5 text-[10px] font-bold tracking-[0.2em] text-[#55555C] uppercase">{meta.detail}</p>
      <div className="mt-7 grid grid-cols-[1fr_auto_1fr] items-end gap-4 border-y border-[#D7CDBE] py-5">
        <div><span className="block text-[8px] font-mono tracking-[0.22em] text-[#9A8E7D] uppercase">{index === 0 ? 'PICKUP' : 'PICKUP'}</span><span className="mt-2 block text-sm font-semibold uppercase">{meta.pickup}</span></div>
        <MoveRight className="mb-1 h-4 w-4 text-[#C5A059]" />
        <div className="text-right"><span className="block text-[8px] font-mono tracking-[0.22em] text-[#9A8E7D] uppercase">ARRIVAL</span><span className="mt-2 block text-sm font-semibold uppercase">{meta.arrival}</span></div>
      </div>
      <div className="mt-4 flex gap-6 text-[9px] font-mono tracking-[0.2em] text-[#8B8478] uppercase"><span>{meta.distance}</span><span>{route.typicalDuration}</span></div>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-[#5E5A53]">{destination.description}</p>
      <button type="button" className="pb-btn pb-btn-text mt-6 text-[10px]">Plan this corridor <ArrowUpRight className="h-3.5 w-3.5" /></button>
    </Reveal>
  );
};

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ onOpenBooking }) => (
  <main className="w-full overflow-hidden bg-[#FAF8F5] text-[#141416] selection:bg-[#C5A059] selection:text-[#0C0C0E]">
    <section className="relative min-h-[min(780px,88vh)] overflow-hidden bg-[#FAF8F5] px-6 pb-16 pt-8 sm:px-12 lg:px-20 lg:pb-24 lg:pt-10">
      <div className="relative z-20 mx-auto flex max-w-7xl items-center justify-between"><span className="font-display text-xl font-black tracking-[-0.08em]">FBGH <span className="ml-2 hidden text-[8px] font-mono font-normal tracking-[0.23em] text-[#9B896C] sm:inline">FAITH BASED GLOBAL HOLDINGS</span></span><span className="text-[9px] font-mono tracking-[0.25em] text-[#907C5C] uppercase">PRIVATE CORRIDORS</span></div>
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 pt-20 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 lg:pt-24">
        <Reveal><div className="max-w-xl"><div className="flex items-center gap-3 text-[9px] font-mono tracking-[0.3em] text-[#967C52] uppercase"><span>NYC ↔ PHILADELPHIA</span><span className="h-px w-8 bg-[#C5A059]" /></div><h1 className="mt-6 font-display text-6xl font-black leading-[0.83] tracking-[-0.08em] sm:text-8xl lg:text-[7.2vw]">THE DISTANCE<br /><span className="text-[#C5A059]">IS THE SERVICE.</span></h1><p className="mt-8 max-w-md text-base leading-relaxed text-[#55555C] sm:text-lg">A private chauffeur corridor between New York City and Philadelphia, planned around the way your day actually moves.</p><button type="button" onClick={onOpenBooking} className="pb-btn pb-btn-primary mt-8"><span>REQUEST A RIDE</span><ArrowUpRight className="h-4 w-4" /></button></div></Reveal>
        <Reveal delay={160} className="relative"><div className="relative aspect-[1.14/0.82] overflow-hidden rounded-[48%_52%_56%_44%/44%_42%_58%_56%] shadow-[0_30px_80px_rgba(56,43,28,0.15)]"><img src="/images/destination-hero-concept.webp" alt="FBGH chauffeur opening an executive SUV" className="h-full w-full object-cover object-center" /><div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E]/30 via-transparent to-transparent" /></div><div className="absolute -bottom-5 left-[8%] h-16 w-px bg-[#C5A059]" /></Reveal>
      </div>
      <div className="absolute bottom-0 left-0 right-0"><CurvedDivider variant="soft-curve" fromColor="transparent" toColor="#F2EEE6" height="clamp(42px, 7vw, 92px)" /></div>
    </section>

    <section className="bg-[#F2EEE6] px-6 py-20 sm:px-12 sm:py-28 lg:px-20 lg:py-36"><div className="mx-auto max-w-7xl"><Reveal><div className="grid gap-10 lg:grid-cols-[0.42fr_1fr]"><div className="flex items-start gap-3 pt-2"><span className="h-px w-8 bg-[#C5A059]" /><span className="text-[9px] font-mono tracking-[0.28em] text-[#967C52] uppercase">THE CORRIDOR</span></div><div><h2 className="max-w-5xl font-display text-5xl font-black leading-[0.86] tracking-[-0.075em] sm:text-7xl lg:text-[7vw]">FROM DOOR<br /><span className="text-[#C5A059]">TO DOOR.</span></h2><div className="mt-10 grid max-w-4xl gap-8 text-base leading-relaxed text-[#5E5A53] md:grid-cols-2"><p>From airport arrivals to private residences, FBGH protects the handoff between places in New York City and Philadelphia.</p><p>The route is read before the vehicle moves. Timing, luggage, vehicle, and next stop are considered together.</p></div></div></div></Reveal></div></section>

    <section className="relative bg-[#F2EEE6] px-6 pb-24 sm:px-12 sm:pb-36 lg:px-20"><div className="mx-auto max-w-7xl"><div className="relative"><div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-[#C5A059]/60 lg:block"><span className="absolute left-1/2 top-[16%] h-5 w-5 -translate-x-1/2 rounded-full border border-[#C5A059] bg-[#F2EEE6] shadow-[0_0_0_7px_rgba(197,160,89,0.1)]" /><span className="absolute left-1/2 top-[61%] h-5 w-5 -translate-x-1/2 rounded-full border border-[#C5A059] bg-[#F2EEE6] shadow-[0_0_0_7px_rgba(197,160,89,0.1)]" /></div><div className="grid gap-20 lg:gap-28">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_74px_1fr]"><BubbleImage src={DESTINATIONS_DATA[0].image} alt="Black executive SUV arriving in New York" side="left" index={0} /><div className="hidden lg:block" /><CorridorFacts index={0} /></div>
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_74px_1fr]"><CorridorFacts index={1} /><div className="hidden lg:block" /><BubbleImage src={DESTINATIONS_DATA[1].image} alt="Black executive sedan arriving in Philadelphia" side="right" index={1} /></div>
    </div></div></div></section>

    <section className="bg-[#FAF8F5] px-6 py-20 sm:px-12 sm:py-28 lg:px-20"><div className="mx-auto max-w-7xl"><Reveal><div className="mb-12 flex items-end justify-between gap-8"><div><div className="mb-5 flex items-center gap-3"><span className="h-px w-8 bg-[#C5A059]" /><span className="text-[9px] font-mono tracking-[0.28em] text-[#967C52] uppercase">THE FBGH STANDARD</span></div><h2 className="font-display text-5xl font-black leading-[0.86] tracking-[-0.07em] sm:text-7xl">WHAT WE MAKE<br /><span className="text-[#C5A059]">EFFORTLESS.</span></h2></div><p className="hidden max-w-xs text-sm leading-relaxed text-[#6F6A62] md:block">The route may change. The standard does not.</p></div></Reveal><div className="grid grid-cols-1 border-t border-[#D7CDBE] sm:grid-cols-2 lg:grid-cols-4">{STANDARD.map(({ icon: Icon, title, body }, index) => <Reveal key={title} delay={index * 90} className="border-b border-[#D7CDBE] px-1 py-8 sm:border-r sm:px-6 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0"><Icon className="h-7 w-7 text-[#C5A059]" strokeWidth={1.15} /><h3 className="mt-6 text-[10px] font-mono font-bold tracking-[0.2em] uppercase">{title}</h3><p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-[#6F6A62]">{body}</p></Reveal>)}</div></div></section>

    <section className="relative overflow-hidden bg-[#0C0C0E] px-6 py-24 text-[#F4EDE4] sm:px-12 sm:py-36 lg:px-20"><div className="absolute right-[-3vw] top-1/2 -translate-y-1/2 font-display text-[24vw] font-black leading-none tracking-[-0.13em] text-white/[0.035]">NYC↔PHL</div><div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-end"><Reveal><div><div className="mb-7 flex items-center gap-3"><span className="h-px w-8 bg-[#C5A059]" /><span className="text-[9px] font-mono tracking-[0.28em] text-[#C5A059] uppercase">CONCIERGE</span></div><h2 className="font-display text-6xl font-black leading-[0.82] tracking-[-0.08em] sm:text-8xl">YOUR DAY<br /><span className="text-[#C5A059]">SETS THE ROUTE.</span></h2><p className="mt-9 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">One city, the other, or anywhere within the corridor. Tell us where the day begins and where it needs to end.</p><div className="mt-9 flex flex-wrap gap-4"><button type="button" onClick={onOpenBooking} className="pb-btn pb-btn-primary"><span>REQUEST A RIDE</span><ArrowUpRight className="h-4 w-4" /></button><a href="tel:9295650100" className="pb-btn pb-btn-outline border-white/25 text-white"><Phone className="h-3.5 w-3.5" /><span>CALL A CONCIERGE</span></a></div></div></Reveal><Reveal delay={180}><div className="border-t border-white/15 pt-6 text-[10px] font-mono tracking-[0.22em] text-white/40 uppercase"><div className="flex items-center justify-between border-b border-white/15 py-4"><span>NEW YORK CITY</span><span className="text-[#C5A059]">ORIGIN / ARRIVAL</span></div><div className="flex items-center justify-between border-b border-white/15 py-4"><span>PHILADELPHIA</span><span className="text-[#C5A059]">ORIGIN / ARRIVAL</span></div><div className="flex items-center justify-between py-4"><span>THE CORRIDOR</span><span className="text-[#C5A059]">ONE STANDARD</span></div></div></Reveal></div></section>
  </main>
);
