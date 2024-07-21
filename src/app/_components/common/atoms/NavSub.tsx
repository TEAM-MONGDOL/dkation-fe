import { StaticImageData } from 'next/image';

interface SubTitleProps {
  content: string | undefined;
}
const NavSub = ({ content }: SubTitleProps) => {
  return <p className="font-light py-1.5 ml-[29px] text-2">{content}</p>;
};

export default NavSub;
