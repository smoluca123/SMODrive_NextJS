'use client';

import { SidebarSectionSkeleton } from '@/app/(main)/dashboard/settings/components/sidebar-section/sidebar-section-sleketon';
import { SubscriptionBadge } from '@/components/subscription-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetMyStats } from '@/hooks/querys/user.querys';
import { useAuth } from '@/hooks/use-auth';

export function AccountStatus() {
  const { session } = useAuth();
  const { data: stats } = useGetMyStats();
  return (
    <>
      {(session.isLoading || !session.user) && <SidebarSectionSkeleton />}
      {session.user && (
        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm'>Subscription</span>
              <SubscriptionBadge planName={session.user.subscription.plan.name} />
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm'>Member Since</span>
              <span className='text-sm font-medium'>
                {session.user.createdAt.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <span className='text-sm'>Files Uploaded</span>
              {stats && <span className='text-sm font-medium'>{stats.totalFilesUploaded}</span>}
            </div>
            <Button className='w-full'>Upgrade to Pro</Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
