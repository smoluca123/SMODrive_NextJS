import { Check } from 'lucide-react';
import { CHECKOUT_STEPS } from '@/lib/constant/checkout.constants';
import type { CheckoutStep } from '@/lib/types/checkout.types';

interface CheckoutProgressProps {
  currentStep: number;
}

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between max-w-2xl mx-auto'>
        {CHECKOUT_STEPS.map((step, index) => (
          <div key={step.number} className='flex items-center'>
            <div className='flex flex-col items-center'>
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.number
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {currentStep > step.number ? <Check className='h-5 w-5' /> : step.number}
              </div>
              <div className='text-center mt-2'>
                <p className='text-sm font-medium'>{step.title}</p>
                <p className='text-xs text-muted-foreground hidden sm:block'>{step.description}</p>
              </div>
            </div>
            {index < CHECKOUT_STEPS.length - 1 && (
              <div
                className={`h-px w-16 lg:w-24 mx-4 ${
                  currentStep > step.number ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
