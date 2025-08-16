'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Flag } from 'lucide-react';
import { toast } from 'sonner';

export function ReportButton() {
  const handleReport = () => {
    // Here you would typically open a modal or navigate to a report form
    toast.info('Report functionality coming soon', {
      description: 'You will be able to report files for inappropriate content.',
    });
  };

  return (
    <Card>
      <CardContent className='p-4'>
        <Button
          variant='outline'
          size='sm'
          className='w-full rounded-2xl bg-transparent'
          onClick={handleReport}
        >
          <Flag className='mr-2 h-4 w-4' />
          Report File
        </Button>
      </CardContent>
    </Card>
  );
}
