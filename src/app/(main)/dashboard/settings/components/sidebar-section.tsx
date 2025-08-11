import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Globe, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

export function SidebarSection() {
  return (
    <div className="space-y-6">
      {/* Account Status */}
      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Account Type</span>
            <Badge>Free</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Member Since</span>
            <span className="text-sm font-medium">Jan 2024</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Files Uploaded</span>
            <span className="text-sm font-medium">28</span>
          </div>
          <Button className="w-full">Upgrade to Pro</Button>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div>
              <p className="font-medium text-sm">PayPal</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
            <Badge variant="secondary">Primary</Badge>
          </div>
          <Button variant="outline" className="w-full bg-transparent">
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Language & Region
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Language</Label>
            <select className="w-full p-2 border rounded-md">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label>Timezone</Label>
            <select className="w-full p-2 border rounded-md">
              <option>UTC-5 (Eastern Time)</option>
              <option>UTC-8 (Pacific Time)</option>
              <option>UTC+0 (GMT)</option>
              <option>UTC+1 (Central European Time)</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
