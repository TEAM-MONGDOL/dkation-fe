import { ReactNode } from 'react';

interface UserTableBodyModuleProps {
  children: ReactNode;
}

const UserTableBodyModule = ({ children }: UserTableBodyModuleProps) => {
  return <tr className="h-10 bg-white">{children}</tr>;
};

export default UserTableBodyModule;
