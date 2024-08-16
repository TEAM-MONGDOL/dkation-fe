import { DkationAdminLogo } from '@/_assets/icons';
import NavBarContainer from '@/_components/common/containers/NavBarContainer';
import HeaderModule from '@/_components/common/modules/HeaderModule';
import { Metadata } from 'next';
import Image from 'next/image';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Dkation ADMIN',
};

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex h-screen flex-col">
        <HeaderModule />
        <div className="flex grow">
          <NavBarContainer />
          <main className="flex-1 overflow-y-auto px-20 py-6xl">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
