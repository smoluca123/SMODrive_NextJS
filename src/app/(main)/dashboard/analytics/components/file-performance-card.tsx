import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const topFiles = [
  {
    name: 'Ultimate UI Design System 2024',
    views: 3891,
    downloads: 1247,
    conversionRate: 32,
  },
  {
    name: 'Mobile App UI Kit',
    views: 2156,
    downloads: 892,
    conversionRate: 41,
  },
  {
    name: 'Icon Pack 2024',
    views: 1834,
    downloads: 654,
    conversionRate: 36,
  },
];

export function FilePerformanceCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>File Performance</CardTitle>
            <CardDescription>
              Detailed metrics for your top files
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            View All Files
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topFiles.map((file, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{file.name}</h3>
                <Badge variant="outline">
                  {file.conversionRate}% conversion
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {file.views.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">Views</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {file.downloads.toLocaleString()}
                  </p>
                  <p className="text-muted-foreground">Downloads</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {file.conversionRate}%
                  </p>
                  <p className="text-muted-foreground">Conversion</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
