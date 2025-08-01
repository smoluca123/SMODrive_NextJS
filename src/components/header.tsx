'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Upload, Menu, X, Globe, User, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/logo';
import { useAuth } from '@/hooks/use-auth';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Logo
          className="!size-8"
          classNames={{
            uploadIcon: '!size-8',
          }}
        />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/explore"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                <Globe className="h-4 w-4 mr-2" />
                EN
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
              <DropdownMenuItem>Deutsch</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ThemeToggle />

          {/* Upload Button */}
          <Button asChild className="hidden sm:flex rounded-2xl">
            <Link href="/upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Link>
          </Button>

          {/* User Menu or Login */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.png" alt="User" />
                    <AvatarFallback>{user.lastName}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Link href="/login">
                <Button
                  variant="ghost"
                  // onClick={() => setIsLoggedIn(true)}>
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  variant="ghost"
                  // onClick={() => setIsLoggedIn(true)}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden transition-transform duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div
              className={`transition-transform duration-200 ${
                isMenuOpen ? 'rotate-90' : 'rotate-0'
              }`}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur animate-in slide-in-from-top-2 duration-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/explore"
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/pricing"
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className="block text-sm font-medium hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 border-t space-y-2">
              <Button asChild className="w-full rounded-2xl">
                <Link href="/upload" onClick={() => setIsMenuOpen(false)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Link>
              </Button>
              {!isLoggedIn && (
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setIsLoggedIn(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="w-full rounded-2xl"
                    onClick={() => {
                      setIsLoggedIn(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
