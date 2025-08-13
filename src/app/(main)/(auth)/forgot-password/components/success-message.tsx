'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  email: string;
  onReset: () => void;
}

export function SuccessMessage({ email, onReset }: SuccessMessageProps) {
  return (
    <Card className='border-0 shadow-2xl'>
      <CardContent className='p-8 text-center space-y-6'>
        <div className='h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto'>
          <CheckCircle className='h-8 w-8 text-green-500' />
        </div>

        <div className='space-y-2'>
          <h1 className='text-2xl font-bold'>Check your email</h1>
          <p className='text-muted-foreground'>
            We&apos;ve sent a password reset link to <strong>{email}</strong>
          </p>
        </div>

        <div className='space-y-4'>
          <p className='text-sm text-muted-foreground'>
            Didn&apos;t receive the email? Check your spam folder or try again.
          </p>

          <div className='space-y-2'>
            <Button variant='outline' className='w-full bg-transparent' onClick={onReset}>
              Try different email
            </Button>

            <Button asChild className='w-full rounded-2xl'>
              <Link href='/login'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Back to login
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
