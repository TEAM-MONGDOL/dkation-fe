import { getToken } from 'next-auth/jwt'; // JWT를 사용하는 경우
import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';

const cookieToken = 'next-auth.session-token';

async function getSessionFromRequest(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) return null;

  // 필요한 경우 session 정보를 추가로 가져올 수 있습니다.
  return { ...token };
}

const withAuth = async (request: NextRequest, session: any) => {
  const url = request.nextUrl.clone();
  url.pathname = '/login';

  const token = request.cookies.get(cookieToken);

  if (!token || !session) {
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

const withAdmin = async (request: NextRequest, session: any) => {
  const url = request.nextUrl.clone();
  url.pathname = '/admin/error';

  const token = request.cookies.get(cookieToken);
  const isAdmin = session?.isAdmin;

  if (!token || !isAdmin) {
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

const withoutAuth = async (request: NextRequest, session: any) => {
  const url = request.nextUrl.clone();
  url.pathname = '/';

  const token = request.cookies.get(cookieToken);

  if (token && session) {
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export async function middleware(request: NextRequest) {
  const session = await getSessionFromRequest(request);

  if (request.nextUrl.pathname.startsWith('/login')) {
    console.log('call middleware - /login');

    return await withoutAuth(request, session);
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('call middleware - /admin');

    return await withAdmin(request, session);
  }

  console.log('call middleware - others');

  return await withAuth(request, session);
}

export const config = {
  matcher: [
    '/login/:path*',
    '/workation/:path*',
    '/points/:path*',
    '/support/:path*',
    '/mypage/:path*',
    '/admin',
    '/admin/members/:path*',
    '/admin/notices/:path*',
    '/admin/points/:path*',
    '/admin/workation/:path*',
  ],
};
