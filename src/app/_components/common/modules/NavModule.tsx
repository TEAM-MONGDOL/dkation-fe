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
  contents: string[];
}
const NavModule = ({ icon, title, content, contents }: TitleProps) => {
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
          {contents.map((contentItem, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <NavSub key={index} content={contentItem} />
          ))}
          {content && <NavPlus content={content} />}
        </>
      )}
    </div>
  );
};

export default NavModule;
