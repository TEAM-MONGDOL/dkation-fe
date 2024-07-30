'use client';

import { KeyboardArrowLeftIcon, KeyboardArrowRightIcon } from '@/_assets/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface TypeProps {
  type?: 'LEFT' | 'RIGHT';
  title: string;
}
const TitleBarModule = ({ type, title }: TypeProps) => {
  const router = useRouter();
  return (
    <div className="flex gap-[5px]">
      {type === 'LEFT' && (
        <Image
          onClick={() => router.back()}
          src={KeyboardArrowLeftIcon}
          alt="leftarrowicon"
        />
      )}
      <p className="text-h2 font-bold">{title}</p>
      {type === 'RIGHT' && (
        <Image src={KeyboardArrowRightIcon} alt="rightarrowicon" />
      )}
    </div>
  );
};

export default TitleBarModule;
