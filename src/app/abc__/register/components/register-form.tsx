'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { PasswordStrengthIndicator } from './password-strength-indicator';
import { SocialButtons } from './social-buttons';

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    marketingEmails: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Registration logic would go here
    console.log('Registration attempt:', formData);
  };

  return (
    <Card className='border-0 shadow-2xl'>
      <CardHeader className='text-center space-y-2'>
        <CardTitle className='text-2xl font-bold'>Create your account</CardTitle>
        <CardDescription>Start earning from your files today</CardDescription>
      </CardHeader>

      <CardContent className='space-y-6'>
        <SocialButtons />

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <Separator />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 py-1 rounded-sm text-muted-foreground'>
              Or register with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='firstName'>First Name</Label>
              <div className='relative'>
                <User className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
                <Input
                  id='firstName'
                  type='text'
                  placeholder='John'
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  className='pl-10'
                  required
                />
              </div>
            </div>
            <div className='space-y-2'>
              <Label htmlFor='lastName'>Last Name</Label>
              <Input
                id='lastName'
                type='text'
                placeholder='Doe'
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                id='email'
                type='email'
                placeholder='john@example.com'
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                className='pl-10'
                required
              />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                id='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Create a strong password'
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className='pl-10 pr-10'
                required
              />
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4 text-muted-foreground' />
                ) : (
                  <Eye className='h-4 w-4 text-muted-foreground' />
                )}
              </Button>
            </div>

            <PasswordStrengthIndicator password={formData.password} />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                id='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Confirm your password'
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className='pl-10 pr-10'
                required
              />
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className='h-4 w-4 text-muted-foreground' />
                ) : (
                  <Eye className='h-4 w-4 text-muted-foreground' />
                )}
              </Button>
            </div>
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className='text-xs text-red-500'>Passwords do not match</p>
            )}
          </div>

          <div className='space-y-3'>
            <div className='flex items-start space-x-2'>
              <Checkbox
                id='terms'
                checked={formData.agreeTerms}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    agreeTerms: checked as boolean,
                  }))
                }
                required
              />
              <Label htmlFor='terms' className='text-sm leading-relaxed'>
                I agree to the{' '}
                <Link href='/terms' className='text-primary hover:underline'>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href='/privacy' className='text-primary hover:underline'>
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <div className='flex items-start space-x-2'>
              <Checkbox
                id='marketing'
                checked={formData.marketingEmails}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    marketingEmails: checked as boolean,
                  }))
                }
              />
              <Label htmlFor='marketing' className='text-sm leading-relaxed'>
                I&apos;d like to receive product updates and marketing emails
              </Label>
            </div>
          </div>

          <Button
            type='submit'
            className='w-full rounded-2xl'
            disabled={!formData.agreeTerms || formData.password !== formData.confirmPassword}
          >
            Create Account
          </Button>
        </form>

        <div className='text-center text-sm'>
          <span className='text-muted-foreground'>Already have an account? </span>
          <Link href='/login' className='text-primary hover:underline font-medium'>
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
