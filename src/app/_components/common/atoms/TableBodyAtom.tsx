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
      className={`bg-white text-center ${fontSize || 'text-3'} ${color || ''} border-y border-stroke-100 px-5 ${isFirst ? 'rounded-l-regular border-l pl-8' : ''} ${isLast ? 'rounded-r-regular border-r pr-8' : ''}`}
    >
      {isBoolean !== undefined ? (
        <div className="flex h-full w-full items-center justify-center">
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
