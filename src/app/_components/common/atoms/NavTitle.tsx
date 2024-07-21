import Image, { StaticImageData } from 'next/image';
import { DownArrowIcon } from '@/_assets/icons';

interface TitleProps {
  icon: StaticImageData;
  title: string;
  onIconClick: () => void;
  isVisible: boolean;
}

const NavTitle = ({ icon, title, onIconClick, isVisible }: TitleProps) => {
  return (
    <div className="py-2 flex justify-between">
      <div className="flex">
        <Image className="mr-3" src={icon} alt="icon" />
        <p className="text-3 font-semibold">{title}</p>
      </div>
      <Image
        className={`cursor-pointer ${isVisible ? '' : 'rotate-180'}`}
        src={DownArrowIcon}
        alt="downarrowicon"
        onClick={onIconClick}
      />
    </div>
  );
};

export default NavTitle;
