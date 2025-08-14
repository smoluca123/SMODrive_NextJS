'use client';

import { Shield, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProcessingOverlayProps {
  isVisible: boolean;
}

export function ProcessingOverlay({ isVisible }: ProcessingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <Card className='w-full max-w-md mx-4'>
        <CardContent className='p-8 text-center space-y-4'>
          <div className='h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
          </div>
          <div>
            <h3 className='text-lg font-semibold'>Processing Payment</h3>
            <p className='text-sm text-muted-foreground'>Please don&apos;t close this window</p>
          </div>
          <Progress value={66} className='h-2' />
          <div className='flex items-center justify-center space-x-4 text-xs text-muted-foreground'>
            <div className='flex items-center space-x-1'>
              <Shield className='h-3 w-3' />
              <span>Secure</span>
            </div>
            <div className='flex items-center space-x-1'>
              <Lock className='h-3 w-3' />
              <span>Encrypted</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
