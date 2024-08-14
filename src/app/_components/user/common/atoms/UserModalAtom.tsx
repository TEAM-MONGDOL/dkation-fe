import { MouseEvent, ReactNode } from 'react';

interface UserModalAtomProps {
  children: ReactNode;
  className?: string;
  onClose: () => void;
}

const UserModalAtom = ({
  children,
  className = '',
  onClose,
}: UserModalAtomProps) => {
  const handleBackgroundClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      role="presentation"
      className="fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black/30"
      onClick={handleBackgroundClick}
    >
      <div
        className={`relative w-[524px] rounded-xl bg-white px-10 py-16 text-center ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default UserModalAtom;
