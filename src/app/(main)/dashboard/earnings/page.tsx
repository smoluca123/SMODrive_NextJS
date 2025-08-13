import { EarningsHeaderSection } from './components/earnings-header-section';
import { EarningsOverviewGrid } from './components/earnings-overview-grid';
import { RevenueChartSection } from './components/revenue-chart-section';
import { PayoutInfoSection } from './components/payout-info-section';
import { TopEarningFilesSection } from './components/top-earning-files-section';
import { RecentTransactionsSection } from './components/recent-transactions-section';

export default function EarningsPage() {
  const earningsData = [
    { period: 'Today', amount: 45.5, change: '+12%' },
    { period: 'This Week', amount: 287.25, change: '+8%' },
    { period: 'This Month', amount: 1247.8, change: '+15%' },
    { period: 'All Time', amount: 2847.5, change: '+25%' },
  ];

  const topEarningFiles = [
    {
      name: 'Ultimate UI Design System 2024',
      earnings: 623.5,
      downloads: 1247,
      trend: '+15%',
    },
    {
      name: 'Mobile App UI Kit',
      earnings: 446.0,
      downloads: 892,
      trend: '+8%',
    },
    {
      name: 'Icon Pack 2024',
      earnings: 327.0,
      downloads: 654,
      trend: '+12%',
    },
  ];

  const transactions = [
    {
      type: 'earning' as const,
      description: 'File download - Ultimate UI Design System 2024',
      amount: '+$0.50',
      date: '2 minutes ago',
    },
    {
      type: 'earning' as const,
      description: 'File download - Mobile App UI Kit',
      amount: '+$0.50',
      date: '15 minutes ago',
    },
    {
      type: 'payout' as const,
      description: 'PayPal payout',
      amount: '-$500.00',
      date: '2 days ago',
    },
    {
      type: 'earning' as const,
      description: 'File download - Icon Pack 2024',
      amount: '+$0.50',
      date: '1 hour ago',
    },
  ];

  return (
    <div className='p-8 space-y-8'>
      <EarningsHeaderSection />

      <EarningsOverviewGrid earningsData={earningsData} />

      <div className='grid lg:grid-cols-3 gap-8'>
        <RevenueChartSection />
        <PayoutInfoSection />
      </div>

      <TopEarningFilesSection topEarningFiles={topEarningFiles} />

      <RecentTransactionsSection transactions={transactions} />
    </div>
  );
}
