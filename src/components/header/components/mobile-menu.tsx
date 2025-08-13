'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { UserMenu } from '@/components/header/components/user-menu';
import { useAuth } from '@/hooks/use-auth';

interface MobileMenuProps {
  isOpen: boolean;
  onLinkClick: () => void;
  navigationItems: { label: string; href: string }[];
}

export function MobileMenu({ isOpen, onLinkClick, navigationItems }: MobileMenuProps) {
  const { isAuthenticated } = useAuth();

  if (!isOpen) return null;

  return (
    <div className='md:hidden border-t bg-background/95 backdrop-blur animate-in slide-in-from-top-2 duration-200 absolute top-[65px] left-0 w-full'>
      <div className='container mx-auto px-4 py-4 space-y-4 relative z-10'>
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className='block text-center text-sm font-medium hover:text-primary transition-colors py-2'
            onClick={onLinkClick}
          >
            {item.label}
          </Link>
        ))}

        <Separator />

        {!isAuthenticated && (
          <div className='pt-4 border-t space-y-2'>
            <Button asChild className='w-full rounded-2xl'>
              <Link href='/upload' onClick={onLinkClick}>
                <Upload className='h-4 w-4 mr-2' />
                Upload
              </Link>
            </Button>
            {!isAuthenticated && (
              <div className='space-y-2'>
                <Link href='/login' className='block w-full cursor-pointer'>
                  <Button variant='ghost' className='w-full cursor-pointer' onClick={onLinkClick}>
                    Sign In
                  </Button>
                </Link>
                <Link href='/register' className='block w-full cursor-pointer'>
                  <Button className='w-full cursor-pointer' onClick={onLinkClick}>
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {isAuthenticated && (
          <div className='text-center'>
            <UserMenu />
          </div>
        )}
      </div>
      {/* overlay */}
      <div className='absolute inset-0 bg-black/10 z-0 h-dvh' onClick={onLinkClick} />
    </div>
  );
}
