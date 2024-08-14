import React, { ReactNode } from 'react';
import UserNavBarContainer from '@/_components/user/common/containers/UserNavBarContainer';
import UserFooterContainer from '@/_components/user/common/containers/UserFooterContainer';

interface Props {
  children: ReactNode;
}

const Userlayout = ({ children }: Props) => {
  return (
    <div>
      <UserNavBarContainer />
      <main className="mb-20 min-h-screen flex-1">{children}</main>
      <UserFooterContainer />
    </div>
  );
};

export default Userlayout;
