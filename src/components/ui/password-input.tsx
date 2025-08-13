import { PasswordStrengthIndicator } from '@/app/(main)/(auth)/register/components/password-strength-indicator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { useState } from 'react';

export default function PasswordInput({
  className,
  value,
  passwordStrengthIndicator = false,
  showIcon = false,
  ...props
}: React.ComponentProps<'input'> & {
  passwordStrengthIndicator?: boolean;
  showIcon?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='space-y-2'>
      <div className='relative'>
        {showIcon && (
          <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        )}
        <Input
          id='password'
          type={showPassword ? 'text' : 'password'}
          placeholder='Enter your password'
          className={cn('pr-10', className, {
            'pl-10': showIcon,
          })}
          required
          value={value}
          {...props}
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
      {passwordStrengthIndicator && (
        <PasswordStrengthIndicator password={value?.toString() || ''} />
      )}
    </div>
  );
}

// export function PasswordInputWithStrengthIndicator({
//   password,
//   ...props
// }: React.ComponentProps<'input'> & { password: string }) {
//   return (
//     <div className="space-y-2">
//       <PasswordInput {...props} />
//       <PasswordStrengthIndicator password={password} />
//     </div>
//   );
// }

// export function PasswordInputWithStrengthIndicatorAndIcon({
//   password,
//   ...props
// }: React.ComponentProps<'input'> & { password: string }) {
//   return (
//     <div className="relative">
//       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//       <PasswordInputWithStrengthIndicator password={password} {...props} />
//     </div>
//   );
// }
