'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEventHandler, ReactNode } from 'react';

interface SectionLinkProps {
  href: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  children: ReactNode;
}

export function SectionLink({ href, className, onClick, children }: SectionLinkProps) {
  const pathname = usePathname();
  const isAnchor = href.startsWith('#');

  if (isAnchor && pathname === '/') {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={isAnchor ? `/${href}` : href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
