'use client';

import { useRouter } from 'next/navigation';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';

const UserNavButtonAtom = () => {
  const router = useRouter();
  const handleLogout = () => {
    // 세션스토리지에서 토큰 삭제코드 추가
    router.push('/login');
  };

  return (
    <div className="ml-auto flex gap-3 text-4">
      <UserButtonAtom
        className="font-semibold"
        buttonStyle="yellow"
        text="1650 Point"
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
