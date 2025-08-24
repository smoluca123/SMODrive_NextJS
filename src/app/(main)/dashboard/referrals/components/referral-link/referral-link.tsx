import { HowItWorks } from '@/app/(main)/dashboard/referrals/components/how-it-works';
import { ReferralLinkBox } from '@/app/(main)/dashboard/referrals/components/referral-link-box';

export function ReferralLink() {
  return (
    <div>
      <div className='bg-card rounded-xl shadow p-6 space-y-4'>
        <h2 className='font-semibold text-lg mb-2'>Your Referral Link</h2>
        <ReferralLinkBox />
        <div className='grid grid-cols-2 gap-4 pt-4'>
          <div className='text-center p-4 bg-muted/50 rounded-lg'>
            <p className='text-2xl font-bold'>192</p>
            <p className='text-sm text-muted-foreground'>Link Clicks</p>
          </div>
          <div className='text-center p-4 bg-muted/50 rounded-lg'>
            <p className='text-2xl font-bold'>24</p>
            <p className='text-sm text-muted-foreground'>Conversions</p>
          </div>
        </div>
        <HowItWorks />
      </div>
    </div>
  );
}
