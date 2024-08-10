'use client';

import { useRouter } from 'next/navigation';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import { useSession } from 'next-auth/react';
import { useGetMemberDetailQuery } from '@/_hooks/common/useGetMemberDetailQuery';

const UserNavButtonAtom = () => {
  const router = useRouter();
  const session = useSession();
  const accountId = String(session.data?.accountId);

  const handleLogout = () => {
    // 세션스토리지에서 토큰 삭제코드 추가
    router.push('/login');
  };

  const { data: memberDetail } = useGetMemberDetailQuery({ accountId });

  return (
    <div className="ml-auto flex gap-3 text-4">
      <UserButtonAtom
        className="font-semibold"
        buttonStyle="yellow"
        text={`${memberDetail?.pointQuantity} Point`}
        type="button"
        size="header"
        onClick={() => router.push('/id/point')} // 라우팅 주소 변경 예정
      />
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
