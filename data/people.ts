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
  {
    id: 'tigbemiga',
    name: 'Tigbemiga',
    role: 'Organising team',
    photo: '/images/team/tigbemiga.png',
  },
  {
    id: 'damola',
    name: 'Damola',
    role: 'Organising team',
    photo: '/images/team/damola.png',
  },
  {
    id: 'dammy',
    name: 'Dammy',
    role: 'Organising team',
    photo: '/images/team/dammy.png',
  },
  {
    id: 'segun',
    name: 'Segun',
    role: 'Organising team',
    photo: '/images/team/seegun.png',
  },
  {
    id: 'peter',
    name: 'Peter',
    role: 'Organising team',
    photo: '/images/team/petrock.png',
  },
];
