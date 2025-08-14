import { Upload, Zap, Users, Crown } from 'lucide-react';
import type { PlanDetails } from '@/lib/types/checkout.types';

export const CHECKOUT_PLANS = {
  free: {
    name: 'Free',
    description: 'Perfect for getting started',
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: Upload,
    color: 'text-gray-600',
    features: ['5 GB Storage', '10 files/month', '50% Revenue Share', 'Basic Analytics'],
  },
  pro: {
    name: 'Pro',
    description: 'For serious creators',
    monthlyPrice: 19,
    yearlyPrice: 190,
    icon: Zap,
    color: 'text-primary',
    features: [
      '100 GB Storage',
      'Unlimited uploads',
      '70% Revenue Share',
      'Advanced Analytics',
      'Priority Support',
    ],
  },
  business: {
    name: 'Business',
    description: 'For teams and businesses',
    monthlyPrice: 49,
    yearlyPrice: 490,
    icon: Users,
    color: 'text-blue-600',
    features: [
      '500 GB Storage',
      'Unlimited uploads',
      '80% Revenue Share',
      'Team Analytics',
      'API Access',
      'White-label',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    description: 'For large organizations',
    monthlyPrice: 199,
    yearlyPrice: 1990,
    icon: Crown,
    color: 'text-purple-600',
    features: [
      'Unlimited Storage',
      '90% Revenue Share',
      'Custom Dashboard',
      'Dedicated Manager',
      'SLA',
    ],
  },
} satisfies Record<string, PlanDetails>;

export const CHECKOUT_STEPS = [
  { number: 1, title: 'Plan Selection', description: 'Choose your subscription' },
  { number: 2, title: 'Account Info', description: 'Your details' },
  { number: 3, title: 'Payment', description: 'Billing information' },
  { number: 4, title: 'Review', description: 'Confirm your order' },
] as const;

export const COUNTRIES = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
] as const;

export const PROMO_CODES = {
  SAVE20: { discount: 0.2, description: "You've saved 20% on your subscription." },
} as const;

export const TAX_RATE = 0.08; // 8% tax
