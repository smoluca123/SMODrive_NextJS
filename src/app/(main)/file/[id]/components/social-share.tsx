'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { FacebookIcon } from '@/components/ui/facebook-icon';
import { TwitterIcon } from '@/components/ui/twitter-icon';

interface SocialShareProps {
  fileId: string;
  fileTitle: string;
}

export function SocialShare({ fileId, fileTitle }: SocialShareProps) {
  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/file/${fileId}`
      : '';

  const handleShare = async (platform: string) => {
    try {
      if (!window) return;

      switch (platform) {
        case 'twitter':
          window.open(
            `https://twitter.com/intent/tweet?text=Check out this amazing file: ${fileTitle}&url=${encodeURIComponent(
              shareUrl
            )}`,
            '_blank'
          );
          break;
        case 'facebook':
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              shareUrl
            )}`,
            '_blank'
          );
          break;
        case 'copy':
          await navigator.clipboard.writeText(shareUrl);
          toast.success('Link copied to clipboard!');
          break;
      }
    } catch (error) {
      toast.error('Failed to share');
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share this file</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-transparent"
            onClick={() => handleShare('twitter')}
          >
            <TwitterIcon className="mr-2 h-4 w-4 text-foreground" />
            Twitter
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-transparent"
            onClick={() => handleShare('facebook')}
          >
            <FacebookIcon className="mr-2 h-4 w-4" />
            Facebook
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full bg-transparent"
            onClick={() => handleShare('copy')}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
