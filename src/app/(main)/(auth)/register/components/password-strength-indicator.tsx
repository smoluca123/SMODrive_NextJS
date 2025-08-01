'use client';

import { Progress } from '@/components/ui/progress';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({
  password,
}: PasswordStrengthIndicatorProps) {
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getStrengthLabel = (strength: number) => {
    if (strength === 0) return '';
    if (strength <= 25) return 'Weak';
    if (strength <= 50) return 'Fair';
    if (strength <= 75) return 'Good';
    return 'Strong';
  };

  const passwordRequirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', met: /[a-z]/.test(password) },
    {
      label: 'One number or symbol',
      met: /[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password),
    },
  ];

  const passwordStrength = getPasswordStrength(password);

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
