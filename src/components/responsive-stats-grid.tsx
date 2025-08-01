import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
}

interface ResponsiveStatsGridProps {
  stats: StatItem[];
}

export function ResponsiveStatsGrid({ stats }: ResponsiveStatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="transition-all duration-200 hover:shadow-md"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium truncate pr-2">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 flex-shrink-0 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-xl lg:text-2xl font-bold truncate">
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              <span className="text-green-600">{stat.change}</span> from last
              month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
