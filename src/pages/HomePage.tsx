import React from 'react';
import { CurvedHero } from '../components/common/CurvedHero';
import { CurvedDivider } from '../components/common/CurvedDivider';
import { ObsessivePrecisionSection } from '../components/home/ObsessivePrecisionSection';
import { PreparedFleetHighlightSection } from '../components/home/PreparedFleetHighlightSection';
import { HomeExperienceSection } from '../components/home/HomeExperienceSection';
import { Phone } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { useSubtleParallax } from '../hooks/useSubtleParallax';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenBooking }) => {
  const [skylineRef, skylineParallaxY, skylineTextParallaxY] = useSubtleParallax<HTMLImageElement>({ speed: 0.12, maxOffset: 65 });
  const [porscheRef, porscheParallaxY, porscheTextParallaxY] = useSubtleParallax<HTMLDivElement>({ speed: 0.14, maxOffset: 75 });

  return (
    <div className="w-full bg-[#FAF8F5] text-ink-black overflow-x-hidden selection:bg-[#C5A059] selection:text-obsidian">
      {/* ── 1. HERO: SIGNATURE GENTLE WAVE & ARRIVE WITH INTENTION (IMAGE 1 & 4) ── */}
      <CurvedHero
        eyebrow="PRIVATE TRANSPORTATION • ELEVATED"
        titleLine1="ARRIVE WITH"
        titleLine2="INTENTION."
        description="A bespoke private transportation fleet crafted for discerning executives, international travelers, and defining arrivals."
        slogan="PEOPLE · PURPOSE · PROSPERITY"
        image="https://res.cloudinary.com/dv9jpkgrs/image/upload/v1788409702/ChatGPT_Image_Sep_3_2026_05_22_22_AM_cft0se.png"
        imageAlt="FBGH Luxury Chauffeur Vehicle"
        curveVariant="gentle-wave"
        theme="light"
      />

      {/* ── TRANSITION 1 → 2: GENTLE WAVE FROM IVORY TO OBSIDIAN ── */}
      <CurvedDivider
        variant="gentle-wave"
        fromColor="#FAF8F5"
        toColor="#0E0C0A"
        height="clamp(45px, 6vw, 95px)"
      />

      {/* ── 2. CHAPTER 01: OBSESSIVE PRECISION (OBSIDIAN SECTION) ── */}
      <ObsessivePrecisionSection onOpenBooking={onOpenBooking} />

      {/* ── TRANSITION 2 → 3: S-CURVE FROM OBSIDIAN TO WARM IVORY ── */}
      <CurvedDivider
        variant="s-curve"
        fromColor="#0E0C0A"
        toColor="#FAF8F5"
        flip
        height="clamp(50px, 7vw, 100px)"
      />

      {/* ── 3. FLEET AUTHORITY: 30+ VEHICLES PREPARED & READY + FLEET CARDS ── */}
      <PreparedFleetHighlightSection
        onOpenBooking={onOpenBooking}
        onNavigate={onNavigate}
      />

      {/* ── TRANSITION 3 → 4: CIRCULAR ARC TO WARM SAND/IVORY ── */}
      <CurvedDivider
        variant="circular-arc"
        fromColor="#FAF8F5"
        toColor="#FAF7F2"
        height="clamp(40px, 5.5vw, 85px)"
      />

      {/* ── 4. THE FBGH STANDARD: EVERYTHING CONSIDERED (QUADRANT RETICLE) ── */}
      <div className="bg-[#FAF7F2]">
        <HomeExperienceSection onNavigate={onNavigate} />
      </div>

      {/* ── TRANSITION 4 → 5: SWOOPING ARCH INTO NIGHT SKYLINE ── */}
      <CurvedDivider
        variant="swoop"
        fromColor="#FAF7F2"
        toColor="#0D0B0A"
        height="clamp(50px, 7vw, 105px)"
      />

      {/* ── 5. REGIONAL & GLOBAL COVERAGE: WHEREVER THE DAY TAKES YOU ── */}
      <section className="w-full relative py-32 px-6 sm:px-12 lg:px-20 bg-[#0D0B0A] overflow-hidden select-none">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            ref={skylineRef}
            src="https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1920&auto=format&fit=crop"
            alt="New York Skyline Dusk"
            className="w-full h-full object-cover luminous-media opacity-75 will-change-transform scale-105"
            style={{
              transform: `translate3d(0, ${skylineParallaxY}px, 0) scale(1.05)`,
              transition: 'transform 0.1s ease-out',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0A] via-[#0D0B0A]/40 to-[#0D0B0A]/70" />
        </div>

        <div 
          className="max-w-5xl mx-auto text-center space-y-8 relative z-10 will-change-transform"
          style={{
            transform: `translate3d(0, ${skylineTextParallaxY}px, 0)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#C5A059] font-bold">
            COVERAGE
          </span>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#F4EDE4] tracking-tight leading-tight">
            WHEREVER THE DAY<br />
            <span className="text-[#C5A059]">TAKES YOU.</span>
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4">
            {['NEW YORK', 'PHILADELPHIA', 'AIRPORT HUBS', 'PRIVATE DESTINATIONS'].map((dest, i) => (
              <button
                key={i}
                onClick={() => onNavigate('destinations')}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#F4EDE4] hover:text-[#C5A059] uppercase transition-colors px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#C5A059]/40 backdrop-blur-sm cursor-pointer"
              >
                <span>{dest}</span>
                <span className="text-[#C5A059] text-sm">&rarr;</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSITION 5 → 6: ASYMMETRIC WAVE TO CRISP WHITE ── */}
      <CurvedDivider
        variant="asymmetric"
        fromColor="#0D0B0A"
        toColor="#FFFFFF"
        height="clamp(45px, 6vw, 95px)"
      />

      {/* ── 6. DISCREET TRUST: TESTIMONIALS FROM EXECUTIVE CLIENTELE ── */}
      <section className="w-full bg-white py-24 px-6 sm:px-12 lg:px-20 select-none">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-[#C5A059] font-bold">
                DISCREET TRUST
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[#141416] tracking-tight mt-1">
                TESTIMONIALS FROM EXECUTIVE CLIENTELE
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] border border-[#E8E2D6] p-7 sm:p-8 rounded-2xl space-y-6 flex flex-col justify-between hover:border-[#C5A059]/40 hover:shadow-lg transition-all duration-300"
              >
                <p className="text-xs sm:text-sm text-[#4A4A4F] italic leading-relaxed font-serif">
                  "{item.quote}"
                </p>

                <div className="border-t border-[#E8E2D6] pt-4">
                  <h4 className="font-display font-bold text-sm text-[#C5A059]">{item.author}</h4>
                  <p className="text-[10.5px] text-[#71767D] font-mono tracking-wider">{item.role}</p>
                  <p className="text-[9.5px] text-[#8C9199] font-mono tracking-widest uppercase mt-0.5">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSITION 6 → 7: GENTLE WAVE FLOWING DIRECTLY INTO OBSIDIAN FOOTER ── */}
      <CurvedDivider
        variant="gentle-wave"
        fromColor="#FFFFFF"
        toColor="#0E0C0A"
        flip
        height="clamp(50px, 7vw, 105px)"
      />

      {/* ── 7. FINAL INVOCATION: ARRIVE WITH INTENTION ── */}
      <section 
        ref={porscheRef}
        className="w-full relative min-h-[72vh] sm:min-h-[82vh] flex items-center justify-center bg-[#0E0C0A] overflow-hidden select-none py-28 sm:py-36"
      >
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1920&auto=format&fit=crop"
          alt="Luxury Vehicle at Night"
          className="absolute inset-0 w-full h-[125%] -top-[12%] object-cover object-center luminous-media opacity-80 will-change-transform"
          style={{
            transform: `translate3d(0, ${porscheParallaxY}px, 0) scale(1.08)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
        {/* Dark cinematic scrim to make text pop while keeping full image richness */}
        <div className="absolute inset-0 bg-[#0E0C0A]/40" />

        <div 
          className="relative z-10 text-center space-y-6 p-6 max-w-2xl will-change-transform"
          style={{
            transform: `translate3d(0, ${porscheTextParallaxY}px, 0)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#F4EDE4] tracking-tight uppercase leading-[0.95]">
            ARRIVE WITH<br />
            <span className="text-[#C5A059]">INTENTION.</span>
          </h2>

          <div className="pt-2 flex items-center justify-center">
            <a
              href="tel:2676424616"
              className="pb-btn pb-btn-outline !py-3 !px-8 !border-white/20 !text-warm-ivory hover:!border-[#C5A059] hover:!text-[#C5A059] cursor-pointer inline-flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(267) 642-4616</span>
            </a>
          </div>
        </div>

        {/* Curved divider transitioning to the footer — NOT straight! */}
        <div className="absolute bottom-0 inset-x-0 z-20 pointer-events-none">
          <CurvedDivider
            variant="gentle-wave"
            fromColor="transparent"
            toColor="#15110E"
            position="bottom"
            height="clamp(50px, 7vw, 105px)"
          />
        </div>
      </section>
    </div>
  );
};
