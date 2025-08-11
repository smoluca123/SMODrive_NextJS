'use client';

import {
  LayoutDashboard,
  FolderOpen,
  DollarSign,
  BarChart3,
  Users,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SidebarHeader,
  SidebarUserProfile,
  SidebarNavigation,
  SidebarFooter,
} from './components';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Files', href: '/dashboard/files', icon: FolderOpen },
  { name: 'Earnings', href: '/dashboard/earnings', icon: DollarSign },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Referrals', href: '/dashboard/referrals', icon: Users },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-card border-r transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <SidebarHeader collapsed={collapsed} onToggle={onToggle} />
      <SidebarUserProfile collapsed={collapsed} />
      <SidebarNavigation navigation={navigation} collapsed={collapsed} />
      <SidebarFooter collapsed={collapsed} />
    </div>
  );
}
