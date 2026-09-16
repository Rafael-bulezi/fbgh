import React from 'react';
import { Shield, Users, Phone, Mail, CheckCircle2, Lock, Award } from 'lucide-react';
import { CurvedHero } from '../components/common/CurvedHero';
import { CurvedDivider } from '../components/common/CurvedDivider';
import { useSubtleParallax } from '../hooks/useSubtleParallax';

interface AboutPageProps {
  onOpenBooking: () => void;
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [storyImgRef, storyParallaxY] = useSubtleParallax<HTMLImageElement>({ speed: 0.05, maxOffset: 25 });
  const [radarImgRef, radarParallaxY] = useSubtleParallax<HTMLImageElement>({ speed: 0.05, maxOffset: 25 });
  return (
    <div className="w-full bg-obsidian text-warm-ivory pb-20">
      {/* 1. HERO: HUMAN-CENTRIC LUXURY */}
      <CurvedHero
        eyebrow="ABOUT FAITH BASED GLOBAL HOLDINGS"
        titleLine1="MORE THAN DRIVERS."
        titleLine2="CURATORS OF ARRIVAL."
        description="We are a high-touch private transportation agency founded on human warmth, uncompromising discretion, and the quiet precision that turns every journey into a sanctuary."
        image="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1920&auto=format&fit=crop"
        imageAlt="Executive Chauffeur Hospitality"
        curveVariant="gentle-wave"
        theme="dark"
      />

      {/* TRANSITION: DARK TO WARM IVORY */}
      <CurvedDivider
        variant="gentle-wave"
        fromColor="#0C0C0E"
        toColor="#FAF8F5"
        height="clamp(45px, 6vw, 95px)"
      />

      {/* 2. OUR STORY & PHILOSOPHY (WARM IVORY SECTION) */}
      <section className="w-full bg-warm-ivory text-obsidian py-20 sm:py-28 px-6 sm:px-12 lg:px-20 relative overflow-hidden">
        <div className="absolute right-6 sm:right-16 top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.05] select-none">
          <img src="/images/pb-logo.jpg" alt="" className="w-96 h-96 object-contain" />
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-champagne-gold-dark font-medium font-mono">
              <span className="w-8 h-[1px] bg-champagne-gold-dark" />
              <span>OUR ETHOS & PURPOSE</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-obsidian tracking-tight leading-[1.05]">
              A Service Agency Built Around{' '}
              <span className="text-champagne-gold-dark">Human Warmth</span>,{' '}
              Not Just Steel and Leather.
            </h2>

            <p className="text-sm sm:text-base text-obsidian/85 font-light leading-relaxed">
              Anyone can lease a luxury sedan. Very few can deliver genuine hospitality. We founded Faith Based Global Holdings because discerning travelers—from corporate chairpersons and international diplomats to families and private aviation passengers—were tired of transactional, indifferent rides.
            </p>

            <p className="text-sm sm:text-base text-obsidian/85 font-light leading-relaxed">
              In an age of cold algorithms and rideshare randomness, FBGH is an antidote: a bespoke agency where you know your chauffeur by reputation, your cabin is pre-calibrated to your personal climate, and your itinerary is safeguarded by 24/7 human oversight.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-obsidian/10">
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-obsidian font-bold block">15 min</span>
                <span className="text-[10px] font-mono tracking-wider text-obsidian/70 uppercase mt-1 block">
                  EARLY ARRIVAL STAGING
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-obsidian font-bold block">99.8%</span>
                <span className="text-[10px] font-mono tracking-wider text-obsidian/70 uppercase mt-1 block">
                  ON-TIME FLIGHT SYNC
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl text-obsidian font-bold block">100%</span>
                <span className="text-[10px] font-mono tracking-wider text-obsidian/70 uppercase mt-1 block">
                  NDA CONFIDENTIALITY
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl border border-obsidian/10 group">
              <img
                ref={storyImgRef}
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop"
                alt="Executive Chauffeur Greeting Client with Care"
                className="w-full h-full object-cover luminous-media transition-transform duration-700 group-hover:scale-105 will-change-transform"
                style={{
                  transform: `translate3d(0, ${storyParallaxY}px, 0) scale(1.06)`,
                  transition: 'transform 0.1s ease-out',
                }}
              />
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-warm-ivory space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase text-champagne-gold">
                  THE CHAUFFEUR STANDARD
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-warm-ivory">
                  "Respect for your time, protection of your peace."
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSITION: WARM IVORY TO OBSIDIAN */}
      <CurvedDivider
        variant="s-curve"
        fromColor="#FAF8F5"
        toColor="#0C0C0E"
        flip
        height="clamp(45px, 6vw, 95px)"
      />

      {/* 3. THE 5-STAGE CHAUFFEUR CHARTER */}
      <section className="w-full py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-obsidian relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-champagne-gold font-medium">
                THE PEOPLE BEHIND THE WHEEL
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-warm-ivory tracking-wide">
                THE CHAUFFEUR CHARTER.
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-muted-gray max-w-md font-light leading-relaxed">
              Fewer than 4% of applicants earn an FBGH badge. Our chauffeurs are lifelong career professionals selected for empathy, poise, and defensive mastery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                title: 'Strict Vetting & Background',
                icon: Shield,
                desc: 'Comprehensive multi-tier federal, state, and criminal screening alongside clean executive motor vehicle histories updated quarterly.'
              },
              {
                num: '02',
                title: 'Full NDA Confidentiality',
                icon: Lock,
                desc: 'Every chauffeur executes binding non-disclosure agreements. Client conversations, phone calls, and itineraries remain in strict confidence.'
              },
              {
                num: '03',
                title: 'Emotional Intelligence',
                icon: Users,
                desc: 'Trained to read the room. Whether you need a warm greeting or unbroken silent cabin privacy to prepare for a merger, your mood dictates the tone.'
              },
              {
                num: '04',
                title: 'White-Glove Protocol',
                icon: Award,
                desc: 'Immature driving habits are forbidden. Smooth deceleration, umbrella escorts in foul weather, and seamless curbside luggage handling standard.'
              }
            ].map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-soft-black border border-white/10 p-8 space-y-5 rounded-lg group hover:border-champagne-gold/60 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-champagne-gold group-hover:border-champagne-gold/40 group-hover:bg-champagne-gold/10 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs text-champagne-gold font-bold">
                      {pillar.num}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-warm-ivory group-hover:text-champagne-gold transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-gray font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRANSITION: CHAUFFEUR CHARTER TO CONCIERGE RADAR */}
      <CurvedDivider
        variant="gentle-wave"
        fromColor="#0C0C0E"
        toColor="#111114"
        height="clamp(35px, 5vw, 70px)"
      />

      {/* 4. 24/7 CONCIERGE & FLIGHT RADAR TELEMETRY ROOM */}
      <section className="w-full bg-[#111114] py-20 sm:py-28 px-6 sm:px-12 lg:px-20 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[16/11] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
            <img
              ref={radarImgRef}
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1400&auto=format&fit=crop"
              alt="Concierge and Dispatch Team"
              className="w-full h-full object-cover luminous-media will-change-transform"
              style={{
                transform: `translate3d(0, ${radarParallaxY}px, 0) scale(1.06)`,
                transition: 'transform 0.1s ease-out',
              }}
            />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between font-mono text-[10px] text-warm-ivory bg-black/60 backdrop-blur-md px-3 py-2 border border-white/10 rounded">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>FLIGHT RADAR ACTIVE DISPATCH</span>
              </span>
              <span className="text-champagne-gold">JFK // EWR // TEB // PHL</span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-champagne-gold">
                UNSEEN PRECISION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-warm-ivory tracking-wide leading-tight">
                Behind Every Smooth Ride is an Active Dispatch Room.
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-muted-gray font-light leading-relaxed">
              When you travel with PB, you don't merely hire a car; you engage a dedicated mission control. Our dispatch concierges track tail numbers and commercial flights in real time, factoring in de-icing buffers, tarmac taxi holds, and interstate congestion before they impact your schedule.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Direct phone line answered by senior dispatchers within 3 rings',
                'Live flight tail-number synchronization with automatic adjustment',
                'Custom onboard provisions arranged in advance upon request',
                'Private aviation FBO direct gate pass coordination'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-warm-ivory/90">
                  <CheckCircle2 className="w-4 h-4 text-champagne-gold flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <a
                href="tel:9295650100"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-champagne-gold hover:underline uppercase"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>DIRECT LINE: (929) 565-0100</span>
              </a>
              <a
                href="mailto:concierge@fbglobalholdings.com"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-warm-ivory/80 hover:text-champagne-gold uppercase"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>CONCIERGE@FBGLOBALHOLDINGS.COM</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSITION: RADAR TO CTA */}
      <CurvedDivider
        variant="circular-arc"
        fromColor="#111114"
        toColor="#0C0C0E"
        height="clamp(35px, 5vw, 70px)"
      />

      {/* 5. CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 pt-20">
        <div className="bg-warm-ivory text-obsidian p-8 sm:p-14 border border-champagne-gold/40 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl rounded-xl">
          <div className="space-y-2 relative z-10 text-center md:text-left">
            <span className="text-[10px] tracking-[0.25em] text-champagne-gold-dark uppercase font-semibold font-mono">
              JOIN DISCERNING TRAVELERS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-obsidian">
              Experience the standard of arrival for yourself.
            </h3>
            <p className="text-xs text-obsidian/70">
              Personalized corporate accounts, multi-stop itineraries, and airport transfers ready 24/7.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigate('fleet')}
              className="w-full md:w-auto px-8 py-4 bg-obsidian text-warm-ivory text-xs font-semibold tracking-[0.2em] uppercase hover:bg-champagne-gold hover:text-obsidian transition-colors shadow-xl rounded"
            >
              EXPLORE FLEET &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
