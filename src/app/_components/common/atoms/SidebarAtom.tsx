'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface SidebarAtomProps {
  title: string;
  to: string;
}

const SidebarAtom: React.FC<SidebarAtomProps> = ({ title, to }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(to);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onClick={handleClick}
      className="w-full py-3 pl-4 flex-grow text-cus-300 text-3 cursor-pointer"
    >
      {title}
    </div>
  );
};

export default SidebarAtom;
