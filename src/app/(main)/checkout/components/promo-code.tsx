'use client';

import { useState } from 'react';
import { Gift, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { PROMO_CODES } from '@/lib/constant/checkout.constants';

interface PromoCodeProps {
  onPromoApplied: (applied: boolean, discount: number) => void;
  promoApplied: boolean;
}

export function PromoCode({ onPromoApplied, promoApplied }: PromoCodeProps) {
  const [promoCode, setPromoCode] = useState('');

  const handleApplyPromo = () => {
    const upperCode = promoCode.toUpperCase();

    if (upperCode in PROMO_CODES) {
      const promo = PROMO_CODES[upperCode as keyof typeof PROMO_CODES];
      onPromoApplied(true, promo.discount);
      toast.success('Promo code applied!', {
        description: promo.description,
      });
    } else {
      toast.error('Invalid promo code', {
        description: 'Please check your code and try again.',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center space-x-2'>
          <Gift className='h-5 w-5' />
          <span>Promo Code</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex space-x-2'>
          <Input
            placeholder='Enter code'
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={promoApplied}
          />
          <Button
            variant='outline'
            onClick={handleApplyPromo}
            disabled={promoApplied || !promoCode}
            className='bg-transparent'
          >
            Apply
          </Button>
        </div>
        {promoApplied && (
          <div className='flex items-center space-x-2 mt-2 text-sm text-green-600'>
            <Check className='h-4 w-4' />
            <span>Code applied successfully!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
