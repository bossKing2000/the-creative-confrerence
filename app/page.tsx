import { About } from '@/components/sections/About';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Hero } from '@/components/sections/Hero';
import { PastEditions } from '@/components/sections/PastEditions';
import { Speakers } from '@/components/sections/Speakers';
import { Sponsors } from '@/components/sections/Sponsors';
import { Team } from '@/components/sections/Team';
import { Ticker } from '@/components/sections/Ticker';
import { Tickets } from '@/components/sections/Tickets';
import { event } from '@/data/event';
import { faqs } from '@/data/faqs';
import { tickets } from '@/data/tickets';

function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Event',
        name: `${event.name} ${event.edition}`,
        description: event.tagline,
        startDate: event.startsAt,
        url: event.ticketUrl,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: event.venue,
          address: { '@type': 'PostalAddress', addressLocality: 'Lagos', addressCountry: 'NG' },
        },
        // One Offer per ticket type so structured data reflects the real
        // checkout destinations. The event-level URL stays on event.ticketUrl
        // (the EventPadi event page), never a #tickets fragment.
        offers: tickets.map(ticket => ({
          '@type': 'Offer',
          name: ticket.name,
          url: ticket.href,
          availability: 'https://schema.org/InStock',
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <Hero />
      <Ticker />
      <About />
      <PastEditions />
      <Speakers />
      <Tickets />
      <Sponsors />
      <Team />
      <FAQ />
      <FinalCTA />
    </>
  );
}
