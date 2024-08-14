import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface Session {
    user: {
      name: number;
      sub: string;
      type: string;
      token: string;
      id: string;
      iat: number;
      exp: number;
      jti: string;
    };
    accessToken: string;
    accountId: number;
    isAdmin: boolean;
  }
}
