export interface Ticket {
  /** Stable key for the card. */
  id: string;
  /** Small tier label, e.g. 'General access'. */
  tier: string;
  /** Ticket name, e.g. 'The Floor Pass'. */
  name: string;
  /** PLACEHOLDER — display price, client to confirm. */
  price: string;
  /** Price qualifier, e.g. '/single entry'. */
  suffix: string;
  /** What's included. */
  features: string[];
  /** EventPadi checkout URL. Empty until the client supplies it. */
  href: string;
  /** CTA label for this specific ticket. */
  cta: string;
  /** Highlights the recommended tier. */
  featured?: boolean;
}

export const tickets: Ticket[] = [
  {
    id: 'student',
    tier: 'Student',
    name: 'Student',
    price: '₦1,000',
    suffix: '/single entry',
    features: [
      'For students ready to step into the creative community. Come for the ideas, meet your people, and leave with new possibilities.',
    ],
    href: 'https://app.eventpadi.com/e/tcc26/ep-student-lgn9y/checkout',
    cta: 'Get this pass',
  },
  {
    id: 'regular',
    tier: 'Regular',
    name: 'Regular',
    price: '₦2,000',
    suffix: '/single entry',
    features: [
      'A seat in the room where African creatives come together to share the work, the process, and what comes next. Come for the ideas, stay for the people.',
    ],
    href: 'https://app.eventpadi.com/e/tcc26/ep-regular-0n907/checkout',
    cta: 'Get this pass',
  },
  {
    id: 'vip',
    tier: 'VIP',
    name: 'VIP',
    price: '₦5,000',
    suffix: '/single entry',
    features: [
      'A closer seat to the people, ideas, and conversations shaping the creative community. Experience TCC26 with VIP access.',
    ],
    href: 'https://app.eventpadi.com/e/tcc26/ep-vip-qdai5/checkout',
    cta: 'Get this pass',
    featured: true,
  },
  {
    id: 'group-of-6',
    tier: 'Group of 6',
    name: 'Group of 6',
    price: '₦6,000',
    suffix: '/6 people',
    features: [
      'Good ideas are better shared. Bring your team, friends, or creative circle and experience TCC26 together.',
    ],
    href: 'https://app.eventpadi.com/e/tcc26/ep-group-of-4-kkjpm/checkout',
    cta: 'Get this pass',
  },
];
