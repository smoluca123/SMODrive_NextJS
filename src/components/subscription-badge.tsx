import { Badge } from '@/components/ui/badge';
import { IPlanDataType } from '@/lib/types/interfaces/plan.interfaces';

export function SubscriptionBadge({ planName }: { planName: IPlanDataType['name'] }) {
  switch (planName) {
    case 'BASIC':
      return (
        <Badge className='bg-slate-100 text-slate-800 border-slate-200 shadow-sm dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700'>
          Basic
        </Badge>
      );
    case 'PRO':
      return <Badge className='bg-indigo-600 text-white border-transparent shadow'>Pro</Badge>;
    case 'ENTERPRISE':
      return <Badge className=' text-white border-transparent shadow-lg'>Enterprise</Badge>;
    default:
      return (
        <Badge className='bg-gray-100 text-gray-700 border-gray-200 shadow-sm dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700'>
          Free
        </Badge>
      );
  }
}
