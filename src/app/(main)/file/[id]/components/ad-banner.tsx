import { Card, CardContent } from '@/components/ui/card';

interface AdBannerProps {
  type: 'banner' | 'skyscraper' | 'native';
  size?: string;
}

export function AdBanner({ type }: AdBannerProps) {
  const getAdContent = () => {
    switch (type) {
      case 'banner':
        return {
          label: 'Banner Ad (728x90)',
          height: 'h-24',
        };
      case 'skyscraper':
        return {
          label: 'Skyscraper Ad (160x600)',
          height: 'h-96',
        };
      case 'native':
        return {
          label: 'Native Ad',
          height: 'h-32',
        };
      default:
        return {
          label: 'Advertisement',
          height: 'h-24',
        };
    }
  };

  const content = getAdContent();

  return (
    <Card className="border-dashed border-2 border-muted-foreground/20">
      <CardContent className="p-4 text-center">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Advertisement</p>
          <div
            className={`${content.height} bg-muted/50 rounded-lg flex items-center justify-center`}
          >
            <span className="text-muted-foreground text-sm">
              {content.label}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
