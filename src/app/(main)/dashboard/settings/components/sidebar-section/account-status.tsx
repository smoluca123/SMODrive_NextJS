'use client';

import { SidebarSectionSkeleton } from '@/app/(main)/dashboard/settings/components/sidebar-section/sidebar-section-sleketon';
import { SubscriptionBadge } from '@/components/subscription-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';

export function AccountStatus() {
  const { user, isLoading } = useAuth();
  return (
    <>
      {(isLoading || !user) && <SidebarSectionSkeleton />}
      {user && !isLoading && (
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm'>Subscription</span>
              <SubscriptionBadge planName={user.subscription.plan.name} />
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm'>Member Since</span>
              <span className='text-sm font-medium'>
                {user.createdAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm'>Files Uploaded</span>
              <span className='text-sm font-medium'>{user.userStats.totalFilesUploaded}</span>
            </div>
            <Button className='w-full'>Upgrade to Pro</Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
