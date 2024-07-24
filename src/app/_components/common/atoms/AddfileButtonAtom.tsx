import Image from 'next/image';
import { AddFile } from '@/_assets/icons';

interface AddFIleButtonAtomProps {
  onClick: () => void;
}

const AddFIleButtonAtom = ({ onClick }: AddFIleButtonAtomProps) => {
  return (
    <button onClick={onClick}>
      <Image src={AddFile} alt="파일추가" />
    </button>
  );
};

export default AddFIleButtonAtom;
