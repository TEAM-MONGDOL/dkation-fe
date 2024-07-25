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
    <div className="flex px-5 gap-10 mb-2.5">
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
