import React from 'react';
import { DESTINATIONS_DATA } from '../data/destinationsData';
import { Compass, Phone } from 'lucide-react';

interface DestinationsPageProps {
  onOpenBooking: () => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="w-full bg-obsidian text-warm-ivory pt-24 pb-20">
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 sm:px-12 lg:px-20 overflow-hidden border-b border-white/10">
        <img
          src="https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1920&auto=format&fit=crop"
          alt="Metropolitan Destination Map Panorama"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-black/40 to-black/80" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-3.5 sm:space-y-4">
          <span className="text-[9.5px] sm:text-[10px] font-sans tracking-[0.3em] uppercase text-champagne-gold font-medium">
            REGIONAL & GLOBAL COVERAGE
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#F4EDE4] tracking-tight leading-[0.98]">
            DESTINATIONS &<br />
            <span className="text-[#E0B268]">TRAVEL CORRIDORS.</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-gray max-w-lg mx-auto font-light leading-relaxed">
            Flawless navigation across New York, Philadelphia, major private aviation FBOs, and regional coastal estates.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 sm:px-12 lg:px-20 py-12 sm:py-20 space-y-12 sm:space-y-20">
        {DESTINATIONS_DATA.map((dest) => (
          <div
            key={dest.id}
            className="bg-soft-black border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center group hover:border-champagne-gold/50 transition-all duration-500"
          >
            <div className="lg:col-span-6 relative aspect-[16/10] overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-obsidian/90 px-3 py-1 border border-white/10 text-[10px] font-mono text-champagne-gold tracking-widest">
                <Compass className="w-3 h-3" />
                <span>{dest.coordinates}</span>
              </div>
            </div>

            <div className="lg:col-span-6 p-5 sm:p-10 space-y-5 sm:space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] tracking-[0.25em] text-champagne-gold uppercase">
                  {dest.subtitle}
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#F4EDE4] tracking-tight">
                  {dest.name}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-warm-ivory/80 leading-relaxed font-light">
                {dest.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-[10px] font-mono tracking-widest text-champagne-gold uppercase block">
                  POPULAR CORRIDORS & ESTIMATES
                </span>
                <div className="space-y-2">
                  {dest.popularRoutes.map((route, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between text-xs p-2.5 bg-obsidian border border-white/5 gap-1 sm:gap-0">
                      <div className="flex items-center gap-2 text-warm-ivory">
                        <span>{route.from}</span>
                        <span className="text-champagne-gold">→</span>
                        <span>{route.to}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-gray font-mono text-[11px]">
                        <span>{route.typicalDuration}</span>
                        <span className="text-champagne-gold font-bold">{route.startingRate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 bg-champagne-gold text-obsidian text-xs font-semibold tracking-[0.2em] uppercase hover:bg-champagne-gold-light transition-colors"
                >
                  RESERVE IN {dest.name}
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <h3 className="font-serif text-2xl text-warm-ivory">
          Looking for a custom inter-city corridor?
        </h3>
        <p className="text-xs text-muted-gray">
          We service bespoke routes between Washington D.C., Boston, the Hamptons, and private airfields.
        </p>
        <a
          href="tel:9295650100"
          className="inline-flex items-center gap-2 px-6 py-3 border border-champagne-gold text-champagne-gold text-xs font-semibold tracking-[0.2em] uppercase hover:bg-champagne-gold hover:text-obsidian transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>CALL CONCIERGE: (929) 565-0100</span>
        </a>
      </section>
    </div>
  );
};
