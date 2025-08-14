import { Badge } from '@/components/ui/badge';
import { Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5'>
      <div className='container mx-auto px-4 py-16 lg:py-24'>
        <div className='text-center space-y-8 max-w-4xl mx-auto'>
          <div className='space-y-4'>
            <Badge variant='secondary' className='rounded-full px-4 py-1'>
              <Sparkles className='h-4 w-4 mr-2' />
              Choose Your Perfect Plan
            </Badge>
            <h1 className='text-4xl lg:text-6xl font-bold leading-tight'>
              Simple, Transparent{' '}
              <span className='bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent'>
                Pricing
              </span>
            </h1>
            <p className='text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
              Start free and scale as you grow. No hidden fees, no surprises. Just straightforward
              pricing that grows with your success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
