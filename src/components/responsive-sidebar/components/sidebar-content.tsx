'use client';

import { SidebarHeader } from './sidebar-header';
import { SidebarUserProfile } from './sidebar-user-profile';
import { SidebarNavigation } from './sidebar-navigation';
import { SidebarFooter } from './sidebar-footer';
import { cn } from '@/lib/utils';
import { SidebarStorageUsedProgress } from '@/components/responsive-sidebar/components/sidebar-storage-used-progress';

interface SidebarContentProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

export function SidebarContent({ collapsed, onToggle, isMobile = false }: SidebarContentProps) {
  return (
    <div
      className={cn(
        'flex flex-col h-full bg-card border-r transition-all duration-300',
        !isMobile && (collapsed ? 'w-16' : 'w-64'),
        isMobile && 'w-full',
      )}
    >
      <SidebarHeader collapsed={collapsed} onToggle={onToggle} isMobile={isMobile} />
      <SidebarUserProfile collapsed={collapsed} isMobile={isMobile} />
      <SidebarNavigation collapsed={collapsed} isMobile={isMobile} />
      <SidebarStorageUsedProgress collapsed={collapsed} />
      <SidebarFooter collapsed={collapsed} isMobile={isMobile} />
    </div>
  );
}
