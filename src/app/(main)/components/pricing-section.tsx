import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    description: 'Perfect for getting started',
    price: '$0',
    period: '/month',
    features: [
      '50% revenue share',
      '5GB storage',
      'Basic analytics',
      'Email support',
    ],
    popular: false,
    buttonText: 'Get Started',
    buttonVariant: 'outline' as const,
  },
  {
    name: 'Pro',
    description: 'For serious creators',
    price: '$19',
    period: '/month',
    features: [
      '70% revenue share',
      'Unlimited storage',
      'Advanced analytics',
      'Priority support',
      'Custom branding',
    ],
    popular: true,
    buttonText: 'Upgrade to Pro',
    buttonVariant: 'default' as const,
  },
];

export function PricingSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose the plan that works for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`border-2 ${
                plan.popular ? 'border-primary relative' : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="text-4xl font-bold mt-4">
                  {plan.price}
                  <span className="text-lg font-normal">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-3"
                    >
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full rounded-2xl"
                  variant={plan.buttonVariant}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
