'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '@/_assets/images/logo.png';
import UserNavButtonAtom from '@/_components/user/common/atoms/UserNavButtonAtom';
import Link from 'next/link';

const UserNavBarContainer = () => {
  const currentPath = usePathname();

  const menuItems = [
    { href: '/', text: '홈' },
    { href: '/workation', text: '워케이션' },
    { href: '/points', text: '포인트' },
    { href: '/support', text: '고객지원' },
    { href: '/mypage', text: '마이페이지' },
  ];
  return (
    <div className="mx-28 flex h-20 items-center">
      <div className="mr-28 flex">
        <Image src={logo} alt="logo" className="w-[145px]" />
      </div>
      <div className="flex gap-10">
        {menuItems.map((item) => (
          <div
            role="presentation"
            key={item.href}
            className="flex h-20 w-[90px] cursor-pointer flex-col items-center justify-center gap-2"
          >
            <Link href={item.href}>
              <p
                className={
                  (item.href === '/' && currentPath === '/') ||
                  (item.href !== '/' && currentPath.startsWith(item.href))
                    ? 'text-center font-semibold'
                    : 'text-center'
                }
              >
                {item.text}
              </p>
              <div
                className={`h-[3px] w-[100px] translate-y-2 ${(item.href === '/' && currentPath === '/') || (item.href !== '/' && currentPath.startsWith(item.href)) ? 'bg-primary' : 'bg-transparent'}`}
              />
            </Link>
          </div>
        ))}
      </div>
      <UserNavButtonAtom />
    </div>
  );
};

export default UserNavBarContainer;
