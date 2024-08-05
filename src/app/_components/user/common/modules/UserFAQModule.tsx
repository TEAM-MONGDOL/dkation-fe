'use client';

import { useState } from 'react';
import UserFAQText from '@/_components/user/common/atoms/UserFAQTextAtom';
import { DownArrowIcon } from '@/_assets/icons';
import Image from 'next/image';

interface UserFAQModuleProps {
  title: string;
  content: string;
}

const UserFAQModule = ({ title, content }: UserFAQModuleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        role="presentation"
        className="flex h-[78px] w-full cursor-pointer items-center justify-between border-b border-sub-100 px-3xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <UserFAQText text={title} />
        <Image
          src={DownArrowIcon}
          alt="downArrow"
          className={`ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      <div
        className={`transition-max-height overflow-hidden duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="my-2 bg-sub-100/10 px-3xl py-6 text-sub-300">
          <UserFAQText text={content} />
        </div>
      </div>
    </div>
  );
};

export default UserFAQModule;
