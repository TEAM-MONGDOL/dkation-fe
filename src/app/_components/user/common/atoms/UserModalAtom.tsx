import { ReactNode } from 'react';

interface UserModalAtomProps {
  children: ReactNode;
  className?: string;
}

const UserModalAtom = ({ children, className = '' }: UserModalAtomProps) => {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black/30">
      <div
        className={`relative w-[524px] rounded-xl bg-white px-20 py-16 text-center ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default UserModalAtom;
