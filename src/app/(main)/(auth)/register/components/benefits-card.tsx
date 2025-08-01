import { Card, CardContent } from '@/components/ui/card';

export function BenefitsCard() {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="p-4">
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-sm">🎉 Join 50,000+ creators</h3>
          <p className="text-xs text-muted-foreground">
            Start earning from your files immediately after registration
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
