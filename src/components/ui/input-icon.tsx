import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export default function InputIcon({
  className,
  Icon,
  ...props
}: React.ComponentProps<'input'> & {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input {...props} className={cn('pl-10', className)} />
    </div>
  );
}
