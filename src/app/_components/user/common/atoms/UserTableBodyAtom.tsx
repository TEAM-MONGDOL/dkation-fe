import { ReactNode } from 'react';

interface UserTableBodyAtomProps {
  children?: ReactNode;
  isSemibold?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  textAlign?: 'left' | 'center' | 'right';
}

const UserTableBodyAtom = ({
  children,
  isSemibold,
  isFirst,
  isLast,
  textAlign = 'center',
}: UserTableBodyAtomProps) => {
  return (
    <td
      className={`border-y border-stroke-100 px-5 ${textAlign === 'center' ? 'text-center' : textAlign === 'left' ? 'text-start' : 'text-end'} text-4 ${isSemibold ? 'font-semibold' : ''} ${isFirst ? 'rounded-l border-l pl-6 xl:pl-10' : ''} ${isLast ? 'rounded-r border-r pr-6 xl:pr-10' : ''}`}
    >
      {children}
    </td>
  );
};

export default UserTableBodyAtom;
