import { LeftArrowIcon, RightArrowIcon } from '@/_assets/icons';
import Image from 'next/image';

interface TypeProps {
  type?: 'LEFT' | 'RIGHT';
  title: string;
}
const TitleBar = ({ type, title }: TypeProps) => {
  return (
    <div className="flex gap-4">
      {type === 'LEFT' && <Image src={LeftArrowIcon} alt="leftarrowicon" />}
      <p className="text-h2 font-bold">{title}</p>
      {type === 'RIGHT' && <Image src={RightArrowIcon} alt="rightarrowicon" />}
    </div>
  );
};

export default TitleBar;
