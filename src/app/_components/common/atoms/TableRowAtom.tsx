import React from 'react';

interface TableRowAtomProps {
  flexGrow?: boolean;
  width?: string;
  content: string;
}

const TableRowAtom = ({ flexGrow, width, content }: TableRowAtomProps) => {
  const baseClasses = 'text-center text-3';

  return (
    <div
      className={`${baseClasses} ${flexGrow ? 'flex-grow' : ''}`} // 삼항 연산자를 사용하여 className을 간결하게
      style={width ? { width: `${width}px` } : undefined}
    >
      {content}
    </div>
  );
};

export default TableRowAtom;
