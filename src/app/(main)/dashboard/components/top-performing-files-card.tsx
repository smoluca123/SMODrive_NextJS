import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const recentFiles = [
  {
    id: '1',
    name: 'Ultimate UI Design System 2024',
    downloads: 1247,
    earnings: 623.5,
    trend: '+15%',
  },
  {
    id: '2',
    name: 'Mobile App UI Kit',
    downloads: 892,
    earnings: 446.0,
    trend: '+8%',
  },
  {
    id: '3',
    name: 'Icon Pack 2024',
    downloads: 654,
    earnings: 327.0,
    trend: '+12%',
  },
];

export function TopPerformingFilesCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg sm:text-xl">
              Top Performing Files
            </CardTitle>
            <CardDescription className="text-sm">
              Your best earning files this month
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
            <Link href="/dashboard/files">
              View All
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentFiles.map((file, index) => (
            <div key={file.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-primary">
                    #{index + 1}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file.downloads} downloads
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-sm">${file.earnings}</p>
                <p className="text-xs text-green-600">{file.trend}</p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="ghost" asChild className="w-full mt-4 sm:hidden">
          <Link href="/dashboard/files">
            View All Files
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
