'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@/_assets/images/logo_imsy.png';
import NavButtonAtom from '@/_components/user/common/atoms/NavButtonAtom';

export default function Header() {
  const [path, setPath] = useState('');
  const router = useRouter();

  useEffect(() => {
    setPath(typeof window !== 'undefined' ? window.location.pathname : '');
  }, []);

  const menuItems = [
    { href: '/', text: '홈' },
    { href: '/workation', text: '워케이션' },
    { href: '/point', text: '포인트' },
    { href: '/faq', text: 'FAQ' },
    { href: '/mypage', text: '마이페이지' },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="mx-10 flex h-20 items-center">
      <div className="mr-32 flex">
        <Image src={logo} alt="logo" className="w-[121px]" />
      </div>
      <div className="mr-10 mt-2 flex gap-16">
        {menuItems.map((item) => (
          <div
            role="presentation"
            key={item.href}
            className="flex w-[90px] cursor-pointer flex-col items-center gap-2"
            onClick={() => handleNavigation(item.href)}
          >
            <p className={path === item.href ? 'font-bold' : ''}>{item.text}</p>
            {path === item.href && (
              <div className="h-[3px] w-[90px] bg-primary" />
            )}
          </div>
        ))}
      </div>
      <NavButtonAtom />
    </div>
  );
}
