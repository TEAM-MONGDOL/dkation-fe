'use client';

import Image from 'next/image';
import LogoutButtonAtom from '@/_components/common/atoms/LogoutButtonAtom';
import logo from '@/_assets/images/logo_imsy.png';
import { useRouter } from 'next/navigation';

const HeaderModule = () => {
  const router = useRouter();
  return (
    <div className="flex h-6xl items-center justify-between border-b border-stroke-100 px-5 py-3.5">
      <Image
        className="h-full max-w-24 cursor-pointer object-contain"
        src={logo}
        alt="logo"
        onClick={() => router.push('/admin')}
      />
      <LogoutButtonAtom />
    </div>
  );
};

export default HeaderModule;
