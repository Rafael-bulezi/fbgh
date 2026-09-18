export interface Vehicle {
  id: string;
  name: string;
  tagline: string;
  category: 'suv' | 'van' | 'sedan' | 'executive' | 'electric';
  categoryLabel: string;
  class: string;
  passengers: number;
  luggage: number;
  transmission?: string;
  drivetrain?: string;
  image: string;
  interiorImage: string;
  exteriorGallery?: string[];
  interiorGallery?: string[];
  description: string;
  idealFor: string[];
  features: string[];
  specs: {
    engine?: string;
    wifi: boolean;
    soundSystem: string;
    privacyPartition?: boolean;
    massageSeats?: boolean;
    refreshmentCenter?: boolean;
    workTables?: boolean;
  };
  hourlyRate: number;
  mileageRate: number;
  featured?: boolean;
}

export const FLEET_DATA: Vehicle[] = [
  {
    id: 'kia-carnival-vip',
    name: 'KIA CARNIVAL VIP',
    tagline: 'Refined Executive Multi-Passenger Sanctuary',
    category: 'suv',
    categoryLabel: 'Luxury SUV / VIP Lounge',
    class: 'EXECUTIVE SUV',
    passengers: 6,
    luggage: 4,
    transmission: 'Automatic',
    drivetrain: 'FWD / AWD',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Engineered for executive privacy and effortless long-distance poise. Features reclining captain chairs with power ottomans, acoustic isolation, and dedicated onboard connectivity.',
    idealFor: ['Corporate Roadshows', 'Airport Group Transfers', 'Executive Family Travel'],
    features: ['Reclining VIP Ottoman Seats', 'Dual Sunroofs', 'Encrypted High-Speed Wi-Fi', 'Bose Premium Audio', 'Privacy Shades'],
    specs: {
      wifi: true,
      soundSystem: 'Bose Surround 12-Speaker',
      massageSeats: true,
      refreshmentCenter: true,
      workTables: true
    },
    hourlyRate: 125,
    mileageRate: 3.85,
    featured: true
  },
  {
    id: 'cadillac-escalade-esv',
    name: 'CADILLAC ESCALADE ESV',
    tagline: 'The Undisputed Icon of American Chauffeur Luxury',
    category: 'suv',
    categoryLabel: 'Luxury SUV',
    class: 'ULTRA LUXURY SUV',
    passengers: 6,
    luggage: 6,
    transmission: '10-Speed Auto',
    drivetrain: '4WD',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Extended wheelbase commanding stature with full semi-aniline leather seating, AKG Studio Reference 36-speaker sound architecture, and colossal rear luggage volume.',
    idealFor: ['Diplomatic & VIP Delegations', 'Heavy Luggage Airport Transfers', 'Red Carpet Arrivals'],
    features: ['Extended Wheelbase Cargo', 'AKG 36-Speaker Audio', 'OLED Curved Cockpit', 'Tri-Zone Climate Control', 'Chilled Console Cooler'],
    specs: {
      wifi: true,
      soundSystem: 'AKG Studio Reference 36-Speaker',
      massageSeats: true,
      refreshmentCenter: true
    },
    hourlyRate: 155,
    mileageRate: 4.50,
    featured: true
  },
  {
    id: 'mercedes-maybach-gls600',
    name: 'MERCEDES-MAYBACH GLS 600',
    tagline: 'First-Class Aviation Elevation on Wheels',
    category: 'suv',
    categoryLabel: 'Luxury SUV',
    class: 'FIRST CLASS SUV',
    passengers: 4,
    luggage: 3,
    transmission: '9G-TRONIC',
    drivetrain: 'AWD 4MATIC',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1541348263662-e0c86629c983?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'The pinnacle of SUV prestige. Executive rear lounge seats with active calf massage, silver-plated champagne flutes, panoramic roof with acoustic glazing, and E-Active Body Control.',
    idealFor: ['Celebrity & Private Aviation', 'High-Stakes Bilateral Meetings', 'Ultra-Luxury Escapes'],
    features: ['Air Suspension Glide', 'Champagne Chiller & Silver Flutes', 'Heated & Cooled Cupholders', 'Burmester High-End 3D Sound', 'Quiet Cabin Acoustic Glass'],
    specs: {
      wifi: true,
      soundSystem: 'Burmester High-End 3D Surround',
      massageSeats: true,
      refreshmentCenter: true,
      workTables: true
    },
    hourlyRate: 210,
    mileageRate: 5.80,
    featured: true
  },
  {
    id: 'jeep-grand-wagoneer-series-iii',
    name: 'JEEP GRAND WAGONEER',
    tagline: 'Pinnacle American Hospitality and Tri-Zone Grandeur',
    category: 'suv',
    categoryLabel: 'Luxury SUV',
    class: 'ULTRA LUXURY SUV',
    passengers: 6,
    luggage: 6,
    transmission: '8-Speed Automatic',
    drivetrain: 'Quadra-Drive II 4WD',
    image: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1789740443/Black_SUV_in_showroom_20260915230340_irhlcp.jpg',
    interiorImage: 'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1789740439/SUV_interior_cabin_light_gray_20260915230249_n131sa.jpg',
    exteriorGallery: [
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1789740443/Black_SUV_in_showroom_20260915230340_irhlcp.jpg',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1789740445/Black_SUV_in_showroom_20260915225850_li4wpl.jpg',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1789740445/Black_SUV_in_showroom_20260915230343_hfzn5d.jpg',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1789740451/SUV_parked_in_showroom_interior_20260915230313_m3znqj.jpg',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1789740447/Rear_view_of_black_SUV_20260915230316_nwqzzr.jpg',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1789740464/Rear_view_of_black_SUV_20260915230316_veui7e.jpg'
    ],
    interiorGallery: [
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1789740439/SUV_interior_cabin_light_gray_20260915230249_n131sa.jpg',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1789740446/Car_dashboard_and_steering_wheel_20260915230318_ihsrga.jpg',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1789740463/SUV_interior_cabin_light_gray_20260915230249_irjzrm.jpg',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1789740463/Car_dashboard_and_steering_wheel_20260915230318_ezpplc.jpg',
      'https://res.cloudinary.com/dv9jpkgrs/image/upload/v1789740466/Car_interior_with_light_seats_20260915230301_r5ixzf.jpg'
    ],
    description: 'American craftsmanship with Palermo quilted leather seating, McIntosh 23-speaker Reference Entertainment, tri-pane panoramic sunroof, and generous space for 6 passengers.',
    idealFor: ['Executive Family Escapes', 'VIP Airport Arrival & Transfers', 'Corporate Roadshows'],
    features: ['Palermo Quilted Leather', 'McIntosh 23-Speaker Audio', 'Tri-Pane Panoramic Roof', 'Rear Entertainment System', 'Quadra-Lift Air Suspension'],
    specs: {
      wifi: true,
      soundSystem: 'McIntosh Reference 23-Speaker',
      massageSeats: true,
      refreshmentCenter: true,
      workTables: true
    },
    hourlyRate: 155,
    mileageRate: 4.40,
    featured: true
  },
  {
    id: 'mercedes-sprinter-jet-edition',
    name: 'MERCEDES SPRINTER JET EDITION',
    tagline: 'Private Aviation On Ground For 8 Passengers',
    category: 'van',
    categoryLabel: 'Executive Van',
    class: 'FIRST CLASS JET VAN',
    passengers: 8,
    luggage: 8,
    transmission: 'Automatic',
    drivetrain: 'RWD / AWD',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Custom coachbuilt custom interior featuring Italian Maybach-pattern leather captain chairs, dual 43-inch 4K Smart TVs, Apple TV, motorized privacy partition, and integrated bar.',
    idealFor: ['Mobile Executive Boardrooms', 'Artists & Tour Ensembles', 'Inter-city Group Shuttles'],
    features: ['Motorized Privacy Partition', 'Dual 43" 4K Smart Displays', 'Starlight Fibre Optic Ceiling', 'HDMI & Apple AirPlay', 'Wet Bar & Nespresso Machine'],
    specs: {
      wifi: true,
      soundSystem: 'Custom Focal Audiophile Studio System',
      privacyPartition: true,
      massageSeats: true,
      refreshmentCenter: true,
      workTables: true
    },
    hourlyRate: 240,
    mileageRate: 6.20,
    featured: true
  },
  {
    id: 'mercedes-sprinter-executive-14',
    name: 'MERCEDES SPRINTER EXECUTIVE LOUNGE',
    tagline: 'High-Capacity Discretion for 14 Guests',
    category: 'van',
    categoryLabel: 'Executive Van',
    class: 'EXECUTIVE LUXURY SHUTTLE',
    passengers: 14,
    luggage: 14,
    transmission: '9G-TRONIC Auto',
    drivetrain: 'RWD High-Stability',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Designed for effortless group transfers without sacrificing individual comfort. High ceiling walk-in cabin, bespoke leather forward-facing recliners, individual USB-C ports, and massive luggage garage.',
    idealFor: ['Corporate Summits & Retreats', 'Wedding Bridal Parties', 'Airport Terminal Shuttles'],
    features: ['High-Roof Stand-up Cabin', 'Individual Reading Lights & Air Vents', 'Massive Rear Cargo Partition', 'Dedicated Passenger PA System'],
    specs: {
      wifi: true,
      soundSystem: 'Harman Kardon Multi-Zone Audio',
      workTables: false
    },
    hourlyRate: 210,
    mileageRate: 5.50
  },
  {
    id: 'mercedes-s-class-s580',
    name: 'MERCEDES-BENZ S 580 4MATIC',
    tagline: 'The Global Gold Standard of Chauffeur Sedans',
    category: 'sedan',
    categoryLabel: 'Premium Sedan',
    class: 'EXECUTIVE SEDAN',
    passengers: 3,
    luggage: 3,
    transmission: '9G-TRONIC Auto',
    drivetrain: 'AWD 4MATIC',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'A masterclass in quiet grace. Features rear Executive Seat package with heated neck warmers, Burmester 4D surround sound with in-seat exciters, active ambient lighting, and AIRMATIC suspension.',
    idealFor: ['C-Suite Executive Commutes', 'Financial Roadshows', 'Discreet Night Outings'],
    features: ['Rear Executive Recliner', 'Burmester 4D High-End Audio', 'Energizing Comfort Fragrance System', 'Rear Touchscreen Tablet Control'],
    specs: {
      wifi: true,
      soundSystem: 'Burmester 4D Surround',
      massageSeats: true,
      refreshmentCenter: true
    },
    hourlyRate: 140,
    mileageRate: 4.10,
    featured: true
  },
  {
    id: 'rolls-royce-ghost-extended',
    name: 'ROLLS-ROYCE GHOST EXTENDED',
    tagline: 'The Ultimate Expression of Post-Opulence and Quiet Power',
    category: 'sedan',
    categoryLabel: 'Ultra Luxury Sedan',
    class: 'BESPOKE ROYAL SEDAN',
    passengers: 3,
    luggage: 3,
    transmission: '8-Speed Satellite',
    drivetrain: 'Planar AWD',
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Extended wheelbase with Planar Suspension magic carpet ride, Shooting Star headliner, open-pore wood veneers, whisper-quiet double-glazed acoustic glass with 100kg of sound deadening.',
    idealFor: ['High-Profile Red Carpets', 'Ultra-VIP Dignitary Travel', 'Milestone Celebrations'],
    features: ['Shooting Star Headliner', 'Effortless Power Doors', 'Champagne Cooler with Crystal Flutes', 'Lambswool Carpets'],
    specs: {
      wifi: true,
      soundSystem: 'Rolls-Royce Bespoke Audio 1300W',
      massageSeats: true,
      refreshmentCenter: true,
      workTables: true
    },
    hourlyRate: 350,
    mileageRate: 8.50,
    featured: true
  },
  {
    id: 'bmw-760i-xdrive',
    name: 'BMW 760i xDRIVE THEATRE',
    tagline: 'Avant-Garde German Architectural Luxury',
    category: 'sedan',
    categoryLabel: 'Premium Sedan',
    class: 'EXECUTIVE SEDAN',
    passengers: 3,
    luggage: 3,
    transmission: '8-Speed Steptronic',
    drivetrain: 'xDrive AWD',
    image: 'https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Equipped with the groundbreaking 31.3-inch 8K BMW Theatre Screen dropping from the panoramic sky roof, Bowers & Wilkins Diamond Surround sound, and Executive Lounge rear seating.',
    idealFor: ['Tech Founders & Executives', 'Film Screenings on the Go', 'Airport Commutes'],
    features: ['31.3" 8K BMW Theatre Display', 'Bowers & Wilkins Diamond 36-Speaker Audio', 'Automatic Closing Doors', 'Sky Lounge Panoramic Glass'],
    specs: {
      wifi: true,
      soundSystem: 'Bowers & Wilkins Diamond 1965W',
      massageSeats: true,
      workTables: true
    },
    hourlyRate: 150,
    mileageRate: 4.30
  },
  {
    id: 'mercedes-eqs-580',
    name: 'MERCEDES EQS 580 4MATIC',
    tagline: 'Whisper-Silent Zero-Emission Flagship',
    category: 'electric',
    categoryLabel: 'Sustainable Luxury',
    class: 'ELECTRIC FLAGSHIP SEDAN',
    passengers: 3,
    luggage: 3,
    transmission: 'Direct Drive EV',
    drivetrain: 'Dual-Motor 4MATIC',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Near-zero acoustic signature with 56-inch MBUX Hyperscreen, HEPA air filtration system eliminating 99.65% of particulate matter, and serene electric acceleration.',
    idealFor: ['Eco-Conscious Executives', 'Clean Energy Corporate Travel', 'City Hub Transfers'],
    features: ['Hyperscreen Cockpit', 'Hospital-Grade HEPA Air Purification', 'Zero Local Emissions', 'Acoustic Glass Coating'],
    specs: {
      wifi: true,
      soundSystem: 'Burmester 3D Surround',
      massageSeats: true
    },
    hourlyRate: 135,
    mileageRate: 3.90
  },
  {
    id: 'lincoln-navigator-black-label',
    name: 'LINCOLN NAVIGATOR L BLACK LABEL',
    tagline: 'Expansive American Hospitality and Grandeur',
    category: 'suv',
    categoryLabel: 'Luxury SUV',
    class: 'PREMIUM SUV',
    passengers: 6,
    luggage: 6,
    transmission: '10-Speed SelectShift',
    drivetrain: 'Intelligent 4WD',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Black Label Invitation theme with Venetian leather, 30-way Perfect Position massage seats, Revel Ultima 3D audio, and extraordinary luggage clearance.',
    idealFor: ['Family Vacations', 'Ski and Mountain Retreats', 'Corporate Delegations'],
    features: ['30-Way Perfect Position Massage Seats', 'Revel Ultima 28-Speaker Audio', 'Panoramic Vista Roof', 'Heavy Weather Capability'],
    specs: {
      wifi: true,
      soundSystem: 'Revel Ultima 3D',
      massageSeats: true
    },
    hourlyRate: 145,
    mileageRate: 4.20
  },
  {
    id: 'bentley-flying-spur',
    name: 'BENTLEY FLYING SPUR MULLINER',
    tagline: 'Handcrafted British Grand Touring Brilliance',
    category: 'sedan',
    categoryLabel: 'Ultra Luxury Sedan',
    class: 'FIRST CLASS SEDAN',
    passengers: 3,
    luggage: 3,
    transmission: '8-Speed Dual-Clutch',
    drivetrain: 'Active AWD',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Diamond-in-diamond quilted leather, rotating central dashboard, Naim for Bentley 2200W sound system, and supreme dynamic poise over long highway corridors.',
    idealFor: ['Country Club Events', 'Gala Evenings', 'Luxury Weekend Getaways'],
    features: ['Naim 2200W Audiophile Audio', 'Diamond Quilted Interior', 'All-Wheel Steering Agility', 'Rear Touchscreen Remote'],
    specs: {
      wifi: true,
      soundSystem: 'Naim for Bentley 2200W',
      massageSeats: true,
      refreshmentCenter: true
    },
    hourlyRate: 290,
    mileageRate: 7.20
  },
  {
    id: 'mercedes-v-class-avantgarde',
    name: 'MERCEDES-BENZ V-CLASS AVANTGARDE',
    tagline: 'European Diplomatic Shuttle Excellence',
    category: 'van',
    categoryLabel: 'Executive Van',
    class: 'EXECUTIVE VIP VAN',
    passengers: 7,
    luggage: 6,
    transmission: '9G-TRONIC Auto',
    drivetrain: '4MATIC AWD',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Face-to-face conference seating configuration with foldable mahogany work center table, Burmester surround, and whisper-quiet suspension for on-the-move discussions.',
    idealFor: ['Confidential Board Meetings', 'Diplomatic Envoys', 'Family Airport Transfers'],
    features: ['Face-to-Face Club Seating', 'Foldable Conference Table', 'Luggage Compartment Divider', 'Burmester Surround Sound'],
    specs: {
      wifi: true,
      soundSystem: 'Burmester High-End',
      workTables: true
    },
    hourlyRate: 175,
    mileageRate: 4.80
  },
  {
    id: 'bmw-x7-m60i',
    name: 'BMW X7 M60i LUXURY',
    tagline: 'Dynamic High-Performance 6-Passenger Presence',
    category: 'suv',
    categoryLabel: 'Luxury SUV',
    class: 'EXECUTIVE SPORT SUV',
    passengers: 6,
    luggage: 4,
    transmission: '8-Speed Steptronic',
    drivetrain: 'xDrive AWD',
    image: 'https://images.unsplash.com/photo-1555353540-64580b51c258?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Full-size 3-row luxury SUV with individual captain chairs, Bowers & Wilkins Diamond surround sound, 5-zone automatic climate, and panoramic glass roof with LED star pattern.',
    idealFor: ['Corporate Offsites', 'Executive Ski Trips', 'City-to-Airport Transit'],
    features: ['Panoramic LED Sky Lounge', 'Bowers & Wilkins 3D Audio', '5-Zone Climate Control', 'Individual USB-C at Every Seat'],
    specs: {
      wifi: true,
      soundSystem: 'Bowers & Wilkins Diamond',
      massageSeats: true
    },
    hourlyRate: 150,
    mileageRate: 4.30
  },
  {
    id: 'lucid-air-grand-touring',
    name: 'LUCID AIR GRAND TOURING',
    tagline: 'Ultra-Modern Minimalist Electric Sanctuary',
    category: 'electric',
    categoryLabel: 'Sustainable Luxury',
    class: 'ELECTRIC LUXURY SEDAN',
    passengers: 3,
    luggage: 3,
    transmission: 'Direct Drive EV',
    drivetrain: 'Dual-Motor AWD',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Sublime glass canopy roof extending seamlessly from windshield to rear, 500+ mile zero-emission range, and Surreal Sound Pro 21-speaker acoustic mastery.',
    idealFor: ['Forward-Thinking Leaders', 'Architectural City Tours', 'Airport Express'],
    features: ['Glass Canopy Ceiling', 'Surreal Sound Pro Audio', 'Ultra-Fast 900V Architecture', 'Sustainable PurLuxe Interior'],
    specs: {
      wifi: true,
      soundSystem: 'Surreal Sound Pro 21-Speaker'
    },
    hourlyRate: 140,
    mileageRate: 4.00
  },
  {
    id: 'audi-a8-l-horch',
    name: 'AUDI A8 L HORCH EDITION',
    tagline: 'Understated German Engineering and Absolute Silence',
    category: 'sedan',
    categoryLabel: 'Premium Sedan',
    class: 'EXECUTIVE SEDAN',
    passengers: 3,
    luggage: 3,
    transmission: '8-Speed Tiptronic',
    drivetrain: 'quattro AWD',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Extended wheelbase with rear relaxation foot-warming massage seat, matrix LED reading lamps, and predictive active suspension floating over road imperfections.',
    idealFor: ['Confidential Executive Travel', 'Finance Sector Commutes', 'Hotel Concierge Bookings'],
    features: ['Rear Foot Massage Function', 'Predictive Active Suspension', 'Bang & Olufsen 3D Advanced Sound', 'Valcona Leather Diamond Stitch'],
    specs: {
      wifi: true,
      soundSystem: 'Bang & Olufsen Advanced 3D',
      massageSeats: true,
      workTables: true
    },
    hourlyRate: 145,
    mileageRate: 4.15
  },
  {
    id: 'rolls-royce-cullinan-black-badge',
    name: 'ROLLS-ROYCE CULLINAN BLACK BADGE',
    tagline: 'The King of All Luxury Terrain',
    category: 'suv',
    categoryLabel: 'Ultra Luxury SUV',
    class: 'BESPOKE ROYAL SUV',
    passengers: 4,
    luggage: 4,
    transmission: '8-Speed Satellite',
    drivetrain: 'Permanent AWD',
    image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1541348263662-e0c86629c983?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Dominant posture wrapped in deep bespoke dark chrome, viewing suite tailgate seating, refrigerated rear champagne cabinet, and 6.75L Twin-Turbo V12 serenity.',
    idealFor: ['Ultra-High Net Worth Travel', 'Hamptons & Mountain Estates', 'Celebrity Arrivals'],
    features: ['Tailgate Viewing Suite', 'Infinity Symbol Carbon Fiber Veneers', 'Starlight Headliner', 'Bespoke Audio Acoustic Studio'],
    specs: {
      wifi: true,
      soundSystem: 'Rolls-Royce Bespoke Audio 18-Speaker',
      massageSeats: true,
      refreshmentCenter: true,
      workTables: true
    },
    hourlyRate: 395,
    mileageRate: 9.50,
    featured: true
  },
  {
    id: 'mercedes-sprinter-mobile-boardroom',
    name: 'MERCEDES SPRINTER MOBILE BOARDROOM',
    tagline: 'Rolling Headquarters with Secure Video Conferencing',
    category: 'van',
    categoryLabel: 'Executive Van',
    class: 'MOBILE OFFICE VAN',
    passengers: 10,
    luggage: 10,
    transmission: '9G-TRONIC Auto',
    drivetrain: 'RWD / AWD',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'Equipped with dual 55-inch video conferencing displays, dedicated Starlink satellite high-speed internet, conference table with microphone arrays, and encrypted communications router.',
    idealFor: ['M&A Deal Roadshows', 'Executive Strategy Sessions', 'State Department Convoys'],
    features: ['Starlink Satellite Internet', 'Dual 55" Conference Displays', 'Full Privacy Partition', 'Nespresso Coffee Bar', 'Printer & Wireless Scan Station'],
    specs: {
      wifi: true,
      soundSystem: 'Conference Grade Multi-Mic Studio',
      privacyPartition: true,
      refreshmentCenter: true,
      workTables: true
    },
    hourlyRate: 260,
    mileageRate: 6.80
  },
  {
    id: 'genesis-g90-lwb',
    name: 'GENESIS G90 LONG WHEELBASE',
    tagline: 'Korean Warm Hospitality and Cutting-Edge Serenity',
    category: 'sedan',
    categoryLabel: 'Premium Sedan',
    class: 'EXECUTIVE SEDAN',
    passengers: 3,
    luggage: 3,
    transmission: '8-Speed Automatic',
    drivetrain: 'AWD',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85'
    ],
    description: 'First-class rear seat with independent footrest and heating, Mood Curator light and fragrance themes, Bang & Olufsen 23-speaker 3D audio, and easy-close power doors.',
    idealFor: ['International Business Delegations', 'Airport Meets', 'Discreet City Travel'],
    features: ['Mood Curator Ambient Aromatherapy', 'Bang & Olufsen 3D Sound', 'Rear Dual Touchscreens', 'Easy Close Smart Doors'],
    specs: {
      wifi: true,
      soundSystem: 'Bang & Olufsen 23-Speaker 3D',
      massageSeats: true
    },
    hourlyRate: 135,
    mileageRate: 3.95
  },
  {
    id: 'lexus-lx600-vip',
    name: 'LEXUS LX 600 VIP ULTRA LUXURY',
    tagline: 'Japanese Takumi Craftsmanship and Indomitable Reliability',
    category: 'suv',
    categoryLabel: 'Luxury SUV',
    class: 'EXECUTIVE SUV',
    passengers: 4,
    luggage: 4,
    transmission: '10-Speed Direct Shift',
    drivetrain: 'Full-Time 4WD',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1600&auto=format&fit=crop',
    interiorImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    exteriorGallery: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1541348263662-e0c86629c983?auto=format&fit=crop&w=1600&q=85'
    ],
    interiorGallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1600&q=85'
    ],
    description: '4-seat ultra-luxury layout with rear ottoman recliner angled up to 48 degrees, Mark Levinson 25-speaker Reference Surround sound, and multi-terrain hydraulic comfort suspension.',
    idealFor: ['Winter & Mountain Excursions', 'Airport VIP Pickups', 'Secure Commutes'],
    features: ['48-Degree VIP Ottoman Recliner', 'Mark Levinson 25-Speaker Reference Audio', 'Ceiling Air Diffusers', 'Wireless Phone Charging Pad'],
    specs: {
      wifi: true,
      soundSystem: 'Mark Levinson 25-Speaker Reference',
      massageSeats: true,
      refreshmentCenter: true
    },
    hourlyRate: 160,
    mileageRate: 4.60
  }
];

export const FLEET_CATEGORIES = [
  { id: 'all', label: 'ALL VEHICLES', count: 32 },
  { id: 'suv', label: 'LUXURY SUVS', count: 12 },
  { id: 'van', label: 'EXECUTIVE VANS', count: 10 },
  { id: 'sedan', label: 'PREMIUM SEDANS', count: 8 },
  { id: 'electric', label: 'ELECTRIC & HYBRID', count: 5 }
];
