import NavBarContainer from '@/_components/common/containers/NavBarContainer';
import HeaderModule from '@/_components/common/modules/HeaderModule';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AdminPointsLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-screen">
      <HeaderModule />
      <div className="grow flex">
        <NavBarContainer />
        <main className="flex-1 px-20 py-15">{children}</main>
      </div>
    </div>
  );
};

export default AdminPointsLayout;
