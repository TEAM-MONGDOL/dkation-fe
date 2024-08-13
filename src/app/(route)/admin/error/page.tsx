'use client';

import { DkationAdminLogo } from '@/_assets/icons';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import HeaderModule from '@/_components/common/modules/HeaderModule';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const AdminErrorPage = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <HeaderModule showLogout={false} />
      <div className="flex w-full max-w-md grow flex-col items-center justify-center gap-y-10">
        <Image src={DkationAdminLogo} alt="Dkation Admin Logo" width={300} />
        <p className="text-center">
          관리자 권한이 필요한 페이지입니다.
          <br />
          관리자 계정으로 로그인 후 이용해주세요.
        </p>
        <div className="flex w-full items-center gap-x-4">
          <ButtonAtom
            width="grow"
            buttonStyle="yellow"
            text="메인페이지로 돌아가기"
            type="button"
            onClick={() => {
              router.push('/');
            }}
          />
          <ButtonAtom
            width="grow"
            buttonStyle="dark"
            text="관리자 권한 로그인하기"
            type="button"
            onClick={() => {
              signOut({
                callbackUrl: '/login',
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminErrorPage;
