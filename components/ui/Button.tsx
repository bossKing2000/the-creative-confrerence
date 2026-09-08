import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary: 'border border-bone bg-bone text-ink hover:bg-transparent hover:text-bone',
  secondary: 'border seam bg-transparent text-bone hover:border-bone hover:bg-bone hover:text-ink',
  ghost: 'border border-transparent text-ash hover:text-bone',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
};

const shared =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight ' +
  'transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98] ' +
  'disabled:pointer-events-none disabled:opacity-50';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

interface LinkProps extends CommonProps {
  href: string;
}

type NativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

function classesFor({ variant = 'primary', size = 'md', className }: CommonProps) {
  return cn(shared, variants[variant], sizes[size], className);
}

const isExternal = (href: string) => /^https?:\/\//.test(href) || href.startsWith('mailto:');

export function Button(props: LinkProps | NativeButtonProps) {
  const { variant, size, className, children, ...rest } = props;
  const classes = classesFor({ variant, size, className, children });

  if (typeof rest.href === 'string') {
    const { href } = rest;

    if (isExternal(href)) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={classes}>
          {children}
        </a>
      );
    }

    if (href.startsWith('#')) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = rest as NativeButtonProps;

  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
