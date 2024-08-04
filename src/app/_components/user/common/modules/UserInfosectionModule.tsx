import { ReactNode } from 'react';
import UserInfosectionTitleAtom from '@/_components/user/common/atoms/UserInfosectionTitleAtom';
import UserInfosectionContentAtom from '@/_components/user/common/atoms/UserInfosectionContentAtom';

interface UserInfosectionModuleProps {
  title: string;
  children: ReactNode;
}

const UserInfosectionModule = ({
  title,
  children,
}: UserInfosectionModuleProps) => {
  return (
    <div className="flex w-full border-b border-t border-sub-100">
      <UserInfosectionTitleAtom title={title} />
      <UserInfosectionContentAtom>{children}</UserInfosectionContentAtom>
    </div>
  );
};

export default UserInfosectionModule;
