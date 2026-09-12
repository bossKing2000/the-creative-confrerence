export type SocialPlatform = 'x' | 'linkedin' | 'instagram' | 'youtube' | 'whatsapp' | 'website';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface EventStat {
  value: number;
  suffix: string;
  label: string;
}

export interface Archive {
  year: string;
  title: string;
  summary: string;
  href: string;
  highlights: string[];
}

export const event = {
  name: 'The Creative Conference',
  edition: '2026',

  tagline: 'A dynamic space designed for creatives to connect, explore, and elevate their craft.',

  // PLACEHOLDER — drives the hero countdown. Must stay a parseable ISO
  // timestamp with an offset, or the countdown will render its empty state.
  startsAt: '2026-11-21T09:00:00+01:00',
  dateLabel: 'Saturday, 21 November 2026',
  timeLabel: '9:00 AM WAT',

  venue: 'The Assembly', // PLACEHOLDER
  city: 'Ogbomosho, Nigeria',

  // PLACEHOLDER — replace with the full tix.africa event URL, not the bare domain.
  ticketUrl: 'https://tix.africa',

  communityUrl: 'https://chat.whatsapp.com/CUlq6NLm17MDABDXVtRrne',
  whatsappUrl: 'https://wa.me/2349075066796',
  whatsappLabel: '+234 907 506 6796',
  email: 'hello@thecreativeconference.africa', // PLACEHOLDER
} as const;

export const socials: SocialLink[] = [
  { platform: 'x', label: 'X', href: 'https://x.com/thecreativeconf' }, // PLACEHOLDER
  { platform: 'instagram', label: 'Instagram', href: 'https://instagram.com/thecreativeconference' }, // PLACEHOLDER
  { platform: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/thecreativeconference' }, // PLACEHOLDER
  { platform: 'whatsapp', label: 'WhatsApp community', href: event.communityUrl },
];

export const stats: EventStat[] = [
  { value: 1000, suffix: '+', label: 'Creatives in the room' },
  { value: 25, suffix: '+', label: 'Speakers and mentors' },
  { value: 12, suffix: '', label: 'Sessions and workshops' },
  { value: 3, suffix: '', label: 'Editions since 2023' },
];

export const archives: Archive[] = [
  {
    year: '2023',
    title: 'Creative connect',
    summary:
      'The edition that proved the point: a room full of designers who had only ever met in group chats, finally in the same place. Portfolio reviews ran past their slot and nobody left.',
    href: 'https://drive.google.com/drive/folders/1Iu4tlEay-5T5z3hapchoHjGnbbroLk3H',
    highlights: ['Portfolio clinics', 'First-time speakers', 'Community launch'],
  },
  {
    year: '2024',
    title: 'Fostering creativity within africas community',
    summary:
      'Twice the attendance and a lineup that reached beyond design into product, engineering and the business of creative work. The year the hallway track became the best track.',
    href: 'https://drive.google.com/drive/u/1/folders/1QE3CzDPI54iUB00HLtnoMUpTX4hNk2Hi',
    highlights: ['Cross-discipline panels', 'Live design challenge', 'Mentor matching'],
  },

  {
    year: '2025',
    title: 'RISE - reinvent , inspire, solve , evolve',
    summary:
      'Triple the attendance and a lineup that reached beyond design into product, engineering and the business of creative work. The year the hallway track became the best track.',
    href: 'https://drive.google.com/drive/u/1/folders/1QE3CzDPI54iUB00HLtnoMUpTX4hNk2Hi',
    highlights: [
      'Cross-discipline panels',
      'Live design challenge',
      'Mentor matching',
      'Portfolio clinics',
      'First-time speakers',
      'Community launch',
    ],
  },
];

/** What the day is built around. Carried forward from previous editions. */
export const pillars = [
  {
    title: 'Networking',
    body: 'Connect with potential collaborators & industry experts.',
  },
  {
    title: 'In-depth learning',
    body: 'Gain practical insights from professionals who have worked on real projects, solved real problems & build successful careers.Walk away with lessons you can apply to your own creative journey.',
  },
  {
    title: 'Interactive sessions',
    body: 'Beyond listening, take part in engaging conversations,life critique and thoughtful discussion, ask, questions, share ideas and learn through real time interaction. ',
  },
];
