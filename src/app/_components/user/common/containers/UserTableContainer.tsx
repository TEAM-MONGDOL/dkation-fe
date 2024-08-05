import { ReactNode } from 'react';

interface UserTableContainerProps {
  children: ReactNode;
}

const UserTableContainer = ({ children }: UserTableContainerProps) => {
  return (
    <table className="w-full table-fixed border-separate border-spacing-y-2.5">
      {children}
    </table>
  );
};

export default UserTableContainer;
