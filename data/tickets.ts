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
    id: 'floor',
    tier: 'General access',
    name: 'The Floor Pass',
    price: '₦4,000', // PLACEHOLDER
    suffix: '/single entry',
    features: [
      'Souvenirs',
      'Keynote talks & panel sessions',
      'Live performances & brand activations',
      'Scholarships & giveaways',
      'Networking opportunities',
    ],
    href: 'https://app.eventpadi.com/e/tcc25/ep-ticket-1xoos/checkout',
    cta: 'Get this pass',
  },
  {
    id: 'all-access',
    tier: 'Group pass',
    name: 'The All-Access Pass',
    price: '₦20,000', // PLACEHOLDER
    suffix: '/5 people',
    features: [
      '5 General Access tickets',
      'Group check-in lane',
      'Shared seating allocation',
      'A better experience together',
    ],
    href: 'https://app.eventpadi.com/e/tcc25/ep-ticket-0lhww/checkout',
    cta: 'Get this pass',
    featured: true,
  },
  {
    id: 'builder',
    tier: 'VIP experience',
    name: 'The Builder Pass',
    price: '₦20,000', // PLACEHOLDER
    suffix: '/single entry',
    features: [
      'Premium seating with a clear view of the stage',
      'Access to the VIP lounge',
      'Light refreshments',
      'Exclusive networking with speakers & partners',
      'Branded VIP kit',
    ],
    href: 'https://app.eventpadi.com/e/tcc25/ep-ticket-rcz7w/checkout',
    cta: 'Get this pass',
  },
  {
    id: 'founder',
    tier: "Founder's corner",
    name: 'The Founder Pass',
    price: '₦65,000', // PLACEHOLDER
    suffix: '/single entry',
    features: [
      "Reserved Founder's Corner seating",
      'Curated networking with founders & operators',
      'Exclusive founders roundtable session',
      'VIP access for one staff member or PA',
      'Branded digital photo pack from the event',
    ],
    href: 'https://app.eventpadi.com/e/tcc25/ep-ticket-1u6ex/checkout',
    cta: 'Get this pass',
  },
];
