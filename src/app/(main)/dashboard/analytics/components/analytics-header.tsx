import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export function AnalyticsHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Detailed insights into your file performance
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline">
          <Calendar className="h-4 w-4 mr-2" />
          Last 30 days
        </Button>
        <Button variant="outline">Export Data</Button>
      </div>
    </div>
  );
}
