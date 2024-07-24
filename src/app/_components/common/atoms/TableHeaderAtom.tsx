import React from 'react';

interface TableHeadarAtomProps {
  title: string;
  flexGrow?: boolean;
  width?: string;
}

const TableHeaderAtom = ({ title, flexGrow, width }: TableHeadarAtomProps) => {
  const baseClasses = 'bg-white text-center text-2 text-sub-300';
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
