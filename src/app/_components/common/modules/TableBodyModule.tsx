import React, { ReactNode } from 'react';

interface TableBodyModuleProps {
  children: ReactNode;
}

const TableBodyModule = ({ children }: TableBodyModuleProps) => {
  return <tr className="h-[60px]">{children}</tr>;
};

export default TableBodyModule;
