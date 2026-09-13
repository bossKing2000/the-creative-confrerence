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
    id: 'dammy',
    name: 'Dammy',
    role: 'Speaker',
    photo: '/images/team/Dammy.jpg',
  },
  {
    id: 'damola',
    name: 'Damola',
    role: 'Speaker',
    photo: '/images/team/Damola.jpg',
  },
  {
    id: 'peter',
    name: 'Peter',
    role: 'Speaker',
    photo: '/images/team/Peter.jpg',
  },
  {
    id: 'segun',
    name: 'Segun',
    role: 'Speaker',
    photo: '/images/team/Segun.jpg',
  },
  {
    id: 'tigbemiga',
    name: 'Tigbemiga',
    role: 'Speaker',
    photo: '/images/team/Tigbemiga.jpg',
  },
];

export const team: Person[] = [
  { id: 'convener', name: 'To be announced', role: 'Convener', pending: true },
  { id: 'programme', name: 'To be announced', role: 'Programme lead', pending: true },
  { id: 'partnerships', name: 'To be announced', role: 'Partnerships lead', pending: true },
  { id: 'design', name: 'To be announced', role: 'Design lead', pending: true },
  { id: 'community', name: 'To be announced', role: 'Community manager', pending: true },
  { id: 'operations', name: 'To be announced', role: 'Operations lead', pending: true },
];
