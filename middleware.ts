import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // Set at login (see src/store/authStore.ts) under a portal-specific name — distinct from
  // crewcam-frontend's 'has_session_employer' so a super-admin session can never be confused
  // with (or cleared by logging out of) an employer session, even though both apps run on
  // the same bare "localhost" host in dev (cookies aren't port-scoped).
  const hasSession = request.cookies.get('has_session_super_admin')?.value === 'true';
  const isRsc = request.headers.has('rsc') || request.nextUrl.searchParams.has('_rsc');

  const isSuperAdminLoginPage = pathname === '/super-admin/login';
  const isSuperAdminArea = pathname.startsWith('/super-admin') && !isSuperAdminLoginPage;

  if (isSuperAdminArea && !hasSession) {
    if (isRsc) return NextResponse.next();
    return NextResponse.redirect(new URL('/super-admin/login', request.url));
  }

  if (isSuperAdminLoginPage && hasSession) {
    if (isRsc) return NextResponse.next();
    return NextResponse.redirect(new URL('/super-admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/super-admin/:path*'],
};
