import React from 'react';

interface TableRowAtomProps {
  content: React.ReactNode;
  width?: string;
  flexGrow?: boolean;
  color?: string;
}

const TableRowAtom = ({
  content,
  width,
  flexGrow,
  color,
}: TableRowAtomProps) => {
  return (
    <td style={{ color }} className="text-center text-3">
      {content}
    </td>
  );
};

export default TableRowAtom;
