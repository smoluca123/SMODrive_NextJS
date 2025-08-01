import { DashboardHeader } from './components/dashboard-header';
import { DashboardStats } from './components/dashboard-stats';
import { TopPerformingFilesCard } from './components/top-performing-files-card';
import { RecentActivityCard } from './components/recent-activity-card';
import { QuickActionsCard } from './components/quick-actions-card';

export default function DashboardOverview() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <DashboardHeader />

      {/* Stats Grid */}
      <DashboardStats />

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Top Performing Files */}
        <TopPerformingFilesCard />

        {/* Recent Activity */}
        <RecentActivityCard />
      </div>

      {/* Quick Actions */}
      <QuickActionsCard />
    </div>
  );
}
