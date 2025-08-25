'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useGetReferralUsersQuery } from '@/app/(main)/dashboard/referrals/components/recent-referrals-list/querys';
import { RecentReferralsListSkeleton } from '@/app/(main)/dashboard/referrals/components/recent-referrals-list/recent-referrals-list-skeleton';
import { Button } from '@/components/ui/button';
import RecentReferralsListDialog from '@/app/(main)/dashboard/referrals/components/recent-referrals-list/recent-referrals-list-dialog';
import { useState } from 'react';
import { ReferralItem } from '@/app/(main)/dashboard/referrals/components/recent-referrals-list/referral-item';

export function RecentReferralsList() {
  const { data, isFetching } = useGetReferralUsersQuery({});
  const [recentReferralsListDialogOpen, setRecentReferralsListDialogOpen] = useState(false);

  if (isFetching) return <RecentReferralsListSkeleton />;

  return (
    <>
      <Card>
        <CardHeader className='flex justify-between'>
          <div className='space-y-2'>
            <CardTitle>Recent Referrals</CardTitle>
            <CardDescription>Users who joined through your referral link</CardDescription>
          </div>
          <Button onClick={() => setRecentReferralsListDialogOpen(true)} variant='outline'>
            See more
          </Button>
        </CardHeader>
        <CardContent>
          {data && data.pages[0].data.items.length > 0 ? (
            <div className='space-y-4'>
              {data.pages[0].data.items.slice(0, 4).map((referral) => (
                <ReferralItem key={referral.id} userData={referral.user} />
              ))}
            </div>
          ) : (
            <h1 className='text-center text-muted-foreground'>
              You don&#39;t have any referral to show
            </h1>
          )}
        </CardContent>
      </Card>
      <RecentReferralsListDialog
        onClose={() => setRecentReferralsListDialogOpen(false)}
        open={recentReferralsListDialogOpen}
      />
    </>
  );
}
