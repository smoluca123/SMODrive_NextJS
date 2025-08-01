'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Bell } from 'lucide-react';
import { useState } from 'react';

export function NotificationSettings() {
  const [email, setEmail] = useState(true);
  const [download, setDownload] = useState(true);
  const [earnings, setEarnings] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
        <CardDescription>
          Choose what notifications you want to receive
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <Switch checked={email} onCheckedChange={setEmail} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Download Notifications</p>
              <p className="text-sm text-muted-foreground">
                Get notified when someone downloads your files
              </p>
            </div>
            <Switch checked={download} onCheckedChange={setDownload} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Earnings Updates</p>
              <p className="text-sm text-muted-foreground">
                Weekly earnings summary emails
              </p>
            </div>
            <Switch checked={earnings} onCheckedChange={setEarnings} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Emails</p>
              <p className="text-sm text-muted-foreground">
                Tips, feature updates, and promotional content
              </p>
            </div>
            <Switch checked={marketing} onCheckedChange={setMarketing} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
