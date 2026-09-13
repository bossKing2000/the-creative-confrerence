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
        src: 'https://lh3.googleusercontent.com/d/1TUiJHMRjGhqATKMuNZEd2d4ePe1baJtv',
        alt: 'TCC 2023 archive photo 1',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1Ectbzor-O1IMxtCxelEBD5M0h4Gd1HkE',
        alt: 'TCC 2023 archive photo 2',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1k20PWWxZhziPKO4ZzJjQs7R2Q_PbAvi_',
        alt: 'TCC 2023 archive photo 3',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1lGS74Yd_a42QzSDaYNlzu6Wtc208ynyd',
        alt: 'TCC 2023 archive photo 4',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1Km65WnvhAe2BP_BFReHLiamkJDi0OwDt',
        alt: 'TCC 2023 archive photo 5',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/16jPUz21AVkIbWrVA0RYaFM2a1fAfrfmJ',
        alt: 'TCC 2023 archive photo 6',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/10oKQRPzMDqKUOb5g1tzpDt8fU2hLdEQw',
        alt: 'TCC 2023 archive photo 7',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1OJIlfGtgGhdmPF9B2kGhDapjT8ydkVKA',
        alt: 'TCC 2023 archive photo 8',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1NIJL7vGKNYIeXv4IcAouNbSR8FgZavSj',
        alt: 'TCC 2023 archive photo 9',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1GpLY11OFvZnpsyDfkS-lgtFijs8eHETg',
        alt: 'TCC 2023 archive photo 10',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1pocpO5G34UCkb6a2TVQUwqQcUxp_1gc-',
        alt: 'TCC 2023 archive photo 11',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1sa3dfD6u9Rbxcy80UvCSP-jw603YXgmr',
        alt: 'TCC 2023 archive photo 12',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1jD3FA-nVeTbmfLzeuDTF25EqYuFpfvpJ',
        alt: 'TCC 2023 archive photo 13',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1f7NFWRpc_Lf_jLMMCcgZSmGR-c92e3fo',
        alt: 'TCC 2023 archive photo 14',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1LV2eQo7AqI9oIg9d6-hepL4Ht-Ol881s',
        alt: 'TCC 2023 archive photo 15',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1tLmRGqCyk9kTfbwptvR36DMC6QpY74Ru',
        alt: 'TCC 2023 archive photo 16',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1qfQ-3YDTpAfwXnNAnqgAXcWQbeOk9zlK',
        alt: 'TCC 2023 archive photo 17',
        width: 3456,
        height: 4320,
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
        src: 'https://lh3.googleusercontent.com/d/1RCh-2lFX62fLZSOfHInwU9eq1wzwVVN1',
        alt: 'TCC 2024 archive photo 1',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1LXwgNyEeTrkCqkVkkJ_CgFiTssHoYgLf',
        alt: 'TCC 2024 archive photo 2',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1qgpvUGjaUT9c1cb973CQ0Be1gX14vHLD',
        alt: 'TCC 2024 archive photo 3',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1TX4qp1TqeAneKdR3b8L7M0SNdcAwICbs',
        alt: 'TCC 2024 archive photo 4',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1cvOlRtT7t5LAH0XwLNYHSTMkW8QznTTK',
        alt: 'TCC 2024 archive photo 5',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1CE_J_y2cOhfjAx-QaT48AJqDIFtRnHSc',
        alt: 'TCC 2024 archive photo 6',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1Swb_xA_sv5sfrCsz_SZetrLxlPdi6pCY',
        alt: 'TCC 2024 archive photo 7',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1nUwlMyRro5U9h1cfEo0hsj2-pd7KAUm4',
        alt: 'TCC 2024 archive photo 8',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/16Ccfh7HFNlZc4ecKXcLaD6yQpsMlPWYl',
        alt: 'TCC 2024 archive photo 9',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1c6tHEogCA9sIUtNQLGi6mbIvTFY2tn72',
        alt: 'TCC 2024 archive photo 10',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/15RQjYkNpeWc2VbydqaqCf7ChPyLXYi7U',
        alt: 'TCC 2024 archive photo 11',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/187seQQBwuzSjGDWGPO07hSfcRMugmccv',
        alt: 'TCC 2024 archive photo 12',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1nWeAbhMF0OMlWs5IOh7caU4dD3Cyl8FB',
        alt: 'TCC 2024 archive photo 13',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1NB9rjW01_28Xt2OUTr7YasDYCAGxPukO',
        alt: 'TCC 2024 archive photo 14',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1mGIiI_uKxNLGWtfxKB2KgbHFV9aWkheQ',
        alt: 'TCC 2024 archive photo 15',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1WTBDrAd8FOw5OzOPk-eoGCYi702o-z5B',
        alt: 'TCC 2024 archive photo 16',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/17TNKhZyoCwydEMlY0ABBd045rowCbXjb',
        alt: 'TCC 2024 archive photo 17',
        width: 3456,
        height: 4320,
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
        src: 'https://lh3.googleusercontent.com/d/14aDfMz1v7pg02qlHajVG01tI9BRfz5mE',
        alt: 'TCC 2025 archive photo 1',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1dM7bu-p8jdItMzXS_zpq6Tk4M9bPaVGD',
        alt: 'TCC 2025 archive photo 2',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1StplXwRCA_nWe9xYmSgg8eJ3ESDfiPzz',
        alt: 'TCC 2025 archive photo 3',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1CCHqMGxFdA-xzNuq1qwc4vvxBbykRUd0',
        alt: 'TCC 2025 archive photo 4',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1aL1Sm06r9JduV1U7TSQI9Vt8MO2f7tEv',
        alt: 'TCC 2025 archive photo 5',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1bhB_lwKwTeRms7y0i4bnPM71YdNrGi__',
        alt: 'TCC 2025 archive photo 6',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1AFYs3oi_xQ0RY3G8x8xiAk509w5iPbg7',
        alt: 'TCC 2025 archive photo 7',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1BwpM5WhZbCjyNzjLRyeQJt5mjKWIs-2Y',
        alt: 'TCC 2025 archive photo 8',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/17phszfaiRTTPymoDPcQUzp7hReQ5RW--',
        alt: 'TCC 2025 archive photo 9',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1wZ1bR9knWkO4IW9gPljSgI7ydICjCg4R',
        alt: 'TCC 2025 archive photo 10',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1pwUxfZa20QPn-FtZSpITrK1LH72_zING',
        alt: 'TCC 2025 archive photo 11',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1ajZVoLh0BWbd4lDrR0val1tx8Plc8c_I',
        alt: 'TCC 2025 archive photo 12',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1QnPHftn5vSrKGlTwD7LyZwZDsQ9F6M7I',
        alt: 'TCC 2025 archive photo 13',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1MdwSQd8kdu0aDgLUdJiq7roEQf2C76w5',
        alt: 'TCC 2025 archive photo 14',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/1J3vDA1SYfpx2m8E5SmOfXvYQtdIyh72Q',
        alt: 'TCC 2025 archive photo 15',
        width: 3456,
        height: 4320,
        position: '50% 25%',
      },
      {
        src: 'https://lh3.googleusercontent.com/d/14_dh8Ch_JWjAoFWC0G1q0dZhoewHKqEZ',
        alt: 'TCC 2025 archive photo 16',
        width: 3456,
        height: 4320,
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
