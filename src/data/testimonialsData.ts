export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  location: string;
  verified: boolean;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    quote: "In private wealth management, discretion and timing are non-negotiable. FBGH has handled our managing partners and visiting international clients with absolute perfection for over three years.",
    author: "Alexander V. Sterling",
    role: "Managing Director, Global Asset Management",
    location: "New York & Zurich",
    verified: true
  },
  {
    quote: "Our aircraft touched down at Teterboro at 1:40 AM after a transatlantic crossing. The chauffeur was positioned at the stairs with the cabin already conditioned to 68°F. The peace of mind is unmatched.",
    author: "Elena Rostova",
    role: "Family Office Principal",
    location: "Greenwich, CT",
    verified: true
  },
  {
    quote: "The Mercedes Sprinter Jet Edition gave our executive team a secure boardroom on the road between NYC and Philadelphia. We held two full deal reviews with flawless high-speed connectivity.",
    author: "Marcus Chen",
    role: "Chief Executive Officer, MedTech Capital",
    location: "Philadelphia, PA",
    verified: true
  }
];
