import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // 로그인 상태일 경우 true 반환, 비로그인 시 false 반환
      return !!token;
    },
  },
  pages: {
    signIn: '/login', // 비로그인 시 리다이렉션될 로그인 페이지
  },
});

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token =
    req.cookies.get('next-auth.session-token') ||
    req.cookies.get('__Secure-next-auth.session-token');
  console.log('middleware', token);
  // 로그인하지 않은 상태에서 보호된 페이지에 접근 시 로그인 페이지로 리다이렉트
  if (!token && pathname !== '/' && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 로그인 상태에서 /login 페이지로 접근 시 홈으로 리다이렉션
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 다른 모든 요청은 기본적으로 통과
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/points/:path*',
    '/workation/:path*',
    '/support/:path*',
    '/mypage/:path*',
  ],
};
