export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  highlights: string[];
  inclusions: string[];
  recommendedVehicles: string[];
  startingRate: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'airport-transfers',
    number: '01',
    title: 'AIRPORT TRANSFERS',
    tagline: 'Seamless Precision Between Tarmac and Destination',
    shortDesc: 'Seamless pickup and drop-off. We monitor your flight so you don\'t have to.',
    longDesc: 'From commercial first-class arrivals at JFK, LGA, EWR, and PHL to private aviation FBO tarmac escorts at Teterboro (TEB) and Westchester (HPN), our chauffeurs monitor live flight radar telemetry. We ensure curbside readiness 15 minutes before your wheels touch down, complete with luggage assistance and chilled bottled spring water.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1600&auto=format&fit=crop',
    highlights: [
      'Real-time Flight Radar Tracking',
      'Curbside & Inside Baggage Meet & Greet',
      'Private FBO Direct Tarmac Gate Access',
      '60 Minutes Complimentary Waiting Time for Commercial Flights'
    ],
    inclusions: [
      'Flight delay buffer protection',
      'Luggage porter assistance',
      'Bespoke chilled refreshment selection',
      'Encrypted Wi-Fi and device chargers'
    ],
    recommendedVehicles: ['Cadillac Escalade ESV', 'Mercedes-Benz S 580', 'Mercedes Sprinter Jet Edition'],
    startingRate: '$165 flat'
  },
  {
    id: 'executive-travel',
    number: '02',
    title: 'EXECUTIVE TRAVEL',
    tagline: 'A Secure Mobile Office For High-Stakes Agendas',
    shortDesc: 'Professional transportation for meetings, roadshows and corporate events.',
    longDesc: 'Designed specifically for C-suite executives, investment bankers, legal partners, and corporate boards. Our vehicles function as uninterrupted mobile sanctuaries equipped with high-speed encrypted Wi-Fi, 110V AC power, acoustic glass insulation, and drivers bound by strict non-disclosure agreements.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop',
    highlights: [
      'Strict NDA & Chauffeur Confidentiality',
      'Dedicated Account Management & Corporate Billing',
      'Multi-Stop Financial Roadshow Coordination',
      'Mobile Video Conferencing & Workstations'
    ],
    inclusions: [
      'Starlink or cellular high-speed data',
      'Onboard power arrays & USB-C ports',
      'Quiet-cabin protocol (no unsolicited conversation)',
      'Digital itemized expense receipting'
    ],
    recommendedVehicles: ['Mercedes-Maybach GLS 600', 'Mercedes-Benz S 580', 'Mercedes Sprinter Mobile Boardroom'],
    startingRate: '$140 / hr'
  },
  {
    id: 'hourly-chauffeur',
    number: '03',
    title: 'HOURLY CHAUFFEUR',
    tagline: 'Total Flexibility. Your Chauffeur On Standby.',
    shortDesc: 'A vehicle and professional chauffeur at your disposal. By the hour, on your time.',
    longDesc: 'Experience complete freedom of movement. Whether hopping between boutique meetings across Manhattan, visiting galleries in Philadelphia, or attending private dinners, your dedicated chauffeur remains curbside and instantly responsive via direct dispatch or text.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    highlights: [
      'Unlimited Stops Within Service Zone',
      'Immediate Curbside Pickup on Demand',
      'Dedicated Chauffeur for Full Duration',
      'Flexible Extension at Fixed Hourly Rates'
    ],
    inclusions: [
      'Guaranteed continuous vehicle standby',
      'Personal chauffeur concierge assistance',
      'Custom onboard climate & audio pre-sets',
      'No surge pricing or peak-hour multiplier'
    ],
    recommendedVehicles: ['Kia Carnival VIP', 'Cadillac Escalade ESV', 'BMW 760i xDrive'],
    startingRate: '$125 / hr (3-hr min)'
  },
  {
    id: 'events-occasions',
    number: '04',
    title: 'EVENTS & OCCASIONS',
    tagline: 'An Unforgettable Arrival For Life\'s Defining Moments',
    shortDesc: 'Weddings, celebrations and private events—arrive in style.',
    longDesc: 'From Met Gala red carpets and high-society galas to luxury weddings and private concerts, we orchestrate coordinated fleet arrivals and VIP departures with flawless timing and immaculate presentation.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600&auto=format&fit=crop',
    highlights: [
      'Red Carpet & Venue Staging Logistics',
      'Synchronized Multi-Vehicle Fleet Arrivals',
      'Bridal Party Luxury Sprinter Coordination',
      'Post-Event VIP Dispersal Management'
    ],
    inclusions: [
      'Impeccably detailed black-tie vehicles',
      'Chilled champagne service on request',
      'Chauffeur umbrella escort service',
      'On-site dispatch coordinator for large events'
    ],
    recommendedVehicles: ['Rolls-Royce Ghost Extended', 'Rolls-Royce Cullinan', 'Mercedes Sprinter Jet Edition'],
    startingRate: '$175 / hr'
  },
  {
    id: 'city-to-city',
    number: '05',
    title: 'CITY-TO-CITY',
    tagline: 'First-Class Interstate Travel Without the Airport Friction',
    shortDesc: 'Travel beyond the city in complete comfort and privacy.',
    longDesc: 'Bypass commercial airline delays, crowded rail terminals, and security checkpoints. Travel seamlessly door-to-door between New York, Philadelphia, Boston, Washington D.C., and the Hamptons in a serene mobile living room.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop',
    highlights: [
      'Door-to-Door Nonstop Direct Routing',
      'Private High-Speed Onboard Workspace',
      'Zero Security Checkpoints or Baggage Limits',
      'Tailored Scenic or Express Highway Navigation'
    ],
    inclusions: [
      'Tolls and interstate fees included',
      'Gourmet light snack and beverage service',
      'Power reclining captain chairs with massage',
      'Rest stop flexibility on your command'
    ],
    recommendedVehicles: ['Kia Carnival VIP', 'Cadillac Escalade ESV', 'Mercedes Sprinter Executive Lounge'],
    startingRate: '$480 fixed corridor'
  }
];
