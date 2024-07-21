// src/app/_components/common/atoms/TableHeaderAtom.tsx

import React from 'react';

interface TableHeadarAtomProps {
  title: string;
  flexGrow?: boolean;
  width?: string;
}

const TableHeaderAtom = ({ title, flexGrow, width }: TableHeadarAtomProps) => {
  const baseClasses = 'bg-white text-center text-2 text-[#5C5C5C]';
  const flexGrowClass = flexGrow ? 'flex-grow' : '';

  return (
    <div
      className={`${baseClasses} ${flexGrowClass}`}
      style={width ? { width: `${width}px` } : undefined}
    >
      {title}
    </div>
  );
};

export default TableHeaderAtom;
