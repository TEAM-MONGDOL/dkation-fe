import React from 'react';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';

interface TableHeaderModuleProps {
  headers: { title: string; width?: string; flexGrow?: boolean }[];
}

const TableHeaderModule = ({ headers }: TableHeaderModuleProps) => {
  return (
    <tr>
      {headers.map((header, index) => (
        <TableHeaderAtom
          key={header.title}
          title={header.title}
          width={header.width}
        />
      ))}
    </tr>
  );
};

export default TableHeaderModule;
