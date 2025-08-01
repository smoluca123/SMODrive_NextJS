import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export function RevenueChartSection() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Revenue Over Time</CardTitle>
        <CardDescription>Your earnings for the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-center justify-center text-muted-foreground">
          <div className="text-center space-y-2">
            <TrendingUp className="h-12 w-12 mx-auto" />
            <p>Revenue chart visualization would be here</p>
            <p className="text-sm">Showing steady growth trend</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
