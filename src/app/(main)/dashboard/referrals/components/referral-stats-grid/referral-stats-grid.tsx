'use client';
import { useGetRefferalStats } from '@/app/(main)/dashboard/referrals/components/referral-stats-grid/querys';
import { Users, DollarSign, MousePointer, TrendingUp } from 'lucide-react';
import { ReferralStatsGridSkeleton } from '@/app/(main)/dashboard/referrals/components/referral-stats-grid/referral-stats-grid-skeleton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const statsList = [
  {
    id: 1,
    title: 'Total Referrals',
    field: 'totalReferrals',
    icon: Users,
  },
  {
    id: 2,
    title: 'Total Earned',
    field: 'totalEarnings',
    icon: DollarSign,
  },
  {
    id: 3,
    title: 'Total Clicks',
    field: 'totalClicks',
    icon: MousePointer,
  },
  // {
  //   id: 4,
  //   title: 'Conversion Rate',
  //   fi
  //   icon: TrendingUp,
  // },
];

export function ReferralStatsGrid() {
  const { data: referralStats, isFetching } = useGetRefferalStats();
  return (
    <>
      {isFetching && <ReferralStatsGridSkeleton />}

      {referralStats && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {statsList.map((stat) => (
            <Card key={stat.id}>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
                <stat.icon className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{referralStats[stat.field]}</div>
                <p className='text-xs text-muted-foreground'>52%</p>
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>Conversion Rate</CardTitle>
              <TrendingUp className='h-4 w-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {(referralStats.totalClicks === 0
                  ? 1
                  : referralStats.totalReferrals / referralStats.totalClicks) * 100}
                %
              </div>
              <p className='text-xs text-muted-foreground'>52%</p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
