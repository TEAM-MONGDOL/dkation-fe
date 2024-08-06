'use client';

import Image from 'next/image';
import LogoutButtonAtom from '@/_components/common/atoms/LogoutButtonAtom';
import logo from '@/_assets/images/logo_imsy.png';
import { useRouter } from 'next/navigation';

interface HeaderModuleProps {
  showLogout?: boolean;
}

const HeaderModule = ({ showLogout = true }: HeaderModuleProps) => {
  const router = useRouter();
  return (
    <div className="flex h-6xl w-full items-center justify-between border-b border-stroke-100 px-5 py-3.5">
      <Image
        className="h-full max-w-24 cursor-pointer object-contain"
        src={logo}
        alt="logo"
        onClick={() => router.push('/admin')}
      />
      {showLogout && <LogoutButtonAtom />}
    </div>
  );
};

export default HeaderModule;
