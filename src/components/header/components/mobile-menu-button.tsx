'use client';

import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export function MobileMenuButton({ isMenuOpen, toggleMenu }: MobileMenuButtonProps) {
  return (
    <Button
      variant='ghost'
      size='sm'
      className='md:hidden transition-transform duration-200'
      onClick={toggleMenu}
    >
      <div className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
        {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
      </div>
    </Button>
  );
}
