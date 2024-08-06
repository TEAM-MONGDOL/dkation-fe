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
      <main className="mb-20 flex-1 overflow-y-auto px-40">{children}</main>
      <UserFooterContainer />
    </div>
  );
};

export default Userlayout;
