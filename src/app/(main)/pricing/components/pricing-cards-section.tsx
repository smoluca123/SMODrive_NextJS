'use client';

import { useState } from 'react';
import { PLANS } from '@/lib/constant/pricing.constants';
import { BillingToggle } from './billing-toggle';
import { PricingCard } from './pricing-card';

export function PricingCardsSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className='py-16 lg:py-24'>
      <div className='container mx-auto px-4'>
        {/* Billing Toggle */}
        <div className='flex justify-center mb-12'>
          <BillingToggle isYearly={isYearly} onToggle={setIsYearly} />
        </div>

        {/* Pricing Cards */}
        <div className='grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto'>
          {PLANS.map((plan) => (
            <PricingCard key={plan.name} plan={plan} isYearly={isYearly} />
          ))}
        </div>
      </div>
    </section>
  );
}
