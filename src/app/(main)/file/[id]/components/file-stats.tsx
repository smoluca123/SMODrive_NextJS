import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface FileStatsProps {
  views: number;
  downloads: number;
  rating: number;
}

export async function FileStats({ views, downloads, rating }: FileStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>File Statistics</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-muted-foreground'>Views</span>
          <span className='font-semibold'>{views.toLocaleString()}</span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-muted-foreground'>Downloads</span>
          <span className='font-semibold'>{downloads.toLocaleString()}</span>
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-sm text-muted-foreground'>Rating</span>
          <div className='flex items-center space-x-1'>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className='h-4 w-4 fill-yellow-400 text-yellow-400' />
            ))}
            <span className='text-sm text-muted-foreground ml-1'>({rating})</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
