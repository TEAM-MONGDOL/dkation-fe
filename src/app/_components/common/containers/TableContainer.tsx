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
  const handleDetails = (row: TableContent) => {};

  const hasData = data.length > 0;

  return (
    <div className="min-w-full">
      <div className="min-w-full">
        <TableHeaderModule headers={headers} />
        <div className="bg-white">
          {hasData ? (
            data.map((row, rowIndex) => (
              <TableRowModule
                key={row.id}
                row={{ ...row, 번호: rowIndex + 1 }}
                headers={headers}
                onDetailsClick={handleDetails}
              />
            ))
          ) : (
            <EmptyContainer />
          )}
        </div>
      </div>
    </div>
  );
};

export default TableContainer;
