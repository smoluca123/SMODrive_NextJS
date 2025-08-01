import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Referral {
  name: string;
  email: string;
  joinDate: string;
  earnings: string;
  status: string;
}

export function RecentReferralsList({ referrals }: { referrals: Referral[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Referrals</CardTitle>
        <CardDescription>
          Users who joined through your referral link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {referrals.map((referral, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.png" />
                  <AvatarFallback>
                    {referral.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{referral.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {referral.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">{referral.earnings}</p>
                  <p className="text-xs text-muted-foreground">
                    Joined {new Date(referral.joinDate).toLocaleDateString()}
                  </p>
                </div>
                <Badge
                  variant={
                    referral.status === 'active' ? 'default' : 'secondary'
                  }
                >
                  {referral.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
