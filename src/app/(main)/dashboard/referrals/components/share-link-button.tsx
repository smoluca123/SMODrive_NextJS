'use client';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

export function ShareLinkButton() {
  const referralLink = 'https://shareearn.com/ref/johndoe';
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ShareEarn Referral',
          text: 'Join ShareEarn and earn with me!',
          url: referralLink,
        });
      } catch (e) {
        // user cancelled
        console.log(e);
      }
    } else {
      toast.info('Sharing not supported on this device.');
    }
  };
  return (
    <Button onClick={handleShare} type="button">
      <Share2 className="h-4 w-4 mr-2" />
      Share Link
    </Button>
  );
}
