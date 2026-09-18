import React, { useState } from 'react';
import { ArrowRight, Check, Lock, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { CurvedHero } from '../components/common/CurvedHero';
import { CurvedDivider } from '../components/common/CurvedDivider';

interface AboutPageProps {
  onOpenBooking: () => void;
  onNavigate: (page: string) => void;
}

const PRINCIPLES = [
  {
    number: '01',
    label: 'PRESENCE',
    title: 'Read the room before entering it.',
    body: 'A greeting when it helps. Quiet when it matters. Our people are trained to understand that service is not volume — it is attention.',
    icon: Users,
  },
  {
    number: '02',
    label: 'PREPAREDNESS',
    title: 'The journey starts before the door opens.',
    body: 'Vehicles staged early. Cabins considered. Routes watched. The visible calm of the ride is built from invisible preparation.',
    icon: Sparkles,
  },
  {
    number: '03',
    label: 'PROTECTION',
    title: 'Discretion is an active practice.',
    body: 'Your time, your conversations, and your itinerary stay yours. Every detail is handled with restraint and respect.',
    icon: Lock,
  },
  {
    number: '04',
    label: 'PRECISION',
    title: 'Small details carry the whole experience.',
    body: 'A smoother curbside handoff. A better-timed arrival. A driver who knows when to move and when to wait.',
    icon: ShieldCheck,
  },
];

const MOMENTS = [
  {
    number: '01',
    label: 'BEFORE THE ARRIVAL',
    title: 'The quiet work behind a smooth day.',
    body: 'Every polished arrival has a sequence behind it: the vehicle is checked, the route is read, and the human context is understood.',
    image: '/images/about-hero-human-arrival.webp',
    alt: 'Chauffeur welcoming a traveler beside a premium SUV',
  },
  {
    number: '02',
    label: 'AT THE CURB',
    title: 'Hospitality without performance.',
    body: 'The best service is never theatrical. It is simply there at the exact moment it is needed — composed, capable, and personal.',
    image: '/images/experience-hero-rental.webp',
    alt: 'Customer receiving help with luggage beside a premium SUV',
  },
  {
    number: '03',
    label: 'ON THE ROAD',
    title: 'The cabin becomes a place to think.',
    body: 'A protected pocket between places. A little more room to prepare, reset, or arrive as the day asks you to.',
    image: '/images/rental-story-03-go.webp',
    alt: 'Premium SUV travelling along a scenic road',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking, onNavigate }) => {
  const [activePrinciple, setActivePrinciple] = useState(0);
  const active = PRINCIPLES[activePrinciple];

  return (
    <div className="w-full bg-[#0C0C0E] text-[#F4F1EA] overflow-hidden selection:bg-[#C5A059] selection:text-[#0C0C0E]">
      {/* 01 — OPENING STATEMENT */}
      <CurvedHero
        eyebrow="ABOUT FAITH BASED GLOBAL HOLDINGS"
        titleLine1="MORE THAN DRIVERS."
        titleLine2="CURATORS OF ARRIVAL."
        description="A high-touch transportation agency built around human warmth, quiet precision, and the belief that the way you arrive changes what comes next."
        image="/images/about-hero-human-arrival.webp"
        imageAlt="Chauffeur welcoming a traveler beside a premium SUV"
        curveVariant="gentle-wave"
        theme="dark"
        mobileImagePosition="object-[72%_center]"
        imagePosition="object-right"
      />

      <CurvedDivider
        variant="gentle-wave"
        fromColor="#0C0C0E"
        toColor="#FAF8F5"
        height="clamp(45px, 6vw, 95px)"
      />

      {/* 02 — MANIFESTO / EDITORIAL INTRO */}
      <section className="bg-[#FAF8F5] text-[#141416] px-6 sm:px-12 lg:px-20 py-24 sm:py-36 lg:py-48">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-3 flex items-center gap-3 lg:pt-4">
              <span className="w-8 h-px bg-[#C5A059]" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#967C52] uppercase">THE FBGH IDEA</span>
            </div>
            <div className="lg:col-span-9">
              <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-[9vw] leading-[0.88] tracking-[-0.07em] max-w-6xl">
                Arrival is not a<br />
                <span className="text-[#C5A059]">transaction.</span>
              </h2>
              <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl">
                <p className="text-base sm:text-lg leading-relaxed text-[#414148]">
                  It is the first impression of a meeting. The exhale after a flight. The quiet between two demanding parts of a day.
                </p>
                <p className="text-base sm:text-lg leading-relaxed text-[#414148]">
                  FBGH exists to protect that moment — with the right person, the right vehicle, and a standard that does not need to announce itself.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-24 sm:mt-36 pt-6 border-t border-[#D9D3C8] grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              ['15 MIN', 'EARLY ARRIVAL STAGING'],
              ['24 / 7', 'HUMAN OVERSIGHT'],
              ['100%', 'DISCRETION BY DESIGN'],
              ['30+', 'VEHICLES PREPARED'],
            ].map(([value, label]) => (
              <div key={label} className="space-y-2">
                <div className="font-display font-black text-3xl sm:text-4xl tracking-tight text-[#141416]">{value}</div>
                <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.18em] text-[#8B8478] uppercase leading-relaxed">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider
        variant="s-curve"
        fromColor="#FAF8F5"
        toColor="#0C0C0E"
        flip
        height="clamp(45px, 6vw, 95px)"
      />

      {/* 03 — STICKY PRINCIPLES */}
      <section className="bg-[#0C0C0E] px-6 sm:px-12 lg:px-20 py-24 sm:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#C5A059]" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#C5A059] uppercase">THE STANDARD BEHIND THE JOURNEY</span>
            </div>
            <h2 className="font-display font-black text-5xl sm:text-7xl leading-[0.9] tracking-[-0.06em] text-[#F4EDE4]">
              What we<br /><span className="text-[#C5A059]">protect.</span>
            </h2>
            <p className="mt-8 max-w-sm text-sm sm:text-base text-white/55 leading-relaxed">
              A premium service is not defined by what it adds to the ride. It is defined by what it removes: friction, uncertainty, noise.
            </p>
            <div className="mt-12 hidden lg:flex items-center gap-4 text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase">
              <span className="text-[#C5A059]">{active.number}</span>
              <span className="w-16 h-px bg-white/15" />
              <span>{active.label}</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {PRINCIPLES.map((principle, index) => {
              const Icon = principle.icon;
              const isActive = index === activePrinciple;
              return (
                <button
                  key={principle.number}
                  type="button"
                  onClick={() => setActivePrinciple(index)}
                  className={`w-full text-left border-t border-white/12 py-7 sm:py-9 transition-all duration-500 group ${isActive ? 'bg-white/[0.045] px-5 sm:px-7' : 'px-0 hover:px-3'}`}
                >
                  <div className="flex items-start gap-5 sm:gap-8">
                    <span className={`font-mono text-sm mt-1 transition-colors ${isActive ? 'text-[#C5A059]' : 'text-white/25'}`}>{principle.number}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <span className={`text-[10px] font-mono tracking-[0.25em] uppercase transition-colors ${isActive ? 'text-[#C5A059]' : 'text-white/35 group-hover:text-white/60'}`}>{principle.label}</span>
                        <Icon className={`w-4 h-4 transition-all duration-500 ${isActive ? 'text-[#C5A059] rotate-0' : 'text-white/20 -rotate-12 group-hover:text-white/50'}`} />
                      </div>
                      <h3 className={`font-display font-bold text-2xl sm:text-4xl tracking-tight mt-3 transition-colors ${isActive ? 'text-[#F4EDE4]' : 'text-white/55 group-hover:text-white/80'}`}>{principle.title}</h3>
                      <div className={`grid transition-[grid-template-rows,opacity] duration-500 ${isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                        <div className="overflow-hidden">
                          <p className="text-sm leading-relaxed text-white/55 max-w-xl">{principle.body}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
            <div className="border-t border-white/12 pt-8 flex items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-white/30 uppercase lg:hidden">
              <span className="text-[#C5A059]">{active.number}</span><span>{active.label}</span>
            </div>
          </div>
        </div>
      </section>

      <CurvedDivider
        variant="gentle-wave"
        fromColor="#0C0C0E"
        toColor="#151518"
        height="clamp(35px, 5vw, 70px)"
      />

      {/* 04 — THREE MOMENTS / IMAGE STORY */}
      <section className="bg-[#151518] px-6 sm:px-12 lg:px-20 py-24 sm:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-24">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-px bg-[#C5A059]" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#C5A059] uppercase">THE EXPERIENCE OF CARE</span>
              </div>
              <h2 className="font-display font-black text-5xl sm:text-7xl tracking-[-0.06em] leading-[0.9] text-[#F4EDE4]">The work is<br /><span className="text-[#C5A059]">felt, not seen.</span></h2>
            </div>
            <p className="max-w-xs text-sm text-white/45 leading-relaxed">Three moments. One standard. A considered journey from the first signal to the final curb.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
            {MOMENTS.map((moment, index) => (
              <article key={moment.number} className={`group ${index === 1 ? 'lg:translate-y-16' : ''}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0C0C0E]">
                  <img src={moment.image} alt={moment.alt} loading={index === 0 ? 'eager' : 'lazy'} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E]/90 via-transparent to-transparent" />
                  <div className="absolute top-5 left-5 font-mono text-[10px] tracking-[0.25em] text-[#C5A059]">{moment.number}</div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-[9px] font-mono tracking-[0.2em] text-[#C5A059] uppercase mb-2">{moment.label}</div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl leading-tight text-[#F4EDE4]">{moment.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-white/45 leading-relaxed mt-5 max-w-sm">{moment.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CurvedDivider
        variant="circular-arc"
        fromColor="#151518"
        toColor="#FAF8F5"
        height="clamp(45px, 6vw, 95px)"
      />

      {/* 05 — WHAT WE REFUSE / POSITIONING */}
      <section className="bg-[#FAF8F5] text-[#141416] px-6 sm:px-12 lg:px-20 py-24 sm:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-6"><span className="w-8 h-px bg-[#C5A059]" /><span className="text-[10px] font-mono tracking-[0.3em] text-[#967C52] uppercase">OUR POSITION</span></div>
            <h2 className="font-display font-black text-5xl sm:text-7xl leading-[0.9] tracking-[-0.06em]">We are<br /><span className="text-[#C5A059]">not for<br />everyone.</span></h2>
          </div>
          <div className="lg:col-span-8 space-y-0">
            {[
              'Not the fastest handoff. The most thoughtful one.',
              'Not a fleet that is merely available. A fleet that is ready.',
              'Not a driver who gets you there. A person who understands the moment.',
              'Not transportation as a commodity. Arrival as a standard.',
            ].map((line, index) => (
              <div key={line} className="group border-t border-[#D9D3C8] py-8 sm:py-10 flex gap-6 sm:gap-10 items-start hover:bg-[#F2EEE7] transition-colors px-2 -mx-2">
                <span className="font-mono text-xs text-[#C5A059] mt-1">0{index + 1}</span>
                <p className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl leading-[0.98] tracking-tight max-w-3xl">{line}</p>
              </div>
            ))}
            <div className="border-t border-[#D9D3C8] pt-8 mt-4 flex items-center gap-3 text-xs text-[#77736B] leading-relaxed max-w-xl"><Check className="w-4 h-4 text-[#C5A059] shrink-0" /> For people who notice the difference between being moved and being cared for.</div>
          </div>
        </div>
      </section>

      <CurvedDivider
        variant="swoop"
        fromColor="#FAF8F5"
        toColor="#0C0C0E"
        height="clamp(45px, 6vw, 95px)"
      />

      {/* 06 — CLOSE WITH A CLEAR INVITATION, NOT A RANDOM IMAGE */}
      <section className="relative bg-[#0C0C0E] px-6 sm:px-12 lg:px-20 py-28 sm:py-40 overflow-hidden">
        <div className="absolute right-[-12vw] top-1/2 -translate-y-1/2 text-[28vw] font-display font-black leading-none tracking-[-0.1em] text-white/[0.025] select-none">FB</div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-8"><span className="w-8 h-px bg-[#C5A059]" /><span className="text-[10px] font-mono tracking-[0.3em] text-[#C5A059] uppercase">THE NEXT ARRIVAL</span></div>
          <h2 className="font-display font-black text-6xl sm:text-8xl lg:text-[10vw] leading-[0.82] tracking-[-0.08em] text-[#F4EDE4] max-w-5xl">Come for the<br /><span className="text-[#C5A059]">standard.</span></h2>
          <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
            <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-sm">When the journey matters, start with the people who understand what arrival should feel like.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => onNavigate('fleet')} className="pb-btn pb-btn-primary"><span>MEET THE FLEET</span><ArrowRight className="w-3.5 h-3.5" /></button>
              <button onClick={onOpenBooking} className="pb-btn pb-btn-outline"><span>START A CONVERSATION</span><ArrowRight className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
