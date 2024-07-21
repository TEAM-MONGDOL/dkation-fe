import React from 'react';

interface TableRowAtomProps {
  flexGrow?: boolean;
  width?: string;
  content: string;
}

const TableRowAtom = ({ flexGrow, width, content }: TableRowAtomProps) => {
  const baseClasses = 'text-center text-3';
  const flexGrowClass = flexGrow ? 'flex-grow' : '';

  return (
    <div
      className={`${baseClasses} ${flexGrowClass}`}
      style={width ? { width: `${width}px` } : undefined}
    >
      {content}
    </div>
  );
};

export default TableRowAtom;
