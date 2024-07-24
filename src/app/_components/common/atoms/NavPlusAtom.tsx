import { PlusRoundIcon } from '@/_assets/icons';
import Image from 'next/image';

interface PlusProps {
  content: string;
}
const NavPlusAtom = ({ content }: PlusProps) => {
  return (
    <button className="my-1.5 pl-2 gap-2 items-center flex rounded-[5px] w-32 h-8 ml-[29px] bg-white text-sub-400 text-5 font-semibold">
      <Image src={PlusRoundIcon} alt="PlusRoundIcon" />
      {content}
    </button>
  );
};

export default NavPlusAtom;
