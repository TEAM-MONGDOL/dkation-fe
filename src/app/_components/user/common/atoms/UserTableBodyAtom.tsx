import { ReactNode } from 'react';

interface UserTableBodyAtomProps {
  children?: ReactNode;
  isSemibold?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

const UserTableBodyAtom = ({
  children,
  isSemibold,
  isFirst,
  isLast,
}: UserTableBodyAtomProps) => {
  return (
    <td
      className={`border-y border-stroke-100 px-5 text-center text-4 text-sub-400 ${isSemibold ? 'font-semibold' : ''} ${isFirst ? 'rounded-l border-l pl-[68px]' : ''} ${isLast ? 'rounded-r border-r pr-[68px]' : ''}`}
    >
      {children}
    </td>
  );
};

export default UserTableBodyAtom;
