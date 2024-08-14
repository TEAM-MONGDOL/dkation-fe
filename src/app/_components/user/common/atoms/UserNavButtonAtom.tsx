'use client';

import { useRouter } from 'next/navigation';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import { signOut, useSession } from 'next-auth/react';
import { useGetMemberDetailQuery } from '@/_hooks/common/useGetMemberDetailQuery';

const UserNavButtonAtom = () => {
  const router = useRouter();
  const session = useSession();
  const accountId = String(session.data?.accountId);

  const handleLogout = async () => {
    const result = await signOut({
      redirect: false,
      callbackUrl: '/',
    });

    if (result.url) {
      router.push(result.url);
    }
  };
  const { data: memberDetail, isError: memberDetailIsError } =
    useGetMemberDetailQuery({ accountId, enable: !!session.data });

  if (!session.data) {
    return (
      <div className="ml-auto flex gap-3 text-4">
        <UserButtonAtom
          text="로그인"
          size="header"
          buttonStyle="white"
          type="button"
          onClick={() => router.push('/login')}
        />
      </div>
    );
  }

  return (
    <div className="ml-auto flex gap-3 text-4">
      {session.data.isAdmin ? (
        <UserButtonAtom
          className="font-semibold"
          buttonStyle="black"
          text="관리자 페이지로 이동"
          type="button"
          size="header"
          onClick={() => router.push('/admin')} // 라우팅 주소 변경 예정
        />
      ) : (
        <UserButtonAtom
          className="font-semibold"
          buttonStyle="yellow"
          text={`${memberDetail?.pointQuantity || 0} Point`}
          type="button"
          size="header"
          onClick={() => router.push('/points/history')} // 라우팅 주소 변경 예정
        />
      )}
      <UserButtonAtom
        text="로그아웃"
        size="header"
        buttonStyle="white"
        type="button"
        onClick={handleLogout}
      />
    </div>
  );
};

export default UserNavButtonAtom;
