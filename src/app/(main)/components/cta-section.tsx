import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className='py-20'>
      <div className='container mx-auto px-4 text-center'>
        <div className='max-w-3xl mx-auto space-y-8'>
          <h2 className='text-3xl lg:text-4xl font-bold'>Ready to Start Earning?</h2>
          <p className='text-xl text-muted-foreground'>
            Join thousands of creators who are already making money with their files. Upload your
            first file today and start earning immediately.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button asChild size='lg' className='rounded-2xl text-lg px-8'>
              <Link href='/upload'>
                <Upload className='mr-2 h-5 w-5' />
                Start Uploading Now
              </Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='lg'
              className='rounded-2xl text-lg px-8 bg-transparent'
            >
              <Link href='/about'>Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
