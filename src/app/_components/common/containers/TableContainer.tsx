import React, { ReactNode } from 'react';

interface TableContainerProps {
  children: ReactNode;
}

const TableContainer = ({ children }: TableContainerProps) => {
  return (
    <table className="min-w-full table-fixed border-separate border-spacing-y-2.5">
      {children}
    </table>
  );
};

export default TableContainer;
