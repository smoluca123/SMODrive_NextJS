'use client';

import { Progress } from '@/components/ui/progress';
import { Check, X } from 'lucide-react';
import { z } from 'zod';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  // Function to check individual requirements using Zod schema
  const validateRequirement = (schema: z.ZodType): boolean => {
    const result = schema.safeParse(password);
    return result.success;
  };

  // Define password requirements with their validation schemas
  const passwordRequirements = [
    {
      label: 'At least 8 characters',
      met: validateRequirement(z.string().min(8)),
    },
    {
      label: 'One uppercase letter',
      met: validateRequirement(z.string().regex(/[A-Z]/)),
    },
    {
      label: 'One lowercase letter',
      met: validateRequirement(z.string().regex(/[a-z]/)),
    },
    {
      label: 'One number or symbol',
      met: validateRequirement(z.string().regex(/[0-9]|[^A-Za-z0-9]/)),
    },
  ];

  // Calculate password strength based on requirements met
  const getPasswordStrength = (): number => {
    return passwordRequirements.reduce((strength, req) => {
      return req.met ? strength + 25 : strength;
    }, 0);
  };

  const getStrengthLabel = (strength: number) => {
    if (strength === 0) return '';
    if (strength <= 25) return 'Weak';
    if (strength <= 50) return 'Fair';
    if (strength <= 75) return 'Good';
    return 'Strong';
  };

  // Calculate password strength
  const passwordStrength = getPasswordStrength();

  if (!password) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Password strength</span>
        <span
          className={`text-xs font-medium ${
            passwordStrength <= 25
              ? 'text-red-500'
              : passwordStrength <= 50
              ? 'text-yellow-500'
              : passwordStrength <= 75
              ? 'text-blue-500'
              : 'text-green-500'
          }`}
        >
          {getStrengthLabel(passwordStrength)}
        </span>
      </div>
      <Progress value={passwordStrength} className="h-2" />

      <div className="space-y-1">
        {passwordRequirements.map((req, index) => (
          <div key={index} className="flex items-center space-x-2 text-xs">
            {req.met ? (
              <Check className="h-3 w-3 text-green-500" />
            ) : (
              <X className="h-3 w-3 text-muted-foreground" />
            )}
            <span
              className={req.met ? 'text-green-600' : 'text-muted-foreground'}
            >
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
