import Image from 'next/image';
import { CheckboxIcon, CheckboxOutlineBlankIcon } from '@/_assets/icons';

interface CheckboxAtomProps {
  isChecked: boolean;
}

const CheckboxAtom = ({ isChecked }: CheckboxAtomProps) => {
  return (
    <div className="inline-block" role="presentation">
      <Image
        src={isChecked ? CheckboxIcon : CheckboxOutlineBlankIcon}
        alt={isChecked ? 'Checked' : 'Unchecked'}
      />
    </div>
  );
};
export default CheckboxAtom;
