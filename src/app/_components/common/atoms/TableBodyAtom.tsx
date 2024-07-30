import React, { ReactNode } from 'react';
import CheckboxAtom from './CheckboxAtom';

interface TableBodyAtomProps {
  children?: ReactNode;
  fontSize?: string;
  color?: string;
  isFirst?: boolean;
  isLast?: boolean;
  isBoolean?: boolean;
  onClickBoolean?: () => void;
}

const TableBodyAtom = ({
  children,
  fontSize,
  color,
  isFirst,
  isLast,
  isBoolean,
  onClickBoolean,
}: TableBodyAtomProps) => {
  return (
    <td
      className={`text-center ${fontSize || 'text-3'} ${color || ''} border-y border-stroke-100 px-5 ${isFirst ? 'border-l rounded-l-regular pl-8' : ''} ${isLast ? 'border-r rounded-r-regular pr-8' : ''}`}
    >
      {isBoolean !== undefined ? (
        <div className="w-full h-full flex items-center justify-center">
          <CheckboxAtom
            isChecked={isBoolean}
            onClick={onClickBoolean}
            size={20}
          />
        </div>
      ) : (
        children
      )}
    </td>
  );
};

export default TableBodyAtom;
