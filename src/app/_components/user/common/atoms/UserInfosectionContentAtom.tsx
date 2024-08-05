import { ReactNode } from 'react';

interface UserInfosectionContentAtomProps {
  children: ReactNode;
}

const UserInfosectionContentAtom = ({
  children,
}: UserInfosectionContentAtomProps) => {
  return (
    <div className="flex h-[72px] items-center bg-white pl-4">{children}</div>
  );
};

export default UserInfosectionContentAtom;
