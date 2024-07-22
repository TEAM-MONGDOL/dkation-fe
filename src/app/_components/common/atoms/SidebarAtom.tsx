'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarAtomProps {
  title: string;
  to: string;
}

const SidebarAtom = ({ title, to }: SidebarAtomProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === to; // 현재 경로와 일치하는지 확인

  return (
    <div
      onClick={() => router.push(to)}
      className={`w-full py-3.5 pl-4 grow cursor-pointer text-cus-300 text-3 ${isActive ? 'font-bold' : ''}`}
      role="presentation"
    >
      {title}
    </div>
  );
};

export default SidebarAtom;
