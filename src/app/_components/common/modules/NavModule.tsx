'use client';

import NavTitleAtom from '@/_components/common/atoms/NavTitleAtom';
import NavSubAtom from '@/_components/common/atoms/NavSubAtom';
import { StaticImageData } from 'next/image';
import NavPlusAtom from '@/_components/common/atoms/NavPlusAtom';
import { useState } from 'react';

interface ContentItem {
  content: string;
  route: string;
}
interface PlusContentItem {
  content: string;
  route: string;
}
interface TitleProps {
  icon: StaticImageData;
  title: string;
  plusContents?: PlusContentItem[];
  contents: ContentItem[];
}
const NavModule = ({ icon, title, plusContents, contents }: TitleProps) => {
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
      <div
        className={`transition-max-height overflow-hidden duration-300 ease-in-out ${isVisible ? 'max-h-96' : 'max-h-0'} `}
      >
        {contents.map((contentItem) => (
          <NavSubAtom
            key={contentItem.route}
            content={contentItem.content}
            route={contentItem.route}
          />
        ))}
        {plusContents &&
          plusContents.map((plusContentItem, index) => (
            <NavPlusAtom
              key={plusContentItem.route}
              content={plusContentItem.content}
              route={plusContentItem.route}
            />
          ))}{' '}
      </div>
    </div>
  );
};

export default NavModule;
