import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CreditCard } from 'lucide-react';

export function PayoutInfoSection() {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Available Balance</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='text-3xl font-bold'>$2,847.50</div>
          <Progress value={95} className='h-2' />
          <p className='text-sm text-muted-foreground'>$2.50 away from minimum payout ($50.00)</p>
          <Button className='w-full'>
            <CreditCard className='h-4 w-4 mr-2' />
            Request Payout
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent className='space-y-3'>
          <div className='flex items-center justify-between p-3 border rounded-lg'>
            <div>
              <p className='font-medium text-sm'>PayPal</p>
              <p className='text-xs text-muted-foreground'>john@example.com</p>
            </div>
            <Badge>Primary</Badge>
          </div>
          <Button variant='outline' className='w-full bg-transparent'>
            Add Payment Method
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
