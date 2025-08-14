export type BillingCycle = 'monthly' | 'yearly';

export type PaymentMethod = 'card' | 'paypal';

export type PlanType = 'free' | 'pro' | 'business' | 'enterprise';

export interface CheckoutFormData {
  // Account Information
  firstName: string;
  lastName: string;
  email: string;
  company: string;

  // Billing Information
  billingFirstName: string;
  billingLastName: string;
  billingEmail: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;

  // Payment Information
  paymentMethod: PaymentMethod;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;

  // Preferences
  sameAsBilling: boolean;
  agreeTerms: boolean;
  marketingEmails: boolean;
}

export interface CheckoutStep {
  number: number;
  title: string;
  description: string;
}

export interface PlanDetails {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  color: string;
  features: readonly string[] | string[];
}

export interface PriceCalculation {
  price: number;
  savings: number;
  discount: number;
  subtotal: number;
  tax: number;
  total: number;
}
