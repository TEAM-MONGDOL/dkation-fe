'use client';

import { useState } from 'react';
import Text from '@/_components/user/common/atoms/UserFAQTextAtom';
import { DownArrowIcon } from '@/_assets/icons';
import Image from 'next/image';

interface UserFAQModuleProps {
  title: string;
  content: string;
  titleClassName?: string;
  contentClassName?: string;
}

const UserFAQModule = ({
  title,
  content,
  titleClassName,
  contentClassName,
}: UserFAQModuleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <div
        role="presentation"
        className="flex h-[78px] w-full cursor-pointer items-center justify-between border-b border-sub-100 px-3xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Text text={title} className={titleClassName} />
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
          <Text text={content} className={contentClassName} />
        </div>
      </div>
    </div>
  );
};

export default UserFAQModule;
