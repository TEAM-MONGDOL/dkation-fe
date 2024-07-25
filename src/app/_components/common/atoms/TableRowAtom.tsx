import React from 'react';

interface TableRowAtomProps {
  content: React.ReactNode;
  width?: string;
  flexGrow?: boolean;
}

const TableRowAtom = ({ content, width, flexGrow }: TableRowAtomProps) => (
  <div
    style={{ width, flexGrow: flexGrow ? 1 : 0 }}
    className="flex justify-center items-center text-3"
  >
    {content}
  </div>
);

export default TableRowAtom;
