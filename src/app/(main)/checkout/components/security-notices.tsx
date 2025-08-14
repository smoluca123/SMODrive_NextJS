import { Shield, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export function SecurityNotices() {
  return (
    <>
      {/* Security Notice */}
      <Card className='bg-muted/50'>
        <CardContent className='p-4'>
          <div className='flex items-start space-x-3'>
            <Shield className='h-5 w-5 text-green-500 mt-0.5' />
            <div className='space-y-1'>
              <p className='text-sm font-medium'>Secure Checkout</p>
              <p className='text-xs text-muted-foreground'>
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Money Back Guarantee */}
      <Card className='bg-green-50 border-green-200'>
        <CardContent className='p-4'>
          <div className='flex items-start space-x-3'>
            <Check className='h-5 w-5 text-green-500 mt-0.5' />
            <div className='space-y-1'>
              <p className='text-sm font-medium text-green-800'>30-Day Money Back Guarantee</p>
              <p className='text-xs text-green-600'>
                Not satisfied? Get a full refund within 30 days, no questions asked.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
