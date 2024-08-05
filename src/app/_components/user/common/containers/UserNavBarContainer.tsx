'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/_assets/images/logo.png';
import UserNavButtonAtom from '@/_components/user/common/atoms/UserNavButtonAtom';

const UserNavBarContainer = () => {
  const [path, setPath] = useState('');
  const router = useRouter();

  useEffect(() => {
    setPath(typeof window !== 'undefined' ? window.location.pathname : '');
  }, []);

  const menuItems = [
    { href: '/', text: '홈' },
    { href: '/workation', text: '워케이션' },
    { href: '/point', text: '포인트' },
    { href: '/support', text: '고객지원' },
    { href: '/mypage', text: '마이페이지' },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="mx-28 mt-2 flex h-20 items-center">
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
            <p className={path === item.href ? 'font-bold' : ''}>{item.text}</p>
            {path === item.href && (
              <div className="h-[3px] w-[100px] bg-primary" />
            )}
          </div>
        ))}
      </div>
      <UserNavButtonAtom />
    </div>
  );
};

export default UserNavBarContainer;
