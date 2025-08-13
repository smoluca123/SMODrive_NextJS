import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function ProfileFormSkeleton() {
  return (
    <div className="space-y-6">
      {/* User avatar */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 rounded-md w-[100px]" />

          <Skeleton className="h-4 w-[150px]" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <FormItemSkeleon />
        <FormItemSkeleon />
      </div>

      <FormItemSkeleon />
      <FormItemSkeleon inputClassName="h-[64px]" />
      <FormItemSkeleon />

      <Skeleton className="h-9 w-[100px]" />
    </div>
  );
}

const FormItemSkeleon = ({
  inputClassName,
  lableClassName,
}: {
  inputClassName?: string;
  lableClassName?: string;
}) => {
  return (
    <div className=" space-y-2">
      <Skeleton className={cn('w-12 h-4', lableClassName)} />
      <Skeleton className={cn('w-full h-9', inputClassName)} />
    </div>
  );
};
