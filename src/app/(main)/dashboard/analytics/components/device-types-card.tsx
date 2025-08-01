import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const deviceTypes = [
  { device: 'Desktop', users: 6789, percentage: 58 },
  { device: 'Mobile', users: 3456, percentage: 30 },
  { device: 'Tablet', users: 1401, percentage: 12 },
];

export function DeviceTypesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Types</CardTitle>
        <CardDescription>User device preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {deviceTypes.map((device, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{device.device}</p>
                <p className="text-xs text-muted-foreground">
                  {device.users.toLocaleString()} users
                </p>
              </div>
              <Badge variant="secondary">{device.percentage}%</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
