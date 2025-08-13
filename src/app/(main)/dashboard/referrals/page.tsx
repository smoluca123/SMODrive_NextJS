import { ReferralStatsGrid } from './components/referral-stats-grid';
import { EarningsBreakdown } from './components/earnings-breakdown';
import { HowItWorks } from './components/how-it-works';
import { RecentReferralsList } from './components/recent-referrals-list';
import { ReferralLinkBox } from './components/referral-link-box';
import { ShareLinkButton } from './components/share-link-button';

import { Users, DollarSign, TrendingUp } from 'lucide-react';

export default function ReferralsPage() {
  const referralStats = [
    {
      title: 'Total Referrals',
      value: '24',
      change: '+3 this month',
      icon: Users,
    },
    {
      title: 'Total Earned',
      value: '$486.50',
      change: '+$45.20 this month',
      icon: DollarSign,
    },
    {
      title: 'Conversion Rate',
      value: '12.5%',
      change: '+2.1% improvement',
      icon: TrendingUp,
    },
  ];

  const recentReferrals = [
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      joinDate: '2024-01-20',
      earnings: '$24.50',
      status: 'active',
    },
    {
      name: 'Bob Smith',
      email: 'bob@example.com',
      joinDate: '2024-01-18',
      earnings: '$18.75',
      status: 'active',
    },
    {
      name: 'Carol Davis',
      email: 'carol@example.com',
      joinDate: '2024-01-15',
      earnings: '$31.20',
      status: 'active',
    },
    {
      name: 'David Wilson',
      email: 'david@example.com',
      joinDate: '2024-01-12',
      earnings: '$12.30',
      status: 'pending',
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
      <ReferralStatsGrid stats={referralStats} />

      <div className='grid lg:grid-cols-2 gap-8'>
        {/* Referral Link */}
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
        {/* Earnings Breakdown */}
        <EarningsBreakdown topReferrals={recentReferrals.slice(0, 3)} />
      </div>

      {/* Recent Referrals */}
      <RecentReferralsList referrals={recentReferrals} />
    </div>
  );
}
