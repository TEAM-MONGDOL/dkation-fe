import Image from 'next/image';
import { ClickedCheckBox, UnClickedCheckBox } from '@/_assets/icons';

interface CheckboxAtomProps {
  isChecked: boolean;
  onClick?: () => void;
  size?: number;
}

const CheckboxAtom = ({ isChecked, onClick, size }: CheckboxAtomProps) => {
  return (
    <div className="inline-block" role="presentation" onClick={onClick}>
      <Image
        src={isChecked ? ClickedCheckBox : UnClickedCheckBox}
        alt={isChecked ? 'Checked' : 'Unchecked'}
        width={size || 24}
        height={size || 24}
      />
    </div>
  );
};
export default CheckboxAtom;
