import { UserShowDetailButtonIcon } from '@/_assets/icons';
import Image from 'next/image';

interface ShowDetailButtonAtomProps {
  onClick?: () => void;
}

const ShowDetailButtonAtom = ({ onClick }: ShowDetailButtonAtomProps) => {
  return (
    <button onClick={onClick}>
      <Image src={UserShowDetailButtonIcon} alt="상세보기" />
    </button>
  );
};

export default ShowDetailButtonAtom;
