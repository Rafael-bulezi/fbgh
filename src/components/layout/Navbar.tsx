import React, { useState, useEffect, useRef } from 'react';
import { Logo } from '../common/Logo';
import { ArrowUpRight, ArrowRight, EyeOff, Eye, ChevronDown } from 'lucide-react';
import { FLEET_DATA } from '../../data/fleetData';
import { RequestRideTooltip } from '../common/RequestRideTooltip';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
}) => {
  const [isSolid, setIsSolid] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isManuallyHidden, setIsManuallyHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [selectedMegaCat, setSelectedMegaCat] = useState<'suv' | 'sedan' | 'van' | 'electric'>('suv');

  const navLinksRef = useRef<HTMLDivElement>(null);
  const [ruleStyle, setRuleStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const megaVehicle = FLEET_DATA.find((v) => v.category === selectedMegaCat) || FLEET_DATA[0];

  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = performance.now();

    const handleScroll = () => {
      const y = window.scrollY;
      const now = performance.now();
      const dt = Math.max(now - lastT, 1);
      const dy = y - lastY;
      const v = Math.abs(dy) / dt;

      setIsSolid(y > 50);

      if (!mobileMenuOpen && !megaOpen) {
        if (dy > 0 && y > 300 && (dy > 70 || (v > 1.2 && dy > 20))) {
          setIsHidden(true);
        } else if (dy < -2) {
          setIsHidden(false);
        }
      }

      lastY = y;
      lastT = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen, megaOpen]);

  const navLinks = [
    { id: 'fleet', label: 'Fleet', isMega: true },
    { id: 'services', label: 'Services' },
    { id: 'experience', label: 'Experience' },
  ];

  const updateRulePosition = (targetEl?: HTMLElement | null) => {
    if (!targetEl || !navLinksRef.current) {
      setRuleStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }
    const navRect = navLinksRef.current.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    setRuleStyle({
      left: targetRect.left - navRect.left,
      width: targetRect.width,
      opacity: 1,
    });
  };

  useEffect(() => {
    if (navLinksRef.current) {
      const activeEl = navLinksRef.current.querySelector('[data-active="true"]') as HTMLElement;
      updateRulePosition(activeEl);
    }
  }, [currentPage]);

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    setMegaOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pages with daylight/warm-ivory heroes (like home & fleet) use light theme when at rest (not scrolled)
  const isDarkPage = ['services', 'experience', 'about', 'destinations'].includes(currentPage);
  const isDarkTheme = !isSolid && isDarkPage;

  // Navigation text colors — dynamic contrast based on page background & scroll state
  const linkActiveClass = isDarkTheme
    ? 'text-warm-ivory font-semibold'
    : 'text-ink-black font-semibold';
  const linkInactiveClass = isDarkTheme
    ? 'text-warm-ivory/80 hover:text-warm-ivory font-medium'
    : 'text-ink-black/80 hover:text-ink-black font-medium';

  return (
    <>
      <header
        onMouseLeave={() => setMegaOpen(false)}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isSolid ? 'top-4 sm:top-5 px-3 sm:px-6 lg:px-12' : 'top-0 px-4 sm:px-8 lg:px-12'
        } ${isHidden || isManuallyHidden ? '-translate-y-36 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
      >
        <div
          className={`relative max-w-5xl mx-auto flex items-center justify-between transition-all duration-500 rounded-lg overflow-visible ${
            isSolid
              ? 'h-16 px-6 sm:px-8 luxury-glass border border-black/8 shadow-[0_16px_40px_rgba(0,0,0,0.12)]'
              : 'h-20 sm:h-24 px-4 bg-transparent'
          }`}
        >

          {/* Left: Brand Monogram & Name */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNavClick('home')}
              className="group flex items-center gap-3 focus:outline-none select-none text-left"
              aria-label="Faith Based Global Holdings"
            >
              <Logo
                size="md"
                variant={mobileMenuOpen || isDarkTheme ? 'dark' : 'light'}
                showText={true}
              />
            </button>
          </div>

          {/* Center: Desktop Navigation Links with Traveling Gold Rule */}
          <nav
            ref={navLinksRef}
            onMouseLeave={() => {
              if (navLinksRef.current) {
                const activeEl = navLinksRef.current.querySelector('[data-active="true"]') as HTMLElement;
                updateRulePosition(activeEl);
              }
            }}
            className="hidden md:flex items-center gap-8 lg:gap-11 relative py-2"
          >
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <div
                  key={link.id}
                  className="relative py-1"
                  onMouseEnter={(e) => {
                    updateRulePosition(e.currentTarget);
                    if (link.isMega) setMegaOpen(true);
                    else setMegaOpen(false);
                  }}
                >
                  <button
                    data-active={isActive}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-xs font-sans tracking-[0.22em] uppercase transition-colors duration-300 flex items-center gap-1 ${
                      isActive ? linkActiveClass : linkInactiveClass
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.isMega && (
                      <span className="text-champagne-gold font-mono text-[10px] ml-0.5">
                        {megaOpen ? '−' : '+'}
                      </span>
                    )}
                  </button>
                </div>
              );
            })}

            {/* Dropdown Menu Trigger for Destinations & About Us */}
            <div
              className="relative py-1"
              onMouseEnter={() => {
                setMoreDropdownOpen(true);
                setMegaOpen(false);
              }}
              onMouseLeave={() => setMoreDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMoreDropdownOpen((prev) => !prev)}
                className={`text-xs font-sans tracking-[0.22em] uppercase transition-colors duration-300 flex items-center gap-1.5 cursor-pointer ${
                  currentPage === 'destinations' || currentPage === 'about'
                    ? linkActiveClass
                    : linkInactiveClass
                }`}
                aria-expanded={moreDropdownOpen}
                aria-haspopup="true"
              >
                <span>MORE</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-300 ${
                    moreDropdownOpen ? 'rotate-180 text-champagne-gold' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu Floating Box */}
              <div
                className={`absolute top-full right-0 mt-2 w-48 bg-[#0c0d0e]/95 backdrop-blur-2xl border border-white/10 rounded-xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50 transition-all duration-300 ${
                  moreDropdownOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      handleNavClick('destinations');
                      setMoreDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-sans tracking-[0.16em] uppercase flex items-center justify-between transition-colors cursor-pointer ${
                      currentPage === 'destinations'
                        ? 'bg-champagne-gold/15 text-champagne-gold font-semibold'
                        : 'text-warm-ivory/80 hover:text-warm-ivory hover:bg-white/5'
                    }`}
                  >
                    <span>DESTINATIONS</span>
                    <ArrowRight className="w-3 h-3 text-champagne-gold" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleNavClick('about');
                      setMoreDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-sans tracking-[0.16em] uppercase flex items-center justify-between transition-colors cursor-pointer ${
                      currentPage === 'about'
                        ? 'bg-champagne-gold/15 text-champagne-gold font-semibold'
                        : 'text-warm-ivory/80 hover:text-warm-ivory hover:bg-white/5'
                    }`}
                  >
                    <span>ABOUT US</span>
                    <ArrowRight className="w-3 h-3 text-champagne-gold" />
                  </button>
                </div>
              </div>
            </div>

            {/* The Traveling Champagne Rule */}
            <span
              className="absolute bottom-0 h-[1.5px] bg-champagne-gold transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none shadow-[0_0_8px_rgba(201,164,92,0.6)]"
              style={{
                left: `${ruleStyle.left}px`,
                width: `${ruleStyle.width}px`,
                opacity: ruleStyle.opacity,
              }}
            />
          </nav>

          {/* Right: CTA + Hide + Mobile Burger */}
          <div className="flex items-center gap-1.5 sm:gap-4">
            <RequestRideTooltip>
              <button
                onClick={onOpenBooking}
                className="pb-btn pb-btn-primary !px-2.5 sm:!px-6 !py-1.5 sm:!py-3 !text-[9px] sm:!text-xs flex items-center gap-1 cursor-pointer"
              >
                <span className="sm:hidden">REQUEST</span>
                <span className="hidden sm:inline">REQUEST A RIDE</span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>
            </RequestRideTooltip>

            {/* Hide Navbar Icon Button — Visible on Mobile as well */}
            <button
              type="button"
              onClick={() => setIsManuallyHidden(true)}
              title="Hide Navigation Bar"
              aria-label="Hide Navigation Bar"
              className={`flex w-7 h-7 sm:w-8 sm:h-8 rounded-full border items-center justify-center transition-all duration-300 group flex-shrink-0 cursor-pointer ${
                isDarkTheme
                  ? 'border-white/20 text-warm-ivory/80 hover:text-champagne-gold hover:bg-white/10 hover:border-champagne-gold/60'
                  : 'border-black/15 text-ink-black/70 hover:text-champagne-gold hover:bg-black/5 hover:border-champagne-gold/60'
              }`}
            >
              <EyeOff
                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:scale-110 transition-transform ${
                  isDarkTheme
                    ? 'text-warm-ivory/80 group-hover:text-champagne-gold'
                    : 'text-ink-black/70 group-hover:text-champagne-gold'
                }`}
              />
            </button>

            {/* Prominent High-Contrast Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden flex flex-col justify-center items-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border transition-all duration-300 focus:outline-none flex-shrink-0 cursor-pointer ${
                mobileMenuOpen
                  ? 'border-[#E0B268]/60 bg-white/10 text-warm-ivory'
                  : isDarkTheme
                  ? 'border-white/20 bg-black/40 backdrop-blur-md hover:border-champagne-gold/60 text-warm-ivory'
                  : 'border-black/15 bg-black/5 hover:border-black/30 text-ink-black'
              }`}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="w-4 sm:w-5 flex flex-col items-center justify-center gap-1">
                <span
                  className={`h-[2px] rounded-full transition-all duration-300 transform ${
                    mobileMenuOpen || isDarkTheme ? 'bg-[#E0B268]' : 'bg-ink-black'
                  } ${mobileMenuOpen ? 'w-4 sm:w-5 translate-y-[5px] sm:translate-y-[6px] rotate-45' : 'w-4 sm:w-5'}`}
                />
                <span
                  className={`h-[2px] rounded-full transition-all duration-300 ${
                    mobileMenuOpen || isDarkTheme ? 'bg-warm-ivory' : 'bg-ink-black'
                  } ${mobileMenuOpen ? 'opacity-0 scale-0' : 'w-3 sm:w-3.5'}`}
                />
                <span
                  className={`h-[2px] rounded-full transition-all duration-300 transform ${
                    mobileMenuOpen || isDarkTheme ? 'bg-[#E0B268]' : 'bg-ink-black'
                  } ${mobileMenuOpen ? 'w-4 sm:w-5 -translate-y-[5px] sm:-translate-y-[6px] -rotate-45' : 'w-3.5 sm:w-4.5'}`}
                />
              </div>
            </button>
          </div>

        {/* FLEET EDITORIAL MEGA-MENU */}
        <div
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
          className={`absolute top-full left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-4xl mt-3 bg-obsidian/95 backdrop-blur-2xl border border-white/10 rounded-xl p-6 sm:p-8 shadow-[0_24px_60px_rgba(0,0,0,0.85)] z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 ${
            megaOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
          }`}
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Category Index */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-champagne-gold">
                  THE FLEET · 32 VEHICLES, ALL BLACK
                </span>
                <span className="text-[8px] font-mono text-muted-gray tracking-widest uppercase">
                  LATE-MODEL CHAUFFEURED
                </span>
              </div>

              <ul className="space-y-1">
                {[
                  { id: 'suv', label: 'LUXURY SUVS', count: '12 VEHICLES', cap: 'UP TO 6 PAX' },
                  { id: 'sedan', label: 'PREMIUM SEDANS', count: '08 VEHICLES', cap: 'UP TO 3 PAX' },
                  { id: 'van', label: 'EXECUTIVE VANS', count: '10 VEHICLES', cap: 'UP TO 14 PAX' },
                  { id: 'electric', label: 'SUSTAINABLE & ELECTRIC', count: '05 VEHICLES', cap: 'UP TO 4 PAX' },
                ].map((cat) => {
                  const isHovered = selectedMegaCat === cat.id;
                  return (
                    <li
                      key={cat.id}
                      onMouseEnter={() => setSelectedMegaCat(cat.id as 'suv' | 'sedan' | 'van' | 'electric')}
                      onClick={() => handleNavClick('fleet')}
                      className={`grid grid-cols-12 items-baseline py-3 px-2 border-b border-white/5 cursor-pointer transition-all duration-300 group ${
                        isHovered ? 'bg-white/[0.03] border-champagne-gold/30' : ''
                      }`}
                    >
                      <span
                        className={`col-span-6 text-xs font-sans tracking-[0.2em] uppercase transition-colors ${
                          isHovered ? 'text-champagne-gold font-medium translate-x-1' : 'text-warm-ivory/70'
                        }`}
                      >
                        {cat.label}
                      </span>
                      <span className="col-span-3 text-[9px] font-mono tracking-widest text-muted-gray">
                        {cat.count}
                      </span>
                      <span className="col-span-2 text-[8px] font-mono text-muted-gray/70 text-right">
                        {cat.cap}
                      </span>
                      <span
                        className={`col-span-1 text-right text-champagne-gold text-xs transition-transform duration-300 ${
                          isHovered ? 'translate-x-1 opacity-100' : 'opacity-0'
                        }`}
                      >
                        →
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => handleNavClick('fleet')}
                  className="pb-btn-text text-xs tracking-[0.25em] font-mono text-champagne-gold uppercase"
                >
                  <span>EXPLORE THE OBSERVATORY (ALL 32)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right Interactive Vehicle Preview Card */}
            <div className="lg:col-span-6 relative bg-black/60 border border-white/10 overflow-hidden group">
              <div className="aspect-[16/10] w-full overflow-hidden relative">
                <img
                  src={megaVehicle.image}
                  alt={megaVehicle.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
              </div>

              <div className="p-4 flex items-center justify-between bg-obsidian/90 border-t border-white/10 font-mono text-[10px]">
                <div>
                  <span className="text-champagne-gold block font-semibold">
                    {megaVehicle.name}
                  </span>
                  <span className="text-muted-gray text-[9px] tracking-wider uppercase">
                    {megaVehicle.class} · {megaVehicle.passengers} PASSENGERS
                  </span>
                </div>
                <button
                  onClick={() => handleNavClick('fleet')}
                  className="px-3 py-1.5 border border-champagne-gold/40 text-warm-ivory text-[9px] tracking-widest uppercase hover:bg-champagne-gold hover:text-obsidian transition-colors"
                >
                  VIEW SPECS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </header>

      {/* Floating Restore Navbar Button */}
      {isManuallyHidden && (
        <button
          type="button"
          onClick={() => setIsManuallyHidden(false)}
          title="Show Navigation Bar"
          aria-label="Show Navigation Bar"
          className="fixed top-4 sm:top-5 right-4 sm:right-8 z-50 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 bg-obsidian/90 backdrop-blur-xl border border-champagne-gold/40 text-warm-ivory hover:text-champagne-gold rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.7)] text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 hover:scale-105 group cursor-pointer"
        >
          <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-champagne-gold group-hover:scale-110 transition-transform" />
          <span>SHOW NAV</span>
        </button>
      )}

      {/* MOBILE FULL-SCREEN MENU */}
      <div
        className={`fixed inset-0 z-40 bg-[#0A0908]/98 backdrop-blur-3xl transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 pt-24 pb-8 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'
        }`}
      >
        <div className="flex flex-col space-y-5 max-w-md mx-auto w-full">
          <div className="flex items-center justify-between text-[9px] font-mono tracking-[0.35em] uppercase text-champagne-gold border-b border-white/10 pb-3">
            <span>FBGH DIRECTORY</span>
            <span>24/7 CONCIERGE</span>
          </div>

          <div className="flex flex-col space-y-2 pt-1">
            {[
              { id: 'home', num: '01', label: 'Home' },
              { id: 'fleet', num: '02', label: 'Fleet' },
              { id: 'services', num: '03', label: 'Services' },
              { id: 'experience', num: '04', label: 'Experience' },
              { id: 'destinations', num: '05', label: 'Destinations' },
              { id: 'about', num: '06', label: 'About' },
            ].map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="flex items-baseline gap-4 text-left group py-1.5 transition-all cursor-pointer"
                >
                  <span className={`font-mono text-xs tracking-widest transition-colors ${
                    isActive ? 'text-[#E0B268] font-bold' : 'text-champagne-gold/70 group-hover:text-champagne-gold'
                  }`}>
                    {item.num}
                  </span>
                  <span className={`font-display font-black text-2xl sm:text-3xl tracking-tight transition-colors ${
                    isActive ? 'text-[#E0B268]' : 'text-warm-ivory group-hover:text-[#E0B268]'
                  }`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E0B268] ml-auto self-center" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4 pt-5 border-t border-white/10 max-w-md mx-auto w-full">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full pb-btn pb-btn-primary justify-center py-3.5"
          >
            <span>REQUEST A RIDE</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-between text-[8.5px] font-mono tracking-widest text-muted-gray uppercase">
            <span>NEW YORK · PHILADELPHIA</span>
            <span className="text-champagne-gold">CONCIERGE 24/7</span>
          </div>
        </div>
      </div>
    </>
  );
};