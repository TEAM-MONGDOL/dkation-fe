import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TableRowModule from '@/_components/common/modules/TableRowModule';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';

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
  const widthType = headers.reduce(
    (acc, header) => {
      acc[header.title] = {
        width: header.width,
        flexGrow: header.flexGrow,
      };
      return acc;
    },
    {} as { [key: string]: { width?: string; flexGrow?: boolean } },
  );

  return (
    <div>
      <TableHeaderModule headers={headers} />
      {data.length > 0 ? (
        <TableRowModule data={data} widthType={widthType} />
      ) : (
        <EmptyContainer />
      )}
    </div>
  );
};

export default TableContainer;
