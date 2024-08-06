'use client';

import { useRouter } from 'next/navigation';
import UserTabBarAtom from '../atoms/UserTabBarAtom';

interface UserTabBarModuleProps {
  tabs: { text: string; path: string }[];
}

const UserTabBarModule = ({ tabs }: UserTabBarModuleProps) => {
  const router = useRouter();

  return (
    <div className="flex h-[70px] w-full items-center gap-x-6xl border-b-[0.5px] border-sub-100 px-40 shadow-[0_1.5px_3px_0_rgba(0,0,0,0.2)]">
      {tabs.map((tab, index) => (
        <UserTabBarAtom
          key={tab.text}
          text={tab.text}
          isActive={
            window.location.pathname === tab.path ||
            (window.location.pathname.includes(tab.path) && tab.path !== '/')
          }
          onClick={
            window.location.pathname === tab.path ||
            (window.location.pathname.includes(tab.path) && tab.path !== '/')
              ? () => {}
              : () => router.push(tab.path)
          }
        />
      ))}
    </div>
  );
};

export default UserTabBarModule;
