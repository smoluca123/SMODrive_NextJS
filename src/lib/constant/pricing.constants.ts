import { Upload, Zap, Users, Crown } from 'lucide-react';
import type { Plan, FeatureCategory, FAQ } from '../types/pricing.types';

export const PLANS: Plan[] = [
  {
    name: 'Free',
    description: 'Perfect for getting started',
    monthlyPrice: 0,
    yearlyPrice: 0,
    badge: null,
    icon: Upload,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    features: {
      storage: '5 GB',
      uploads: '10 files/month',
      downloads: 'Unlimited',
      revenue: '50%',
      analytics: 'Basic',
      support: 'Community',
      customization: false,
      priority: false,
      api: false,
      whitelabel: false,
      dedicated: false,
      advanced: false,
    },
    limitations: ['Watermarked downloads', 'Standard upload speed', 'Basic file types only'],
  },
  {
    name: 'Basic',
    description: 'Perfect for getting started',
    monthlyPrice: 10,
    yearlyPrice: 100,
    badge: null,
    icon: Upload,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    features: {
      storage: '10 GB',
      uploads: '100 files/month',
      downloads: 'Unlimited',
      revenue: '60%',
      analytics: 'Basic',
      support: 'Community',
      customization: false,
      priority: false,
      api: false,
      whitelabel: false,
      dedicated: false,
      advanced: false,
    },
    limitations: ['Watermarked downloads', 'Standard upload speed', 'Basic file types only'],
  },
  {
    name: 'Pro',
    description: 'For serious creators',
    monthlyPrice: 19,
    yearlyPrice: 190,
    badge: 'Most Popular',
    icon: Zap,
    color: 'text-primary',
    bgColor: 'bg-primary/5',
    borderColor: 'border-primary',
    features: {
      storage: '100 GB',
      uploads: 'Unlimited',
      downloads: 'Unlimited',
      revenue: '70%',
      analytics: 'Advanced',
      support: 'Priority Email',
      customization: true,
      priority: true,
      api: false,
      whitelabel: false,
      dedicated: false,
      advanced: true,
    },
    limitations: [],
  },
  // {
  //   name: 'Business',
  //   description: 'For teams and businesses',
  //   monthlyPrice: 49,
  //   yearlyPrice: 490,
  //   badge: 'Best Value',
  //   icon: Users,
  //   color: 'text-blue-600',
  //   bgColor: 'bg-blue-50',
  //   borderColor: 'border-blue-200',
  //   features: {
  //     storage: '500 GB',
  //     uploads: 'Unlimited',
  //     downloads: 'Unlimited',
  //     revenue: '80%',
  //     analytics: 'Advanced + Team',
  //     support: 'Priority + Phone',
  //     customization: true,
  //     priority: true,
  //     api: true,
  //     whitelabel: true,
  //     dedicated: false,
  //     advanced: true,
  //   },
  //   limitations: [],
  // },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    monthlyPrice: 199,
    yearlyPrice: 1990,
    badge: 'ENTERPRISE',
    icon: Crown,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    features: {
      storage: 'Unlimited',
      uploads: 'Unlimited',
      downloads: 'Unlimited',
      revenue: '90%',
      analytics: 'Custom Dashboard',
      support: 'Dedicated Manager',
      customization: true,
      priority: true,
      api: true,
      whitelabel: true,
      dedicated: true,
      advanced: true,
    },
    limitations: [],
  },
];

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    category: 'Storage & Uploads',
    features: [
      { name: 'Storage Space', key: 'storage' },
      { name: 'Monthly Uploads', key: 'uploads' },
      { name: 'File Downloads', key: 'downloads' },
      { name: 'File Size Limit', values: ['100 MB', '1 GB', '5 GB', 'Unlimited'] },
      { name: 'Bandwidth', values: ['10 GB/month', '100 GB/month', '500 GB/month', 'Unlimited'] },
    ],
  },
  {
    category: 'Revenue & Earnings',
    features: [
      { name: 'Revenue Share', key: 'revenue' },
      { name: 'Instant Payouts', values: [false, true, true, true] },
      { name: 'Multiple Payment Methods', values: [false, true, true, true] },
      { name: 'Tax Documentation', values: [false, false, true, true] },
    ],
  },
  {
    category: 'Analytics & Insights',
    features: [
      { name: 'Analytics Dashboard', key: 'analytics' },
      { name: 'Download Tracking', values: [true, true, true, true] },
      { name: 'Geographic Data', values: [false, true, true, true] },
      { name: 'Revenue Forecasting', values: [false, false, true, true] },
      { name: 'Custom Reports', values: [false, false, false, true] },
    ],
  },
  {
    category: 'Support & Services',
    features: [
      { name: 'Customer Support', key: 'support' },
      { name: 'Priority Processing', key: 'priority' },
      { name: 'Onboarding Assistance', values: [false, false, true, true] },
      { name: 'Account Manager', key: 'dedicated' },
    ],
  },
  {
    category: 'Customization & Branding',
    features: [
      { name: 'Custom Branding', key: 'customization' },
      { name: 'White-label Solution', key: 'whitelabel' },
      { name: 'Custom Domain', values: [false, false, true, true] },
      { name: 'API Access', key: 'api' },
    ],
  },
  {
    category: 'Advanced Features',
    features: [
      { name: 'Advanced Security', key: 'advanced' },
      { name: 'Team Collaboration', values: [false, false, true, true] },
      { name: 'Bulk Operations', values: [false, true, true, true] },
      { name: 'Version Control', values: [false, false, true, true] },
      { name: 'Automated Workflows', values: [false, false, false, true] },
    ],
  },
];

export const FAQS: FAQ[] = [
  {
    question: 'Can I change my plan anytime?',
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
  },
  {
    question: 'What happens if I exceed my storage limit?',
    answer:
      "We'll notify you when you're approaching your limit. You can either upgrade your plan or purchase additional storage as needed.",
  },
  {
    question: 'Do you offer refunds?',
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, we'll refund your payment in full.",
  },
  {
    question: 'Is there a setup fee?',
    answer:
      'No setup fees, ever. The price you see is the price you pay. No hidden costs or surprise charges.',
  },
  {
    question: 'How does revenue sharing work?',
    answer:
      'You keep the percentage shown in your plan from every download. We handle all payment processing and send you monthly payouts.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Absolutely. You can cancel your subscription at any time. Your account will remain active until the end of your billing period.',
  },
];
