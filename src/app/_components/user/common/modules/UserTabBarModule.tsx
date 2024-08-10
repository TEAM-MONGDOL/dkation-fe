'use client';

import { usePathname, useRouter } from 'next/navigation';
import UserTabBarAtom from '../atoms/UserTabBarAtom';

interface UserTabBarModuleProps {
  tabs: { text: string; path: string; parent?: string }[];
}

const UserTabBarModule = ({ tabs }: UserTabBarModuleProps) => {
  const router = useRouter();
  const currentPath = usePathname();

  return (
    <div className="flex h-[70px] w-full items-center gap-x-6xl border-b-[0.5px] border-sub-100 px-40 shadow-[0_1.5px_3px_0_rgba(0,0,0,0.02)]">
      {tabs.map((tab) => (
        <UserTabBarAtom
          key={tab.text}
          text={tab.text}
          isActive={
            currentPath === tab.path ||
            (tab.parent && currentPath.startsWith(tab.parent)) ||
            (currentPath === tab.path && tab.path !== '/')
          }
          onClick={() => router.push(tab.path)}
        />
      ))}
    </div>
  );
};

export default UserTabBarModule;
