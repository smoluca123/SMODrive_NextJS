import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download } from 'lucide-react';
import { BannerAd } from '@/components/ads';
import { IFileDataType } from '@/lib/types/interfaces/storage.interfaces';
import { formatFileSize } from '@/lib/utils';
import { useCompleteDownloadSession } from '@/app/(main)/download/[id]/components/mutations';
import { useRouter } from 'next/navigation';
import { getCookieApi } from '@/lib/apis/server/next-apis';
import ky from 'ky';
import fileDownload from 'js-file-download';

interface DownloadInfoProps {
  file: IFileDataType;
}

export function DownloadInfo({ file }: DownloadInfoProps) {
  const router = useRouter();
  const { mutate: completeDownloadSession } = useCompleteDownloadSession();
  const handleDownload = async () => {
    try {
      await getCookieApi({ key: 'download-session' });
    } catch {
      router.push('/file/' + file.id);
    }
    completeDownloadSession(undefined, {
      onSuccess: async (data) => {
        // router.push(data.data.downloadUrl);
        if (
          data.data.file.mimetype.startsWith('image/') ||
          data.data.file.mimetype.startsWith('video/') ||
          data.data.file.mimetype.startsWith('audio/')
        ) {
          // For images, force download instead of opening in browser
          const blob = await ky.get(data.data.downloadUrl).blob();
          fileDownload(blob, data.data.file.originalName);
        } else {
          window.location.href = data.data.downloadUrl; //open in new tab instead of redirecting
        }
      },
    });
  };
  return (
    <Card className='border-0 shadow-2xl'>
      <CardContent className='p-12 text-center space-y-8'>
        <div className='space-y-4'>
          <div className='h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto'>
            <CheckCircle className='h-10 w-10 text-green-500' />
          </div>
          <h1 className='text-3xl font-bold'>Your download is ready!</h1>
          <p className='text-muted-foreground text-lg'>
            <span className='font-semibold'>{file.originalName}</span> (
            {formatFileSize(Number(file.size))}) is ready to download
          </p>
        </div>

        <BannerAd size='medium' />

        <Button
          size='lg'
          className='rounded-2xl text-lg px-12 py-6 h-auto'
          onClick={handleDownload}
        >
          <Download className='mr-3 h-6 w-6' />
          Download Now
        </Button>
        <p className='text-xs text-muted-foreground'>
          Download will start automatically. If it doesn&apos;t, click the button above.
        </p>
      </CardContent>
    </Card>
  );
}
