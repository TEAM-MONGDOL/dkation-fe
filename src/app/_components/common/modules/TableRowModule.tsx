import React from 'react';
import TableRowAtom from '@/_components/common/atoms/TableRowAtom';
import ShowDetailButtonAtom from '@/_components/common/atoms/ShowDetailButtonAtom';

interface TableRowModuleProps {
  row: { [key: string]: any };
  headers: { title: string; width?: string; flexGrow?: boolean }[];
}

const TableRowModule = ({ row, headers }: TableRowModuleProps) => {
  const getContent = (header: string, colIndex: number) => {
    if (typeof row[header] === 'object') {
      if (
        header === '' &&
        colIndex === headers.length - 1 &&
        row[header].onClick
      ) {
        return <ShowDetailButtonAtom onClick={row[header].onClick} />;
      }
      return row[header].text;
    }
    return row[header];
  };

  return (
    <tr className="h-[60px] border border-stroke-100">
      {headers.map((header, colIndex) => (
        <TableRowAtom
          key={header.title}
          color={
            typeof row[header.title] === 'object' ? row[header.title].color : ''
          }
          content={getContent(header.title, colIndex)}
        />
      ))}
    </tr>
  );
};

export default TableRowModule;
