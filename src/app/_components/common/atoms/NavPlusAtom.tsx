import { AddCircleIcon } from '@/_assets/icons';
import Image from 'next/image';
import Link from 'next/link';

interface PlusProps {
  content: string | undefined;
  route: string;
}
const NavPlusAtom = ({ content, route }: PlusProps) => {
  return (
    <Link href={route}>
      <button className="my-1.5 ml-[29px] flex h-8 w-32 items-center gap-2 rounded-regular bg-white pl-2 text-5 font-semibold text-sub-400">
        <Image src={AddCircleIcon} alt="PlusRoundIcon" />
        {content}
      </button>
    </Link>
  );
};

export default NavPlusAtom;
