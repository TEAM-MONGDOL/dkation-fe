import React, { ReactNode } from 'react';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';

interface TableHeaderModuleProps {
  children: ReactNode;
}

const TableHeaderModule = ({ children }: TableHeaderModuleProps) => {
  return <tr>{children}</tr>;
};

export default TableHeaderModule;
