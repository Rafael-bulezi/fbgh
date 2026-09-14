import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { JourneyStep } from './JourneyStep';
import { DetailsStep } from './DetailsStep';
import { MatchAndRequestStep } from './MatchAndRequestStep';
import { ConfirmationStep } from './ConfirmationStep';

export const RequestRideLightbox: React.FC = () => {
  const { isOpen, closeBooking, currentStep, setStep } = useBooking();
  const modalContentRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeBooking();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeBooking]);

  if (!isOpen) return null;

  const STAGES = [
    { num: '01', key: 1, label: 'JOURNEY' },
    { num: '02', key: 2, label: 'DETAILS' },
    { num: '03', key: 3, label: 'MATCH & REQUEST' },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Request a Ride Concierge"
      className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-5 lg:p-6 animate-fadeIn"
    >
      {/* DARKENED BACKDROP WITH SUBTLE BLUR (Current page remains visible underneath) */}
      <div
        onClick={closeBooking}
        className="fixed inset-0 bg-obsidian/75 backdrop-blur-[4px] transition-opacity duration-300"
      />

      {/* LIGHTBOX MODAL SHELL (~82vw × ~90vh on Desktop, ~95vw × ~94vh on Mobile) */}
      <div
        ref={modalContentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-[95vw] sm:w-[90vw] lg:w-[82vw] max-w-[1500px] h-[94vh] sm:h-[92vh] lg:h-[90vh] bg-[#0c0d0e] border border-white/10 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden text-warm-ivory"
      >
        {/* LIGHTBOX HEADER */}
        <header className="px-5 sm:px-8 py-4 sm:py-5 border-b border-white/10 flex items-center justify-between gap-4 shrink-0 bg-[#0c0d0e]/95 backdrop-blur-md">
          {/* Top-Left: Understated Title & Subtitle */}
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-champagne-gold animate-ping" />
            <div>
              <h2 className="font-display font-bold text-base sm:text-lg tracking-tight text-[#F4EDE4] uppercase">
                REQUEST YOUR RIDE
              </h2>
              <p className="text-[10px] font-mono tracking-widest text-champagne-gold uppercase hidden sm:block">
                FAITH BASED GLOBAL HOLDINGS · PRIVATE CHAUFFEUR CONCIERGE
              </p>
            </div>
          </div>

          {/* Center: 3-Stage Progress Indicator */}
          {currentStep < 4 && (
            <div className="hidden md:flex items-center gap-6">
              {STAGES.map((s, idx) => {
                const isActive = currentStep === s.key;
                const isCompleted = currentStep > s.key;

                return (
                  <React.Fragment key={s.key}>
                    <button
                      type="button"
                      onClick={() => {
                        // Allow clicking back to completed steps
                        if (isCompleted) setStep(s.key as 1 | 2 | 3);
                      }}
                      className={`flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase transition-colors ${
                        isActive
                          ? 'text-champagne-gold font-bold'
                          : isCompleted
                          ? 'text-warm-ivory/70 hover:text-warm-ivory cursor-pointer'
                          : 'text-warm-ivory/30 cursor-default'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border transition-all ${
                          isActive
                            ? 'border-champagne-gold bg-champagne-gold text-obsidian font-bold shadow-[0_0_10px_rgba(201,164,92,0.4)]'
                            : isCompleted
                            ? 'border-champagne-gold/60 text-champagne-gold'
                            : 'border-white/15 text-warm-ivory/30'
                        }`}
                      >
                        {s.num}
                      </span>
                      <span>{s.label}</span>
                    </button>
                    {idx < STAGES.length - 1 && (
                      <span className="w-6 h-[1px] bg-white/10" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {/* Top-Right: Mobile Step indicator & Close Button */}
          <div className="flex items-center gap-4">
            {currentStep < 4 && (
              <span className="text-[10px] font-mono text-champagne-gold tracking-widest md:hidden">
                0{currentStep} / 03
              </span>
            )}

            <button
              type="button"
              onClick={closeBooking}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-warm-ivory/70 hover:text-warm-ivory text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer"
            >
              <span>CLOSE</span>
              <X className="w-4 h-4 transition-transform group-hover:rotate-90" />
            </button>
          </div>
        </header>

        {/* LIGHTBOX BODY (Scrollable with restrained stage animation) */}
        <div className="flex-grow overflow-y-auto px-5 sm:px-8 lg:px-10 py-4 sm:py-6 flex flex-col custom-scrollbar">
          <div key={currentStep} className="flex-grow flex flex-col animate-slideStep">
            {currentStep === 1 && <JourneyStep />}
            {currentStep === 2 && <DetailsStep />}
            {currentStep === 3 && <MatchAndRequestStep />}
            {currentStep === 4 && <ConfirmationStep />}
          </div>
        </div>
      </div>
    </div>
  );
};
