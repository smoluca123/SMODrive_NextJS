import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CreditCard } from 'lucide-react';

interface Transaction {
  type: 'earning' | 'payout';
  description: string;
  amount: string;
  date: string;
}

interface RecentTransactionsSectionProps {
  transactions: Transaction[];
}

export function RecentTransactionsSection({
  transactions,
}: RecentTransactionsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Latest earnings and payouts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    transaction.type === 'earning'
                      ? 'bg-green-500/10'
                      : 'bg-blue-500/10'
                  }`}
                >
                  {transaction.type === 'earning' ? (
                    <DollarSign className="h-4 w-4 text-green-500" />
                  ) : (
                    <CreditCard className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.date}
                  </p>
                </div>
              </div>
              <Badge
                variant={
                  transaction.type === 'earning' ? 'default' : 'secondary'
                }
              >
                {transaction.amount}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
