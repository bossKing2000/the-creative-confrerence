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

export interface ArchivePhoto {
  /** Path under /public, e.g. '/images/editions/2024/2024-01-main-stage.jpg'. */
  src: string;
  /** Descriptive alt text for the photograph. */
  alt: string;
  /** Intrinsic width of the source file. Reserves space before load (no CLS). */
  width: number;
  /** Intrinsic height of the source file. */
  height: number;
  /** CSS object-position to protect the subject when cropping, e.g. '50% 30%'. */
  position?: string;
  /** Optional tiny mono caption, e.g. 'Main stage'. */
  caption?: string;
}

export interface Archive {
  year: string;
  title: string;
  summary: string;
  href: string;
  highlights: string[];
  /**
   * Curated photographs for the year, best-first (hero moment at index 0).
   * Empty until real client photographs are ingested — see STAGE 1 note below.
   */
  photos: ArchivePhoto[];
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

  // EventPadi event page (parent of the per-ticket checkout URLs).
  // Keep this an absolute event URL — never a page fragment.
  ticketUrl: 'https://app.eventpadi.com/e/tcc25',

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
    photos: [
      {
        src: '/images/editions/2023/IMG_0285 (1).jpg',
        alt: 'TCC 2023 archive photo 1',
        width: 3024,
        height: 4032,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0292.jpg',
        alt: 'TCC 2023 archive photo 2',
        width: 3024,
        height: 4032,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0296.jpg',
        alt: 'TCC 2023 archive photo 3',
        width: 3024,
        height: 4032,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0303.jpg',
        alt: 'TCC 2023 archive photo 4',
        width: 3024,
        height: 4032,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0325.jpg',
        alt: 'TCC 2023 archive photo 5',
        width: 3024,
        height: 4032,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0326 (1).jpg',
        alt: 'TCC 2023 archive photo 6',
        width: 4032,
        height: 3024,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0329.jpg',
        alt: 'TCC 2023 archive photo 7',
        width: 3024,
        height: 4032,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0331.jpg',
        alt: 'TCC 2023 archive photo 8',
        width: 3024,
        height: 4032,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0335.jpg',
        alt: 'TCC 2023 archive photo 9',
        width: 3024,
        height: 4032,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0336.jpg',
        alt: 'TCC 2023 archive photo 10',
        width: 3024,
        height: 4032,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0337.jpg',
        alt: 'TCC 2023 archive photo 11',
        width: 3024,
        height: 4032,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0338.jpg',
        alt: 'TCC 2023 archive photo 12',
        width: 3024,
        height: 4032,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0340.jpg',
        alt: 'TCC 2023 archive photo 13',
        width: 3024,
        height: 4032,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0341.jpg',
        alt: 'TCC 2023 archive photo 14',
        width: 4032,
        height: 3024,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0347.jpg',
        alt: 'TCC 2023 archive photo 15',
        width: 3024,
        height: 4032,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0349.jpg',
        alt: 'TCC 2023 archive photo 16',
        width: 3024,
        height: 4032,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0350.jpg',
        alt: 'TCC 2023 archive photo 17',
        width: 3024,
        height: 4032,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0358.jpg',
        alt: 'TCC 2023 archive photo 18',
        width: 3024,
        height: 4032,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0379.jpg',
        alt: 'TCC 2023 archive photo 19',
        width: 4032,
        height: 3024,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0381.jpg',
        alt: 'TCC 2023 archive photo 20',
        width: 4032,
        height: 3024,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2023/IMG_0516.jpg',
        alt: 'TCC 2023 archive photo 21',
        width: 4032,
        height: 3024,
        position: '50% 25%',
      },
    ],
  },
  {
    year: '2024',
    title: 'Fostering creativity within africas community',
    summary:
      'Twice the attendance and a lineup that reached beyond design into product, engineering and the business of creative work. The year the hallway track became the best track.',
    href: 'https://drive.google.com/drive/u/1/folders/1QE3CzDPI54iUB00HLtnoMUpTX4hNk2Hi',
    highlights: ['Cross-discipline panels', 'Live design challenge', 'Mentor matching'],
    photos: [
      {
        src: '/images/editions/2024/The Creative Conference  (23 of 88).jpg',
        alt: 'TCC 2024 archive photo 1',
        width: 3196,
        height: 4461,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The Creative Conference  (31 of 88).jpg',
        alt: 'TCC 2024 archive photo 2',
        width: 4680,
        height: 3744,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The Creative Conference  (32 of 88).jpg',
        alt: 'TCC 2024 archive photo 3',
        width: 4680,
        height: 3744,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The Creative Conference  (4 of 88).jpg',
        alt: 'TCC 2024 archive photo 4',
        width: 5616,
        height: 3744,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The Creative Conference  (43 of 88).jpg',
        alt: 'TCC 2024 archive photo 5',
        width: 3744,
        height: 5616,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The Creative Conference  (55 of 88).jpg',
        alt: 'TCC 2024 archive photo 6',
        width: 3744,
        height: 4680,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The Creative Conference  (59 of 88).jpg',
        alt: 'TCC 2024 archive photo 7',
        width: 5616,
        height: 3744,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The Creative Conference  (63 of 88).jpg',
        alt: 'TCC 2024 archive photo 8',
        width: 3744,
        height: 5616,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The Creative Conference  (65 of 88).jpg',
        alt: 'TCC 2024 archive photo 9',
        width: 2679,
        height: 3349,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The Creative Conference  (69 of 88).jpg',
        alt: 'TCC 2024 archive photo 10',
        width: 5616,
        height: 3744,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The Creative Conference  (74 of 88).jpg',
        alt: 'TCC 2024 archive photo 11',
        width: 3744,
        height: 5616,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The creative conference (100 of 149).jpg',
        alt: 'TCC 2024 archive photo 12',
        width: 3504,
        height: 4380,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The creative conference (105 of 149).jpg',
        alt: 'TCC 2024 archive photo 13',
        width: 3744,
        height: 4680,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The creative conference (120 of 149).jpg',
        alt: 'TCC 2024 archive photo 14',
        width: 5616,
        height: 3744,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The creative conference (122 of 149).jpg',
        alt: 'TCC 2024 archive photo 15',
        width: 4168,
        height: 2779,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The creative conference (145 of 149).jpg',
        alt: 'TCC 2024 archive photo 16',
        width: 3992,
        height: 2661,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The creative conference (146 of 149).jpg',
        alt: 'TCC 2024 archive photo 17',
        width: 2852,
        height: 3565,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The creative conference (151 of 90).jpg',
        alt: 'TCC 2024 archive photo 18',
        width: 3744,
        height: 4680,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The creative conference (164 of 90).jpg',
        alt: 'TCC 2024 archive photo 19',
        width: 5616,
        height: 3744,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The creative conference (40 of 149).jpg',
        alt: 'TCC 2024 archive photo 20',
        width: 4690,
        height: 3027,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The creative conference (47 of 149).jpg',
        alt: 'TCC 2024 archive photo 21',
        width: 5616,
        height: 3744,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The creative conference (48 of 149).jpg',
        alt: 'TCC 2024 archive photo 22',
        width: 5616,
        height: 3744,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2024/The creative conference (5 of 149).jpg',
        alt: 'TCC 2024 archive photo 23',
        width: 6000,
        height: 4000,
        position: '50% 25%',
      },
    ],
  },

  {
    year: '2025',
    title: 'RISE - reinvent , inspire , solve , evolve',
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
    photos: [
      {
        src: '/images/editions/2025/TCC (105 of 116).jpg',
        alt: 'TCC 2025 archive photo 1',
        width: 3456,
        height: 4357,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (11 of 116).jpg',
        alt: 'TCC 2025 archive photo 2',
        width: 3043,
        height: 4484,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (114 of 116).jpg',
        alt: 'TCC 2025 archive photo 3',
        width: 4346,
        height: 3456,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (14 of 116).jpg',
        alt: 'TCC 2025 archive photo 4',
        width: 3456,
        height: 4659,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (17 of 116).jpg',
        alt: 'TCC 2025 archive photo 5',
        width: 3456,
        height: 4643,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (2 of 116).jpg',
        alt: 'TCC 2025 archive photo 6',
        width: 3456,
        height: 5184,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (21 of 116).jpg',
        alt: 'TCC 2025 archive photo 7',
        width: 3456,
        height: 4405,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (24 of 116).jpg',
        alt: 'TCC 2025 archive photo 8',
        width: 3456,
        height: 3975,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (27 of 116).jpg',
        alt: 'TCC 2025 archive photo 9',
        width: 3456,
        height: 4500,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (29 of 116).jpg',
        alt: 'TCC 2025 archive photo 10',
        width: 3456,
        height: 4437,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (30 of 116).jpg',
        alt: 'TCC 2025 archive photo 11',
        width: 3456,
        height: 5184,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (33 of 116).jpg',
        alt: 'TCC 2025 archive photo 12',
        width: 3456,
        height: 4675,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (44 of 116).jpg',
        alt: 'TCC 2025 archive photo 13',
        width: 5184,
        height: 3456,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (5 of 116).jpg',
        alt: 'TCC 2025 archive photo 14',
        width: 3456,
        height: 5184,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (66 of 116).jpg',
        alt: 'TCC 2025 archive photo 15',
        width: 5184,
        height: 3456,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (74 of 116).jpg',
        alt: 'TCC 2025 archive photo 16',
        width: 3329,
        height: 3456,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (8 of 116).jpg',
        alt: 'TCC 2025 archive photo 17',
        width: 3456,
        height: 4786,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (81 of 116).jpg',
        alt: 'TCC 2025 archive photo 18',
        width: 3456,
        height: 3456,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC (9 of 116).jpg',
        alt: 'TCC 2025 archive photo 19',
        width: 3456,
        height: 5184,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC25 (19 of 113).jpg',
        alt: 'TCC 2025 archive photo 20',
        width: 3456,
        height: 4204,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC25 (3 of 113).jpg',
        alt: 'TCC 2025 archive photo 21',
        width: 5184,
        height: 3456,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC25 (42 of 113).jpg',
        alt: 'TCC 2025 archive photo 22',
        width: 3456,
        height: 4431,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC25 (43 of 113).jpg',
        alt: 'TCC 2025 archive photo 23',
        width: 3456,
        height: 5184,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC25 (5 of 113).jpg',
        alt: 'TCC 2025 archive photo 24',
        width: 3456,
        height: 3679,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC25 (53 of 113).jpg',
        alt: 'TCC 2025 archive photo 25',
        width: 3456,
        height: 5184,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC25 (84 of 113).jpg',
        alt: 'TCC 2025 archive photo 26',
        width: 3456,
        height: 5184,
        position: '50% 25%',
      },
      {
        src: '/images/editions/2025/TCC25 (88 of 113).jpg',
        alt: 'TCC 2025 archive photo 27',
        width: 3456,
        height: 4218,
        position: '50% 25%',
      },
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
