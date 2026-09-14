import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Award } from 'lucide-react';

interface ObsessivePrecisionSectionProps {
  onOpenBooking: () => void;
}

export const ObsessivePrecisionSection: React.FC<ObsessivePrecisionSectionProps> = ({
  onOpenBooking,
}) => {
  return (
    <section className="w-full bg-[#0E0C0A] text-[#F4EDE4] py-16 sm:py-24 px-6 sm:px-12 lg:px-20 relative overflow-hidden select-none">
      {/* Background ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 z-0"
        style={{
          background: 'radial-gradient(ellipse 65% 50% at 75% 50%, rgba(197,160,89,0.12), transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Editorial Headline & Intention CTA */}
        <div className="lg:col-span-6 space-y-5 sm:space-y-6">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-5 sm:w-6 h-[1px] bg-champagne-gold" />
            <span className="text-[10px] sm:text-[10.5px] font-mono tracking-[0.35em] text-champagne-gold uppercase font-semibold">
              CHAPTER 01 · THE STANDARD
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#F4EDE4] tracking-tight leading-[0.95]">
            OBSESSIVE<br />
            <span className="text-[#C5A059]">PRECISION.</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-warm-ivory/80 leading-relaxed max-w-lg font-light">
            Where quiet luxury meets relentless reliability. Every vehicle sanitized, pre-conditioned, monitored by flight telemetry, and delivered with uncompromising human discretion.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="pb-btn pb-btn-primary !px-6 sm:!px-8 !py-3 sm:!py-3.5 !text-[10px] sm:!text-xs flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
            >
              <span>RESERVE WITH INTENTION</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: 3 Curated Feature Badges matching Image 4 & Image 5 */}
        <div className="lg:col-span-6 space-y-4">
          {[
            {
              icon: <ShieldCheck className="w-5 h-5 text-[#C5A059]" />,
              title: 'Active 24/7 VIP Dispatch',
              desc: 'Live telemetry tracking, proactive traffic re-routing, and dedicated concierge dispatch.',
            },
            {
              icon: <Clock className="w-5 h-5 text-[#C5A059]" />,
              title: 'Curbside & Tarmac Readiness',
              desc: 'Meet-and-greet curbside or directly airside at FBO private aviation terminals.',
            },
            {
              icon: <Award className="w-5 h-5 text-[#C5A059]" />,
              title: '15-Minute Guaranteed Buffer',
              desc: 'Vehicles staged at least 15 minutes ahead of schedule. Your arrival is never rushed.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-sm hover:border-champagne-gold/40 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div className="space-y-1">
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
