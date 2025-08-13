'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, ArrowLeft } from 'lucide-react';
import { SuccessMessage } from './success-message';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Password reset logic would go here
    console.log('Password reset request for:', email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <SuccessMessage email={email} onReset={() => setIsSubmitted(false)} />;
  }

  return (
    <Card className='border-0 shadow-2xl'>
      <CardHeader className='text-center space-y-2'>
        <CardTitle className='text-2xl font-bold'>Forgot your password?</CardTitle>
        <CardDescription>
          No worries! Enter your email and we&apos;ll send you a reset link.
        </CardDescription>
      </CardHeader>

      <CardContent className='space-y-6'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                id='email'
                type='email'
                placeholder='Enter your email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='pl-10'
                required
              />
            </div>
          </div>

          <Button type='submit' className='w-full rounded-2xl'>
            Send Reset Link
          </Button>
        </form>

        <div className='text-center'>
          <Link
            href='/login'
            className='inline-flex items-center text-sm text-primary hover:underline'
          >
            <ArrowLeft className='mr-1 h-4 w-4' />
            Back to login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
