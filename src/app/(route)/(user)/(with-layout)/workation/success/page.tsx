'use client';

import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import { useRouter } from 'next/navigation';

const UserWkApplySuccessPage = () => {
  const router = useRouter();
  return (
    <div className="h-[700px]">
      <div className="flex h-[450px] flex-col items-center justify-center gap-16 bg-primary">
        <p className="mt-16 text-center text-h2">
          워케이션 신청이 완료되었습니다.
        </p>
        <UserButtonAtom
          onClick={() => router.push('/mypage/wk-history')}
          className="rounded-[10px]"
          text="신청내역 확인하기"
          size="xl"
          buttonStyle="black"
          type="button"
        />
      </div>
    </div>
  );
};

export default UserWkApplySuccessPage;
