import React, { useState } from 'react';
import { CurvedHero } from '../components/common/CurvedHero';
import { CurvedDivider } from '../components/common/CurvedDivider';
import { EditorialReveal } from '../components/common/EditorialReveal';
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
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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
        mobileImagePosition="object-[68%_top]"
        imagePosition="object-[center_20%]"
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

      {/* ── 5. NEW YORK & PHILADELPHIA COVERAGE ── */}
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
            NEW YORK & PHILADELPHIA<br />
            <span className="text-[#C5A059]">ARRIVE DIFFERENT.</span>
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4">
            {['NEW YORK', 'PHILADELPHIA'].map((dest, i) => (
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

      {/* ── 6. CLIENT STORIES: EDITORIAL TESTIMONIALS ── */}
      <section className="relative w-full overflow-hidden border-t border-[#C5A059]/20 bg-[#0E0C0A] px-6 py-20 text-[#F4EDE4] sm:px-12 sm:py-28 lg:px-20 select-none">
        <div className="absolute inset-x-0 bottom-0 h-[34%] overflow-hidden opacity-35">
          <img src="/images/destination-new-york.webp" alt="New York skyline and chauffeur vehicle" className="h-full w-full object-cover object-center grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C0A] via-[#0E0C0A]/85 to-transparent" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between gap-8 border-b border-white/10 pb-6 sm:mb-16">
            <div>
              <EditorialReveal as="p" className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-[#C5A059]">
                <span className="editorial-line">CLIENT STORIES</span>
              </EditorialReveal>
              <EditorialReveal as="h2" delay={70} className="mt-3 max-w-2xl font-display text-3xl font-black uppercase leading-[0.94] tracking-tight text-[#F4EDE4] sm:text-5xl lg:text-[3.4rem]">
                <span className="editorial-line">TRUST IS FELT</span>
                <span className="editorial-line editorial-swipe editorial-swipe-dark">BEFORE IT IS SPOKEN.</span>
              </EditorialReveal>
            </div>
            <div className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 sm:block">
              <span className="text-3xl font-display font-bold text-[#F4EDE4]">0{activeTestimonial + 1}</span><span className="mx-2 text-[#C5A059]">/</span>0{TESTIMONIALS_DATA.length}
            </div>
          </div>

          <div className="grid min-h-[390px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-20">
            <div className="flex flex-col justify-between">
              <EditorialReveal key={activeTestimonial} as="div" className="max-w-4xl">
                <span className="mb-6 block font-display text-7xl leading-none text-[#C5A059]/80 sm:text-8xl">“</span>
                <blockquote className="max-w-[820px] font-display text-[2rem] font-semibold leading-[1.08] tracking-tight text-[#F4EDE4] sm:text-4xl lg:text-[3.25rem]">
                  {TESTIMONIALS_DATA[activeTestimonial].quote}
                </blockquote>
                <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                  <span className="text-[#F4EDE4]">{TESTIMONIALS_DATA[activeTestimonial].author}</span>
                  <span className="h-px w-8 bg-[#C5A059]" />
                  <span>{TESTIMONIALS_DATA[activeTestimonial].role}</span>
                  <span className="text-[#C5A059]">{TESTIMONIALS_DATA[activeTestimonial].location}</span>
                </div>
              </EditorialReveal>
              <EditorialReveal as="p" delay={180} className="mt-12 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                <span>Private travel is personal. Every detail is handled quietly, from the first pickup to the final arrival.</span>
              </EditorialReveal>
            </div>

            <div className="border-l border-[#C5A059]/60 pl-6 sm:pl-8">
              <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-white/65">SELECT A STORY</p>
              <div className="space-y-7">
                {TESTIMONIALS_DATA.map((item, idx) => (
                  <button key={item.author} type="button" onClick={() => setActiveTestimonial(idx)} className={`group block w-full text-left transition-opacity duration-300 ${activeTestimonial === idx ? 'opacity-100' : 'opacity-45 hover:opacity-80'}`}>
                    <span className={`font-mono text-[10px] tracking-[0.2em] ${activeTestimonial === idx ? 'text-[#C5A059]' : 'text-white/50'}`}>0{idx + 1}</span>
                    <span className="mt-2 block font-display text-lg font-semibold leading-tight text-[#F4EDE4]">{item.author}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-white/70">{item.role}</span>
                    <span className="mt-3 block h-px w-full origin-left bg-white/15 transition-transform duration-500 group-hover:scale-x-100" />
                  </button>
                ))}
              </div>
              <div className="mt-12 hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/45 sm:flex">
                <span className="h-px w-10 bg-[#C5A059]" />
                <span>NEW YORK CITY</span>
                <span className="text-[#C5A059]">↔</span>
                <span>PHILADELPHIA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. FINAL INVOCATION: ARRIVE WITH INTENTION ── */}
      <section 
        ref={porscheRef}
        className="w-full relative min-h-[72vh] sm:min-h-[82vh] flex items-center justify-center bg-[#0E0C0A] overflow-hidden select-none py-28 sm:py-36"
      >
        <img
          src="/images/home-closing-arrive-with-intention.webp"
          alt="Chauffeur welcoming a client at a destination entrance"
          className="absolute inset-0 w-full h-[125%] -top-[12%] object-cover object-[72%_center] sm:object-center luminous-media opacity-80 will-change-transform"
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
