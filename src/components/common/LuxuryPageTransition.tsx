import React, { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';

interface LuxuryPageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
}

export const LuxuryPageTransition: React.FC<LuxuryPageTransitionProps> = ({ children, pageKey }) => {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [stage, setStage] = useState<'idle' | 'unfocusing' | 'revealing'>('idle');
  const [emblemVisible, setEmblemVisible] = useState(false);

  const slice1Ref = useRef<HTMLDivElement>(null);
  const slice2Ref = useRef<HTMLDivElement>(null);
  const slice3Ref = useRef<HTMLDivElement>(null);

  const isFirstRender = useRef(true);
  const currentKeyRef = useRef(pageKey);

  useEffect(() => {
    // Skip animation on first page mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      currentKeyRef.current = pageKey;
      setDisplayChildren(children);
      return;
    }

    // Only trigger if pageKey actually changes
    if (pageKey === currentKeyRef.current) {
      setDisplayChildren(children);
      return;
    }

    currentKeyRef.current = pageKey;
    const slices = [slice1Ref.current, slice2Ref.current, slice3Ref.current];

    // 1. Unfocus outgoing page
    setStage('unfocusing');

    // 2. Trigger staggered 3-slice wipe IN (0 -> 100% width from left)
    slices.forEach((slice, index) => {
      if (slice) {
        slice.style.transformOrigin = 'left center';
        slice.style.transition = `transform 0.48s cubic-bezier(0.77, 0, 0.175, 1) ${index * 0.065}s`;
        slice.style.transform = 'scaleX(1)';
      }
    });

    // 2b. Show subtle luxury emblem watermark at peak coverage
    const emblemTimer = setTimeout(() => {
      setEmblemVisible(true);
    }, 280);

    // 3. Swap pages when gold slices completely mask the viewport (~500ms)
    const swapTimer = setTimeout(() => {
      setDisplayChildren(children);
      window.scrollTo({ top: 0, behavior: 'instant' });

      setEmblemVisible(false);
      setStage('revealing');

      // 4. Staggered 3-slice wipe OUT to the right (100% -> 0% width)
      slices.forEach((slice, index) => {
        if (slice) {
          slice.style.transformOrigin = 'right center';
          slice.style.transition = `transform 0.48s cubic-bezier(0.77, 0, 0.175, 1) ${index * 0.065}s`;
          slice.style.transform = 'scaleX(0)';
        }
      });
    }, 500);

    // 5. Complete sequence & cleanup state
    const finishTimer = setTimeout(() => {
      setStage('idle');
    }, 1050);

    return () => {
      clearTimeout(emblemTimer);
      clearTimeout(swapTimer);
      clearTimeout(finishTimer);
    };
  }, [pageKey, children]);

  // Page title / tag formatting for watermark
  const getPageTag = (key: string) => {
    switch (key) {
      case 'fleet':
        return '01 · BESPOKE FLEET';
      case 'services':
        return '02 · CONCIERGE & TRANSFERS';
      case 'experience':
        return '03 · THE FBGH STANDARD';
      case 'destinations':
        return '04 · PRIVATE CORRIDORS';
      default:
        return 'FAITH BASED GLOBAL HOLDINGS';
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-clip">
      {/* 3-SLICE STAGGERED HORIZONTAL CURTAIN OVERLAY */}
      <div className="slice-container" aria-hidden="true">
        <div ref={slice1Ref} className="slice slice--1" />
        <div ref={slice2Ref} className="slice slice--2" />
        <div ref={slice3Ref} className="slice slice--3" />
      </div>

      {/* LUXURY CENTER WATERMARK EMBLEM (Pulses gracefully when slices cover) */}
      <div
        className={`fixed inset-0 z-[260] pointer-events-none flex flex-col items-center justify-center transition-all duration-300 ${
          emblemVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="p-3 bg-obsidian/40 backdrop-blur-md rounded-full border border-champagne-gold/40 shadow-2xl">
            <Logo size="md" />
          </div>
          <span className="text-[10px] font-mono tracking-[0.38em] uppercase text-obsidian font-bold">
            {getPageTag(pageKey)}
          </span>
          <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-obsidian/75">
            ARRIVE WITH INTENTION
          </span>
        </div>
      </div>

      {/* PAGE CONTENT CONTAINER */}
      <div
        className={`w-full min-h-screen transition-all will-change-transform ${
          stage === 'unfocusing'
            ? 'opacity-25 scale-[0.985] duration-350 ease-out'
            : stage === 'revealing'
            ? 'opacity-100 scale-100 duration-500 ease-out'
            : 'opacity-100 scale-100'
        }`}
      >
        {displayChildren}
      </div>
    </div>
  );
};
