'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Shield } from 'lucide-react';
import { useState } from 'react';

export function PrivacySettings() {
  const [profileVisible, setProfileVisible] = useState(true);
  const [showEarnings, setShowEarnings] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Privacy & Security
        </CardTitle>
        <CardDescription>
          Manage your privacy and security settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Profile Visibility</p>
              <p className="text-sm text-muted-foreground">
                Make your profile visible to other users
              </p>
            </div>
            <Switch
              checked={profileVisible}
              onCheckedChange={setProfileVisible}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Show Earnings</p>
              <p className="text-sm text-muted-foreground">
                Display your earnings on your public profile
              </p>
            </div>
            <Switch checked={showEarnings} onCheckedChange={setShowEarnings} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </p>
            </div>
            <Button variant="outline" size="sm">
              Enable
            </Button>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <Button variant="outline" className="w-full bg-transparent">
            Change Password
          </Button>
          <Button variant="outline" className="w-full bg-transparent">
            Download My Data
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
