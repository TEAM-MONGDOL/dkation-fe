import { signOut } from 'next-auth/react';

const LogoutButtonAtom = () => {
  return (
    <button
      className="rounded-full bg-cus-100 px-4 py-1.5 text-5 font-bold"
      onClick={() => {
        signOut({ callbackUrl: '/' });
      }}
    >
      로그아웃
    </button>
  );
};

export default LogoutButtonAtom;
