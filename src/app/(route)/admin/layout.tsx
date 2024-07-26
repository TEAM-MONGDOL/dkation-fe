import React from 'react';

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default AdminLayout;
