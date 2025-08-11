'use client';

import { Button } from '@/components/ui/button';
import { Upload, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function SidebarHeader({ collapsed, onToggle }: SidebarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      {!collapsed && (
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
            <Upload className="h-4 w-4 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            ShareEarn
          </span>
        </div>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="h-8 w-8 p-0"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
