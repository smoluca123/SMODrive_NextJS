import { DollarSign, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { PriceCalculation, BillingCycle, PlanDetails } from '@/lib/types/checkout.types';

interface PriceBreakdownProps {
  plan: PlanDetails;
  billingCycle: BillingCycle;
  calculation: PriceCalculation;
  promoApplied: boolean;
}

export function PriceBreakdown({
  plan,
  billingCycle,
  calculation,
  promoApplied,
}: PriceBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <DollarSign className='h-5 w-5' />
          <span>Order Total</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-3'>
        <div className='flex items-center justify-between'>
          <span className='text-sm'>
            {plan.name} ({billingCycle})
          </span>
          <span className='font-medium'>${calculation.price}</span>
        </div>

        {billingCycle === 'yearly' && calculation.savings > 0 && (
          <div className='flex items-center justify-between text-green-600'>
            <span className='text-sm'>Yearly discount</span>
            <span className='font-medium'>-${calculation.savings}</span>
          </div>
        )}

        {promoApplied && (
          <div className='flex items-center justify-between text-green-600'>
            <span className='text-sm'>Promo discount (20%)</span>
            <span className='font-medium'>-${calculation.discount.toFixed(2)}</span>
          </div>
        )}

        <div className='flex items-center justify-between text-sm text-muted-foreground'>
          <span>Tax</span>
          <span>${calculation.tax.toFixed(2)}</span>
        </div>

        <Separator />

        <div className='flex items-center justify-between text-lg font-bold'>
          <span>Total</span>
          <span>${calculation.total.toFixed(2)}</span>
        </div>

        <div className='text-xs text-muted-foreground text-center'>
          <Calendar className='h-3 w-3 inline mr-1' />
          {billingCycle === 'yearly' ? 'Billed annually' : 'Billed monthly'}
        </div>
      </CardContent>
    </Card>
  );
}
