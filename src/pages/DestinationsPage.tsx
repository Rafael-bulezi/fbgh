import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Clock3, Luggage, MoveRight, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { CurvedDivider } from '../components/common/CurvedDivider';
import { CurvedHero } from '../components/common/CurvedHero';

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
  return <div ref={ref} className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

const ScrollFillHeading: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const next = Math.max(0, Math.min(1, (window.innerHeight * 0.82 - rect.top) / (rect.height + window.innerHeight * 0.25)));
        setProgress(next);
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const fill = `${Math.round(progress * 100)}%`;
  return <h2 ref={ref} className={className} style={{ backgroundImage: `linear-gradient(90deg, #C5A059 0%, #C5A059 ${fill}, #141416 ${fill}, #141416 100%)`, backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{children}</h2>;
};

const BubbleImage: React.FC<{ src: string; alt: string; side: 'left' | 'right'; index: number }> = ({ src, alt, side, index }) => (
  <Reveal delay={0} className="relative">
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
    <CurvedHero titleLine1="THE DISTANCE" titleLine2="IS THE SERVICE." description="A private chauffeur corridor between New York City and Philadelphia, planned around the way your day actually moves." image="/images/destination-hero-concept.webp" imageAlt="FBGH chauffeur opening an executive SUV" curveVariant="circular-arc" theme="light" mobileImagePosition="object-[68%_center]" imagePosition="object-center" enableParallax />
    <div className="relative z-10 -mt-1"><CurvedDivider variant="soft-curve" fromColor="#FAF8F5" toColor="#F2EEE6" height="clamp(42px, 7vw, 92px)" /></div>

    <section className="bg-[#F2EEE6] px-6 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24"><div className="mx-auto max-w-7xl"><Reveal><div className="grid gap-8 lg:grid-cols-[0.42fr_1fr]"><div className="flex items-start gap-3 pt-2"><span className="h-px w-8 bg-[#C5A059]" /><span className="text-[9px] font-mono tracking-[0.28em] text-[#967C52] uppercase">THE CORRIDOR</span></div><div><ScrollFillHeading className="max-w-5xl font-display text-5xl font-black leading-[0.86] tracking-[-0.075em] sm:text-7xl lg:text-[7vw]">FROM DOOR<br />TO DOOR.</ScrollFillHeading><div className="mt-8 grid max-w-4xl gap-7 text-base leading-relaxed text-[#5E5A53] md:grid-cols-2"><p>From airport arrivals to private residences, FBGH protects the handoff between places in New York City and Philadelphia.</p><p>The route is read before the vehicle moves. Timing, luggage, vehicle, and next stop are considered together.</p></div></div></div></Reveal></div></section>

    <section className="relative bg-[#F2EEE6] px-6 pb-16 sm:px-12 sm:pb-24 lg:px-20 lg:pb-28"><div className="mx-auto max-w-7xl"><div className="relative"><div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-[#C5A059]/60 lg:block"><span className="absolute left-1/2 top-[16%] h-5 w-5 -translate-x-1/2 rounded-full border border-[#C5A059] bg-[#F2EEE6] shadow-[0_0_0_7px_rgba(197,160,89,0.1)]" /><span className="absolute left-1/2 top-[61%] h-5 w-5 -translate-x-1/2 rounded-full border border-[#C5A059] bg-[#F2EEE6] shadow-[0_0_0_7px_rgba(197,160,89,0.1)]" /></div><div className="grid gap-14 lg:gap-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_74px_1fr]"><BubbleImage src={DESTINATIONS_DATA[0].image} alt="Black executive SUV arriving in New York" side="left" index={0} /><div className="hidden lg:block" /><CorridorFacts index={0} /></div>
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_74px_1fr]"><CorridorFacts index={1} /><div className="hidden lg:block" /><BubbleImage src={DESTINATIONS_DATA[1].image} alt="Black executive sedan arriving in Philadelphia" side="right" index={1} /></div>
    </div></div></div></section>

    <section className="bg-[#FAF8F5] px-6 py-20 sm:px-12 sm:py-28 lg:px-20"><div className="mx-auto max-w-7xl"><Reveal><div className="mb-12 flex items-end justify-between gap-8"><div><div className="mb-5 flex items-center gap-3"><span className="h-px w-8 bg-[#C5A059]" /><span className="text-[9px] font-mono tracking-[0.28em] text-[#967C52] uppercase">THE FBGH STANDARD</span></div><h2 className="font-display text-5xl font-black leading-[0.86] tracking-[-0.07em] sm:text-7xl">WHAT WE MAKE<br /><span className="text-[#C5A059]">EFFORTLESS.</span></h2></div><p className="hidden max-w-xs text-sm leading-relaxed text-[#6F6A62] md:block">The route may change. The standard does not.</p></div></Reveal><div className="grid grid-cols-1 border-t border-[#D7CDBE] sm:grid-cols-2 lg:grid-cols-4">{STANDARD.map(({ icon: Icon, title, body }, index) => <Reveal key={title} delay={index * 90} className="border-b border-[#D7CDBE] px-1 py-8 sm:border-r sm:px-6 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0"><Icon className="h-7 w-7 text-[#C5A059]" strokeWidth={1.15} /><h3 className="mt-6 text-[10px] font-mono font-bold tracking-[0.2em] uppercase">{title}</h3><p className="mt-3 max-w-[14rem] text-sm leading-relaxed text-[#6F6A62]">{body}</p></Reveal>)}</div></div></section>

    <section className="relative overflow-hidden bg-[#0C0C0E] px-6 py-24 text-[#F4EDE4] sm:px-12 sm:py-36 lg:px-20"><div className="absolute right-[-3vw] top-1/2 -translate-y-1/2 font-display text-[24vw] font-black leading-none tracking-[-0.13em] text-white/[0.035]">NYC↔PHL</div><div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-end"><Reveal><div><div className="mb-7 flex items-center gap-3"><span className="h-px w-8 bg-[#C5A059]" /><span className="text-[9px] font-mono tracking-[0.28em] text-[#C5A059] uppercase">CONCIERGE</span></div><h2 className="font-display text-6xl font-black leading-[0.82] tracking-[-0.08em] sm:text-8xl">YOUR DAY<br /><span className="text-[#C5A059]">SETS THE ROUTE.</span></h2><p className="mt-9 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">One city, the other, or anywhere within the corridor. Tell us where the day begins and where it needs to end.</p><div className="mt-9 flex flex-wrap gap-4"><button type="button" onClick={onOpenBooking} className="pb-btn pb-btn-primary"><span>REQUEST A RIDE</span><ArrowUpRight className="h-4 w-4" /></button><a href="tel:9295650100" className="pb-btn pb-btn-outline border-white/25 text-white"><Phone className="h-3.5 w-3.5" /><span>CALL A CONCIERGE</span></a></div></div></Reveal><Reveal delay={180}><div className="border-t border-white/15 pt-6 text-[10px] font-mono tracking-[0.22em] text-white/40 uppercase"><div className="flex items-center justify-between border-b border-white/15 py-4"><span>NEW YORK CITY</span><span className="text-[#C5A059]">ORIGIN / ARRIVAL</span></div><div className="flex items-center justify-between border-b border-white/15 py-4"><span>PHILADELPHIA</span><span className="text-[#C5A059]">ORIGIN / ARRIVAL</span></div><div className="flex items-center justify-between py-4"><span>THE CORRIDOR</span><span className="text-[#C5A059]">ONE STANDARD</span></div></div></Reveal></div></section>
  </main>
);
