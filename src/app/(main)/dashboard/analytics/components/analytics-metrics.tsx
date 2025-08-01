import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Download, Users, Globe } from 'lucide-react';

const metrics = [
  {
    title: 'Total Views',
    value: '45,672',
    change: '+15.3%',
    icon: Eye,
    color: 'text-blue-600',
  },
  {
    title: 'Total Downloads',
    value: '12,453',
    change: '+8.2%',
    icon: Download,
    color: 'text-green-600',
  },
  {
    title: 'Unique Visitors',
    value: '8,234',
    change: '+12.1%',
    icon: Users,
    color: 'text-purple-600',
  },
  {
    title: 'Countries',
    value: '47',
    change: '+3',
    icon: Globe,
    color: 'text-orange-600',
  },
];

export function AnalyticsMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{metric.change}</span> from last
              month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
