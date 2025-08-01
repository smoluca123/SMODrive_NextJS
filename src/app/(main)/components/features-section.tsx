import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, Shield, Zap, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: DollarSign,
    iconColor: 'text-primary',
    bgColor: 'bg-primary/10',
    title: 'Earn from Every Download',
    description:
      'Get paid instantly when someone downloads your files. Higher quality content earns more.',
  },
  {
    icon: Shield,
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    title: 'Secure File Storage',
    description:
      'Enterprise-grade security with end-to-end encryption. Your files are safe with us.',
  },
  {
    icon: Zap,
    iconColor: 'text-green-500',
    bgColor: 'bg-green-500/10',
    title: 'Instant Upload & Share',
    description:
      'Lightning-fast uploads with instant shareable links. Start earning in seconds.',
  },
  {
    icon: BarChart3,
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    title: 'Analytics Dashboard',
    description:
      'Track your earnings, downloads, and performance with detailed analytics.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Why Choose ShareEarn?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to monetize your files and build a sustainable
            income stream.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="text-center">
                <div
                  className={`h-16 w-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <feature.icon className={`h-8 w-8 ${feature.iconColor}`} />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
