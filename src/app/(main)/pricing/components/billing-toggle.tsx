'use client';

import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface BillingToggleProps {
  isYearly: boolean;
  onToggle: (isYearly: boolean) => void;
}

export function BillingToggle({ isYearly, onToggle }: BillingToggleProps) {
  return (
    <div className='flex items-center justify-center space-x-4'>
      <span
        className={`text-sm font-medium ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}
      >
        Monthly
      </span>
      <Switch
        checked={isYearly}
        onCheckedChange={onToggle}
        className='data-[state=checked]:bg-primary'
      />
      <span
        className={`text-sm font-medium ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}
      >
        Yearly
      </span>
      <Badge variant='secondary' className='ml-2'>
        Save up to 20%
      </Badge>
    </div>
  );
}
