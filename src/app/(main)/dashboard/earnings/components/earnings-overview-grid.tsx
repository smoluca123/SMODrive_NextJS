import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

interface EarningsData {
  period: string;
  amount: number;
  change: string;
}

interface EarningsOverviewGridProps {
  earningsData: EarningsData[];
}

export function EarningsOverviewGrid({
  earningsData,
}: EarningsOverviewGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {earningsData.map((data, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{data.period}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.amount}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{data.change}</span> from
              previous period
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
