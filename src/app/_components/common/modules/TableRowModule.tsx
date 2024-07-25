import React from 'react';
import TableRowAtom from '@/_components/common/atoms/TableRowAtom';
import ShowDetailButtonAtom from '@/_components/common/atoms/ShowDetailButtonAtom';

interface TableRowModuleProps {
  row: { [key: string]: any };
  headers: { title: string; width?: string; flexGrow?: boolean }[];
  onDetailsClick: (row: any) => void;
}

const TableRowModule = ({
  row,
  headers,
  onDetailsClick,
}: TableRowModuleProps) => (
  <div className="flex gap-10 px-5 py-3.5 border border-stroke-100 rounded-regular mb-2.5">
    {headers.map((header, colIndex) => (
      <TableRowAtom
        key={header.title}
        width={header.width}
        flexGrow={header.flexGrow}
        content={
          header.title === '' && colIndex === headers.length - 1 ? (
            <ShowDetailButtonAtom onClick={() => onDetailsClick(row)} />
          ) : (
            row[header.title] || ''
          )
        }
      />
    ))}
  </div>
);

export default TableRowModule;
