import { ReactNode } from 'react';

interface UserModalTitleAtomProps {
  children: ReactNode;
  className?: string;
}

const UserModalTitleAtom = ({
  children,
  className = '',
}: UserModalTitleAtomProps) => {
  return (
    <div className={`w-full py-3 text-center ${className}`}>{children}</div>
  );
};

export default UserModalTitleAtom;
