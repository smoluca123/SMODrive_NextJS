import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';
import Link from 'next/link';

interface DownloadSectionProps {
  fileId: string;
}

export function DownloadSection({ fileId }: DownloadSectionProps) {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardContent className="p-8 text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">Ready to Download?</h3>
          <p className="text-muted-foreground">
            Support the creator and get instant access to this amazing file
          </p>
        </div>
        <Button asChild size="lg" className="rounded-2xl text-lg px-8">
          <Link href={`/download/${fileId}`}>
            <Download className="mr-2 h-5 w-5" />
            Download File
          </Link>
        </Button>
        <p className="text-xs text-muted-foreground">
          By downloading, you agree to our Terms of Service
        </p>
      </CardContent>
    </Card>
  );
}
