import { CardContentListItem } from '@/app/(main)/dashboard/settings/components/sidebar-section/sidebar-section';
import { StorageUsedProgress } from '@/components/storage-used-progress';
import { useGetMyStats } from '@/hooks/querys/user.querys';
import { useAuth } from '@/hooks/use-auth';
import { cn, formatFileSize } from '@/lib/utils';

export function SidebarStorageUsedProgress({ collapsed }: { collapsed: boolean }) {
  const { session } = useAuth();
  const { data: stats } = useGetMyStats();

  if (!session.user || !stats || collapsed) return null;

  return (
    <div className='p-4 space-y-2'>
      <CardContentListItem label='Storage Used:'>
        <span className={cn('text-sm font-medium')}>
          {formatFileSize(Number(stats.totalStorageUsed))} /{' '}
          {formatFileSize(Number(session.user.subscription.plan.storageLimit))}
        </span>
      </CardContentListItem>
      <StorageUsedProgress />
    </div>
  );
}
