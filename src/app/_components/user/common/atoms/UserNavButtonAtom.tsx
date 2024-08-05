'use client';

import { useRouter } from 'next/navigation';

const UserNavButtonAtom = () => {
  const handleLogout = () => {};

  const router = useRouter();
  return (
    <div className="ml-auto flex gap-3 text-4">
      <button
        onClick={() => router.push('/id/point')} // 라우팅 주소 변경 예정
        className="flex h-[34px] items-center rounded-[8px] border bg-primary px-4"
      >
        1650 Point
      </button>
      <div className="flex h-[34px] items-center rounded-[8px] border border-stroke-100 px-4">
        로그아웃
      </div>
    </div>
  );
};

export default UserNavButtonAtom;
