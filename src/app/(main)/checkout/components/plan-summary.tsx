import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { PlanDetails } from '@/lib/types/checkout.types';

interface PlanSummaryProps {
  plan: PlanDetails;
}

export function PlanSummary({ plan }: PlanSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <plan.icon className={`h-5 w-5 ${plan.color}`} />
          <span>{plan.name} Plan</span>
        </CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          {plan.features.slice(0, 3).map((feature, index) => (
            <div key={index} className='flex items-center space-x-2 text-sm'>
              <Check className='h-4 w-4 text-green-500' />
              <span>{feature}</span>
            </div>
          ))}
          {plan.features.length > 3 && (
            <p className='text-sm text-muted-foreground'>
              +{plan.features.length - 3} more features
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
