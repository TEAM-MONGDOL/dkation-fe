// middleware.ts
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
      if (!req.nextauth.token || !req.nextauth.token.isAdmin) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
    } else if (pathname !== '/login' && pathname !== '/') {
      if (!req.nextauth.token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ['/admin/:path*', '/points/:path*', '/workation/:path*'],
};
