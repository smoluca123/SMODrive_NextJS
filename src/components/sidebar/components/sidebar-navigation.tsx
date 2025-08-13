'use client';

import { usePathname } from 'next/navigation';
import { SidebarNavItem } from './sidebar-nav-item';
import { LucideIcon } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarNavigationProps {
  navigation: NavigationItem[];
  collapsed: boolean;
}

export function SidebarNavigation({ navigation, collapsed }: SidebarNavigationProps) {
  const pathname = usePathname();

  return (
    <nav className='flex-1 p-4 space-y-2'>
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <SidebarNavItem key={item.name} item={item} isActive={isActive} collapsed={collapsed} />
        );
      })}
    </nav>
  );
}
