'use client';
import { DashboardStatsSkeletons } from '@/app/(main)/dashboard/components/dashboard-stats/dashboard-stats-skeletons';
import { useGetMyStats } from '@/app/(main)/dashboard/components/dashboard-stats/querys';
import { ResponsiveStatsGrid } from '@/components/responsive-stats-grid';
import { formatCompactNumber, formatCurrencyNumber } from '@/lib/utils';
import { DollarSign, Download, Eye, FileText } from 'lucide-react';

export function DashboardStats() {
  const { data, isFetching } = useGetMyStats();
  return (
    <>
      {isFetching && <DashboardStatsSkeletons />}
      {data && !isFetching && (
        <ResponsiveStatsGrid
          stats={[
            {
              title: 'Total Earnings',
              value: formatCurrencyNumber(data.totalEarnings),
              change: '+12.5%',
              icon: DollarSign,
              color: 'text-green-600',
            },
            {
              title: 'Total Downloads',
              value: formatCompactNumber(Number(data.totalDownloads)),
              change: '+8.2%',
              icon: Download,
              color: 'text-blue-600',
            },
            {
              title: 'Total Views',
              value: formatCompactNumber(Number(data.totalViews)),
              change: '+15.3%',
              icon: Eye,
              color: 'text-purple-600',
            },
            {
              title: 'Active Files',
              value: formatCompactNumber(Number(data.totalFilesUploaded)),
              change: '+2',
              icon: FileText,
              color: 'text-orange-600',
            },
          ]}
        />
      )}
    </>
  );
}
