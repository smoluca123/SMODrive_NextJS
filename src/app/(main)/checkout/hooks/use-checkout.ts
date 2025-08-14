'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { CHECKOUT_PLANS, TAX_RATE } from '@/lib/constant/checkout.constants';
import type {
  CheckoutFormData,
  BillingCycle,
  PlanType,
  PriceCalculation,
  PlanDetails,
} from '@/lib/types/checkout.types';

const initialFormData: CheckoutFormData = {
  // Account Information
  firstName: '',
  lastName: '',
  email: '',
  company: '',

  // Billing Information
  billingFirstName: '',
  billingLastName: '',
  billingEmail: '',
  billingAddress: '',
  billingCity: '',
  billingState: '',
  billingZip: '',
  billingCountry: '',

  // Payment Information
  paymentMethod: 'card',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardName: '',

  // Preferences
  sameAsBilling: true,
  agreeTerms: false,
  marketingEmails: true,
};

export function useCheckout() {
  const searchParams = useSearchParams();
  const planParam = (searchParams.get('plan') || 'pro') as PlanType;

  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('yearly');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);

  const selectedPlan = (CHECKOUT_PLANS[planParam] || CHECKOUT_PLANS.pro) as PlanDetails;

  const calculatePrices = (): PriceCalculation => {
    const price = billingCycle === 'yearly' ? selectedPlan.yearlyPrice : selectedPlan.monthlyPrice;
    const savings =
      billingCycle === 'yearly' ? selectedPlan.monthlyPrice * 12 - selectedPlan.yearlyPrice : 0;
    const discount = promoApplied ? price * promoDiscount : 0;
    const subtotal = price - discount;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    return { price, savings, discount, subtotal, tax, total };
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePromoApplied = (applied: boolean, discount: number) => {
    setPromoApplied(applied);
    setPromoDiscount(discount);
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    toast.success('Payment successful!', {
      description: 'Welcome to ShareEarn! Your account has been activated.',
    });

    setIsProcessing(false);
    // Redirect to dashboard or success page
  };

  return {
    // State
    currentStep,
    isProcessing,
    billingCycle,
    promoApplied,
    formData,
    selectedPlan,

    // Calculated values
    priceCalculation: calculatePrices(),

    // Handlers
    handleInputChange,
    handlePromoApplied,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    setBillingCycle,
  };
}
