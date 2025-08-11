'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Mail, Lock } from 'lucide-react';
import { SocialButtons } from './social-buttons';
import { useAuth } from '@/hooks/use-auth';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginValues } from '@/lib/zod-schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import PasswordInput from '@/components/ui/password-input';
import LoadingButton from '@/components/ui/LoadingButton';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function LoginForm() {
  const { login, isLoading, error } = useAuth();

  const form = useForm<LoginValues>({
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const handleSubmit = (credentials: LoginValues) => {
    // Login logic would go here
    console.log('Login attempt:', credentials);

    login(credentials);
  };
  return (
    <Card className="border-0 shadow-2xl">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>Sign in to your account to continue</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <SocialButtons />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 py-1 rounded-sm text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="text-center">
            <AlertDescription className="justify-items-center">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="usernameOrEmail"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="usernameOrEmail"
                        type="text"
                        placeholder="Enter your username or email"
                        className="pl-10"
                        required
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div> */}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <PasswordInput className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <LoadingButton
              type="submit"
              className="w-full rounded-2xl"
              loading={isLoading}
            >
              {!isLoading && 'Sign In'}
            </LoadingButton>
          </form>
        </Form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            Don&apos;t have an account?{' '}
          </span>
          <Link
            href="/register"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
