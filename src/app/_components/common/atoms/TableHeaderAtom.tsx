import { ReactNode } from 'react';
import CheckboxAtom from './CheckboxAtom';

interface TableHeaderAtomProps {
  children?: ReactNode;
  width?: string;
  isFirst?: boolean;
  isLast?: boolean;
  isBoolean?: boolean;
  onClickBoolean?: () => void;
}

const TableHeaderAtom = ({
  children,
  width,
  isFirst,
  isLast,
  isBoolean,
  onClickBoolean,
}: TableHeaderAtomProps) => {
  return (
    <th
      className={`text-4 align-middle text-center font-normal text-sub-200 px-5 ${isFirst ? 'pl-8' : ''} ${isLast ? 'pr-8' : ''}`}
      style={{ width }}
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
    </th>
  );
};

export default TableHeaderAtom;
