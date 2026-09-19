import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { JourneyStep } from './JourneyStep';
import { DetailsStep } from './DetailsStep';
import { MatchAndRequestStep } from './MatchAndRequestStep';
import { ConfirmationStep } from './ConfirmationStep';

export const RequestRideLightbox: React.FC = () => {
  const { isOpen, closeBooking, currentStep, setStep } = useBooking();
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) closeBooking();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeBooking]);

  if (!isOpen) return null;

  const stages = [
    { num: '01', key: 1, label: 'JOURNEY' },
    { num: '02', key: 2, label: 'DETAILS' },
    { num: '03', key: 3, label: 'REQUEST' },
  ];

  return (
    <div role="dialog" aria-modal="true" aria-label="Request a Ride Concierge" className="request-ride-lightbox fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-5 lg:p-8 animate-fadeIn">
      <div onClick={closeBooking} className="fixed inset-0 bg-[#08090A]/80 backdrop-blur-md" />

      <div ref={modalContentRef} onClick={(event) => event.stopPropagation()} className="relative z-10 grid h-[calc(100dvh-1rem)] max-h-[900px] w-[96vw] max-w-[1380px] overflow-hidden border border-white/15 bg-[#0C0D0E] shadow-[0_30px_110px_rgba(0,0,0,0.78)] sm:h-[min(900px,calc(100dvh-2rem))] lg:h-[min(900px,calc(100dvh-4rem))] lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="relative flex h-[258px] min-h-0 shrink-0 flex-col overflow-hidden bg-[#F4F0E9] text-[#151517] lg:h-auto lg:min-h-0 lg:shrink lg:justify-between">
          <div className="relative z-10 min-h-0 shrink-0 overflow-y-auto p-5 lg:p-8 xl:p-10">
            <div className="flex items-center gap-3"><span className="font-display text-2xl font-black tracking-[-0.08em]">FBGH</span><span className="h-px w-7 bg-[#C5A059]" /><span className="text-[8px] font-mono tracking-[0.2em] text-[#8C7B5A]">FAITH BASED GLOBAL HOLDINGS</span></div>
            <div className="mt-5 h-px w-10 bg-[#C5A059] lg:mt-12" />
            <p className="mt-4 text-[9px] font-mono font-bold tracking-[0.3em] text-[#927B53] uppercase lg:mt-8 lg:text-[10px]">PRIVATE CHAUFFEUR CONCIERGE</p>
            <h2 className="mt-3 font-display text-4xl font-black leading-[0.82] tracking-[-0.08em] lg:mt-5 lg:text-6xl">REQUEST<br /><span className="text-[#C5A059]">A RIDE.</span></h2>
            <p className="mt-4 max-w-[18rem] text-xs leading-relaxed text-[#55555C] lg:mt-7 lg:max-w-[14rem] lg:text-sm">Planned around your time, your party, and the distance between New York and Philadelphia.</p>
            <div className="mt-4 flex items-center gap-2 text-[8px] font-mono tracking-[0.22em] text-[#927B53] uppercase lg:mt-7 lg:text-[9px]"><span className="h-px w-6 bg-[#C5A059]" /> NYC · PHILADELPHIA</div>
          </div>
          <div className="relative h-[92px] min-h-0 shrink-0 overflow-hidden lg:flex-1 lg:h-auto lg:min-h-[240px]">
            <img src="/images/destination-new-york.webp" alt="FBGH chauffeur beside an executive SUV in New York" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0D0E]/30 via-transparent to-transparent" />
            <div className="absolute inset-x-0 top-[-1px]"><div className="h-14 bg-[#F4F0E9] [clip-path:ellipse(70%_55%_at_50%_0%)]" /></div>
            <div className="absolute bottom-5 left-7 flex items-center gap-2 text-[9px] font-mono tracking-[0.2em] text-white/90"><span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" /> ARRIVE DIFFERENT</div>
          </div>
        </aside>

        <section className="flex min-h-0 min-w-0 flex-col bg-[#FAF8F5] text-[#141416]">
          <header className="shrink-0 border-b border-[#D7CDBE] px-5 py-4 sm:px-8 sm:py-5">
            <div className="flex items-center justify-between gap-5">
              <div className="lg:hidden"><p className="font-display text-lg font-black tracking-[-0.06em]">FBGH <span className="font-mono text-[8px] font-normal tracking-[0.18em] text-[#C5A059]">NYC · PHILADELPHIA</span></p></div>
              <div className="hidden items-center gap-2 text-[10px] font-mono tracking-[0.22em] text-[#967C52] uppercase lg:flex"><span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" /> REQUEST A RIDE</div>
              {currentStep < 4 && <div className="hidden items-center gap-5 md:flex">{stages.map((stage, index) => { const active = currentStep === stage.key; const complete = currentStep > stage.key; return <React.Fragment key={stage.key}><button type="button" onClick={() => complete && setStep(stage.key as 1 | 2 | 3)} className={`flex items-center gap-2 text-[10px] font-mono tracking-[0.18em] uppercase transition-colors ${active ? 'text-[#C5A059]' : complete ? 'text-white/65 hover:text-white' : 'text-white/25'}`}><span className={`flex h-6 w-6 items-center justify-center rounded-full border text-[9px] ${active ? 'border-[#C5A059] bg-[#C5A059] text-[#0C0D0E]' : complete ? 'border-[#C5A059]/60 text-[#C5A059]' : 'border-white/20'}`}>{stage.num}</span>{stage.label}</button>{index < stages.length - 1 && <span className="h-px w-8 bg-white/15" />}</React.Fragment>; })}</div>}
              <div className="flex items-center gap-4"><span className="text-[10px] font-mono tracking-[0.18em] text-[#9A8E7D] uppercase md:hidden">0{currentStep} / 03</span><button type="button" onClick={closeBooking} className="group flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] text-[#7E7468] transition-colors hover:text-[#141416] uppercase"><span className="hidden sm:inline">CLOSE</span><X className="h-5 w-5 transition-transform group-hover:rotate-90" /></button></div>
            </div>
            <div className="mt-5 flex items-center gap-2 text-[9px] font-mono tracking-[0.2em] text-[#9A8E7D] uppercase lg:hidden"><span className="h-px w-5 bg-[#C5A059]" /> NYC · PHILADELPHIA SERVICE AREA</div>
          </header>

          <div className="flex-grow overflow-y-auto px-5 py-5 sm:px-8 sm:py-7 lg:px-10 lg:py-8 custom-scrollbar"><div key={currentStep} className="flex min-h-full flex-col animate-slideStep">{currentStep === 1 && <JourneyStep />}{currentStep === 2 && <DetailsStep />}{currentStep === 3 && <MatchAndRequestStep />}{currentStep === 4 && <ConfirmationStep />}</div></div>
          <footer className="hidden shrink-0 items-center justify-between border-t border-[#D7CDBE] px-8 py-3 text-[9px] font-mono tracking-[0.18em] text-[#9A8E7D] uppercase sm:flex"><span>FBGH · PRIVATE CHAUFFEUR SERVICES</span><span className="flex items-center gap-2">CONTINUE TO PLAN <ArrowUpRight className="h-3.5 w-3.5 text-[#C5A059]" /></span></footer>
        </section>
      </div>
    </div>
  );
};
