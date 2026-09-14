// FleetObservatory.tsx — Exhibition Rail Edition (Polished & Expanded)
// Two independent navigation systems:
//   1. Fleet rail  → which vehicle (drag / arrows / keyboard / side-frame click)
//   2. Gallery     → which photo of that vehicle (Ext/Int toggle + bottom thumbnails)
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { FLEET_DATA, type Vehicle } from '../../data/fleetData';
import { ArrowUpRight } from 'lucide-react';

interface FleetObservatoryProps {
  onBookVehicle: (vehicle: Vehicle) => void;
  onOpenBooking: () => void;
}

function getExteriorPhotos(v: Vehicle): string[] {
  return v.exteriorGallery && v.exteriorGallery.length > 0 ? v.exteriorGallery : [v.image];
}
function getInteriorPhotos(v: Vehicle): string[] {
  return v.interiorGallery && v.interiorGallery.length > 0 ? v.interiorGallery : [v.interiorImage];
}
function pad2(n: number) { return String(n).padStart(2, '0'); }

export const FleetObservatory: React.FC<FleetObservatoryProps> = ({
  onBookVehicle,
  onOpenBooking: _onOpenBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [passengerFilter, setPassengerFilter]   = useState('all');
  const [currentIndex, setCurrentIndex]         = useState(0);
  const [galleryMode, setGalleryMode]           = useState<'exterior'|'interior'>('exterior');
  const [photoIndex, setPhotoIndex]             = useState(0);
  const [detailsOpen, setDetailsOpen]           = useState(false);

  // Animation state
  const posRef      = useRef(0);
  const targetRef   = useRef(0);
  const rafRef      = useRef(0);
  const ribbonKey   = useRef('');

  // Drag state
  const dragging    = useRef(false);
  const startX      = useRef(0);
  const dragBase    = useRef(0);
  const lastX       = useRef(0);
  const lastT       = useRef(0);
  const vel         = useRef(0);

  // DOM refs
  const stripRef    = useRef<HTMLDivElement>(null);
  const apertureRef = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const curIdxRef   = useRef(0);
  const galModeRef  = useRef<'exterior'|'interior'>('exterior');
  const photoIdxRef = useRef(0);
  const wheelTimer  = useRef<number | null>(null);

  // 7 side frame slots: 0=L2 1=L1 2=L0 3=R0 4=R1 5=R2 6=R3
  const frameRefs = useRef<(HTMLDivElement | null)[]>(Array(7).fill(null));

  // ----- derived -----
  const filteredVehicles = useMemo(() => {
    let list = FLEET_DATA;
    if (selectedCategory === 'specialty')
      list = list.filter(v => v.category === 'electric' || v.class.toLowerCase().includes('special'));
    else if (selectedCategory !== 'all')
      list = list.filter(v => v.category === selectedCategory);
    if (passengerFilter === '1-3') list = list.filter(v => v.passengers <= 3);
    if (passengerFilter === '4-6') list = list.filter(v => v.passengers >= 4 && v.passengers <= 6);
    if (passengerFilter === '7+')  list = list.filter(v => v.passengers >= 7);
    return list.length ? list : FLEET_DATA;
  }, [selectedCategory, passengerFilter]);

  const safeIdx     = Math.min(currentIndex, filteredVehicles.length - 1);
  const vehicle     = filteredVehicles[safeIdx] ?? FLEET_DATA[0];
  const gallery     = galleryMode === 'exterior' ? getExteriorPhotos(vehicle) : getInteriorPhotos(vehicle);
  const safePhoto   = Math.min(photoIndex, gallery.length - 1);

  // keep refs in sync
  useEffect(() => { curIdxRef.current   = safeIdx;      }, [safeIdx]);
  useEffect(() => { galModeRef.current  = galleryMode;  }, [galleryMode]);
  useEffect(() => { photoIdxRef.current = safePhoto;    }, [safePhoto]);

  // reset on filter change
  useEffect(() => {
    setCurrentIndex(0); posRef.current = 0; targetRef.current = 0;
    setPhotoIndex(0); setGalleryMode('exterior');
  }, [selectedCategory, passengerFilter]);

  useEffect(() => { setPhotoIndex(0); }, [safeIdx]);
  useEffect(() => { setPhotoIndex(0); }, [galleryMode]);

  // ----- ribbon rebuild (continuous aperture window) -----
  const rebuildRibbon = useCallback(() => {
    const ap  = apertureRef.current;
    const trk = trackRef.current;
    if (!ap || !trk) return;
    const apW = ap.offsetWidth, apH = ap.offsetHeight;
    if (!apW || !apH) return;

    const vehicles = filteredVehicles;
    const ci = curIdxRef.current;
    const gm = galModeRef.current;
    const pi = photoIdxRef.current;

    // Full recreation only when item count changes
    if (trk.children.length !== vehicles.length) {
      while (trk.firstChild) trk.removeChild(trk.firstChild);
      vehicles.forEach((v, i) => {
        const div = document.createElement('div');
        div.style.cssText = `flex:0 0 auto;width:${apW}px;height:100%;position:relative;overflow:hidden;`;
        const img = document.createElement('img');
        img.draggable = false;
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;object-position:center;display:block;';
        const isCurrent = i === ci;
        const photos = gm === 'exterior' ? getExteriorPhotos(v) : getInteriorPhotos(v);
        const src = isCurrent ? (photos[pi] ?? photos[0] ?? v.image) : (photos[0] ?? v.image);
        img.src = src;
        img.dataset.src = src;
        div.appendChild(img);
        trk.appendChild(div);
      });
    } else {
      // In-place update to prevent DOM destruction, layout shifts, or blank flashes
      for (let i = 0; i < vehicles.length; i++) {
        const div = trk.children[i] as HTMLElement;
        if (!div) continue;
        div.style.width = `${apW}px`;
        const img = div.querySelector('img') as HTMLImageElement | null;
        if (img) {
          const v = vehicles[i];
          const isCurrent = i === ci;
          const photos = gm === 'exterior' ? getExteriorPhotos(v) : getInteriorPhotos(v);
          const src = isCurrent ? (photos[pi] ?? photos[0] ?? v.image) : (photos[0] ?? v.image);
          if (img.dataset.src !== src) {
            img.src = src;
            img.dataset.src = src;
          }
        }
      }
    }
  }, [filteredVehicles]);

  // ----- layout frames with depth, perspective scaling, and gallery spacing -----
  const layoutFrames = useCallback(() => {
    const strip = stripRef.current;
    const ap    = apertureRef.current;
    const trk   = trackRef.current;
    if (!strip || !ap || !trk) return;

    const pos   = posRef.current;
    const apW   = ap.offsetWidth;
    const sw    = strip.clientWidth;
    const apL   = (sw - apW) / 2;
    const apR   = apL + apW;

    // Harmonious side frame sizing & tight, precise 12px exhibition rhythm
    const fw    = Math.min(128, Math.max(90, sw * 0.086));
    const fh    = fw * 0.68;
    const sep   = 12; // Elegant 12px gap from central aperture and between side frames
    const P     = fw + sep;
    const i     = Math.floor(pos + 1e-9);
    const f     = pos - i;

    // Symmetrical positioning: frames sit exactly `sep` (12px) off aperture edges
    const left  = (k: number) => apL - sep - fw - (k - 1) * P;
    const right = (k: number) => apR + sep + k * P;

    const slots = [
      { idx: i - 2, left: left(2) - f * P, opacity: 0.35 * (1 - f), scale: 0.80 },
      { idx: i - 1, left: left(1) - f * P, opacity: 0.70 - 0.35 * f, scale: 0.90 },
      { idx: i,     left: apL - f * P,      opacity: Math.min(0.9, Math.max(0, f)), scale: 0.98 },
      { idx: i + 1, left: right(0) - f * P, opacity: 0.85, scale: 0.98 },
      { idx: i + 2, left: right(1) - f * P, opacity: 0.60, scale: 0.90 },
      { idx: i + 3, left: right(2) - f * P, opacity: 0.32, scale: 0.82 },
      { idx: i + 4, left: right(3) - f * P, opacity: 0.12, scale: 0.75 },
    ];

    slots.forEach(({ idx, left: lPos, opacity, scale }, s) => {
      const el = frameRefs.current[s];
      if (!el) return;
      const valid = idx >= 0 && idx < filteredVehicles.length;
      el.dataset.idx   = String(idx);
      el.style.width   = `${fw}px`;
      el.style.height  = `${fh}px`;
      el.style.cursor  = valid ? 'pointer' : 'default';
      if (!valid) { el.style.opacity = '0'; el.style.pointerEvents = 'none'; return; }
      el.style.pointerEvents = 'auto';
      el.style.left    = `${lPos.toFixed(2)}px`;
      el.style.opacity = String(Math.min(1, Math.max(0, opacity)).toFixed(3));
      el.style.transform = `translate3d(0, -50%, 0) scale(${scale})`;
      el.style.transformOrigin = s < 3 ? 'right center' : 'left center';

      const v = filteredVehicles[idx];
      const imgEl = el.querySelector('img') as HTMLImageElement|null;
      if (imgEl && imgEl.dataset.src !== v.image) { imgEl.src = v.image; imgEl.dataset.src = v.image; }
      const label = el.querySelector('.fl') as HTMLElement|null;
      if (label && label.textContent !== v.name) label.textContent = v.name;
    });

    if (apW > 0) {
      trk.style.transform = `translate3d(${(-pos * apW).toFixed(2)}px,0,0)`;
      // Verify track frame widths precisely match apW
      for (let j = 0; j < trk.children.length; j++) {
        const div = trk.children[j] as HTMLElement;
        if (div && div.style.width !== `${apW}px`) {
          div.style.width = `${apW}px`;
        }
      }
    }
  }, [filteredVehicles]);

  // ----- animation loop -----
  useEffect(() => {
    const vehicles = filteredVehicles;
    let last = -1;
    const tick = () => {
      if (!dragging.current) {
        // 20% slower lerp (0.096 instead of 0.12) for a stately, smooth glide
        posRef.current += (targetRef.current - posRef.current) * 0.096;
        if (Math.abs(targetRef.current - posRef.current) < 0.0004) posRef.current = targetRef.current;
      }
      const vis = Math.max(0, Math.min(vehicles.length - 1, Math.round(posRef.current)));
      if (vis !== last && !dragging.current) { last = vis; setCurrentIndex(vis); }
      layoutFrames();
      const nk = `${vehicles.length}|${galModeRef.current}|${vis}|${photoIdxRef.current}`;
      if (ribbonKey.current !== nk) { ribbonKey.current = nk; rebuildRibbon(); }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [filteredVehicles, layoutFrames, rebuildRibbon]);

  // resize → invalidate ribbon & reposition immediately
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      ribbonKey.current = '';
      layoutFrames();
    });
    if (apertureRef.current) ro.observe(apertureRef.current);
    if (stripRef.current) ro.observe(stripRef.current);
    return () => ro.disconnect();
  }, [layoutFrames]);

  // Cleanup wheel timer on unmount
  useEffect(() => {
    return () => {
      if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
    };
  }, []);

  // ----- navigation -----
  const selectVehicle = useCallback((idx: number) => {
    const c = Math.max(0, Math.min(filteredVehicles.length - 1, idx));
    setCurrentIndex(c); targetRef.current = c;
    setPhotoIndex(0); setDetailsOpen(false);
  }, [filteredVehicles.length]);

  const stepVehicle = useCallback((dir: number) => {
    const next = Math.max(0, Math.min(filteredVehicles.length - 1, Math.round(targetRef.current) + dir));
    setCurrentIndex(next); targetRef.current = next;
    setPhotoIndex(0); setDetailsOpen(false);
  }, [filteredVehicles.length]);

  // ----- drag handlers -----
  const onDown = useCallback((e: React.PointerEvent) => {
    const t = e.target as HTMLElement;
    if (t.closest('.info-card,.thumb-bar,.ctrl-bar,.ap-el')) return;
    dragging.current = true;
    startX.current = lastX.current = e.clientX;
    lastT.current = performance.now(); dragBase.current = targetRef.current; vel.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    (e.currentTarget as HTMLElement).style.cursor = 'grabbing';
  }, []);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const now = performance.now(); const dt = Math.max(1, now - lastT.current);
    vel.current = 0.65*vel.current + 0.35*((e.clientX - lastX.current)/dt);
    lastX.current = e.clientX; lastT.current = now;
    const dx = e.clientX - startX.current;
    // 20% slower drag responsiveness
    targetRef.current = Math.max(-0.25, Math.min(filteredVehicles.length - 0.75, dragBase.current - dx/185));
    posRef.current = targetRef.current;
  }, [filteredVehicles.length]);

  const onUp = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    (e.currentTarget as HTMLElement).style.cursor = 'grab';
    const proj = targetRef.current - (vel.current*90)/185;
    targetRef.current = Math.max(0, Math.min(filteredVehicles.length - 1, Math.round(proj)));
  }, [filteredVehicles.length]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    // 20% slower wheel scrolling
    targetRef.current = Math.max(0, Math.min(filteredVehicles.length - 1, targetRef.current + d * 0.0038));
    if (wheelTimer.current) window.clearTimeout(wheelTimer.current);
    wheelTimer.current = window.setTimeout(() => {
      targetRef.current = Math.round(targetRef.current);
    }, 140);
  }, [filteredVehicles.length]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') stepVehicle(1);
      if (e.key === 'ArrowLeft')  stepVehicle(-1);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [stepVehicle]);

  const handleFrameClick = useCallback((s: number) => {
    const el = frameRefs.current[s]; if (!el) return;
    const idx = Number(el.dataset.idx);
    if (!isNaN(idx) && idx >= 0 && idx < filteredVehicles.length) selectVehicle(idx);
  }, [filteredVehicles.length, selectVehicle]);

  // ─────────────────────── RENDER ───────────────────────────────────────────
  const cats = [
    {id:'all',label:'All'},{id:'suv',label:'SUVs'},
    {id:'sedan',label:'Sedans'},{id:'van',label:'Vans'},{id:'specialty',label:'Specialty'},
  ];
  const caps = [{id:'all',label:'Any'},{id:'1-3',label:'1–3'},{id:'4-6',label:'4–6'},{id:'7+',label:'7+'}];
  const KEYS = ['L2','L1','L0','R0','R1','R2','R3'];

  return (
    <section
      className="w-full bg-[#0d0b09] text-[#f3f4f6] relative overflow-hidden select-none flex flex-col justify-between"
      style={{ minHeight: '92vh' }}
    >
      {/* Background vignette & ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-10"
        style={{background:'radial-gradient(115% 85% at 50% 45%,transparent 55%,rgba(0,0,0,0.6) 100%)'}} />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="relative z-20 flex items-start justify-between px-6 sm:px-12 pt-6 pb-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display font-extrabold text-[16px] tracking-[0.22em] uppercase text-[#F4EDE4]">FBGH</span>
            <span className="font-mono text-[7.5px] tracking-[0.24em] uppercase text-[#71767D]">Luxury Transportation</span>
          </div>
          <span className="font-mono text-[7px] tracking-[0.24em] uppercase text-[#5c6167]">Fleet Exhibition — Collection Gallery</span>
        </div>

        <nav className="flex items-center gap-6 sm:gap-8 pt-1">
          {cats.map(c => (
            <button key={c.id} onClick={() => setSelectedCategory(c.id)}
              className={`relative font-display font-semibold text-[11px] tracking-[0.22em] uppercase pb-0.5 transition-colors cursor-pointer ${
                selectedCategory===c.id ? 'text-[#cfa869]' : 'text-[#8b9096] hover:text-[#f3f4f6]'}`}>
              {c.label}
              {selectedCategory===c.id && <span className="absolute left-0 right-0 bottom-0 h-px bg-[#cfa869]" />}
            </button>
          ))}
        </nav>
      </header>

      {/* ── EXPANDED MAIN STAGE (TALL MAJESTIC APERTURE) ────────────────────── */}
      <main className="relative z-20 w-full flex-1" style={{minHeight:'clamp(500px, 66vh, 740px)'}}>

        {/* Class tag */}
        <div className="absolute top-2 right-6 sm:right-12 z-30 font-mono text-[8px] tracking-[0.26em] uppercase text-[#cfa869] opacity-80 pointer-events-none">
          {vehicle.categoryLabel} / Executive Collection
        </div>

        {/* ── FLOATING GLASS INFO CARD ──────────────────────────────────── */}
        <aside className="info-card absolute left-4 sm:left-10 z-40 flex flex-col gap-3.5"
          style={{
            top:'50%',transform:'translateY(-50%)',
            width:'clamp(185px,17vw,225px)',
            background:'rgba(14,12,10,0.84)',backdropFilter:'blur(20px)',
            WebkitBackdropFilter:'blur(20px)',
            border:'1px solid rgba(255,255,255,0.09)',borderRadius:'14px',
            padding:'20px 18px',boxShadow:'0 30px 70px -20px rgba(0,0,0,0.95)',
          }}>
          <h2 className="font-display font-extrabold text-[17px] sm:text-[18px] leading-tight text-center text-[#F4EDE4] tracking-tight">
            {vehicle.name}
          </h2>

          <div className="grid grid-cols-2 gap-3 py-3"
            style={{borderTop:'1px solid rgba(255,255,255,0.08)',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
            {([
              {v:vehicle.passengers,l:'Passengers'},
              {v:vehicle.luggage,   l:'Luggage'},
              {v:vehicle.transmission??'Automatic',l:'Transmission',sm:true},
              {v:vehicle.drivetrain??'AWD',        l:'Drivetrain',  sm:true},
            ] as {v:string|number,l:string,sm?:boolean}[]).map(({v:val,l,sm}) => (
              <div key={l}>
                <b className={`block font-display font-bold text-[#F4EDE4] ${sm?'text-[9.5px] uppercase truncate':'text-[16px]'}`}>{val}</b>
                <span className="font-mono text-[7px] tracking-[0.16em] uppercase text-[#71767D]">{l}</span>
              </div>
            ))}
          </div>

          <button onClick={() => setDetailsOpen(o=>!o)} aria-expanded={detailsOpen}
            className="flex items-center justify-between w-full font-mono text-[7.5px] tracking-[0.2em] uppercase text-[#cfa869] py-0.5 hover:brightness-110 transition-all cursor-pointer">
            <span>⚙ Fine Grain Details</span>
            <span className="text-[12px] transition-transform duration-300 inline-block"
              style={{transform:detailsOpen?'rotate(45deg)':'none'}}>＋</span>
          </button>

          <div className="overflow-hidden transition-all duration-500"
            style={{maxHeight:detailsOpen?'220px':'0',opacity:detailsOpen?1:0}}>
            <ul className="space-y-1.5">
              {vehicle.idealFor.slice(0,2).map(item => (
                <li key={item} className="flex items-start justify-between gap-1.5 pb-1.5"
                  style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                  <span className="font-mono text-[6.5px] tracking-[0.14em] uppercase text-[#71767D] flex-shrink-0 mt-0.5">FOR</span>
                  <b className="font-sans font-medium text-[8.5px] text-[#F4EDE4] text-right leading-tight">{item}</b>
                </li>
              ))}
              <li className="flex items-start justify-between gap-1.5 pb-1.5"
                style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                <span className="font-mono text-[6.5px] tracking-[0.14em] uppercase text-[#71767D] flex-shrink-0 mt-0.5">AUDIO</span>
                <b className="font-sans font-medium text-[8.5px] text-[#F4EDE4] text-right leading-tight">{vehicle.specs.soundSystem}</b>
              </li>
              {vehicle.specs.wifi && (
                <li className="flex items-start justify-between gap-1.5">
                  <span className="font-mono text-[6.5px] tracking-[0.14em] uppercase text-[#71767D]">WI-FI</span>
                  <b className="font-sans font-medium text-[8.5px] text-[#F4EDE4]">ONBOARD</b>
                </li>
              )}
            </ul>
          </div>

          <button onClick={() => onBookVehicle(vehicle)}
            className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded font-display font-bold text-[9.5px] tracking-[0.24em] uppercase transition-all hover:brightness-110 hover:-translate-y-px cursor-pointer"
            style={{background:'linear-gradient(140deg,#dcb877,#c09a4f)',color:'#171310'}}>
            Request Vehicle <ArrowUpRight className="w-3 h-3" />
          </button>
        </aside>

        {/* ── DRAG STRIP (CONTINUOUS RAIL SURFACE) ────────────────────── */}
        <div ref={stripRef} className="absolute inset-0 cursor-grab"
          onPointerDown={onDown} onPointerMove={onMove}
          onPointerUp={onUp} onPointerCancel={onUp} onWheel={onWheel}>

          {/* Polished Side Frames (with depth perspective, scale diminution, and dark gradient scrim) */}
          {KEYS.map((key,si) => (
            <div key={key}
              ref={el => { frameRefs.current[si] = el; }}
              onClick={() => handleFrameClick(si)}
              data-idx=""
              className="absolute top-1/2 overflow-hidden bg-[#141110] z-[4] hover:brightness-110 transition-all duration-200"
              style={{
                borderRadius:'12px',
                border:'1px solid rgba(255,255,255,0.1)',
                boxShadow:'0 24px 50px -15px rgba(0,0,0,0.85)',
                willChange:'left,opacity,transform',
              }}>
              <img alt="" className="w-full h-full object-cover pointer-events-none" draggable={false} />
              {/* Soft dark vignette gradient on background frames so central hero pops */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
              <div className="fl absolute bottom-0 inset-x-0 px-2 py-1 font-display font-medium text-[7.5px] tracking-wider uppercase truncate text-white/85"
                style={{background:'rgba(10,9,8,0.75)',backdropFilter:'blur(4px)'}} />
            </div>
          ))}

          {/* Majestic Central Aperture (TALL, BOLD, DOMINANT) */}
          <div ref={apertureRef} className="ap-el absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden z-[6]"
            style={{
              width:'clamp(320px, 36vw, 540px)',
              height:'96%',
              borderRadius:'20px',
              background:'#0d0b09',
              boxShadow:'0 45px 100px -25px rgba(0,0,0,0.95),0 0 0 1px rgba(255,255,255,0.08)',
            }}>
            {/* Seamless Physical Track */}
            <div ref={trackRef} className="flex h-full" style={{willChange:'transform'}} data-built="" />

            {/* Gradient Scrim for Legibility */}
            <div className="absolute inset-0 pointer-events-none z-[2]"
              style={{background:'linear-gradient(to top,rgba(0,0,0,0.78) 0%,rgba(0,0,0,0.15) 36%,transparent 55%)'}} />

            {/* In-Aperture Bottom Caption */}
            <div className="absolute left-5 bottom-4 z-[3] flex flex-col items-start gap-1.5 pointer-events-none">
              <span className="font-display font-extrabold text-[15px] sm:text-[16px] tracking-tight text-white"
                style={{textShadow:'0 2px 16px rgba(0,0,0,0.8)'}}>
                {vehicle.name}
              </span>
              <span className="font-mono text-[7.5px] tracking-[0.2em] uppercase text-white/95 px-2.5 py-1"
                style={{borderRadius:'4px',background:'rgba(10,9,8,0.65)',border:'1px solid rgba(255,255,255,0.16)',backdropFilter:'blur(8px)'}}>
                {galleryMode==='exterior'?'Exterior':'Interior'} · {pad2(safePhoto+1)}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* ── THUMBNAILS (FLOATING CAPSULE STRIP WITH GENEROUS SPACING) ───────── */}
      <div className="thumb-bar relative z-20 flex items-center justify-center gap-2 mt-4 sm:mt-6 px-4"
        style={{height:'44px'}}>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/[0.08]">
          {gallery.map((src,i) => (
            <button key={i} onClick={() => setPhotoIndex(i)}
              aria-label={`${galleryMode} photo ${i+1}`}
              className="flex-shrink-0 overflow-hidden transition-all duration-300 cursor-pointer"
              style={{
                width:36,height:25,borderRadius:'5px',
                backgroundImage:`url("${src}")`,backgroundSize:'cover',backgroundPosition:'center',
                boxShadow:i===safePhoto
                  ?'0 0 0 1.5px #cfa869,0 4px 14px rgba(207,168,105,0.45)'
                  :'0 0 0 1px rgba(255,255,255,0.12)',
                opacity:i===safePhoto?1:0.4,
                filter:i===safePhoto?'none':'saturate(0.65) brightness(0.75)',
                transform:i===safePhoto?'scale(1.08)':undefined,
              }} />
          ))}
        </div>
      </div>

      {/* ── FOOTER CONTROLS (SHIFTED DOWN TO BOTTOM EDGE WITH GENEROUS AIR) ─── */}
      <footer className="ctrl-bar relative z-20 grid items-center gap-4 px-6 sm:px-12 pt-4 pb-8 sm:pb-10 mt-1"
        style={{gridTemplateColumns:'1fr auto 1fr'}}>

        {/* Fleet Counter */}
        <span className="font-mono text-[10px] tracking-[0.2em] text-[#8b9096]">
          <b className="text-[#cfa869] font-medium">{pad2(safeIdx+1)}</b>
          {' '}
          <span className="text-[#5c6167]">/ {pad2(filteredVehicles.length)}</span>
        </span>

        {/* Center: Prev Arrow · Exterior/Interior Pill Toggle · Next Arrow */}
        <div className="flex items-center gap-3.5">
          <button onClick={() => stepVehicle(-1)} aria-label="Previous"
            className="w-8 h-8 rounded-full grid place-items-center font-mono text-[10px] transition-all hover:text-[#cfa869] hover:border-[#cfa869] cursor-pointer bg-white/[0.02]"
            style={{border:'1px solid rgba(255,255,255,0.14)',color:'#8b9096'}}>❮</button>

          <div className="relative flex p-[3px] rounded-full"
            style={{border:'1px solid rgba(255,255,255,0.12)',background:'rgba(255,255,255,0.04)'}}>
            <div className="absolute top-[3px] h-[calc(100%-6px)] transition-all duration-400 rounded-full"
              style={{
                left:'3px',width:'80px',
                transform:galleryMode==='interior'?'translateX(80px)':'translateX(0)',
                background:'linear-gradient(140deg,#e0bd80,#b98f45)',
                boxShadow:'0 4px 16px rgba(207,168,105,0.4)',
              }} />
            {(['exterior','interior'] as const).map(m => (
              <button key={m} onClick={() => setGalleryMode(m)}
                className="relative z-10 font-display font-bold text-[10.5px] tracking-[0.18em] uppercase transition-colors cursor-pointer text-center"
                style={{padding:'6px 0',width:'80px',borderRadius:'30px',
                  color:galleryMode===m?'#171310':'#8b9096',whiteSpace:'nowrap'}}>
                {m==='exterior'?'Exterior':'Interior'}
              </button>
            ))}
          </div>

          <button onClick={() => stepVehicle(1)} aria-label="Next"
            className="w-8 h-8 rounded-full grid place-items-center font-mono text-[10px] transition-all hover:text-[#cfa869] hover:border-[#cfa869] cursor-pointer bg-white/[0.02]"
            style={{border:'1px solid rgba(255,255,255,0.14)',color:'#8b9096'}}>❯</button>
        </div>

        {/* Capacity Passenger Filter */}
        <div className="flex items-center justify-end gap-1.5">
          <span className="font-mono text-[8px] tracking-[0.22em] uppercase text-[#5c6167] mr-1 hidden sm:block">Pax:</span>
          {caps.map(c => (
            <button key={c.id} onClick={() => setPassengerFilter(c.id)}
              className="font-mono text-[9px] tracking-widest transition-all cursor-pointer"
              style={{
                padding:'4px 11px',borderRadius:'4px',
                border:passengerFilter===c.id?'1px solid #cfa869':'1px solid rgba(255,255,255,0.1)',
                background:passengerFilter===c.id?'rgba(207,168,105,0.18)':'rgba(255,255,255,0.04)',
                color:passengerFilter===c.id?'#cfa869':'#8b9096',
                boxShadow:passengerFilter===c.id?'0 0 12px rgba(207,168,105,0.4)':undefined,
              }}>
              {c.label}
            </button>
          ))}
        </div>
      </footer>
    </section>
  );
};
