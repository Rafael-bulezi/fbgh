import React from 'react';
import { CinematicScrollHero } from '../components/common/CinematicScrollHero';
import { OurPromiseSection } from '../components/home/OurPromiseSection';
import { HomeExperienceSection } from '../components/home/HomeExperienceSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { ArrowRight, Phone } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="w-full bg-white text-ink-black">
      <CinematicScrollHero
        onOpenBooking={onOpenBooking}
        onExploreFleet={() => onNavigate('fleet')}
      />

      {/* 2ND SECTION: HOW IT WORKS (COMPACT 25-30VH KINETIC RIBBON) */}
      <HowItWorksSection onOpenBooking={onOpenBooking} />

      {/* 3RD SECTION: OUR PROMISE (KINETIC PHILOSOPHY & CAPABILITY) */}
      <OurPromiseSection
        onLearnMore={() => onNavigate('experience')}
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
      />

      <section className="w-full bg-white py-24 sm:py-32 px-6 sm:px-12 lg:px-20 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-silver-border pb-8 gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-champagne-gold font-medium">
                OUR FLEET
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-ink-black tracking-wide">
                BUILT FOR EVERY JOURNEY.
              </h2>
            </div>

            <button
              onClick={() => onNavigate('fleet')}
              className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-champagne-gold hover:underline"
            >
              <span>VIEW FULL FLEET (30+ VEHICLES)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 'suvs',
                title: 'LUXURY SUVS',
                subtitle: '1 - 6 PASSENGERS',
                count: '12 VEHICLES',
                image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop',
              },
              {
                id: 'vans',
                title: 'EXECUTIVE VANS',
                subtitle: '7 - 14 PASSENGERS',
                count: '10 VEHICLES',
                image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
              },
              {
                id: 'sedans',
                title: 'PREMIUM SEDANS',
                subtitle: '1 - 3 PASSENGERS',
                count: '8 VEHICLES',
                image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop',
              },
            ].map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate('fleet')}
                className="group relative bg-silver-cloud border border-silver-border overflow-hidden cursor-pointer vehicle-card-reflection transition-all duration-500 hover:border-champagne-gold/60 hover:shadow-md"
              >
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover luminous-media transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                <div className="p-6 space-y-1 relative bg-white">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl text-ink-black group-hover:text-champagne-gold transition-colors">
                      {cat.title}
                    </h3>
                    <span className="text-[10px] text-champagne-gold font-mono tracking-widest">
                      {cat.count}
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted tracking-wider">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE EXPERIENCE SECTION */}
      <HomeExperienceSection onNavigate={onNavigate} />


      <section className="w-full relative py-32 px-6 sm:px-12 lg:px-20 bg-obsidian overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1920&auto=format&fit=crop"
            alt="New York Skyline Dusk"
            className="w-full h-full object-cover luminous-media opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/45 to-obsidian/65" />
        </div>

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <span className="text-[10px] tracking-[0.3em] uppercase text-champagne-gold font-medium text-contrast-eyebrow">
            COVERAGE
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-warm-ivory tracking-wide leading-tight text-contrast-title">
            WHEREVER THE DAY<br />
            <span className="italic text-champagne-gold font-light">TAKES YOU.</span>
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pt-4">
            {['NEW YORK', 'PHILADELPHIA', 'AIRPORT HUBS', 'PRIVATE DESTINATIONS'].map((dest, i) => (
              <button
                key={i}
                onClick={() => onNavigate('destinations')}
                className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-warm-ivory hover:text-champagne-gold uppercase transition-colors text-contrast-body"
              >
                <span>{dest}</span>
                <span className="text-champagne-gold text-sm">&rarr;</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-silver-cloud border-y border-silver-border py-16 px-6 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="font-serif text-3xl sm:text-4xl text-ink-black tracking-wide">
              YOUR VEHICLE IS WAITING.
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary tracking-wide">
              24/7 VIP Concierge &amp; Flight Telemetry Dispatch ready for immediate reservation.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="pb-btn pb-btn-primary flex-shrink-0"
          >
            <span>BOOK YOUR JOURNEY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-silver-border pb-6 gap-4">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-champagne-gold font-medium">
                DISCREET TRUST
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-ink-black tracking-wide mt-1">
                TESTIMONIALS FROM EXECUTIVE CLIENTELE
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((item, idx) => (
              <div key={idx} className="bg-silver-cloud border border-silver-border p-8 space-y-6 flex flex-col justify-between hover:border-champagne-gold/40 transition-colors">
                <p className="text-xs sm:text-sm text-ink-secondary italic font-serif leading-relaxed">
                  "{item.quote}"
                </p>

                <div className="border-t border-silver-border pt-4">
                  <h4 className="font-serif text-sm text-champagne-gold">{item.author}</h4>
                  <p className="text-[10px] text-ink-muted tracking-wider">{item.role}</p>
                  <p className="text-[10px] text-ink-muted/70 tracking-widest uppercase mt-0.5">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full relative min-h-[60vh] flex items-center justify-center bg-obsidian overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop"
          alt="Luxury Vehicle at Night"
          className="absolute inset-0 w-full h-full object-cover luminous-media opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian" />

        <div className="relative z-10 text-center space-y-6 p-6 max-w-2xl">
          <h2 className="font-display font-light text-4xl sm:text-6xl text-warm-ivory tracking-wider uppercase text-contrast-title">
            ARRIVE WITH<br />
            <span className="italic text-champagne-gold font-serif">INTENTION.</span>
          </h2>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="pb-btn pb-btn-primary"
            >
              <span>BOOK A RIDE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:9295650100"
              className="pb-btn pb-btn-outline"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(929) 565-0100</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
