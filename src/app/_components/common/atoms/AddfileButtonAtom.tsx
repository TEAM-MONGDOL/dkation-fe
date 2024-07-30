import Image from 'next/image';
import { AddFileIcon } from '@/_assets/icons';

interface AddFIleButtonAtomProps {
  onClick: () => void;
}

const AddFIleButtonAtom = ({ onClick }: AddFIleButtonAtomProps) => {
  return (
    <button onClick={onClick}>
      <Image src={AddFileIcon} alt="파일추가" />
    </button>
  );
};

export default AddFIleButtonAtom;
