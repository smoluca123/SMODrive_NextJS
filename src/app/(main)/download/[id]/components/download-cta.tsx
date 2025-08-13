import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function DownloadCTA() {
  return (
    <Card className='bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20'>
      <CardContent className='p-8 text-center space-y-6'>
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold'>Want to earn from your own files?</h2>
          <p className='text-muted-foreground'>
            Join thousands of creators who are making money by sharing their files
          </p>
        </div>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild size='lg' className='rounded-2xl'>
            <Link href='/upload'>
              Start Uploading
              <ArrowRight className='ml-2 h-5 w-5' />
            </Link>
          </Button>
          <Button asChild variant='outline' size='lg' className='rounded-2xl bg-transparent'>
            <Link href='/about'>Learn More</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
