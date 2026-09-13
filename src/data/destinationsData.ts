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
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1600&auto=format&fit=crop',
    coordinates: '40.7128? N, 74.0060? W',
    description: 'Mastery of Manhattan grid navigation, premier five-star hotel access, Wall Street financial corridors, Midtown headquarters, and high-security residential enclaves.',
    keyHubs: ['Wall Street & Financial District', 'Midtown & Hudson Yards', 'Upper East / Upper West Side', 'Tribeca & SoHo', 'Brooklyn Heights & DUMBO'],
    popularRoutes: [
      { from: 'JFK International', to: 'Midtown Manhattan', typicalDuration: '45 - 65 min', startingRate: '$165' },
      { from: 'Teterboro FBO (TEB)', to: 'Upper East Side', typicalDuration: '30 - 45 min', startingRate: '$185' },
      { from: 'Midtown Manhattan', to: 'East Hampton', typicalDuration: '2h 15 min', startingRate: '$540' }
    ]
  },
  {
    id: 'philadelphia',
    name: 'PHILADELPHIA',
    subtitle: 'Center City, Main Line & Rittenhouse Square',
    category: 'metropolitan',
    image: 'https://images.unsplash.com/photo-1569420070774-4b57685601ee?q=80&w=1600&auto=format&fit=crop',
    coordinates: '39.9526? N, 75.1652? W',
    description: 'Bespoke executive chauffeur service covering Philadelphia financial centers, university campuses, historic districts, and the prestigious Main Line estates.',
    keyHubs: ['Center City & Market St', 'Rittenhouse Square', 'University City & Penn Medicine', 'Main Line (Bryn Mawr, Gladwyne)', 'PHL International Airport'],
    popularRoutes: [
      { from: 'PHL Airport', to: 'Center City Philly', typicalDuration: '20 - 30 min', startingRate: '$120' },
      { from: 'Rittenhouse Square', to: 'Midtown Manhattan', typicalDuration: '1h 50 min', startingRate: '$460' },
      { from: 'Main Line', to: 'Atlantic City Casinos', typicalDuration: '1h 20 min', startingRate: '$320' }
    ]
  },
  {
    id: 'airports',
    name: 'AIRPORT HUBS & PRIVATE FBOS',
    subtitle: 'Commercial Terminals & Dedicated Private Jet Gates',
    category: 'airport',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1600&auto=format&fit=crop',
    coordinates: 'JFK ? LGA ? EWR ? PHL ? TEB ? HPN',
    description: 'Full tarmac and gate clearance at all leading metropolitan airports and dedicated business aviation FBOs (Signature Flight Support, Jet Aviation, Atlantic Aviation).',
    keyHubs: [
      'Teterboro Airport (TEB - Signature / Jet Aviation)',
      'John F. Kennedy International (JFK - All Terminals)',
      'LaGuardia Airport (LGA)',
      'Newark Liberty International (EWR)',
      'Westchester County Airport (HPN)',
      'Philadelphia International (PHL)'
    ],
    popularRoutes: [
      { from: 'Teterboro FBO', to: 'Wall Street Heliport', typicalDuration: '25 min', startingRate: '$175' },
      { from: 'JFK Airport', to: 'Financial District NYC', typicalDuration: '40 min', startingRate: '$165' },
      { from: 'EWR Airport', to: 'Midtown Manhattan', typicalDuration: '35 min', startingRate: '$155' }
    ]
  },
  {
    id: 'private-destinations',
    name: 'PRIVATE DESTINATIONS',
    subtitle: 'The Hamptons, Greenwich, Newport & The Berkshires',
    category: 'coastal',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    coordinates: 'Hamptons ? Greenwich ? Berkshires ? Newport',
    description: 'Uncompromising weekend getaways, coastal retreats, equestrian events, and private estate access with total discretion and luggage capability.',
    keyHubs: ['Southampton & East Hampton', 'Montauk & Shelter Island', 'Greenwich & Fairfield County, CT', 'Newport Mansions, RI', 'The Berkshires, MA'],
    popularRoutes: [
      { from: 'Manhattan', to: 'Southampton Estate Area', typicalDuration: '2h 00 min', startingRate: '$520' },
      { from: 'Manhattan', to: 'Greenwich, CT', typicalDuration: '50 min', startingRate: '$220' },
      { from: 'Philadelphia', to: 'Cape May, NJ', typicalDuration: '1h 35 min', startingRate: '$380' }
    ]
  }
];
