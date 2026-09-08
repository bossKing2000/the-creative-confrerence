import type { SocialLink } from '@/data/event';

export interface Person {
  /** Stable key — also used as the avatar seed so fallbacks stay consistent. */
  id: string;
  name: string;
  role: string;
  company?: string;
  photo?: string;
  pending?: boolean;
  socials?: SocialLink[];
}

export const speakers: Person[] = [
  {
    id: 'oyeleye-ogunsanya',
    name: 'Oyeleye Ogunsanya',
    role: 'Lead Designer',
    company: 'Risevest',
    socials: [],
  },
  {
    id: 'tola-alabi',
    name: 'Tola Alabi',
    role: 'Design Coach & Speaker',
    socials: [],
  },
  {
    id: 'oluwabusayo-charles',
    name: 'Oluwabusayo A. Charles',
    role: 'Speaker',
    socials: [],
  },
  { id: 'slot-4', name: 'To be announced', role: 'Keynote', pending: true },
  { id: 'slot-5', name: 'To be announced', role: 'Workshop lead', pending: true },
  { id: 'slot-6', name: 'To be announced', role: 'Panel', pending: true },
];

export const team: Person[] = [
  { id: 'convener', name: 'To be announced', role: 'Convener', pending: true },
  { id: 'programme', name: 'To be announced', role: 'Programme lead', pending: true },
  { id: 'partnerships', name: 'To be announced', role: 'Partnerships lead', pending: true },
  { id: 'design', name: 'To be announced', role: 'Design lead', pending: true },
  { id: 'community', name: 'To be announced', role: 'Community manager', pending: true },
  { id: 'operations', name: 'To be announced', role: 'Operations lead', pending: true },
];
