import { AnalyticsHeader } from './components/analytics-header';
import { AnalyticsMetrics } from './components/analytics-metrics';
import { ViewsDownloadsChart } from './components/views-downloads-chart';
import { TopCountriesCard } from './components/top-countries-card';
import { FilePerformanceCard } from './components/file-performance-card';
import { TrafficSourcesCard } from './components/traffic-sources-card';
import { DeviceTypesCard } from './components/device-types-card';

export default function AnalyticsPage() {
  return (
    <div className='p-8 space-y-8'>
      {/* Header */}
      <AnalyticsHeader />

      {/* Metrics Overview */}
      <AnalyticsMetrics />

      <div className='grid lg:grid-cols-2 gap-8'>
        {/* Views & Downloads Chart */}
        <ViewsDownloadsChart />

        {/* Top Countries */}
        <TopCountriesCard />
      </div>

      {/* File Performance */}
      <FilePerformanceCard />

      {/* Traffic Sources */}
      <div className='grid lg:grid-cols-2 gap-8'>
        <TrafficSourcesCard />
        <DeviceTypesCard />
      </div>
    </div>
  );
}
