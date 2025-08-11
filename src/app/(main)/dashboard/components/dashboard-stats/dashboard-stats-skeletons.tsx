import { Skeleton } from '@/components/ui/skeleton';

export const DashboardStatsSkeletons = ({
  length = 4,
}: {
  length?: number;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {Array.from({ length }).map((_, index) => (
        <DashboardStatsSkeleton key={index} />
      ))}
    </div>
  );
};

export const DashboardStatsSkeleton = () => {
  return <Skeleton className="h-36 w-full" />;
};
