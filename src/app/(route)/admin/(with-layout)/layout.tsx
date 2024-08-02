import NavBarContainer from '@/_components/common/containers/NavBarContainer';
import HeaderModule from '@/_components/common/modules/HeaderModule';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen flex-col">
      <HeaderModule />
      <div className="flex grow">
        <NavBarContainer />
        <main className="flex-1 overflow-y-auto px-20 py-6xl">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
