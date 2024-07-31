import Image, { StaticImageData } from 'next/image';
import { KeyboardArrowDownIcon } from '@/_assets/icons';

interface TitleProps {
  icon: StaticImageData;
  title: string;
  onIconClick: () => void;
  isVisible: boolean;
}

const NavTitleAtom = ({ icon, title, onIconClick, isVisible }: TitleProps) => {
  return (
    <div
      role="presentation"
      className="flex w-full cursor-pointer justify-between px-3 py-2"
      onClick={onIconClick}
    >
      <div className="flex">
        <Image className="mr-2" src={icon} alt={title} width={20} height={20} />
        <p className="font-bold">{title}</p>
      </div>
      <Image
        className={`transform cursor-pointer transition-transform duration-300 ${isVisible ? 'rotate-180' : ''}`}
        src={KeyboardArrowDownIcon}
        width={20}
        height={20}
        alt="downarrowicon"
      />
    </div>
  );
};
export default NavTitleAtom;
