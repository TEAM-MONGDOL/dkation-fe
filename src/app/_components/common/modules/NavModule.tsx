'use client';

import NavTitleAtom from '@/_components/common/atoms/NavTitleAtom';
import NavSubAtom from '@/_components/common/atoms/NavSubAtom';
import { StaticImageData } from 'next/image';
import NavPlusAtom from '@/_components/common/atoms/NavPlusAtom';
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
      <NavTitleAtom
        icon={icon}
        title={title}
        onIconClick={toggleVisibility}
        isVisible={isVisible}
      />
      {isVisible && (
        <>
          {contents.map((contentItem, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <NavSubAtom key={index} content={contentItem} />
          ))}
          {content && <NavPlusAtom content={content} />}
        </>
      )}
    </div>
  );
};

export default NavModule;
