import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const topCountries = [
  { country: 'United States', views: 12453, percentage: 27 },
  { country: 'United Kingdom', views: 8234, percentage: 18 },
  { country: 'Germany', views: 6789, percentage: 15 },
  { country: 'Canada', views: 4567, percentage: 10 },
  { country: 'Australia', views: 3456, percentage: 8 },
];

export function TopCountriesCard() {
  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle>Top Countries</CardTitle>
            <CardDescription>Where your audience is located</CardDescription>
          </div>
          <Button variant='ghost' size='sm'>
            View All
            <ArrowUpRight className='h-4 w-4 ml-1' />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {topCountries.map((country, index) => (
            <div key={index} className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div className='h-8 w-8 bg-muted rounded-full flex items-center justify-center'>
                  <span className='text-xs font-semibold'>{index + 1}</span>
                </div>
                <div>
                  <p className='font-medium text-sm'>{country.country}</p>
                  <p className='text-xs text-muted-foreground'>
                    {country.views.toLocaleString()} views
                  </p>
                </div>
              </div>
              <Badge variant='secondary'>{country.percentage}%</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
