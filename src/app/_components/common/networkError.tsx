'use client';

import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import { useRouter } from 'next/navigation';

const NetworkError = () => {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <p className="text-h3 font-semibold">네트워크 에러가 발생하였습니다.</p>
      <div className="font-md px-6 py-5">
        <UserButtonAtom
          className="rounded-full"
          size="md"
          buttonStyle="black"
          text="홈으로 가기"
          type="button"
          onClick={() => router.push('/')}
        />
      </div>
    </div>
  );
};

export default NetworkError;
