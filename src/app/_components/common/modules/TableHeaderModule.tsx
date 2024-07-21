import React from 'react';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom'; // Adjust the import path as needed

interface TableHeaderModuleProps {
  headers: Array<{
    id: string;
    title: string;
    flexGrow?: boolean;
    width?: string;
  }>;
}

const TableHeaderModule = ({ headers }: TableHeaderModuleProps) => {
  return (
    <div className="flex">
      {headers.map((header, index) => (
        <TableHeaderAtom
          key={header.id}
          title={header.title}
          flexGrow={header.flexGrow}
          width={header.width}
        />
      ))}
    </div>
  );
};

export default TableHeaderModule;
