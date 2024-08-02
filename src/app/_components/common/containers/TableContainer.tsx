import React, { ReactNode } from 'react';

interface TableContainerProps {
  children: ReactNode;
  maxHeight?: string;
}

const TableContainer = ({ children, maxHeight }: TableContainerProps) => {
  return (
    <div className={`flex w-full flex-col ${maxHeight || ''} overflow-y-auto`}>
      <table className="min-w-full table-fixed border-separate border-spacing-y-2.5">
        {children}
      </table>
    </div>
  );
};

export default TableContainer;
