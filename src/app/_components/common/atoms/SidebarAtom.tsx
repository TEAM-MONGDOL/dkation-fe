'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarAtomProps {
  title: string;
  to: string;
}

const SidebarAtom: React.FC<SidebarAtomProps> = ({ title, to }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === to; // 현재 경로와 일치하는지 확인

  const handleClick = () => {
    router.push(to);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      onClick={() => router.push(to)}
      className={`w-full py-3.5 pl-4 flex-grow cursor-pointer text-cus-300 text-3 ${isActive ? 'font-bold' : ''}`}
    >
      {title}
    </div>
  );
};

export default SidebarAtom;
