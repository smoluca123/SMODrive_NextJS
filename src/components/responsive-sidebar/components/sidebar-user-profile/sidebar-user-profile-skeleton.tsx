import { Skeleton } from '@/components/ui/skeleton';

export function SidebarUserProfileSkeleton({ collapsed }: { collapsed: boolean }) {
  return (
    <div className=''>
      <div className='flex items-center space-x-3'>
        <Skeleton className='h-10 w-10 rounded-full' />
        {!collapsed && (
          <div className='flex-1 min-w-0 space-y-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-3 w-16' />
          </div>
        )}
      </div>
    </div>
  );
}
