import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface BannerAdProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  label?: string;
}

const adSizes = {
  small: { width: '320x50', height: 'h-12' },
  medium: { width: '728x90', height: 'h-24' },
  large: { width: '970x250', height: 'h-32' },
};

export function BannerAd({ size = 'medium', className, label = 'Advertisement' }: BannerAdProps) {
  const { width, height } = adSizes[size];

  return (
    <Card className={cn('border-dashed border-2 border-muted-foreground/20', className)}>
      <CardContent className='p-4 sm:p-6 lg:p-8 text-center'>
        <div className='space-y-2'>
          <p className='text-xs sm:text-sm text-muted-foreground'>{label}</p>
          <div className={cn('bg-muted/50 rounded-lg flex items-center justify-center', height)}>
            <span className='text-muted-foreground text-xs sm:text-sm'>Banner Ad ({width})</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
