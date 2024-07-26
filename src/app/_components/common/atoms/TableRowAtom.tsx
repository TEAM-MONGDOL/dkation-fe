import React from 'react';

interface TableRowAtomProps {
  content: React.ReactNode;
  color?: string;
}

const TableRowAtom = ({ content, color }: TableRowAtomProps) => {
  return (
    <td style={{ color }} className="text-center text-3">
      {content}
    </td>
  );
};

export default TableRowAtom;
