'use client';

import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageSelector() {
  return (
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
  );
}
