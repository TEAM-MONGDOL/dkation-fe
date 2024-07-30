import Image, { StaticImageData } from 'next/image';
import { DownArrowIcon } from '@/_assets/icons';

interface TitleProps {
  icon: StaticImageData;
  title: string;
  onIconClick: () => void;
  isVisible: boolean;
}

const NavTitleAtom = ({ icon, title, onIconClick, isVisible }: TitleProps) => {
  return (
    <div className="py-2 flex justify-between" onClick={onIconClick}>
      <div className="flex">
        <Image className="mr-3" src={icon} alt={title} />
        <p className="text-3 font-semibold">{title}</p>
      </div>
      <Image
        className={`cursor-pointer transform transition-transform duration-300 ${isVisible ? 'rotate-180' : ''}`}
        src={DownArrowIcon}
        alt="downarrowicon"
      />
    </div>
  );
};

export default NavTitleAtom;
