import api from '@/_hooks/Axios';
import axios from 'axios';
import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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
        // console.log('credentials');

        if (!credentials) {
          throw new Error('로그인 정보가 없습니다.');
        }

        try {
          const authResponse = await api.post('/api/auth/login', credentials);
          // console.log(authResponse);

          if (authResponse.data.data) {
            return {
              id: authResponse.data.data.accountId, // id 필드 추가
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
    async jwt({ token, user }) {
      // console.log('Jwt Callback()');
      // console.log(token);
      // console.log(user);
      // authorize 함수의 반환값이 user에 담겨서 넘어온다.
      // user 객체가 있다는 것은 signin이 성공한 직후의 요청
      if (user) {
        const extendedUser = user as ExtendedUser;
        return {
          ...token,
          isAdmin: extendedUser.isAdmin,
          accessToken: extendedUser.accessToken,
          accountId: extendedUser.accountId,
        };
      }
      // user 객체가 없다는 것은 단순 세션 조회를 위한 요청
      // console.log(token);
      return token;
    },

    async session({ session, token }) {
      // console.log('Session Callback()');
      // console.log(session);
      // console.log(token);
      // 4.Jwt Callback으로부터 반환받은 token값을 기존 세션에 추가한다
      if (token) {
        /* eslint-disable no-param-reassign */
        session.user.admin = token.isAdmin as boolean;
        session.accessToken = token.accessToken as string;
        session.accountId = token.accountId as number;
      }
      console.log(session);
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
