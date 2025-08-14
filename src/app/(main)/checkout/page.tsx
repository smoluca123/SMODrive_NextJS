'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Lock } from 'lucide-react';

// Components
import { CheckoutHeader } from './components/checkout-header';
import { CheckoutProgress } from './components/checkout-progress';
import { CheckoutFormSteps } from './components/checkout-form-steps';
import { PlanSummary } from './components/plan-summary';
import { PromoCode } from './components/promo-code';
import { PriceBreakdown } from './components/price-breakdown';
import { SecurityNotices } from './components/security-notices';
import { ProcessingOverlay } from './components/processing-overlay';

// Hooks
import { useCheckout } from './hooks/use-checkout';

// Constants
import { CHECKOUT_STEPS } from '@/lib/constant/checkout.constants';

export default function CheckoutPage() {
  const {
    currentStep,
    isProcessing,
    billingCycle,
    promoApplied,
    formData,
    selectedPlan,
    priceCalculation,
    handleInputChange,
    handlePromoApplied,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
    setBillingCycle,
  } = useCheckout();

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <CheckoutHeader />

          {/* Progress Steps */}
          <CheckoutProgress currentStep={currentStep} />

          <div className='grid lg:grid-cols-3 gap-8'>
            {/* Main Content */}
            <div className='lg:col-span-2'>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center space-x-2'>
                    <selectedPlan.icon className={`h-6 w-6 ${selectedPlan.color}`} />
                    <span>{CHECKOUT_STEPS[currentStep - 1].title}</span>
                  </CardTitle>
                  <CardDescription>{CHECKOUT_STEPS[currentStep - 1].description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <CheckoutFormSteps
                    currentStep={currentStep}
                    formData={formData}
                    billingCycle={billingCycle}
                    selectedPlan={selectedPlan}
                    onInputChange={handleInputChange}
                    onBillingCycleChange={setBillingCycle}
                  />

                  {/* Navigation Buttons */}
                  <div className='flex items-center justify-between mt-8 pt-6 border-t'>
                    <Button
                      variant='outline'
                      onClick={handlePrevStep}
                      disabled={currentStep === 1}
                      className='bg-transparent'
                    >
                      <ArrowLeft className='h-4 w-4 mr-2' />
                      Previous
                    </Button>

                    {currentStep < 4 ? (
                      <Button onClick={handleNextStep}>
                        Next Step
                        <ArrowLeft className='h-4 w-4 ml-2 rotate-180' />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={!formData.agreeTerms || isProcessing}
                        className='bg-green-600 hover:bg-green-700'
                      >
                        {isProcessing ? (
                          <>
                            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Lock className='h-4 w-4 mr-2' />
                            Complete Purchase
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className='space-y-6'>
              {/* Plan Summary */}
              <PlanSummary plan={selectedPlan} />

              {/* Promo Code */}
              <PromoCode onPromoApplied={handlePromoApplied} promoApplied={promoApplied} />

              {/* Price Breakdown */}
              <PriceBreakdown
                plan={selectedPlan}
                billingCycle={billingCycle}
                calculation={priceCalculation}
                promoApplied={promoApplied}
              />

              {/* Security Notices */}
              <SecurityNotices />
            </div>
          </div>

          {/* Processing Overlay */}
          <ProcessingOverlay isVisible={isProcessing} />
        </div>
      </div>
    </div>
  );
}
