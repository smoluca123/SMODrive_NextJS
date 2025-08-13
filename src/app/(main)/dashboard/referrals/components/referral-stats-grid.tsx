import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface Stat {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}

export function ReferralStatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>{stat.title}</CardTitle>
            <stat.icon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>{stat.value}</div>
            <p className='text-xs text-muted-foreground'>{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
