import React, { useState, useEffect, useRef } from 'react';
import {
  Users,
  Briefcase,
  Fuel,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Shield,
  Phone,
  Images
} from 'lucide-react';
import { FLEET_DATA, type Vehicle } from '../../data/fleetData';

export interface FleetObservatoryProps {
  onBookVehicle?: (vehicle: Vehicle) => void;
  onOpenBooking?: () => void;
}

export interface ShowcaseCar {
  vehicleId: string;
  brand: string;
  model: string;
  subModel: string;
  mpg: string;
  description: string;
  exteriorPhoto: string;
  interiorPhoto: string;
  thumbImg: string;
}

export type CategoryId = 'all' | 'suv' | 'sedan' | 'van';

export interface CategoryOption {
  id: CategoryId;
  label: string;
}

export const CATEGORIES: CategoryOption[] = [
  { id: 'all', label: 'ALL VEHICLES' },
  { id: 'suv', label: 'SUVS' },
  { id: 'sedan', label: 'SEDANS' },
  { id: 'van', label: 'VANS' },
];

export const CATEGORY_CARS: Record<CategoryId, ShowcaseCar[]> = {
  all: [
    {
      vehicleId: 'cadillac-escalade-esv',
      brand: 'CADILLAC',
      model: 'ESCALADE',
      subModel: 'ESV',
      mpg: 'UP TO 21 MPG',
      description: 'Full-size luxury SUV with commanding presence and generous luggage space. Smooth ride and quiet comfort for up to 6 passengers.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'kia-carnival-vip',
      brand: 'KIA',
      model: 'CARNIVAL',
      subModel: 'VIP',
      mpg: 'UP TO 26 MPG',
      description: 'Executive passenger travel with reclining captain chairs, power footrests, and quiet privacy for up to 6 passengers.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'mercedes-maybach-gls600',
      brand: 'MERCEDES-BENZ',
      model: 'MAYBACH',
      subModel: 'GLS 600',
      mpg: 'UP TO 20 MPG',
      description: 'Ultra-luxury 4-passenger SUV featuring executive rear massage seating, private climate controls, and whisper-quiet ride quality.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'mercedes-sprinter-jet-edition',
      brand: 'MERCEDES-BENZ',
      model: 'SPRINTER',
      subModel: 'JET EDITION',
      mpg: 'UP TO 19 MPG',
      description: 'First-class luxury van for groups and families of up to 8 passengers. High ceiling, leather captain chairs, and ample luggage room.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'mercedes-s-class-s580',
      brand: 'MERCEDES-BENZ',
      model: 'S-CLASS',
      subModel: 'S 580',
      mpg: 'UP TO 25 MPG',
      description: 'The global benchmark for executive sedans. Acoustic isolation, massaging rear seats, and serene ride quality for 3 passengers.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'rolls-royce-cullinan-black-badge',
      brand: 'ROLLS-ROYCE',
      model: 'CULLINAN',
      subModel: 'BLACK BADGE',
      mpg: 'UP TO 14 MPG',
      description: 'Handcrafted British grand SUV offering effortless power, bespoke leather interior, and an incomparable magic carpet ride.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=600&auto=format&fit=crop',
    },
  ],
  suv: [
    {
      vehicleId: 'cadillac-escalade-esv',
      brand: 'CADILLAC',
      model: 'ESCALADE',
      subModel: 'ESV',
      mpg: 'UP TO 21 MPG',
      description: 'Full-size luxury SUV with commanding presence and generous luggage space. Smooth ride and quiet comfort for up to 6 passengers.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'mercedes-maybach-gls600',
      brand: 'MERCEDES-BENZ',
      model: 'MAYBACH',
      subModel: 'GLS 600',
      mpg: 'UP TO 20 MPG',
      description: 'Ultra-luxury 4-passenger SUV featuring executive rear massage seating, private climate controls, and whisper-quiet ride quality.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'range-rover-sv-long',
      brand: 'RANGE ROVER',
      model: 'AUTOBIOGRAPHY',
      subModel: 'SV LWB',
      mpg: 'UP TO 22 MPG',
      description: 'Extended wheelbase sanctuary featuring power deployable club tables, active noise cancellation, and handcrafted British poise.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1541348263662-e0c86629c983?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1541348263662-e0c86629c983?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'lincoln-navigator-black-label',
      brand: 'LINCOLN',
      model: 'NAVIGATOR L',
      subModel: 'BLACK LABEL',
      mpg: 'UP TO 20 MPG',
      description: 'American grandeur with 30-way Perfect Position massage seating, panoramic glass, and colossal luggage capacity for 6 guests.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'bmw-x7-m60i',
      brand: 'BMW',
      model: 'X7',
      subModel: 'M60i LUXURY',
      mpg: 'UP TO 21 MPG',
      description: 'Full-size 3-row presence with captain chairs, Bowers & Wilkins Diamond surround sound, and panoramic LED Sky Lounge ceiling.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'lexus-lx600-vip',
      brand: 'LEXUS',
      model: 'LX 600',
      subModel: 'VIP ULTRA LUXURY',
      mpg: 'UP TO 19 MPG',
      description: '4-seat bespoke configuration with rear ottoman recliner, Takumi leather craftsmanship, and whisper-quiet hydraulic suspension.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop',
    },
  ],
  sedan: [
    {
      vehicleId: 'mercedes-s-class-s580',
      brand: 'MERCEDES-BENZ',
      model: 'S-CLASS',
      subModel: 'S 580',
      mpg: 'UP TO 25 MPG',
      description: 'The global benchmark for executive sedans. Acoustic isolation, massaging rear seats, and serene ride quality for 3 passengers.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'rolls-royce-ghost-extended',
      brand: 'ROLLS-ROYCE',
      model: 'GHOST',
      subModel: 'EXTENDED',
      mpg: 'UP TO 15 MPG',
      description: 'Planar magic carpet ride, Shooting Star headliner, double-glazed acoustic glass, and supreme silence for VIP arrivals.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'bmw-760i-xdrive',
      brand: 'BMW',
      model: '760i',
      subModel: 'xDRIVE THEATRE',
      mpg: 'UP TO 24 MPG',
      description: 'Groundbreaking 31.3-inch 8K Theatre Screen dropping from the roof, Bowers & Wilkins audio, and automatic closing doors.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'bentley-flying-spur',
      brand: 'BENTLEY',
      model: 'FLYING SPUR',
      subModel: 'MULLINER',
      mpg: 'UP TO 22 MPG',
      description: 'Diamond quilted leather, rotating central dashboard, Naim 2200W audiophile sound, and supreme grand touring comfort.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'audi-a8-l-horch',
      brand: 'AUDI',
      model: 'A8 L',
      subModel: 'HORCH EDITION',
      mpg: 'UP TO 26 MPG',
      description: 'Understated German precision with rear foot massage warming function, predictive active suspension, and Valcona leather.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'genesis-g90-long-wheelbase',
      brand: 'GENESIS',
      model: 'G90',
      subModel: 'LONG WHEELBASE',
      mpg: 'UP TO 24 MPG',
      description: 'Mood Curator aromatherapy, Bang & Olufsen 3D sound, independent heated footrests, and effortless power-assisted doors.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=600&auto=format&fit=crop',
    },
  ],
  van: [
    {
      vehicleId: 'mercedes-sprinter-jet-edition',
      brand: 'MERCEDES-BENZ',
      model: 'SPRINTER',
      subModel: 'JET EDITION',
      mpg: 'UP TO 19 MPG',
      description: 'First-class luxury van for groups and families of up to 8 passengers. High ceiling, leather captain chairs, and ample luggage room.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'kia-carnival-vip',
      brand: 'KIA',
      model: 'CARNIVAL',
      subModel: 'VIP',
      mpg: 'UP TO 26 MPG',
      description: 'Executive passenger travel with reclining captain chairs, power footrests, and quiet privacy for up to 6 passengers.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'mercedes-sprinter-executive-14',
      brand: 'MERCEDES-BENZ',
      model: 'SPRINTER',
      subModel: 'EXECUTIVE 14',
      mpg: 'UP TO 18 MPG',
      description: 'Stand-up walk-in cabin with bespoke leather recliners, individual USB-C ports, and massive luggage space for up to 14 guests.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'mercedes-v-class-avantgarde',
      brand: 'MERCEDES-BENZ',
      model: 'V-CLASS',
      subModel: 'AVANTGARDE',
      mpg: 'UP TO 27 MPG',
      description: 'European diplomatic shuttle with conference seating, folding work tables, and smooth 4MATIC all-weather confidence for 7 guests.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'mercedes-sprinter-mobile-boardroom',
      brand: 'MERCEDES-BENZ',
      model: 'SPRINTER',
      subModel: 'BOARDROOM',
      mpg: 'UP TO 18 MPG',
      description: 'Rolling headquarters equipped with secure high-speed Wi-Fi, dual 43-inch 4K displays, privacy partition, and espresso bar for 10.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=600&auto=format&fit=crop',
    },
    {
      vehicleId: 'cadillac-escalade-esv',
      brand: 'CADILLAC',
      model: 'ESCALADE',
      subModel: 'ESV 6-PASS',
      mpg: 'UP TO 21 MPG',
      description: 'Executive family and group transport alternative offering massive cabin volume, acoustic comfort, and generous luggage capacity.',
      exteriorPhoto: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop',
      interiorPhoto: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
      thumbImg: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop',
    },
  ],
};

// Backwards compatibility export
export const SHOWCASE_CARS: ShowcaseCar[] = CATEGORY_CARS.all;

export const FleetObservatory: React.FC<FleetObservatoryProps> = ({ onBookVehicle }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [activeIdx, setActiveIdx] = useState(0);
  const [photoMode, setPhotoMode] = useState<'exterior' | 'interior'>('exterior');
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);
  const [lightboxVehicle, setLightboxVehicle] = useState<Vehicle | null>(null);

  const mainImgRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const cars = CATEGORY_CARS[selectedCategory] || CATEGORY_CARS.all;
  const showcase = cars[activeIdx] || cars[0];
  const vehicle = FLEET_DATA.find((v) => v.id === showcase.vehicleId) || FLEET_DATA[0];

  // 3 stacked photos synced with the active photoMode
  const exteriorPhotos = (vehicle.exteriorGallery && vehicle.exteriorGallery.length >= 3)
    ? vehicle.exteriorGallery.slice(0, 3)
    : [showcase.exteriorPhoto, vehicle.image, showcase.thumbImg];

  const interiorPhotos = (vehicle.interiorGallery && vehicle.interiorGallery.length >= 3)
    ? vehicle.interiorGallery.slice(0, 3)
    : [showcase.interiorPhoto, vehicle.interiorImage, showcase.interiorPhoto];

  const activePhotoList = photoMode === 'exterior' ? exteriorPhotos : interiorPhotos;
  const currentPhoto = activePhotoList[selectedPhotoIdx] || activePhotoList[0];

  // Reset indices when changing category or car
  const handleCategoryChange = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActiveIdx(0);
    setPhotoMode('exterior');
    setSelectedPhotoIdx(0);
  };

  useEffect(() => {
    setPhotoMode('exterior');
    setSelectedPhotoIdx(0);
  }, [activeIdx, selectedCategory]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxVehicle && e.key === 'Escape') setLightboxVehicle(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxVehicle]);

  // Keep carousel item in view when activeIdx changes
  useEffect(() => {
    if (!carouselContainerRef.current) return;
    const activeBtn = carouselContainerRef.current.querySelector(`[data-carousel-idx="${activeIdx}"]`) as HTMLElement | null;
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIdx]);

  const prev = () => setActiveIdx((i) => (i === 0 ? cars.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === cars.length - 1 ? 0 : i + 1));

  const openModal = () => setLightboxVehicle(vehicle);

  return (
    <section className="w-full bg-[#0E0C0A] min-h-screen flex flex-col justify-center px-5 sm:px-10 lg:px-14 py-8 lg:py-14 box-border">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between my-auto gap-6 lg:gap-8">

        {/* ── TOP BAR: CATEGORIES (TOP LEFT) & FAST SPECS (TOP RIGHT ON DESKTOP) ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          
          {/* CATEGORIES PILLS */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#C5A059] uppercase font-bold mr-1 hidden sm:inline">
              CATEGORY:
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-[10.5px] sm:text-xs font-mono tracking-widest uppercase transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#C5A059] text-[#0E0C0A] font-bold shadow-[0_0_15px_rgba(197,160,89,0.35)] scale-[1.02]'
                      : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* QUICK TOP SPECS COUNTER (PASSENGERS & LUGGAGE) */}
          <div className="hidden sm:flex items-center gap-6 text-white/80 text-xs font-mono">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#C5A059]" />
              <span className="text-white font-bold">{vehicle.passengers} PASS.</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#C5A059]" />
              <span className="text-white font-bold">{vehicle.luggage} BAGS</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="w-4 h-4 text-[#C5A059]" />
              <span className="text-white font-bold">{showcase.mpg}</span>
            </div>
          </div>
        </div>

        {/* ── TWO-COLUMN SHOWCASE ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1">

          {/* LEFT: vehicle info */}
          <div className="lg:col-span-4 space-y-5 text-[#F4EDE4]">
            
            {/* BRAND NAME: BIG AND BOLD */}
            <div className="flex items-center gap-3">
              <span className="w-6 h-[2px] bg-[#C5A059]" />
              <span className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#C5A059] tracking-wider uppercase leading-none">
                {showcase.brand}
              </span>
            </div>

            {/* CAR MODEL: ALL IN PURE WHITE */}
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-none flex items-baseline gap-3 flex-wrap">
                <span>{showcase.model}</span>
                {showcase.subModel && (
                  <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white/80 font-light uppercase">
                    {showcase.subModel}
                  </span>
                )}
              </h2>
            </div>

            {/* NATURAL, DOWN-TO-EARTH DESCRIPTION */}
            <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-md font-light">
              {showcase.description}
            </p>

            {/* EVEN BIGGER SPEC ICONS */}
            <div className="flex items-center gap-6 sm:gap-7 pt-2 text-white">
              <div className="flex items-center gap-2.5">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-[#C5A059] flex-shrink-0" />
                <span className="font-mono text-xs sm:text-sm uppercase tracking-wider font-bold text-white">
                  {vehicle.passengers} PASS.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-[#C5A059] flex-shrink-0" />
                <span className="font-mono text-xs sm:text-sm uppercase tracking-wider font-bold text-white">
                  {vehicle.luggage} BAGS
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Fuel className="w-6 h-6 sm:w-7 sm:h-7 text-[#C5A059] flex-shrink-0" />
                <span className="font-mono text-xs sm:text-sm uppercase tracking-wider font-bold text-white">
                  {showcase.mpg}
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT: photo area */}
          <div className="lg:col-span-8 flex flex-col gap-3.5">

            {/* Main photo + 3 stacked thumbnails side by side, equal height */}
            <div className="flex gap-3 sm:gap-4" style={{ height: 'clamp(280px, 42vh, 480px)' }}>

              {/* Main Photo */}
              <div
                ref={mainImgRef}
                className="flex-1 rounded-2xl overflow-hidden relative group bg-black/20 border border-white/10 shadow-2xl"
              >
                <img
                  src={currentPhoto}
                  alt={vehicle.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                {/* View mode label */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white/90 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase bg-black/50 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md border border-white/10">
                  {photoMode === 'exterior' ? 'EXTERIOR' : 'INTERIOR CABIN'}
                </div>
              </div>

              {/* 3 stacked thumbnails — synced with exterior/interior and equal height via flex column */}
              <div className="w-24 sm:w-36 lg:w-44 flex flex-col gap-2 sm:gap-2.5 h-full">
                {activePhotoList.map((photoUrl, pIdx) => {
                  const isSelected = selectedPhotoIdx === pIdx;
                  return (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setSelectedPhotoIdx(pIdx)}
                      className={`flex-1 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C5A059] ring-2 ring-[#C5A059]/50 scale-[1.02] opacity-100 shadow-md'
                          : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={photoUrl}
                        alt={`${photoMode === 'exterior' ? 'Exterior' : 'Interior'} view ${pIdx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BUTTON BAR: EXTERIOR, INTERIOR, AND VIEW GALLERY WITH IMAGES ICON */}
            <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPhotoMode('exterior');
                    setSelectedPhotoIdx(0);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wider uppercase transition-all cursor-pointer ${photoMode === 'exterior' ? 'bg-[#F4EDE4] text-[#141416] font-bold shadow-md' : 'bg-white/5 hover:bg-white/10 text-white/60'}`}
                >
                  EXTERIOR
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhotoMode('interior');
                    setSelectedPhotoIdx(0);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-mono tracking-wider uppercase transition-all cursor-pointer ${photoMode === 'interior' ? 'bg-[#F4EDE4] text-[#141416] font-bold shadow-md' : 'bg-white/5 hover:bg-white/10 text-white/60'}`}
                >
                  INTERIOR
                </button>
                
                {/* VIEW GALLERY BUTTON (WITH IMAGES ICON) */}
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center gap-2 bg-[#C5A059] hover:bg-[#B38D45] text-white px-3.5 py-1.5 rounded-lg text-[11px] font-mono tracking-wider uppercase transition-all shadow-md cursor-pointer ml-1"
                >
                  <Images className="w-3.5 h-3.5 text-white" />
                  <span>VIEW GALLERY</span>
                </button>
              </div>

              <button
                type="button"
                onClick={openModal}
                className="text-xs font-mono tracking-wider uppercase text-[#967C52] hover:text-[#C5A059] inline-flex items-center gap-2 cursor-pointer transition-colors"
              >
                <span>FULL SPECS</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>

        {/* ── VEHICLE CAROUSEL: 2 CARS ON MOBILE, 4 ON PC, HORIZONTAL CAROUSEL ── */}
        <div className="flex gap-2.5 sm:gap-4 pt-1 items-stretch">
          <div
            ref={carouselContainerRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth flex-1 py-1"
          >
            {cars.map((s, idx) => {
              const v = FLEET_DATA.find((f) => f.id === s.vehicleId) || FLEET_DATA[0];
              const isActive = idx === activeIdx;
              return (
                <button
                  key={`${selectedCategory}-${idx}`}
                  data-carousel-idx={idx}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`relative flex-shrink-0 w-[calc(50%-6px)] sm:w-[calc(25%-12px)] rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 group text-left ${
                    isActive
                      ? 'border-[#C5A059] ring-2 ring-[#C5A059]/40 scale-[1.02] shadow-xl'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                  style={{ height: 'clamp(125px, 16vh, 160px)' }}
                >
                  <img
                    src={s.thumbImg}
                    alt={s.model}
                    className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-all duration-300"
                    style={{ filter: 'none' }}
                  />
                  {/* Subtle dark gradient only behind the bottom text so cars stay clear & colorful */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3">
                    <p className="font-display font-bold text-xs sm:text-sm text-white tracking-tight leading-tight truncate">
                      {s.model} {s.subModel ? s.subModel : ''}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-[#C5A059] font-mono tracking-wider uppercase opacity-90 truncate">
                      {s.brand} · {v.passengers} PASS
                    </p>
                  </div>
                  {isActive && (
                    <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#C5A059] shadow-sm" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Prev/Next arrows */}
          <div className="flex flex-col gap-2 justify-center flex-shrink-0">
            <button
              type="button"
              onClick={prev}
              className="w-8 sm:w-9 h-[56px] rounded-lg border border-white/15 hover:border-[#C5A059] text-white/60 hover:text-[#C5A059] flex items-center justify-center transition-all cursor-pointer bg-white/5 hover:bg-white/10"
              aria-label="Previous vehicle"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={next}
              className="w-8 sm:w-9 h-[56px] rounded-lg border border-white/15 hover:border-[#C5A059] text-white/60 hover:text-[#C5A059] flex items-center justify-center transition-all cursor-pointer bg-white/5 hover:bg-white/10"
              aria-label="Next vehicle"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ── VEHICLE DETAIL MODAL ─────────────────────────────────────────────── */}
      {lightboxVehicle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setLightboxVehicle(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-[#111114] border border-[#C5A059]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold">VEHICLE DETAILS</span>
                <span className="text-white/20">·</span>
                <span className="text-xs text-white/70 font-mono">{lightboxVehicle.categoryLabel}</span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxVehicle(null)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:border-[#C5A059] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/40 border border-white/10">
                <img src={lightboxVehicle.image} alt={lightboxVehicle.name} className="w-full h-full object-cover" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">{lightboxVehicle.name}</h3>
                <p className="text-xs text-[#C5A059] font-mono tracking-widest uppercase">{lightboxVehicle.tagline}</p>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed pt-1">{lightboxVehicle.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/10 text-xs font-mono text-white/80">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C5A059]" />
                  <span>{lightboxVehicle.passengers} PASSENGERS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#C5A059]" />
                  <span>{lightboxVehicle.luggage} LUGGAGE</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#C5A059]" />
                  <span>SANITIZED</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold block">FEATURES</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/70">
                  {lightboxVehicle.features.slice(0, 6).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-black/40 text-xs">
              <button
                type="button"
                onClick={() => setLightboxVehicle(null)}
                className="text-white/60 hover:text-white font-mono tracking-wider uppercase cursor-pointer"
              >
                CLOSE
              </button>
              {onBookVehicle ? (
                <button
                  type="button"
                  onClick={() => {
                    setLightboxVehicle(null);
                    onBookVehicle(lightboxVehicle);
                  }}
                  className="inline-flex items-center gap-2 text-[#C5A059] hover:underline font-mono tracking-wider uppercase cursor-pointer"
                >
                  <span>SELECT THIS VEHICLE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <a
                  href="tel:2676424616"
                  className="inline-flex items-center gap-2 text-[#C5A059] hover:underline font-mono tracking-wider uppercase cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>(267) 642-4616</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
