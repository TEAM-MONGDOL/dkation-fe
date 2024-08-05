import { ReactNode } from 'react';

interface UserModalTitleAtomProps {
  children: ReactNode;
  className?: string;
}

const UserModalTitleAtom = ({
  children,
  className = '',
}: UserModalTitleAtomProps) => {
  return <div className={`w-full text-center ${className}`}>{children}</div>;
};

export default UserModalTitleAtom;
