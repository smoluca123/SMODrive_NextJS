import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function RecentReferralsListSkeleton({ length = 4 }: { length?: number }) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='h-4 w-40' />
        <Skeleton className='h-4 w-64' />
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {Array.from({ length }, (_, i) => (
            <ReferralItemSkeleton key={`referral-skeleton-${i}`} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ReferralItemSkeleton() {
  return (
    <div className='flex items-center justify-between p-4 border rounded-lg'>
      <div className='flex items-center space-x-4'>
        <Skeleton className='size-8 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='w-32 h-4' />
          <Skeleton className='w-40 h-4' />
        </div>
      </div>
      <div className='flex items-center space-x-4'>
        <div className='space-y-2'>
          <Skeleton className='w-20 h-4 ml-auto' />
          <Skeleton className='w-24 h-4' />
        </div>
        <Skeleton className='w-10 h-4' />
      </div>
    </div>
  );
}
