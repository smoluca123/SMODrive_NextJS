'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, X, Coffee, Info } from 'lucide-react';
import { useDetectAdBlock } from 'adblock-detect-react';
import { usePathname } from 'next/navigation';

export function AdBlockerNotice() {
  const path = usePathname();
  const isAdBlockerDetected = useDetectAdBlock();
  const [isDismissed, setIsDismissed] = useState(false);

  //   useEffect(() => {
  //     // Check if user has previously dismissed the notice
  //     const dismissed = localStorage.getItem('ad-blocker-notice-dismissed');
  //     if (dismissed) {
  //       setIsDismissed(true);
  //     }
  //   }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    // localStorage.setItem('ad-blocker-notice-dismissed', 'true');
  };

  const handleWhitelist = () => {
    // Open instructions for whitelisting
  };

  useEffect(() => {
    setIsDismissed(false);
  }, [path]);

  if (!isAdBlockerDetected || isDismissed) {
    return null;
  }

  return (
    <div className='fixed bottom-4 right-4 z-50 max-w-sm'>
      <Card className='border-primary/20 bg-background/95 backdrop-blur shadow-lg'>
        <CardContent className='p-4'>
          <div className='flex items-start space-x-3'>
            <div className='h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0'>
              <Shield className='h-4 w-4 text-primary' />
            </div>
            <div className='flex-1 space-y-2'>
              <div className='flex items-center justify-between'>
                <h3 className='font-semibold text-sm'>Ad Blocker Detected</h3>
                <Button variant='ghost' size='sm' className='h-6 w-6 p-0' onClick={handleDismiss}>
                  <X className='h-3 w-3' />
                </Button>
              </div>
              <p className='text-xs text-muted-foreground'>
                We respect your choice! Ads help us keep ShareEarn free for everyone.
              </p>
              <div className='flex flex-col space-y-2'>
                <Button
                  size='sm'
                  variant='outline'
                  className='text-xs h-7 bg-transparent'
                  onClick={handleWhitelist}
                >
                  <Info className='h-3 w-3 mr-1' />
                  How to whitelist
                </Button>
                <div className='flex space-x-2'>
                  <Button size='sm' className='text-xs h-7 flex-1'>
                    <Coffee className='h-3 w-3 mr-1' />
                    Support us
                  </Button>
                  <Button size='sm' variant='ghost' className='text-xs h-7' onClick={handleDismiss}>
                    Maybe later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
