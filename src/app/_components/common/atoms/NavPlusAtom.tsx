import { PlusRoundIcon } from '@/_assets/icons';
import Image from 'next/image';
import Link from 'next/link';

interface PlusProps {
  content: string | undefined;
  route: string;
}
const NavPlusAtom = ({ content, route }: PlusProps) => {
  return (
    <Link href={route}>
      <button className="my-1.5 pl-2 gap-2 items-center flex rounded-[5px] w-32 h-8 ml-[29px] bg-white text-sub-400 text-5 font-semibold">
        <Image src={PlusRoundIcon} alt="PlusRoundIcon" />
        {content}
      </button>
    </Link>
  );
};

export default NavPlusAtom;
