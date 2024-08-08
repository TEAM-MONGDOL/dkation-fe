import Image from 'next/image';
import { CheckboxIcon, CheckboxOutlineBlankIcon } from '@/_assets/icons';

interface CheckboxAtomProps {
  isChecked: boolean;
  onClick?: () => void;
  size?: number;
}

const CheckboxAtom = ({ isChecked, onClick, size = 24 }: CheckboxAtomProps) => {
  return (
    <div className="inline-block" role="presentation" onClick={onClick}>
      <Image
        src={isChecked ? CheckboxIcon : CheckboxOutlineBlankIcon}
        alt={isChecked ? 'Checked' : 'Unchecked'}
        width={size}
        height={size}
      />
    </div>
  );
};
export default CheckboxAtom;
