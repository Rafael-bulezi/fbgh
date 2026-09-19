import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface PreparedFleetHighlightSectionProps {
  onOpenBooking?: () => void;
  onNavigate: (page: string) => void;
}

export const PreparedFleetHighlightSection: React.FC<PreparedFleetHighlightSectionProps> = ({
  onNavigate,
}) => {
  return (
    <section className="w-full bg-[#FAF8F5] text-ink-black py-16 sm:py-24 px-6 sm:px-12 lg:px-20 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* 1. Header Grid: Headline + Floating Dark Expectation Card (Image 4 & 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: 30+ Vehicles Headline */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#141416] tracking-tight leading-[0.95]">
              30+ VEHICLES.<br />
              <span className="text-[#C5A059]">PREPARED & READY.</span>
            </h2>

            <p className="text-sm md:text-base text-[#4A4A4F] leading-relaxed max-w-xl font-normal">
              We own and maintain our fleet. Clean Escalades, Mercedes S-Class, BMW X7, and Mercedes Sprinter vans ready across New York City and Philadelphia.
            </p>

            <div className="flex items-center gap-3 pt-1 font-mono text-[10px] tracking-[0.2em] text-[#66666E] uppercase font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
              <span>READY ON SHORT NOTICE</span>
            </div>
          </div>

          {/* Right Column: Floating Dark Expectation Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0E0C0A] text-[#F4EDE4] p-6 sm:p-7 rounded-2xl border border-white/10 shadow-[0_24px_50px_-15px_rgba(0,0,0,0.4)] space-y-4">
              <div className="pb-2">
                <span className="font-mono text-[9px] tracking-[0.25em] text-[#C5A059] uppercase font-semibold block">
                  OUR PROMISE
                </span>
                <h3 className="font-display font-bold text-lg text-white mt-0.5">
                  The FBGH Guarantee
                </h3>
              </div>

              <ul className="space-y-2.5 font-sans text-xs text-warm-ivory/80 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span><strong>Full Fleet:</strong> Luxury Sedans, Extended SUVs, and Executive Vans.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span><strong>Early Arrival:</strong> Driver staged before your flight lands, car cooled and clean.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059] flex-shrink-0 mt-0.5" />
                  <span><strong>Upfront Pricing:</strong> Fair flat rates with no hidden fees or surprise surges.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Fleet Categories Grid */}
        <div className="space-y-8 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A059] font-bold">
                OUR FLEET
              </span>
              <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-[#141416] tracking-tight mt-1">
                BUILT FOR EVERY JOURNEY.
              </h3>
            </div>

            <button
              onClick={() => onNavigate('fleet')}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#C5A059] hover:underline font-semibold"
            >
              <span>VIEW FULL FLEET (30+ VEHICLES)</span>
              <ArrowRight className="w-3.5 h-3.5" />
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
                className="group relative bg-white border border-[#E8E2D6] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:border-[#C5A059]/60 hover:shadow-xl transition-all duration-500"
              >
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                <div className="p-5 sm:p-6 space-y-1.5 relative bg-white">
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-lg text-[#141416] group-hover:text-[#C5A059] transition-colors">
                      {cat.title}
                    </h4>
                    <span className="text-[10px] text-[#C5A059] font-mono tracking-widest font-semibold">
                      {cat.count}
                    </span>
                  </div>
                  <p className="text-xs text-[#71767D] font-mono tracking-wider">
                    {cat.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
