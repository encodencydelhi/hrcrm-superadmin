import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasSession = request.cookies.get('has_session')?.value === 'true';
  // Set at login (see src/store/authStore.ts); distinguishes a super-admin session from an
  // employer session so this portal can't be reached with an employer login.
  const sessionPortal = request.cookies.get('session_portal')?.value;
  const isRsc = request.headers.has('rsc') || request.nextUrl.searchParams.has('_rsc');

  const isSuperAdminLoginPage = pathname === '/super-admin/login';
  const isSuperAdminArea = pathname.startsWith('/super-admin') && !isSuperAdminLoginPage;

  if (isSuperAdminArea && (!hasSession || sessionPortal !== 'super-admin')) {
    if (isRsc) return NextResponse.next();
    return NextResponse.redirect(new URL('/super-admin/login', request.url));
  }

  if (isSuperAdminLoginPage && hasSession && sessionPortal === 'super-admin') {
    if (isRsc) return NextResponse.next();
    return NextResponse.redirect(new URL('/super-admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/super-admin/:path*'],
};
