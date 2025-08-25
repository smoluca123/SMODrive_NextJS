import { ReferralStatsGrid } from './components/referral-stats-grid';
import { EarningsBreakdown } from './components/earnings-breakdown';
import { RecentReferralsList } from './components/recent-referrals-list';
import { ShareLinkButton } from './components/share-link-button';
import { ReferralLink } from '@/app/(main)/dashboard/referrals/components/referral-link';

export default function ReferralsPage() {
  const topReferrals = [
    {
      name: 'Nguyen Van B',
      earnings: '22%',
    },
    {
      name: 'Nguyen Van B',
      earnings: '22%',
    },
    {
      name: 'Nguyen Van B',
      earnings: '22%',
    },
  ];

  return (
    <div className='p-8 space-y-8'>
      {/* Header */}
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0'>
        <div>
          <h1 className='text-3xl font-bold'>Referral Program</h1>
          <p className='text-muted-foreground'>
            Earn 10% commission from users you refer to ShareEarn
          </p>
        </div>
        <ShareLinkButton />
      </div>

      {/* Stats Overview */}
      <ReferralStatsGrid />

      <div className='grid lg:grid-cols-2 gap-8'>
        {/* Referral Link */}
        <ReferralLink />
        {/* Earnings Breakdown */}
        <EarningsBreakdown topReferrals={topReferrals} />
      </div>

      {/* Recent Referrals */}
      <RecentReferralsList />
    </div>
  );
}
