'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Heart } from 'lucide-react';
import { BannerAd } from '@/components/ads';
import { useUpdateDownloadSession } from '@/app/(main)/download/[id]/components/mutations';

interface DownloadCountdownProps {
  fileTitle: string;
  uploader: string;
  onReady: () => void;
}

export function DownloadCountdown({ fileTitle, uploader, onReady }: DownloadCountdownProps) {
  const [countdown, setCountdown] = useState(7);
  const [progress, setProgress] = useState(0);
  const { mutate: updateDownloadSession } = useUpdateDownloadSession();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
        setProgress(((7 - countdown) / 7) * 100);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setProgress(100);
      updateDownloadSession({ step: 1 });
      onReady();
    }
  }, [countdown, onReady, updateDownloadSession]);

  return (
    <div className='min-h-screen bg-background flex items-center justify-center'>
      <div className='container mx-auto px-4'>
        <div className='max-w-2xl mx-auto'>
          <Card className='border-0 shadow-2xl'>
            <CardContent className='p-12 text-center space-y-8'>
              {/* Preparing Download */}
              <div className='space-y-4'>
                <div className='h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto'>
                  <Clock className='h-10 w-10 text-primary animate-pulse' />
                </div>
                <h1 className='text-3xl font-bold'>Preparing your download...</h1>
                <p className='text-muted-foreground text-lg'>
                  We&apos;re getting <span className='font-semibold'>{fileTitle}</span> ready for
                  you
                </p>
              </div>

              {/* Countdown Timer */}
              <div className='space-y-6'>
                <div className='text-6xl font-bold text-primary'>{countdown}</div>
                <Progress value={progress} className='h-3 rounded-full' />
                <p className='text-sm text-muted-foreground'>
                  Your download will be ready in {countdown} seconds
                </p>
              </div>

              {/* Ad Placement */}
              {/* <Card className="border-dashed border-2 border-muted-foreground/20 bg-muted/20">
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      Advertisement
                    </p>
                    <div className="h-24 bg-muted/50 rounded-lg flex items-center justify-center">
                      <span className="text-muted-foreground">
                        Ad Space (468x60)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card> */}
              <BannerAd size='medium' />

              {/* Thank You Message */}
              <div className='bg-primary/5 rounded-2xl p-6'>
                <div className='flex items-center justify-center space-x-2 mb-2'>
                  <Heart className='h-5 w-5 text-red-500' />
                  <span className='font-semibold'>Thanks for supporting {uploader}!</span>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Your download helps creators earn money and continue sharing amazing content
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
