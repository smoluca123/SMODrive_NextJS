import { Progress } from '@/components/ui/progress';
import { useGetMyStats } from '@/hooks/querys/user.querys';
import { useAuth } from '@/hooks/use-auth';

export function StorageUsedProgress() {
  const { session } = useAuth();
  const { data: stats } = useGetMyStats();
  if (!session.user || !stats) return null;
  return (
    <Progress
      value={
        (Number(stats.totalStorageUsed) / Number(session.user.subscription.plan.storageLimit)) * 100
      }
    />
  );
}
