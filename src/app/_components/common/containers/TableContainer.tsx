import React from 'react';
import TableRowModule from '@/_components/common/modules/TableRowModule';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';

interface TableContent {
  id: number;
  [key: string]: any;
}

interface TableHeader {
  title: string;
  flexGrow?: boolean;
  width?: string;
}

interface TableContainerProps {
  headers: TableHeader[];
  data: TableContent[];
}

const TableContainer = ({ headers, data }: TableContainerProps) => {
  const hasData = data.length > 0;

  return (
    <table className="min-w-full table-fixed border-separate border-spacing-y-2.5">
      <thead>
        <TableHeaderModule headers={headers} />
      </thead>
      <tbody className="bg-white">
        {hasData ? (
          data.map((row, rowIndex) => (
            <TableRowModule
              key={row.id}
              row={{ 번호: rowIndex + 1, ...row }}
              headers={headers}
            />
          ))
        ) : (
          <EmptyContainer />
        )}
      </tbody>
    </table>
  );
};

export default TableContainer;
