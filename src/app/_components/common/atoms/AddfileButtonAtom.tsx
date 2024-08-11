import Image from 'next/image';
import { AddFileIcon, CameraIcon } from '@/_assets/icons';

interface AddFileButtonAtomProps {
  onClick: () => void;
  icon?: 'camera' | 'upload';
}

const AddFileButtonAtom = ({
  onClick,
  icon = 'upload',
}: AddFileButtonAtomProps) => {
  return (
    <button onClick={onClick} type="button">
      <Image
        src={icon === 'camera' ? CameraIcon : AddFileIcon}
        alt="파일추가"
      />
    </button>
  );
};

export default AddFileButtonAtom;
