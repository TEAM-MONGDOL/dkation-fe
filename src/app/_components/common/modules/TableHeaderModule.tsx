import React from 'react';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';

interface TableHeaderModuleProps {
  headers: { title: string; width?: string; flexGrow?: boolean }[];
}

const TableHeaderModule = ({ headers }: TableHeaderModuleProps) => {
  return (
    <div className="flex gap-10 px-5 py-2.5">
      {headers.map((header, index) => (
        <TableHeaderAtom
          key={header.title}
          title={header.title}
          width={header.width}
          flexGrow={header.flexGrow}
        />
      ))}
    </div>
  );
};

export default TableHeaderModule;
