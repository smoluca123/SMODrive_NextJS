'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

export function ReferralLinkBox() {
  const referralLink = 'https://shareearn.com/ref/johndoe';
  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Link copied!', {
      description: 'Your referral link has been copied to clipboard.',
    });
  };
  return (
    <div className="flex space-x-2">
      <Input value={referralLink} readOnly className="flex-1" />
      <Button onClick={handleCopyLink} type="button">
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
}
