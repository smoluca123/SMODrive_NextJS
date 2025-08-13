import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export function ViewsDownloadsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Views & Downloads</CardTitle>
        <CardDescription>Performance over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='h-80 flex items-center justify-center text-muted-foreground'>
          <div className='text-center space-y-2'>
            <BarChart3 className='h-12 w-12 mx-auto' />
            <p>Interactive chart would be displayed here</p>
            <p className='text-sm'>Showing views and downloads trend</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
