'use client';

import Link from 'next/link';

export function DesktopNavigation({
  navigationItems,
}: {
  navigationItems: { label: string; href: string }[];
}) {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      {navigationItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium hover:text-primary transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
