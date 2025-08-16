import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function FileGridSectionSkeletons({
  length = 4,
  mode = 'grid',
}: {
  length?: number;
  mode?: 'grid' | 'list';
}) {
  return (
    <>
      {mode === 'grid' && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6'>
          {Array.from({ length }).map((_, index) => (
            <FileGridSectionSkeleton key={index} />
          ))}
        </div>
      )}
      {mode === 'list' && (
        <Card className='space-y-4'>
          <CardContent className='space-y-4'>
            {Array.from({ length }).map((_, index) => (
              <FileListSectionSkeleton key={index} />
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
}

export function FileGridSectionSkeleton() {
  return (
    <Card>
      <CardContent>
        <Skeleton className='h-60 w-full' />
        <Skeleton className='mt-4 h-4 w-3/4' />
        <div className='mt-4 flex items-center justify-between'>
          <Skeleton className='h-4 w-1/2' />
          <Skeleton className='h-4 w-1/3' />
        </div>
      </CardContent>
    </Card>
  );
}

export function FileListSectionSkeleton() {
  return (
    <div className=''>
      {/* <Card>
        <CardContent>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              <Skeleton className='h-6 w-6' />
              <Skeleton className='h-6 w-40' />
            </div>
            <div className='flex gap-2'>
              <Skeleton className='h-6 w-10' />
              <Skeleton className='h-6 w-16' />
              <Skeleton className='h-6 w-6' />
            </div>
          </div>
        </CardContent>
      </Card> */}
      <div className='flex items-center justify-between'>
        <div className='flex gap-2'>
          <Skeleton className='h-6 w-6' />
          <Skeleton className='h-6 w-40' />
        </div>
        <div className='flex gap-2'>
          <Skeleton className='h-6 w-10' />
          <Skeleton className='h-6 w-16' />
          <Skeleton className='h-6 w-6' />
        </div>
      </div>
    </div>
  );
}
