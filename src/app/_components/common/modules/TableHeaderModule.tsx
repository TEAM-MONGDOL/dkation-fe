import React from 'react';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom'; // Adjust the import path as needed

interface TableHeaderModuleProps {
  headers: Array<{
    title: string;
    flexGrow?: boolean;
    width?: string;
  }>;
}

const TableHeaderModule = ({ headers }: TableHeaderModuleProps) => {
  return (
    <div className="flex">
      {headers.map((header) => (
        <TableHeaderAtom
          key={header.title}
          title={header.title}
          flexGrow={header.flexGrow}
          width={header.width}
        />
      ))}
    </div>
  );
};

export default TableHeaderModule;
