import { ReactNode } from 'react';

interface UserTableBodyModuleProps {
  children: ReactNode;
}

const UserTableBodyModule = ({ children }: UserTableBodyModuleProps) => {
  return <tr className="h-[63px] bg-white text-sub-400">{children}</tr>;
};

export default UserTableBodyModule;
