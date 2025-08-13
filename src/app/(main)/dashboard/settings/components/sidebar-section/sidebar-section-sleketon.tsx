'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SidebarSectionSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Skeleton className='h-5 w-5' />
          <Skeleton className='h-4 w-24' />
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center justify-between gap-2'>
          <Skeleton className='h-4 w-14' />
          <Skeleton className='h-4 w-20' />
        </div>
        <div className='flex items-center justify-between gap-2'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-24' />
        </div>
        <div className='flex items-center justify-between gap-2'>
          <Skeleton className='h-4 w-10' />
          <Skeleton className='h-4 w-32' />
        </div>
        <div className='flex items-center justify-between gap-2'>
          <Skeleton className='h-4 w-26' />
          <Skeleton className='h-4 w-24' />
        </div>
        <div className='flex items-center justify-between gap-2'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-4 w-34' />
        </div>
      </CardContent>
    </Card>
  );
}
