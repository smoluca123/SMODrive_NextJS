import { Button } from '@/components/ui/button';
import { Upload, Globe } from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'API', href: '/api' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact', href: '/contact' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'DMCA', href: '/dmca' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Upload className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold">ShareEarn</span>
            </div>
            <p className="text-muted-foreground">
              The easiest way to monetize your files and build passive income.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <div className="space-y-2 text-sm">
              {footerLinks.product.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <div className="space-y-2 text-sm">
              {footerLinks.support.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <div className="space-y-2 text-sm">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 ShareEarn. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Button variant="ghost" size="sm">
              <Globe className="h-4 w-4 mr-2" />
              English
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
