'use client';

import { Card, CardContent } from '@/components/ui/card';
import LoadingButton from '@/components/ui/LoadingButton';
import { setCookieApi } from '@/lib/apis/next-apis';
import { Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { addMinutes } from 'date-fns';
import { useInitiateDownload } from '@/app/(main)/file/[id]/[slug]/components/download-section/mutations';

interface DownloadSectionProps {
  fileId: string;
}

export function DownloadSection({ fileId }: DownloadSectionProps) {
  const { mutate: initiateDownload, isPending } = useInitiateDownload();
  const router = useRouter();

  const handleInitiateDownload = async () => {
    initiateDownload(fileId, {
      onSuccess: async (data) => {
        if (!data) return;
        await setCookieApi({
          key: 'download-session',
          value: data.data.id,
          options: {
            httpOnly: true,
            expires: addMinutes(new Date(), 5).getTime(), //5 minutes
          },
        });
        router.push(`/download/${data.data.fileId}`);
      },
    });
  };
  return (
    <Card className='border-primary/20 bg-primary/5'>
      <CardContent className='p-8 text-center space-y-6'>
        <div className='space-y-2'>
          <h3 className='text-2xl font-bold'>Ready to Download?</h3>
          <p className='text-muted-foreground'>
            Support the creator and get instant access to this amazing file
          </p>
        </div>
        <LoadingButton
          size='lg'
          className='rounded-2xl text-lg px-8 cursor-pointer mx-auto'
          loading={isPending}
          onClick={handleInitiateDownload}
        >
          <Download className='mr-2 h-5 w-5' />
          Download File
        </LoadingButton>
        <p className='text-xs text-muted-foreground'>
          By downloading, you agree to our Terms of Service
        </p>
      </CardContent>
    </Card>
  );
}
