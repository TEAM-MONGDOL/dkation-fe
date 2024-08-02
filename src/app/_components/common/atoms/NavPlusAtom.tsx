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
      <div className="flex w-full py-1.5 pl-10">
        <button className="flex h-8 w-full items-center gap-2 rounded-regular bg-white p-2 text-5 font-semibold text-sub-400">
          <Image src={AddCircleIcon} alt="PlusRoundIcon" />
          {content}
        </button>
      </div>
    </Link>
  );
};

export default NavPlusAtom;
