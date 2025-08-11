'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface SidebarUserProfileProps {
  collapsed: boolean;
}

export function SidebarUserProfile({ collapsed }: SidebarUserProfileProps) {
  return (
    <div
      className={cn('p-4 border-b', {
        'p-2': collapsed,
      })}
    >
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">
              john@example.com
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
