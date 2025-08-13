'use server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');

  const isAuthenticated = !!accessToken?.value;

  // Define protected routes
  const protectedPaths = ['/dashboard', '/settings', '/upload'];
  const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));
  // Define authentication routes
  const authPaths = ['/login', '/register', '/forgot-password'];
  const isAuthPath = authPaths.some((path) => request.nextUrl.pathname.startsWith(path));
  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  // Redirect unauthenticated users to login
  if (!isAuthenticated && isProtectedPath) {
    const redirectUrl = new URL('/login', request.url);
    redirectUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }
  return NextResponse.next();
}

// Configure paths that trigger the middleware
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/upload/:path*',
    '/login',
    '/register',
    '/forgot-password',
  ],
};

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };
