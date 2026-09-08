export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Editions', href: '#editions' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Explore',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Past editions', href: '#editions' },
      { label: 'Speakers', href: '#speakers' },
      { label: 'Organising team', href: '#team' },
    ],
  },
  {
    heading: 'Attend',
    links: [
      { label: 'Get a ticket', href: '#tickets' },
      { label: 'Partner with us', href: '/contact' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];
