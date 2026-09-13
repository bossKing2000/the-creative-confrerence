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

export const speakers: Person[] = [];

export const team: Person[] = [
  {
    id: 'dammy',
    name: 'Dammy',
    role: 'Organising team',
    photo: '/images/team/Dammy.jpg',
  },
  {
    id: 'damola',
    name: 'Damola',
    role: 'Organising team',
    photo: '/images/team/Damola.jpg',
  },
  {
    id: 'peter',
    name: 'Peter',
    role: 'Organising team',
    photo: '/images/team/Peter.jpg',
  },
  {
    id: 'segun',
    name: 'Segun',
    role: 'Organising team',
    photo: '/images/team/Segun.jpg',
  },
  {
    id: 'tigbemiga',
    name: 'Tigbemiga',
    role: 'Organising team',
    photo: '/images/team/Tigbemiga.jpg',
  },
];
