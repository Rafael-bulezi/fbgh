export interface DestinationItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'metropolitan';
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
      { from: 'Midtown Manhattan', to: 'JFK International', typicalDuration: '45–65 MIN', startingRate: '$165' },
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
      { from: 'Center City Philadelphia', to: 'PHL Airport', typicalDuration: '20–30 MIN', startingRate: '$120' },
    ],
  },
];
