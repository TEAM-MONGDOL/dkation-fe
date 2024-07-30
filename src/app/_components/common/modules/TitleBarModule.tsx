'use client';

import { KeyboardArrowLeftIcon, KeyboardArrowRightIcon } from '@/_assets/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface TypeProps {
  type?: 'LEFT' | 'RIGHT';
  title: string;
  url?: string;
}
const TitleBarModule = ({ type, title, url }: TypeProps) => {
  const router = useRouter();
  return (
    <div className="flex gap-[5px]">
      {type === 'LEFT' && (
        <Image
          className="cursor-pointer"
          onClick={() => router.back()}
          src={KeyboardArrowLeftIcon}
          alt="leftarrowicon"
        />
      )}
      <p className="text-h2 font-bold">{title}</p>
      {type === 'RIGHT' && (
        <Image
          className="cursor-pointer"
          src={KeyboardArrowRightIcon}
          alt="rightarrowicon"
          onClick={() => url && router.push(url)}
        />
      )}
    </div>
  );
};

export default TitleBarModule;
