import { ReactNode } from 'react';

interface UserTableHeaderModuleProps {
  children: ReactNode;
}

const UserTableHeaderModule = ({ children }: UserTableHeaderModuleProps) => {
  return (
    <thead className="rounded bg-stroke-100/20">
      <tr>{children}</tr>
    </thead>
  );
};

export default UserTableHeaderModule;
