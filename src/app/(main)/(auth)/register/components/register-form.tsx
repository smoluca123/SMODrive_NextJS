'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, User } from 'lucide-react';
import { SocialButtons } from './social-buttons';
import PasswordInput from '@/components/ui/password-input';
import { useForm } from 'react-hook-form';
import { registerSchema, RegisterValues } from '@/lib/zod-schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import InputIcon from '@/components/ui/input-icon';
import { useAuth } from '@/hooks/use-auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import LoadingButton from '@/components/ui/LoadingButton';

export function RegisterForm() {
  const { register, isLoading, error } = useAuth();
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const form = useForm<RegisterValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });

  const handleSubmit = async (data: RegisterValues) => {
    console.log('Registration attempt:', data);
    try {
      await register(data);
    } catch (error) {
      console.error(error);
    }
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

        {error && (
          <Alert variant='destructive' className='text-center'>
            <AlertDescription className='justify-items-center'>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <InputIcon Icon={User} {...field} type='text' placeholder='John' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <InputIcon Icon={User} {...field} type='text' placeholder='Doe' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <InputIcon Icon={Mail} {...field} type='email' placeholder='john@example.com' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    {/* <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="john_doe"
                        {...field}
                        className="pl-10"
                        required
                      />
                    </div> */}
                    <InputIcon Icon={User} {...field} type='text' placeholder='john_doe' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput showIcon passwordStrengthIndicator {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput showIcon {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <InputIcon Icon={Phone} {...field} type='tel' placeholder='123-456-7890' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-500">Passwords do not match</p>
                )} */}

            <Separator />

            <div className='space-y-3'>
              <div className='flex items-start space-x-2'>
                <Checkbox
                  id='terms'
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
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
                  checked={marketingEmails}
                  onCheckedChange={(checked) => setMarketingEmails(checked as boolean)}
                />
                <Label htmlFor='marketing' className='text-sm leading-relaxed'>
                  I&apos;d like to receive product updates and marketing emails
                </Label>
              </div>
            </div>

            <LoadingButton
              type='submit'
              className='w-full rounded-2xl'
              loading={isLoading}
              disabled={!agreeTerms || Object.keys(form.formState.errors).length > 0}
            >
              Create Account
            </LoadingButton>
          </form>
        </Form>

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
