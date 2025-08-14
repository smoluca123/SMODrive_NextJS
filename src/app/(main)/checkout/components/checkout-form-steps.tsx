'use client';

import { Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreditCard, Shield, Lock } from 'lucide-react';
import Link from 'next/link';
import { COUNTRIES } from '@/lib/constant/checkout.constants';
import type { CheckoutFormData, BillingCycle, PlanDetails } from '@/lib/types/checkout.types';

interface CheckoutFormStepsProps {
  currentStep: number;
  formData: CheckoutFormData;
  billingCycle: BillingCycle;
  selectedPlan: PlanDetails;
  onInputChange: (field: string, value: string | boolean) => void;
  onBillingCycleChange: (cycle: BillingCycle) => void;
}

export function CheckoutFormSteps({
  currentStep,
  formData,
  billingCycle,
  selectedPlan,
  onInputChange,
  onBillingCycleChange,
}: CheckoutFormStepsProps) {
  const savings =
    billingCycle === 'yearly' ? selectedPlan.monthlyPrice * 12 - selectedPlan.yearlyPrice : 0;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Select Billing Cycle</h3>
              <RadioGroup value={billingCycle} onValueChange={onBillingCycleChange}>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer'>
                    <RadioGroupItem value='monthly' id='monthly' />
                    <Label htmlFor='monthly' className='flex-1 cursor-pointer'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <p className='font-medium'>Monthly Billing</p>
                          <p className='text-sm text-muted-foreground'>Pay month by month</p>
                        </div>
                        <div className='text-right'>
                          <p className='font-semibold'>${selectedPlan.monthlyPrice}/month</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className='flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer relative'>
                    <RadioGroupItem value='yearly' id='yearly' />
                    <Label htmlFor='yearly' className='flex-1 cursor-pointer'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <p className='font-medium'>Yearly Billing</p>
                          <p className='text-sm text-muted-foreground'>Save ${savings} per year</p>
                        </div>
                        <div className='text-right'>
                          <p className='font-semibold'>${selectedPlan.yearlyPrice}/year</p>
                          <p className='text-sm text-muted-foreground line-through'>
                            ${selectedPlan.monthlyPrice * 12}/year
                          </p>
                        </div>
                      </div>
                    </Label>
                    {savings > 0 && (
                      <Badge className='absolute -top-2 -right-2 bg-green-500'>
                        Save {Math.round((savings / (selectedPlan.monthlyPrice * 12)) * 100)}%
                      </Badge>
                    )}
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-4'>Plan Features</h3>
              <div className='space-y-2'>
                {selectedPlan.features.map((feature, index) => (
                  <div key={index} className='flex items-center space-x-2'>
                    <Check className='h-4 w-4 text-green-500' />
                    <span className='text-sm'>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Account Information</h3>
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='firstName'>First Name *</Label>
                  <Input
                    id='firstName'
                    value={formData.firstName}
                    onChange={(e) => onInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='lastName'>Last Name *</Label>
                  <Input
                    id='lastName'
                    value={formData.lastName}
                    onChange={(e) => onInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
                <div className='space-y-2 md:col-span-2'>
                  <Label htmlFor='email'>Email Address *</Label>
                  <Input
                    id='email'
                    type='email'
                    value={formData.email}
                    onChange={(e) => onInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div className='space-y-2 md:col-span-2'>
                  <Label htmlFor='company'>Company (Optional)</Label>
                  <Input
                    id='company'
                    value={formData.company}
                    onChange={(e) => onInputChange('company', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-lg font-semibold mb-4'>Billing Address</h3>
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='billingFirstName'>First Name *</Label>
                  <Input
                    id='billingFirstName'
                    value={formData.billingFirstName}
                    onChange={(e) => onInputChange('billingFirstName', e.target.value)}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='billingLastName'>Last Name *</Label>
                  <Input
                    id='billingLastName'
                    value={formData.billingLastName}
                    onChange={(e) => onInputChange('billingLastName', e.target.value)}
                    required
                  />
                </div>
                <div className='space-y-2 md:col-span-2'>
                  <Label htmlFor='billingAddress'>Address *</Label>
                  <Input
                    id='billingAddress'
                    value={formData.billingAddress}
                    onChange={(e) => onInputChange('billingAddress', e.target.value)}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='billingCity'>City *</Label>
                  <Input
                    id='billingCity'
                    value={formData.billingCity}
                    onChange={(e) => onInputChange('billingCity', e.target.value)}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='billingState'>State/Province *</Label>
                  <Input
                    id='billingState'
                    value={formData.billingState}
                    onChange={(e) => onInputChange('billingState', e.target.value)}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='billingZip'>ZIP/Postal Code *</Label>
                  <Input
                    id='billingZip'
                    value={formData.billingZip}
                    onChange={(e) => onInputChange('billingZip', e.target.value)}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='billingCountry'>Country *</Label>
                  <Select
                    value={formData.billingCountry}
                    onValueChange={(value) => onInputChange('billingCountry', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select country' />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Payment Method</h3>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => onInputChange('paymentMethod', value)}
              >
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3 p-4 border rounded-lg'>
                    <RadioGroupItem value='card' id='card' />
                    <Label htmlFor='card' className='flex items-center space-x-2 cursor-pointer'>
                      <CreditCard className='h-5 w-5' />
                      <span>Credit/Debit Card</span>
                    </Label>
                  </div>
                  <div className='flex items-center space-x-3 p-4 border rounded-lg opacity-50'>
                    <RadioGroupItem value='paypal' id='paypal' disabled />
                    <Label htmlFor='paypal' className='flex items-center space-x-2'>
                      <div className='h-5 w-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold'>
                        P
                      </div>
                      <span>PayPal (Coming Soon)</span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {formData.paymentMethod === 'card' && (
              <div>
                <h3 className='text-lg font-semibold mb-4'>Card Information</h3>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='cardNumber'>Card Number *</Label>
                    <Input
                      id='cardNumber'
                      placeholder='1234 5678 9012 3456'
                      value={formData.cardNumber}
                      onChange={(e) => onInputChange('cardNumber', e.target.value)}
                      required
                    />
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='expiryDate'>Expiry Date *</Label>
                      <Input
                        id='expiryDate'
                        placeholder='MM/YY'
                        value={formData.expiryDate}
                        onChange={(e) => onInputChange('expiryDate', e.target.value)}
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='cvv'>CVV *</Label>
                      <Input
                        id='cvv'
                        placeholder='123'
                        value={formData.cvv}
                        onChange={(e) => onInputChange('cvv', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='cardName'>Name on Card *</Label>
                    <Input
                      id='cardName'
                      value={formData.cardName}
                      onChange={(e) => onInputChange('cardName', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div className='flex items-center justify-center space-x-4 text-sm text-muted-foreground'>
              <div className='flex items-center space-x-1'>
                <Shield className='h-4 w-4' />
                <span>SSL Encrypted</span>
              </div>
              <div className='flex items-center space-x-1'>
                <Lock className='h-4 w-4' />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className='space-y-6'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Order Summary</h3>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span>Account Holder</span>
                  <span className='font-medium'>
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Email</span>
                  <span className='font-medium'>{formData.email}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Plan</span>
                  <span className='font-medium'>{selectedPlan.name}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Billing Cycle</span>
                  <span className='font-medium capitalize'>{billingCycle}</span>
                </div>
                <div className='flex items-center justify-between'>
                  <span>Payment Method</span>
                  <span className='font-medium'>
                    •••• •••• •••• {formData.cardNumber.slice(-4)}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='agreeTerms'
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => onInputChange('agreeTerms', checked as boolean)}
                required
              />
              <Label htmlFor='agreeTerms' className='text-sm'>
                I agree to the{' '}
                <Link href='/terms' className='text-primary hover:underline'>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href='/privacy' className='text-primary hover:underline'>
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='marketingEmails'
                checked={formData.marketingEmails}
                onCheckedChange={(checked) => onInputChange('marketingEmails', checked as boolean)}
              />
              <Label htmlFor='marketingEmails' className='text-sm'>
                Send me product updates and marketing emails
              </Label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return renderStepContent();
}
