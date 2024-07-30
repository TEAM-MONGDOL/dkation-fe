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
    <div role="presentation" className="flex py-2" onClick={onIconClick}>
      <div className="flex w-full justify-between py-2" onClick={onIconClick}>
        <div className="flex">
          <Image className="mr-3" src={icon} alt={title} />
          <p className="text-3 font-semibold">{title}</p>
        </div>
        <Image
          className={`transform cursor-pointer transition-transform duration-300 ${isVisible ? 'rotate-180' : ''}`}
          src={KeyboardArrowDownIcon}
          alt="downarrowicon"
        />
      </div>
    </div>
  );
};
export default NavTitleAtom;
