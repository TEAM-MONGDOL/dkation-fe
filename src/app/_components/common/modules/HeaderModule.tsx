'use client';

import Image from 'next/image';
import LogoutButtonAtom from '@/_components/common/atoms/LogoutButtonAtom';
import { useRouter } from 'next/navigation';
import { DkationAdminLogo } from '@/_assets/icons';
import ButtonAtom from '../atoms/ButtonAtom';

interface HeaderModuleProps {
  showLogout?: boolean;
}

const HeaderModule = ({ showLogout = true }: HeaderModuleProps) => {
  const router = useRouter();
  return (
    <div className="flex h-6xl w-full items-center justify-between border-b border-stroke-100 px-5 py-3.5">
      <Image
        className="h-auto w-full max-w-40 cursor-pointer object-cover"
        src={DkationAdminLogo}
        alt="logo"
        onClick={() => router.push('/admin')}
      />
      {showLogout && (
        <div className="flex items-center gap-x-4">
          <button
            className="rounded-full bg-cus-200 px-4 py-1.5 text-5 font-bold text-white"
            onClick={() => {
              router.push('/');
            }}
          >
            유저 페이지로 이동
          </button>
          <LogoutButtonAtom />
        </div>
      )}
    </div>
  );
};

export default HeaderModule;
