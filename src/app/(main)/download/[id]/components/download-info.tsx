import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download } from 'lucide-react';
import { BannerAd } from '@/components/ads';

interface DownloadInfoProps {
  file: {
    title: string;
    size: string;
  };
}

export function DownloadInfo({ file }: DownloadInfoProps) {
  return (
    <Card className="border-0 shadow-2xl">
      <CardContent className="p-12 text-center space-y-8">
        <div className="space-y-4">
          <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold">Your download is ready!</h1>
          <p className="text-muted-foreground text-lg">
            <span className="font-semibold">{file.title}</span> ({file.size}) is
            ready to download
          </p>
        </div>

        <BannerAd size="medium" />

        <Button size="lg" className="rounded-2xl text-lg px-12 py-6 h-auto">
          <Download className="mr-3 h-6 w-6" />
          Download Now
        </Button>
        <p className="text-xs text-muted-foreground">
          Download will start automatically. If it doesn&apos;t, click the
          button above.
        </p>
      </CardContent>
    </Card>
  );
}
