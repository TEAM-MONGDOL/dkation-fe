import { ReactNode } from 'react';
import UserMyPageFix from '@/_components/user/mypage/FixLayout';

interface Props {
  children: ReactNode;
}

const UserMyPageLayout = ({ children }: Props) => {
  return (
    <div>
      <UserMyPageFix />
      {children}
    </div>
  );
};

export default UserMyPageLayout;
