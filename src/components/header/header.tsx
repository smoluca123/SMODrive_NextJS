'use client';

import { useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';
import { useAuth } from '@/hooks/use-auth';
import {
  DesktopNavigation,
  UserMenu,
  MobileMenuButton,
  MobileMenu,
  UploadButton,
} from './components';

const navigationItems = [
  {
    label: 'Explore',
    href: '/explore',
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'About',
    href: '/about',
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {} = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container mx-auto flex h-16 items-center justify-between px-4'>
        {/* Logo */}
        <Logo
          className='!size-8'
          classNames={{
            uploadIcon: '!size-8',
          }}
        />

        {/* Desktop Navigation */}
        <DesktopNavigation navigationItems={navigationItems} />

        {/* Right Side Actions */}
        <div className='flex items-center space-x-4'>
          {/* Language Selector */}
          {/* <LanguageSelector /> */}

          <ThemeToggle />

          {/* Upload Button */}
          <UploadButton />

          {/* User Menu or Login */}
          <UserMenu />

          {/* Mobile Menu Button */}
          <MobileMenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        navigationItems={navigationItems}
        isOpen={isMenuOpen}
        onLinkClick={() => setIsMenuOpen(false)}
      />
    </header>
  );
}
