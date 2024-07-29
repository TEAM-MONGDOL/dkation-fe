'use client';

import React from 'react';
import HeaderModule from '@/_components/common/modules/HeaderModule';
import NavBarContainer from '@/_components/common/containers/NavBarContainer';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const exceptLayout = ['/admin/login'];

  return !exceptLayout.includes(pathname) ? (
    <div className="flex flex-col h-screen">
      <HeaderModule />
      <div className="grow flex">
        <NavBarContainer />
        <main className="flex-1 px-20 py-16">{children}</main>
      </div>
    </div>
  ) : (
    <div>{children}</div>
  );
};

export default AdminLayout;
