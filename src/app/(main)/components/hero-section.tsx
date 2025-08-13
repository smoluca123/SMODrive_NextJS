import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5'>
      <div className='container mx-auto px-4 py-20 lg:py-32'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          <div className='space-y-8'>
            <div className='space-y-4'>
              <Badge variant='secondary' className='rounded-full px-4 py-1'>
                🎉 New: Instant payouts now available
              </Badge>
              <h1 className='text-4xl lg:text-6xl font-bold leading-tight'>
                Upload, Share,{' '}
                <span className='bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent'>
                  Earn
                </span>
              </h1>
              <p className='text-xl text-muted-foreground leading-relaxed'>
                Turn your files into income. Upload once, earn forever. Get paid for every download
                with our revolutionary profit-sharing platform.
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4'>
              <Button asChild size='lg' className='rounded-2xl text-lg px-8'>
                <Link href='/upload'>
                  <Upload className='mr-2 h-5 w-5' />
                  Start Uploading
                </Link>
              </Button>
              <Button
                asChild
                variant='outline'
                size='lg'
                className='rounded-2xl text-lg px-8 bg-transparent'
              >
                <Link href='/explore'>
                  Explore Files
                  <ArrowRight className='ml-2 h-5 w-5' />
                </Link>
              </Button>
            </div>

            <div className='flex items-center space-x-8 text-sm text-muted-foreground'>
              <div className='flex items-center space-x-2'>
                <div className='h-2 w-2 bg-green-500 rounded-full animate-pulse'></div>
                <span>1M+ files uploaded</span>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='h-2 w-2 bg-blue-500 rounded-full animate-pulse'></div>
                <span>$2M+ paid to creators</span>
              </div>
            </div>
          </div>

          <div className='relative'>
            <div className='animate-float'>
              <div className='relative bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 backdrop-blur-sm border'>
                <div className='space-y-6'>
                  {/* Upload Step */}
                  <div className='flex items-center space-x-4 p-4 bg-background/50 rounded-2xl border'>
                    <div className='h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center'>
                      <Upload className='h-6 w-6 text-primary' />
                    </div>
                    <div>
                      <h3 className='font-semibold'>Upload</h3>
                      <p className='text-sm text-muted-foreground'>Drag & drop your files</p>
                    </div>
                  </div>

                  {/* Share Step */}
                  <div className='flex items-center space-x-4 p-4 bg-background/50 rounded-2xl border'>
                    <div className='h-12 w-12 bg-blue-500/10 rounded-2xl flex items-center justify-center'>
                      <svg
                        className='h-6 w-6 text-blue-500'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold'>Share</h3>
                      <p className='text-sm text-muted-foreground'>Get instant share links</p>
                    </div>
                  </div>

                  {/* Earn Step */}
                  <div className='flex items-center space-x-4 p-4 bg-background/50 rounded-2xl border'>
                    <div className='h-12 w-12 bg-green-500/10 rounded-2xl flex items-center justify-center'>
                      <svg
                        className='h-6 w-6 text-green-500'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className='font-semibold'>Earn</h3>
                      <p className='text-sm text-muted-foreground'>Get paid per download</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
