import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function EarningsBreakdownSkeleton({ length = 3 }: { length?: number }) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='h-4 w-40' />
        <Skeleton className='h-4 w-64' />
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <Skeleton className='w-full h-12' />
          <Skeleton className='w-full h-12' />
          <Skeleton className='w-full h-12' />
          <Skeleton className='w-full h-12' />
        </div>
        <div className='pt-4'>
          <Skeleton className='w-32 h-4 mb-4' />
          <div className='space-y-2'>
            {Array.from({ length }, (_, i) => (
              <div key={`earnings-item-${i}`} className='flex items-center justify-between text-sm'>
                <Skeleton className='h-4 w-20' />
                <Skeleton className='h-4 w-10' />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
