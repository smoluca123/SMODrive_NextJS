import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

export function EarningsHeaderSection() {
  return (
    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0'>
      <div>
        <h1 className='text-3xl font-bold'>Earnings</h1>
        <p className='text-muted-foreground'>Track your revenue and payout history</p>
      </div>
      <Button>
        <CreditCard className='h-4 w-4 mr-2' />
        Request Payout
      </Button>
    </div>
  );
}
