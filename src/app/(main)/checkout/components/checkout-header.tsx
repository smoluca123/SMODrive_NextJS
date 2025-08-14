import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function CheckoutHeader() {
  return (
    <div className='text-center space-y-4 mb-8'>
      <Link
        href='/pricing'
        className='inline-flex items-center text-sm text-muted-foreground hover:text-foreground'
      >
        <ArrowLeft className='h-4 w-4 mr-2' />
        Back to Pricing
      </Link>
      <h1 className='text-3xl lg:text-4xl font-bold'>Complete Your Purchase</h1>
      <p className='text-muted-foreground'>
        Secure checkout powered by industry-leading encryption
      </p>
    </div>
  );
}
