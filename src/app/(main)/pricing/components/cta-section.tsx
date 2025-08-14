import { Button } from '@/components/ui/button';
import { Shield, Zap, Upload, Headphones } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className='py-16 lg:py-24 bg-gradient-to-r from-primary/10 to-primary/5'>
      <div className='container mx-auto px-4 text-center'>
        <div className='max-w-3xl mx-auto space-y-8'>
          <div className='space-y-4'>
            <h2 className='text-3xl lg:text-4xl font-bold'>Ready to Start Earning?</h2>
            <p className='text-xl text-muted-foreground'>
              Join thousands of creators who are already making money with ShareEarn. Start with our
              free plan and upgrade as you grow.
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button asChild size='lg' className='rounded-2xl text-lg px-8'>
              <Link href='/register'>
                <Upload className='mr-2 h-5 w-5' />
                Start Free Today
              </Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='lg'
              className='rounded-2xl text-lg px-8 bg-transparent'
            >
              <Link href='/contact'>Talk to Sales</Link>
            </Button>
          </div>

          <div className='flex items-center justify-center space-x-8 text-sm text-muted-foreground'>
            <div className='flex items-center space-x-2'>
              <Shield className='h-4 w-4' />
              <span>30-day money back</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Zap className='h-4 w-4' />
              <span>Instant setup</span>
            </div>
            <div className='flex items-center space-x-2'>
              <Headphones className='h-4 w-4' />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
