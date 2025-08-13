'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutDashboard, FolderOpen, DollarSign, BarChart3, Users, Settings } from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Files', href: '/dashboard/files', icon: FolderOpen },
  { name: 'Earnings', href: '/dashboard/earnings', icon: DollarSign },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Referrals', href: '/dashboard/referrals', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface SidebarNavigationProps {
  collapsed: boolean;
  isMobile?: boolean;
}

export function SidebarNavigation({ collapsed, isMobile = false }: SidebarNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className='flex-1 p-4 space-y-2 overflow-y-auto'>
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.name} href={item.href}>
            <Button
              variant={isActive ? 'default' : 'ghost'}
              className={cn(
                'w-full justify-start',
                collapsed && !isMobile ? 'px-2 justify-center items-center' : 'px-3',
                isActive && 'bg-primary text-primary-foreground',
              )}
            >
              <item.icon className='h-4 w-4 flex-shrink-0' />
              {(!collapsed || isMobile) && <span className='ml-3 truncate'>{item.name}</span>}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
