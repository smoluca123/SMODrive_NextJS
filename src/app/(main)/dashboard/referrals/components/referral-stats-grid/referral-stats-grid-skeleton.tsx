import { Skeleton } from '@/components/ui/skeleton';

export function ReferralStatsGridSkeleton({ length = 4 }: { length?: number }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {Array.from({ length }, (_, i) => (
        <Skeleton className='h-37.5' key={i * new Date().getTime()} />
      ))}
    </div>
  );
}
