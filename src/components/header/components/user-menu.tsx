'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';

export function UserMenu() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-8 w-8 rounded-full cursor-pointer'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src='/placeholder.png' alt='User' />
                <AvatarFallback>{user.lastName}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='center' forceMount>
            <DropdownMenuItem asChild>
              <Link href='/dashboard'>
                <User className='mr-2 h-4 w-4' />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/settings'>
                <Settings className='mr-2 h-4 w-4' />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className='mr-2 h-4 w-4' />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className='hidden sm:flex items-center space-x-2'>
          <Link href='/login'>
            <Button variant='ghost'>Sign In</Button>
          </Link>
          <Link href='/register'>
            <Button variant='ghost'>Sign Up</Button>
          </Link>
        </div>
      )}
    </>
  );
}
