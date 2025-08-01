import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function PasswordInput({
  className,
  ...props
}: React.ComponentProps<'input'>) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        id="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        className={cn('pr-10', className)}
        required
        {...props}
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
  );
}
