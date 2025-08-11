'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Bell, Search } from 'lucide-react';

interface SidebarFooterProps {
  collapsed: boolean;
  isMobile?: boolean;
}

export function SidebarFooter({
  collapsed,
  isMobile = false,
}: SidebarFooterProps) {
  return (
    <div className="p-4 border-t space-y-2">
      <div className="flex items-center justify-between">
        <ThemeToggle />
        {(!collapsed || isMobile) && (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs">
                3
              </Badge>
            </Button>
          </div>
        )}
      </div>
      {(!collapsed || isMobile) && (
        <Button asChild className="w-full rounded-2xl">
          <Link href="/upload">
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Link>
        </Button>
      )}
    </div>
  );
}
