import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const trafficSources = [
  { source: 'Direct', visits: 5234, percentage: 45 },
  { source: 'Search Engines', visits: 3456, percentage: 30 },
  { source: 'Social Media', visits: 1789, percentage: 15 },
  { source: 'Referrals', visits: 1167, percentage: 10 },
];

export function TrafficSourcesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic Sources</CardTitle>
        <CardDescription>How users find your files</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {trafficSources.map((source, index) => (
            <div key={index} className='flex items-center justify-between'>
              <div>
                <p className='font-medium text-sm'>{source.source}</p>
                <p className='text-xs text-muted-foreground'>
                  {source.visits.toLocaleString()} visits
                </p>
              </div>
              <Badge variant='secondary'>{source.percentage}%</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
