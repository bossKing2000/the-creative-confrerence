import { Avatar } from '@/components/ui/Avatar';
import { socialIcons } from '@/components/ui/Icon';
import type { Person } from '@/data/people';
import { cn } from '@/lib/utils';

interface PersonCardProps {
  person: Person;
  variant?: 'portrait' | 'compact';
}

export function PersonCard({ person, variant = 'portrait' }: PersonCardProps) {
  const { name, role, company, photo, pending, socials = [], id } = person;

  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-2xl border seam bg-char/60 transition-colors duration-300',
        !pending && 'hover:border-bone/35',
      )}
    >
      <div className={cn('relative overflow-hidden', variant === 'portrait' ? 'aspect-4/5' : 'aspect-square')}>
        <Avatar
          name={name}
          photo={photo}
          seed={id}
          pending={pending}
          className={cn('transition-transform duration-500', !pending && 'group-hover:scale-[1.04]')}
        />

        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-char to-transparent" />
      </div>

      <div className="relative p-5">
        <h3 className={cn('text-lg leading-snug font-semibold', pending && 'text-ash-dim')}>{name}</h3>

        <p className="mt-1 text-sm text-ash">
          {role}
          {company ? (
            <>
              <span className="text-ash-dim"> · </span>
              <span className="text-bone">{company}</span>
            </>
          ) : null}
        </p>

        {socials.length > 0 ? (
          <ul className="mt-4 flex items-center gap-2">
            {socials.map(social => {
              const Glyph = socialIcons[social.platform];

              return (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex size-8 items-center justify-center rounded-full border seam text-ash transition-colors hover:border-bone/40 hover:text-bone"
                  >
                    <Glyph className="size-4" />
                    <span className="sr-only">
                      {name} on {social.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
