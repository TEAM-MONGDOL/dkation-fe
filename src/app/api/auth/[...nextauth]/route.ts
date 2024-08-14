import api from '@/_hooks/Axios';
import axios from 'axios';
import dayjs from 'dayjs';
import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signOut } from 'next-auth/react';

type ExtendedUser = User & {
  isAdmin: boolean;
  accessToken: string;
  accountId: number;
};

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        accountId: { label: '아이디', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('로그인 정보가 없습니다.');
        }

        try {
          const authResponse = await api.post('/api/auth/login', credentials);

          if (authResponse.data.data) {
            return {
              id: authResponse.data.data.accountId,
              ...authResponse.data.data,
            };
          }
          throw new Error(authResponse.data.message);
        } catch (error) {
          console.error(error);
          if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response?.data.message || '로그인 실패');
          } else {
            throw new Error('로그인 실패');
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const extendedUser = user as ExtendedUser;

        token = {
          ...token,
          accountId: extendedUser.id,
          isAdmin: extendedUser.isAdmin,
          accessToken: extendedUser.accessToken,
          expiredAt: dayjs().add(10, 'minute').valueOf(), // 밀리초 단위로 수정
        };

        return token;
      }

      console.log('jwt token:', token);

      if (
        token.expiredAt &&
        dayjs(token.expiredAt as number).isBefore(dayjs())
      ) {
        console.log('refresh token');
        const res = await api.get('/api/auth/refresh');
        const { accessToken } = res.data.data;
        if (!accessToken) {
          signOut();
        }
        console.log('new access token:', accessToken);

        token.accessToken = accessToken;
        token.expiredAt = dayjs().add(10, 'minute').valueOf();

        return token;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.isAdmin = token.isAdmin as boolean;
        session.accessToken = token.accessToken as string;
        session.accountId = token.accountId as number;
        session.expiredAt = token.expiredAt as number;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 10, // 10 minutes
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
