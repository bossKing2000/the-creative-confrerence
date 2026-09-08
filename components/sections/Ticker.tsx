import { Marquee } from '@/components/ui/Marquee';

const TOPICS = [
  'Portfolio clinics',
  'Live critique',
  'Design systems',
  'Type and lettering',
  'Motion',
  'Brand identity',
  'Product thinking',
  'Creative careers',
  'Illustration',
  'Case studies',
];

export function Ticker() {
  return (
    <div className="border-y seam bg-char/50 py-4">
      <Marquee>
        {TOPICS.map(topic => (
          <span key={topic} className="flex items-center">
            <span className="px-6 font-mono text-xs tracking-[0.2em] whitespace-nowrap text-ash uppercase sm:text-sm">
              {topic}
            </span>
            <span aria-hidden className="size-1 rounded-full bg-bone/50" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
