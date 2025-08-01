import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

interface Referral {
  name: string;
  earnings: string;
}

export function EarningsBreakdown({
  topReferrals,
}: {
  topReferrals: Referral[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Earnings Breakdown</CardTitle>
        <CardDescription>Your referral earnings over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <span className="text-sm">This Month</span>
            <span className="font-semibold">$45.20</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <span className="text-sm">Last Month</span>
            <span className="font-semibold">$67.80</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
            <span className="text-sm">Total Earned</span>
            <span className="font-semibold text-lg">$486.50</span>
          </div>
        </div>
        <div className="pt-4">
          <h3 className="font-semibold mb-2">Top Referrals</h3>
          <div className="space-y-2">
            {topReferrals.map((referral, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <span>{referral.name}</span>
                <span className="font-medium">{referral.earnings}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
