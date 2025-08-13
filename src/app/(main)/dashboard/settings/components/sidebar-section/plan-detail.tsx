'use client';
import { CardContentListItem } from '@/app/(main)/dashboard/settings/components/sidebar-section/sidebar-section';
import { SidebarSectionSkeleton } from '@/app/(main)/dashboard/settings/components/sidebar-section/sidebar-section-sleketon';
import { StorageUsedProgress } from '@/components/storage-used-progress';
import { SubscriptionBadge } from '@/components/subscription-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { formatFileSize } from '@/lib/utils';
import { Star } from 'lucide-react';

export function PlanDetail() {
  const { user, isLoading } = useAuth();
  const subscriptionExpiryDate = user?.subscription.endDate
    ? new Date(user.subscription.endDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Never';
  return (
    <>
      {(isLoading || !user) && <SidebarSectionSkeleton />}
      {user && !isLoading && (
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Star className='h-5 w-5' />
              Plan & Usage
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <Label>Plan</Label>
              <CardContentListItem label='Subscription:'>
                <SubscriptionBadge planName={user.subscription.plan.name} />
              </CardContentListItem>
              <CardContentListItem label='Subscription Expiry:'>
                <span className='text-sm font-medium'>{subscriptionExpiryDate}</span>
              </CardContentListItem>
              <CardContentListItem label='Storage Limit:'>
                <span className='text-sm font-medium'>
                  {formatFileSize(Number(user.subscription.plan.storageLimit))}
                </span>
              </CardContentListItem>
              <CardContentListItem label='Max File Size:'>
                <span className='text-sm font-medium'>
                  {formatFileSize(Number(user.subscription.plan.maxFileSize))}
                </span>
              </CardContentListItem>
            </div>
            <Separator />
            <div className='space-y-2'>
              <Label>Usage</Label>
              <div className='space-y-2'>
                <CardContentListItem label='Storage Used:'>
                  <span className='text-sm font-medium'>
                    {formatFileSize(Number(user.userStats.totalStorageUsed))} /{' '}
                    {formatFileSize(Number(user.subscription.plan.storageLimit))}
                  </span>
                </CardContentListItem>
                <StorageUsedProgress />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
