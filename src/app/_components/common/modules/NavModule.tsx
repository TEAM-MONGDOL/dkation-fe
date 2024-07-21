'use client';

import NavTitle from '@/_components/common/atoms/NavTitle';
import NavSub from '@/_components/common/atoms/NavSub';
import { StaticImageData } from 'next/image';
import NavPlus from '@/_components/common/atoms/NavPlus';
import { useState } from 'react';

interface TitleProps {
  icon: StaticImageData;
  title: string;
  content?: string;
  content1: string;
  content2?: string;
  content3?: string;
}
const NavModule = ({
  icon,
  title,
  content,
  content1,
  content2,
  content3,
}: TitleProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="px-6 py-5">
      <NavTitle
        icon={icon}
        title={title}
        onIconClick={toggleVisibility}
        isVisible={isVisible}
      />
      {isVisible && (
        <>
          <NavSub content={content1} />
          {content2 && <NavSub content={content2} />}
          {content3 && <NavSub content={content3} />}
          {content && <NavPlus content={content} />}
        </>
      )}
    </div>
  );
};

export default NavModule;
