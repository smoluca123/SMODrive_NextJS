import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Check, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Plan } from '@/lib/types/pricing.types';
import { getPrice, getSavings } from '@/lib/utils/pricing.utils';
import { SubscriptionBadge } from '@/components/subscription-badge';

interface PricingCardProps {
  plan: Plan;
  isYearly: boolean;
}

export function PricingCard({ plan, isYearly }: PricingCardProps) {
  const price = getPrice(plan, isYearly);
  const savings = getSavings(plan);

  return (
    <Card
      className={`relative transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
        plan.badge === 'Most Popular'
          ? `border-2 ${plan.borderColor} shadow-lg scale-105`
          : `border ${plan.borderColor}`
      }`}
    >
      {plan.badge && (
        <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
          {plan.badge === 'Most Popular' ? (
            <Badge
              className={`${plan.color === 'text-primary' ? 'bg-primary' : 'bg-blue-600'} text-white`}
            >
              {plan.badge}
            </Badge>
          ) : (
            <SubscriptionBadge planName={plan.badge as 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE'} />
          )}
        </div>
      )}

      <CardHeader className='text-center space-y-4'>
        <div
          className={`h-16 w-16 ${plan.bgColor} rounded-2xl flex items-center justify-center mx-auto`}
        >
          <plan.icon className={`h-8 w-8 ${plan.color}`} />
        </div>

        <div>
          <CardTitle className='text-2xl'>{plan.name}</CardTitle>
          <CardDescription className='mt-2'>{plan.description}</CardDescription>
        </div>

        <div className='space-y-2'>
          <div className='flex items-baseline justify-center'>
            <span className='text-4xl font-bold'>${price}</span>
            {plan.monthlyPrice > 0 && (
              <span className='text-muted-foreground ml-1'>/{isYearly ? 'year' : 'month'}</span>
            )}
          </div>

          {isYearly && plan.monthlyPrice > 0 && (
            <div className='text-sm text-muted-foreground'>
              <span className='line-through'>${plan.monthlyPrice * 12}/year</span>
              <Badge variant='secondary' className='ml-2 text-xs'>
                Save {savings}%
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className='space-y-6'>
        {/* Key Features */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>Storage</span>
            <span className='font-medium'>{plan.features.storage}</span>
          </div>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>Revenue Share</span>
            <span className='font-medium'>{plan.features.revenue}</span>
          </div>
          <div className='flex items-center justify-between text-sm'>
            <span className='text-muted-foreground'>Support</span>
            <span className='font-medium'>{plan.features.support}</span>
          </div>
        </div>

        <Separator />

        {/* Feature List */}
        <div className='space-y-2'>
          <div className='flex items-center space-x-2 text-sm'>
            <Check className='h-4 w-4 text-green-500' />
            <span>{plan.features.uploads} uploads</span>
          </div>
          <div className='flex items-center space-x-2 text-sm'>
            <Check className='h-4 w-4 text-green-500' />
            <span>{plan.features.analytics} analytics</span>
          </div>
          {plan.features.priority && (
            <div className='flex items-center space-x-2 text-sm'>
              <Check className='h-4 w-4 text-green-500' />
              <span>Priority processing</span>
            </div>
          )}
          {plan.features.api && (
            <div className='flex items-center space-x-2 text-sm'>
              <Check className='h-4 w-4 text-green-500' />
              <span>API access</span>
            </div>
          )}
        </div>

        {/* Limitations */}
        {plan.limitations.length > 0 && (
          <>
            <Separator />
            <div className='space-y-2'>
              {plan.limitations.map((limitation, idx) => (
                <div
                  key={idx}
                  className='flex items-center space-x-2 text-sm text-muted-foreground'
                >
                  <X className='h-4 w-4' />
                  <span>{limitation}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CTA Button */}
        <Button
          asChild
          className={`w-full rounded-2xl ${
            plan.badge === 'Most Popular'
              ? 'bg-primary hover:bg-primary/90'
              : plan.name === 'Free'
                ? 'bg-gray-600 hover:bg-gray-700'
                : ''
          }`}
          variant={
            plan.name === 'Free' ? 'default' : plan.badge === 'Most Popular' ? 'default' : 'outline'
          }
        >
          <Link
            href={plan.name === 'Free' ? '/register' : `/checkout?plan=${plan.name.toLowerCase()}`}
          >
            {plan.name === 'Free' ? 'Get Started Free' : `Choose ${plan.name}`}
            <ArrowRight className='ml-2 h-4 w-4' />
          </Link>
        </Button>

        {plan.name === 'Enterprise' && (
          <Button variant='ghost' asChild className='w-full text-sm'>
            <Link href='/contact'>Contact Sales</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
