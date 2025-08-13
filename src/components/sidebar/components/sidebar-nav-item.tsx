'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarNavItemProps {
  item: {
    name: string;
    href: string;
    icon: LucideIcon;
  };
  isActive: boolean;
  collapsed: boolean;
}

export function SidebarNavItem({ item, isActive, collapsed }: SidebarNavItemProps) {
  return (
    <Link href={item.href}>
      <Button
        variant={isActive ? 'default' : 'ghost'}
        className={cn(
          'w-full justify-start',
          // collapsed ? 'px-2' : 'px-3',
          isActive && 'bg-primary text-primary-foreground',
        )}
      >
        <item.icon className='h-4 w-4' />
        123
        {!collapsed && <span className='ml-3'>{item.name}</span>}
      </Button>
    </Link>
  );
}
