import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const recentActivity = [
  {
    action: 'File downloaded',
    file: 'Ultimate UI Design System 2024',
    earnings: '+$0.50',
    time: '2 minutes ago',
  },
  {
    action: 'File downloaded',
    file: 'Mobile App UI Kit',
    earnings: '+$0.50',
    time: '15 minutes ago',
  },
  {
    action: 'File uploaded',
    file: 'Web Templates Bundle',
    earnings: 'Pending',
    time: '1 hour ago',
  },
];

export function RecentActivityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg sm:text-xl'>Recent Activity</CardTitle>
        <CardDescription className='text-sm'>Latest downloads and uploads</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {recentActivity.map((activity, index) => (
            <div key={index} className='flex items-center space-x-3 sm:space-x-4'>
              <Avatar className='h-8 w-8 flex-shrink-0'>
                <AvatarImage src='/placeholder.svg' />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium'>{activity.action}</p>
                <p className='text-xs text-muted-foreground truncate'>{activity.file}</p>
              </div>
              <div className='text-right flex-shrink-0'>
                <Badge
                  variant={activity.earnings === 'Pending' ? 'secondary' : 'default'}
                  className='text-xs'
                >
                  {activity.earnings}
                </Badge>
                <p className='text-xs text-muted-foreground hidden sm:block'>{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
