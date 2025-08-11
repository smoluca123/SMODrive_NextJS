'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { SidebarContent } from './sidebar-content';

export function MobileSidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="md:hidden fixed top-4 left-4 z-50">
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-background/95 backdrop-blur"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-80">
          <SidebarContent
            collapsed={false}
            onToggle={() => {}}
            isMobile={true}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
