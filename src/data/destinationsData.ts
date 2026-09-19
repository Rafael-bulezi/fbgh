export interface DestinationItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'metropolitan' | 'airport' | 'private-fbo' | 'coastal';
  image: string;
  coordinates: string;
  description: string;
  keyHubs: string[];
  popularRoutes: {
    from: string;
    to: string;
    typicalDuration: string;
    startingRate: string;
  }[];
}

export const DESTINATIONS_DATA: DestinationItem[] = [
  {
    id: 'new-york',
    name: 'NEW YORK',
    subtitle: 'Manhattan, Brooklyn, Westchester & Long Island',
    category: 'metropolitan',
    image: '/images/destination-new-york.webp',
    coordinates: '40.7128 N · 74.0060 W',
    description: 'Mastery of the Manhattan grid, premier hotel access, Wall Street corridors, Midtown headquarters, and high-security residential enclaves.',
    keyHubs: ['Wall Street & Financial District', 'Midtown & Hudson Yards', 'Upper East & Upper West Side', 'Tribeca, SoHo & DUMBO'],
    popularRoutes: [
      { from: 'JFK International', to: 'Midtown Manhattan', typicalDuration: '45–65 MIN', startingRate: '$165' },
      { from: 'Teterboro FBO', to: 'Upper East Side', typicalDuration: '30–45 MIN', startingRate: '$185' },
      { from: 'Midtown Manhattan', to: 'East Hampton', typicalDuration: '2 HR 15 MIN', startingRate: '$540' },
    ],
  },
  {
    id: 'philadelphia',
    name: 'PHILADELPHIA',
    subtitle: 'Center City, Main Line & Rittenhouse Square',
    category: 'metropolitan',
    image: '/images/destination-philadelphia.webp',
    coordinates: '39.9526 N · 75.1652 W',
    description: 'Executive movement through Philadelphia financial centers, university campuses, historic districts, and the Main Line estates.',
    keyHubs: ['Center City & Market Street', 'Rittenhouse Square', 'University City & Penn Medicine', 'Main Line: Bryn Mawr to Gladwyne'],
    popularRoutes: [
      { from: 'PHL Airport', to: 'Center City Philadelphia', typicalDuration: '20–30 MIN', startingRate: '$120' },
      { from: 'Rittenhouse Square', to: 'Midtown Manhattan', typicalDuration: '1 HR 50 MIN', startingRate: '$460' },
      { from: 'Main Line', to: 'Atlantic City', typicalDuration: '1 HR 20 MIN', startingRate: '$320' },
    ],
  },
  {
    id: 'airports',
    name: 'AIRPORT HUBS & PRIVATE FBOS',
    subtitle: 'Commercial terminals & dedicated private jet gates',
    category: 'airport',
    image: '/images/destination-airports.webp',
    coordinates: 'JFK · LGA · EWR · PHL · TEB · HPN',
    description: 'Terminal-to-vehicle coordination, private tarmac access, flight-aware timing, and prepared handoffs across the region’s leading airports and FBOs.',
    keyHubs: ['Teterboro: Signature & Jet Aviation', 'JFK: All terminals', 'LaGuardia & Newark', 'Westchester & Philadelphia International'],
    popularRoutes: [
      { from: 'Teterboro FBO', to: 'Wall Street Heliport', typicalDuration: '25 MIN', startingRate: '$175' },
      { from: 'JFK Airport', to: 'Financial District', typicalDuration: '40 MIN', startingRate: '$165' },
      { from: 'EWR Airport', to: 'Midtown Manhattan', typicalDuration: '35 MIN', startingRate: '$155' },
    ],
  },
  {
    id: 'private-destinations',
    name: 'PRIVATE DESTINATIONS',
    subtitle: 'The Hamptons, Greenwich, Newport & the Berkshires',
    category: 'coastal',
    image: '/images/destination-private-escape.webp',
    coordinates: 'HAMPTONS · GREENWICH · BERKSHIRES · NEWPORT',
    description: 'Weekend getaways, coastal retreats, equestrian events, and private-estate access with total discretion and luggage capability.',
    keyHubs: ['Southampton & East Hampton', 'Montauk & Shelter Island', 'Greenwich & Fairfield County', 'Newport & the Berkshires'],
    popularRoutes: [
      { from: 'Manhattan', to: 'Southampton Estate Area', typicalDuration: '2 HR', startingRate: '$520' },
      { from: 'Manhattan', to: 'Greenwich, Connecticut', typicalDuration: '50 MIN', startingRate: '$220' },
      { from: 'Philadelphia', to: 'Cape May, New Jersey', typicalDuration: '1 HR 35 MIN', startingRate: '$380' },
    ],
  },
];
