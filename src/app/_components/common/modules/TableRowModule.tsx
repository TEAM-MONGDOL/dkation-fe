'use client';

import React from 'react';
import TableRowAtom from '@/_components/common/atoms/TableRowAtom';

interface TableContent {
  id: number;

  [key: string]: any;
}

interface TableRowModuleProps {
  data: TableContent[];
  widthType: {
    [key: string]: { width?: string; flexGrow?: boolean };
  };
}

const TableRowModule = ({ data, widthType }: TableRowModuleProps) => {
  const headers =
    data.length > 0 ? Object.keys(data[0]).filter((key) => key !== 'id') : [];

  return (
    <div className="">
      {data.map((item) => (
        <div
          key={item.id}
          className="w-full flex border py-3.5 mb-2.5 rounded-[5px] border-stroke-100 gap-10 px-5"
        >
          {headers.map((key) => (
            <TableRowAtom
              key={key}
              content={item[key]?.toString()}
              width={widthType[key]?.width}
              flexGrow={widthType[key]?.flexGrow}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableRowModule;
