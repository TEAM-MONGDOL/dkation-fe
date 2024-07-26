import React from 'react';
import HeaderModule from '@/_components/common/modules/HeaderModule';
import NavBarContainer from '@/_components/common/containers/NavBarContainer';

interface Props {
  children: React.ReactNode;
}

const AdminNoticesLayout = ({ children }: Props) => {
  return (
    <div className="flex-col">
      <HeaderModule />
      <div className="flex">
        <NavBarContainer />
        <main className="flex-1 px-20 py-16">{children}</main>
      </div>
    </div>
  );
};

export default AdminNoticesLayout;
