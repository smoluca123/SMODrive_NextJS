import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/use-auth';

export function StorageUsedProgress() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <Progress
      value={
        (Number(user.userStats.totalStorageUsed) / Number(user.subscription.plan.storageLimit)) *
        100
      }
    />
  );
}
