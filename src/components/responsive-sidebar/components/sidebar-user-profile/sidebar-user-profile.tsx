'use client';

import { SidebarUserProfileSkeleton } from '@/components/responsive-sidebar/components/sidebar-user-profile/sidebar-user-profile-skeleton';
import UserAvatar from '@/components/user-avatar';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

interface SidebarUserProfileProps {
  collapsed: boolean;
  isMobile?: boolean;
}

export function SidebarUserProfile({ collapsed, isMobile = false }: SidebarUserProfileProps) {
  const { session } = useAuth();

  return (
    <div
      className={cn('p-4 border-b', {
        'p-2 mx-auto': collapsed,
      })}
    >
      {(session.isLoading || !session.user) && <SidebarUserProfileSkeleton collapsed={collapsed} />}
      {!session.isLoading && session.user && (
        <div className='flex items-center space-x-3'>
          <UserAvatar
            className='size-10'
            avatarUrl={session.user.avatar}
            fallbackName={session.user.lastName}
          />
          {(!collapsed || isMobile) && (
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium truncate'>
                {session.user.firstName} {session.user.lastName}
              </p>
              <p className='text-xs text-muted-foreground truncate'>{session.user.email}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
