import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, FileText, Upload } from 'lucide-react';
import Link from 'next/link';

export function QuickActionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
        <CardDescription className="text-sm">
          Common tasks and shortcuts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-16 sm:h-20 flex-col space-y-2 bg-transparent"
            asChild
          >
            <Link href="/upload">
              <Upload className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-sm">Upload New File</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-16 sm:h-20 flex-col space-y-2 bg-transparent"
            asChild
          >
            <Link href="/dashboard/files">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-sm">Manage Files</span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="h-16 sm:h-20 flex-col space-y-2 bg-transparent"
            asChild
          >
            <Link href="/dashboard/earnings">
              <DollarSign className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-sm">View Earnings</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
