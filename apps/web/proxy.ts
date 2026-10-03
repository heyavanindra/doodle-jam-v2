import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from '@repo/auth/client';

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  const { pathname } = request.nextUrl;

  const isAuthRoute = pathname === '/login' || pathname === '/signup';
  const isDashboardRoute = pathname.startsWith('/dashboard');

  if (!sessionCookie && isDashboardRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (sessionCookie && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};
