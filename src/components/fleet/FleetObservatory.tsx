// FleetObservatory.tsx — Exhibition Rail Edition
// Two navigation systems, never merged:
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

  // ----- ribbon rebuild -----
  const rebuildRibbon = useCallback(() => {
    const ap  = apertureRef.current;
    const trk = trackRef.current;
    if (!ap || !trk) return;
    const apW = ap.offsetWidth, apH = ap.offsetHeight;
    if (!apW || !apH) return;
    while (trk.firstChild) trk.removeChild(trk.firstChild);
    const vehicles = filteredVehicles;
    const ci = curIdxRef.current;
    const gm = galModeRef.current;
    const pi = photoIdxRef.current;
    vehicles.forEach((v, i) => {
      const div = document.createElement('div');
      div.style.cssText = `flex:0 0 auto;width:${apW}px;height:100%;`;
      const img = document.createElement('img');
      img.draggable = false;
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      if (i === ci) {
        const photos = gm === 'exterior' ? getExteriorPhotos(v) : getInteriorPhotos(v);
        img.src = photos[pi] ?? photos[0] ?? v.image;
      } else {
        img.src = v.image;
      }
      div.appendChild(img);
      trk.appendChild(div);
    });
  }, [filteredVehicles]);

  // ----- layout frames (called every rAF) -----
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
    const fw    = Math.min(116, Math.max(72, sw * 0.085));
    const fh    = fw * 0.63;
    const sep   = 12;
    const P     = fw + sep;
    const i     = Math.floor(pos + 1e-9);
    const f     = pos - i;

    const lp = (k: number) => apL - sep - fw - (k - 1) * P;
    const rp = (k: number) => apR + sep + k * P;

    const slots = [
      { idx: i - 2, left: lp(2) + (1-f)*P*0.15, opacity: 0.35 + 0.45*(1-f) },
      { idx: i - 1, left: lp(1) - f*P,           opacity: 0.7  + 0.3*(1-f) },
      { idx: i,     left: lp(0) + (1-f)*P,        opacity: Math.max(0.12, f) },
      { idx: i + 1, left: rp(0) - f*P,            opacity: 1 },
      { idx: i + 2, left: rp(1) - f*P,            opacity: 0.78 },
      { idx: i + 3, left: rp(2) - f*P,            opacity: 0.78 },
      { idx: i + 4, left: rp(3) - f*P,            opacity: 0.55 },
    ];

    slots.forEach(({ idx, left, opacity }, s) => {
      const el = frameRefs.current[s];
      if (!el) return;
      const valid = idx >= 0 && idx < filteredVehicles.length;
      el.dataset.idx   = String(idx);
      el.style.width   = `${fw}px`;
      el.style.height  = `${fh}px`;
      el.style.cursor  = valid ? 'pointer' : 'default';
      if (!valid) { el.style.opacity = '0'; el.style.pointerEvents = 'none'; return; }
      el.style.pointerEvents = 'auto';
      el.style.left    = `${left}px`;
      el.style.opacity = String(Math.min(1, Math.max(0, opacity)).toFixed(3));
      const v = filteredVehicles[idx];
      const imgEl = el.querySelector('img') as HTMLImageElement|null;
      if (imgEl && imgEl.dataset.src !== v.image) { imgEl.src = v.image; imgEl.dataset.src = v.image; }
      const label = el.querySelector('.fl') as HTMLElement|null;
      if (label) label.textContent = v.name;
    });

    if (apW > 0) trk.style.transform = `translate3d(${(-pos*apW).toFixed(2)}px,0,0)`;
  }, [filteredVehicles]);

  // ----- animation loop -----
  useEffect(() => {
    const vehicles = filteredVehicles;
    let last = -1;
    const tick = () => {
      if (!dragging.current) {
        posRef.current += (targetRef.current - posRef.current) * 0.12;
        if (Math.abs(targetRef.current - posRef.current) < 0.0005) posRef.current = targetRef.current;
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

  // resize → invalidate ribbon
  useEffect(() => {
    const ro = new ResizeObserver(() => { ribbonKey.current = ''; });
    if (apertureRef.current) ro.observe(apertureRef.current);
    return () => ro.disconnect();
  }, []);

  // ----- navigation -----
  const selectVehicle = useCallback((idx: number) => {
    const c = Math.max(0, Math.min(filteredVehicles.length - 1, idx));
    setCurrentIndex(c); targetRef.current = c; posRef.current = c;
    setPhotoIndex(0); setDetailsOpen(false);
  }, [filteredVehicles.length]);

  const stepVehicle = useCallback((dir: number) => {
    const next = Math.max(0, Math.min(filteredVehicles.length - 1, curIdxRef.current + dir));
    setCurrentIndex(next); targetRef.current = next;
    setPhotoIndex(0); setDetailsOpen(false);
  }, [filteredVehicles.length]);

  // ----- drag -----
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
    targetRef.current = Math.max(-0.3, Math.min(filteredVehicles.length - 0.7, dragBase.current - dx/130));
    posRef.current = targetRef.current;
  }, [filteredVehicles.length]);

  const onUp = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    (e.currentTarget as HTMLElement).style.cursor = 'grab';
    const proj = targetRef.current - (vel.current*100)/130;
    targetRef.current = Math.max(0, Math.min(filteredVehicles.length - 1, Math.round(proj)));
  }, [filteredVehicles.length]);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    targetRef.current = Math.max(0, Math.min(filteredVehicles.length - 1, targetRef.current + d*0.006));
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
      className="w-full bg-[#0d0b09] text-[#f3f4f6] relative overflow-hidden select-none"
      style={{ minHeight: 'calc(100vh - 66px)' }}
    >
      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-10"
        style={{background:'radial-gradient(115% 85% at 50% 45%,transparent 55%,rgba(0,0,0,0.55) 100%)'}} />

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="relative z-20 flex items-start justify-between px-5 sm:px-10 pt-5 pb-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline gap-2.5">
            <span className="font-display font-bold text-[15px] tracking-[0.22em] uppercase">FBGH</span>
            <span className="font-mono text-[7px] tracking-[0.22em] uppercase text-[#5c6167]">Luxury Transportation</span>
          </div>
          <span className="font-mono text-[7px] tracking-[0.22em] uppercase text-[#5c6167]">Fleet Exhibition — Collection Gallery</span>
        </div>

        <nav className="flex items-center gap-5 sm:gap-7 pt-1">
          {cats.map(c => (
            <button key={c.id} onClick={() => setSelectedCategory(c.id)}
              className={`relative font-display font-semibold text-[10.5px] tracking-[0.2em] uppercase pb-0.5 transition-colors ${
                selectedCategory===c.id ? 'text-[#cfa869]' : 'text-[#8b9096] hover:text-[#f3f4f6]'}`}>
              {c.label}
              {selectedCategory===c.id && <span className="absolute left-0 right-0 bottom-0 h-px bg-[#cfa869]" />}
            </button>
          ))}
        </nav>
      </header>

      {/* ── STAGE ──────────────────────────────────────────────────────────── */}
      <main className="relative z-20" style={{height:'clamp(300px,54vh,620px)'}}>

        {/* Class tag */}
        <div className="absolute top-1 right-5 sm:right-10 z-30 font-mono text-[7.5px] tracking-[0.24em] uppercase text-[#cfa869] opacity-75 pointer-events-none">
          {vehicle.categoryLabel}
        </div>

        {/* ── INFO CARD ─────────────────────────────────────────────────── */}
        <aside className="info-card absolute left-4 sm:left-8 z-40 flex flex-col gap-3"
          style={{
            top:'50%',transform:'translateY(-50%)',
            width:'clamp(174px,16vw,214px)',
            background:'rgba(14,12,10,0.82)',backdropFilter:'blur(18px)',
            WebkitBackdropFilter:'blur(18px)',
            border:'1px solid rgba(255,255,255,0.09)',borderRadius:'12px',
            padding:'18px 16px',boxShadow:'0 30px 60px -20px rgba(0,0,0,0.92)',
          }}>
          <h2 className="font-display font-bold text-[16px] leading-tight text-center text-[#f3f4f6] tracking-tight">
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
                <b className={`block font-display font-semibold text-[#f3f4f6] ${sm?'text-[9px] uppercase truncate':'text-[15px]'}`}>{val}</b>
                <span className="font-mono text-[6.5px] tracking-[0.16em] uppercase text-[#5c6167]">{l}</span>
              </div>
            ))}
          </div>

          <button onClick={() => setDetailsOpen(o=>!o)} aria-expanded={detailsOpen}
            className="flex items-center justify-between w-full font-mono text-[7.5px] tracking-[0.2em] uppercase text-[#cfa869] py-0.5 hover:brightness-110 transition-all">
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
                  <span className="font-mono text-[6.5px] tracking-[0.14em] uppercase text-[#5c6167] flex-shrink-0 mt-0.5">FOR</span>
                  <b className="font-sans font-medium text-[8.5px] text-[#f3f4f6] text-right leading-tight">{item}</b>
                </li>
              ))}
              <li className="flex items-start justify-between gap-1.5 pb-1.5"
                style={{borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                <span className="font-mono text-[6.5px] tracking-[0.14em] uppercase text-[#5c6167] flex-shrink-0 mt-0.5">AUDIO</span>
                <b className="font-sans font-medium text-[8.5px] text-[#f3f4f6] text-right leading-tight">{vehicle.specs.soundSystem}</b>
              </li>
              {vehicle.specs.wifi && (
                <li className="flex items-start justify-between gap-1.5">
                  <span className="font-mono text-[6.5px] tracking-[0.14em] uppercase text-[#5c6167]">WI-FI</span>
                  <b className="font-sans font-medium text-[8.5px] text-[#f3f4f6]">ONBOARD</b>
                </li>
              )}
            </ul>
          </div>

          <button onClick={() => onBookVehicle(vehicle)}
            className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded font-display font-semibold text-[9px] tracking-[0.22em] uppercase transition-all hover:brightness-110 hover:-translate-y-px"
            style={{background:'linear-gradient(140deg,#dcb877,#c09a4f)',color:'#171310'}}>
            Request Vehicle <ArrowUpRight className="w-2.5 h-2.5" />
          </button>
        </aside>

        {/* ── DRAG STRIP ────────────────────────────────────────────────── */}
        <div ref={stripRef} className="absolute inset-0 cursor-grab"
          onPointerDown={onDown} onPointerMove={onMove}
          onPointerUp={onUp} onPointerCancel={onUp} onWheel={onWheel}>

          {/* Side frames */}
          {KEYS.map((key,si) => (
            <div key={key}
              ref={el => { frameRefs.current[si] = el; }}
              onClick={() => handleFrameClick(si)}
              data-idx=""
              className="absolute top-1/2 -translate-y-1/2 overflow-hidden bg-[#141110] z-[4] hover:brightness-110"
              style={{borderRadius:'8px',boxShadow:'0 18px 40px -18px rgba(0,0,0,0.8)',willChange:'left,opacity',transition:'opacity 0.08s linear'}}>
              <img alt="" className="w-full h-full object-cover pointer-events-none" draggable={false} />
              <div className="fl absolute bottom-0 inset-x-0 px-1.5 py-0.5 font-mono text-[6px] tracking-wider uppercase truncate text-white/70"
                style={{background:'rgba(10,9,8,0.82)'}} />
            </div>
          ))}

          {/* Aperture */}
          <div ref={apertureRef} className="ap-el absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden z-[6]"
            style={{
              width:'clamp(200px,34%,500px)',height:'92%',borderRadius:'14px',
              background:'#0d0b09',
              boxShadow:'0 40px 90px -30px rgba(0,0,0,0.95),0 0 0 1px rgba(255,255,255,0.08)',
            }}>
            {/* Ribbon */}
            <div ref={trackRef} className="flex h-full" style={{willChange:'transform'}} data-built="" />

            {/* Gradient */}
            <div className="absolute inset-0 pointer-events-none z-[2]"
              style={{background:'linear-gradient(to top,rgba(0,0,0,0.72) 0%,transparent 44%)'}} />

            {/* Caption */}
            <div className="absolute left-4 bottom-3.5 z-[3] flex flex-col items-start gap-1.5 pointer-events-none">
              <span className="font-display font-semibold text-[13px] tracking-tight text-white"
                style={{textShadow:'0 2px 14px rgba(0,0,0,0.7)'}}>
                {vehicle.name}
              </span>
              <span className="font-mono text-[7px] tracking-[0.18em] uppercase text-white/90 px-2 py-0.5"
                style={{borderRadius:'3px',background:'rgba(10,9,8,0.55)',border:'1px solid rgba(255,255,255,0.14)',backdropFilter:'blur(6px)'}}>
                {galleryMode==='exterior'?'Exterior':'Interior'} · {pad2(safePhoto+1)}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* ── THUMBNAILS ─────────────────────────────────────────────────────── */}
      <div className="thumb-bar relative z-20 flex items-center justify-center gap-2.5 overflow-x-auto no-scrollbar"
        style={{height:'52px',padding:'0 10px'}}>
        {gallery.map((src,i) => (
          <button key={i} onClick={() => setPhotoIndex(i)}
            aria-label={`${galleryMode} photo ${i+1}`}
            className="flex-shrink-0 overflow-hidden transition-all duration-200"
            style={{
              width:38,height:27,borderRadius:'6px',
              backgroundImage:`url("${src}")`,backgroundSize:'cover',backgroundPosition:'center',
              boxShadow:i===safePhoto
                ?'0 0 0 1.5px #cfa869,0 6px 18px rgba(207,168,105,0.35)'
                :'0 0 0 1px rgba(255,255,255,0.14),0 4px 12px rgba(0,0,0,0.55)',
              opacity:i===safePhoto?1:0.45,
              filter:i===safePhoto?'none':'saturate(0.65) brightness(0.75)',
              transform:i===safePhoto?'scale(1.06)':undefined,
            }} />
        ))}
      </div>

      {/* ── FOOTER CONTROLS ────────────────────────────────────────────────── */}
      <footer className="ctrl-bar relative z-20 grid items-center gap-4 px-5 sm:px-10 pb-6 pt-1"
        style={{gridTemplateColumns:'1fr auto 1fr'}}>

        {/* Counter */}
        <span className="font-mono text-[9.5px] tracking-[0.18em] text-[#8b9096]">
          <b className="text-[#cfa869] font-medium">{pad2(safeIdx+1)}</b>
          {' '}
          <span className="text-[#5c6167]">/ {pad2(filteredVehicles.length)}</span>
        </span>

        {/* Prev · toggle · Next */}
        <div className="flex items-center gap-3">
          <button onClick={() => stepVehicle(-1)} aria-label="Previous"
            className="w-7 h-7 rounded-full grid place-items-center font-mono text-[10px] transition-all hover:text-[#cfa869]"
            style={{border:'1px solid rgba(255,255,255,0.14)',color:'#8b9096'}}>❮</button>

          <div className="relative flex"
            style={{padding:'3px',borderRadius:'30px',border:'1px solid rgba(255,255,255,0.1)',background:'rgba(255,255,255,0.03)'}}>
            <div className="absolute top-[3px] h-[calc(100%-6px)] transition-all duration-420"
              style={{left:'3px',width:'76px',borderRadius:'30px',
                transform:galleryMode==='interior'?'translateX(76px)':'translateX(0)',
                background:'linear-gradient(140deg,#e0bd80,#b98f45)',
                boxShadow:'0 4px 14px rgba(207,168,105,0.35)'}} />
            {(['exterior','interior'] as const).map(m => (
              <button key={m} onClick={() => setGalleryMode(m)}
                className="relative z-10 font-display font-semibold text-[10.5px] tracking-[0.16em] uppercase transition-colors"
                style={{padding:'5px 0',width:'76px',borderRadius:'30px',
                  color:galleryMode===m?'#171310':'#8b9096',whiteSpace:'nowrap'}}>
                {m==='exterior'?'Exterior':'Interior'}
              </button>
            ))}
          </div>

          <button onClick={() => stepVehicle(1)} aria-label="Next"
            className="w-7 h-7 rounded-full grid place-items-center font-mono text-[10px] transition-all hover:text-[#cfa869]"
            style={{border:'1px solid rgba(255,255,255,0.14)',color:'#8b9096'}}>❯</button>
        </div>

        {/* Capacity filter */}
        <div className="flex items-center justify-end gap-1.5">
          <span className="font-mono text-[7.5px] tracking-[0.2em] uppercase text-[#5c6167] mr-1 hidden sm:block">Pax:</span>
          {caps.map(c => (
            <button key={c.id} onClick={() => setPassengerFilter(c.id)}
              className="font-mono text-[9px] tracking-widest transition-all"
              style={{
                padding:'4px 10px',borderRadius:'4px',
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
