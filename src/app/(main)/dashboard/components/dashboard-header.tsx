import { Button } from '@/components/ui/button';
import { TrendingUp, Upload } from 'lucide-react';
import Link from 'next/link';

export function DashboardHeader() {
  return (
    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0'>
      <div>
        <h1 className='text-2xl sm:text-3xl font-bold'>Dashboard Overview</h1>
        <p className='text-muted-foreground text-sm sm:text-base'>
          Welcome back! Here&apos;s what&apos;s happening with your files.
        </p>
      </div>
      <div className='flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4'>
        <Button variant='outline' asChild className='w-full sm:w-auto bg-transparent'>
          <Link href='/dashboard/analytics'>
            <TrendingUp className='h-4 w-4 mr-2' />
            View Analytics
          </Link>
        </Button>
        <Button asChild className='w-full sm:w-auto'>
          <Link href='/upload'>
            <Upload className='h-4 w-4 mr-2' />
            Upload File
          </Link>
        </Button>
      </div>
    </div>
  );
}
