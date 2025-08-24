import { Skeleton } from '@/components/ui/skeleton';

export function ReferralLinkSkeleton() {
  return (
    <div className='bg-card rounded-xl shadow p-6 space-y-4'>
      <Skeleton className='h-4 w-48' />
      <div className='flex gap-x-2 items-center'>
        <Skeleton className='h-9 flex-1' />
        <Skeleton className='size-9' />
      </div>
      <div className='grid grid-cols-2 gap-4 pt-4'>
        <Skeleton className='h-20' />
        <Skeleton className='h-20' />
      </div>
      <div className='space-y-2'>
        <Skeleton className='h-4 mb-2 w-32' />
        <div className='space-y-1'>
          <Skeleton className='h-4 mb-2 w-56' />
          <Skeleton className='h-4 mb-2 w-48' />
          <Skeleton className='h-4 mb-2 w-44' />
          <Skeleton className='h-4 mb-2 w-36' />
        </div>
      </div>
    </div>
  );
}
