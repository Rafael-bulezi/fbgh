import React from 'react';
import { ShieldCheck, Clock, Award } from 'lucide-react';
import { EditorialReveal } from '../common/EditorialReveal';

interface ObsessivePrecisionSectionProps {
  onOpenBooking: () => void;
}

export const ObsessivePrecisionSection: React.FC<ObsessivePrecisionSectionProps> = () => {
  return (
    <section className="w-full bg-[#0E0C0A] text-[#F4EDE4] py-16 sm:py-20 px-6 sm:px-12 lg:px-20 relative overflow-hidden select-none">
      {/* Background ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 75% 50%, rgba(197,160,89,0.12), transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Editorial Headline */}
        <div className="lg:col-span-6 space-y-4">
          <EditorialReveal as="h2" className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#F4EDE4] tracking-tight leading-[0.95]">
            <span className="editorial-line">OBSESSIVE</span>
            <span className="editorial-line editorial-line-gold text-[#C5A059]">PRECISION.</span>
          </EditorialReveal>

          <EditorialReveal as="p" delay={120} className="text-sm md:text-base text-warm-ivory/80 leading-relaxed max-w-lg font-light">
            Real comfort and dependable timing. Clean cars, tracked flights, and drivers who respect your privacy.
          </EditorialReveal>
        </div>

        {/* Right Column: 3 Curated Feature Badges */}
        <div className="lg:col-span-6 space-y-3">
          {[
            {
              icon: <ShieldCheck className="w-5 h-5 text-[#C5A059]" />,
              title: 'Real Human Support 24/7',
              desc: 'Live trip tracking and an actual person on call anytime you need assistance.',
            },
            {
              icon: <Clock className="w-5 h-5 text-[#C5A059]" />,
              title: 'Curbside & Airport Meet',
              desc: 'Your driver meets you right at arrivals or directly on the private aviation ramp.',
            },
            {
              icon: <Award className="w-5 h-5 text-[#C5A059]" />,
              title: 'Always 15 Minutes Early',
              desc: 'We arrive early so you never have to wait or wonder where your ride is.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-champagne-gold/40 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div className="space-y-0.5">
                <h3 className="font-display font-bold text-sm sm:text-base text-[#F4EDE4] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-warm-ivory/70 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
