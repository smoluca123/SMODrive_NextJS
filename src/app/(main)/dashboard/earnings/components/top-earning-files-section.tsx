import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, ArrowUpRight } from 'lucide-react';

interface TopEarningFile {
  name: string;
  earnings: number;
  downloads: number;
  trend: string;
}

interface TopEarningFilesSectionProps {
  topEarningFiles: TopEarningFile[];
}

export function TopEarningFilesSection({
  topEarningFiles,
}: TopEarningFilesSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Top Earning Files</CardTitle>
            <CardDescription>
              Your best performing files this month
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            View All
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topEarningFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    #{index + 1}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{file.name}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Download className="h-3 w-3 mr-1" />
                      {file.downloads}
                    </span>
                    <span className="flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {file.trend}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${file.earnings}</p>
                <p className="text-sm text-muted-foreground">Total earned</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
