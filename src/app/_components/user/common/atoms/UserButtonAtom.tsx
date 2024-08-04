import Image from 'next/image';
import { RightArrowIcon } from '@/_assets/icons';

interface UserButtonAtomProps {
  text: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  rightArrow?: boolean;
  buttonStyle: 'white' | 'red' | 'black' | 'lightGray' | 'darkGray';
  type: 'button' | 'submit';
  className?: string;
}

const UserButtonAtom = ({
  text,
  size,
  rightArrow,
  buttonStyle,
  type,
  className = '',
}: UserButtonAtomProps) => {
  const sizeStyles = {
    sm: 'px-4 py-2.5',
    md: 'px-5 py-2.5',
    lg: 'px-7 py-4',
    xl: 'px-9 py-2.5',
  };

  const buttonStyles = {
    white: 'bg-white text-black border border-sub-100',
    red: 'bg-white text-negative border border-negative',
    black: 'bg-[#242424] text-white border border-[#242424]',
    lightGray: 'bg-sub-100 text-black border border-sub-100',
    darkGray: 'bg-sub-300 text-white border border-sub-300',
  };

  return (
    <button
      type={type}
      className={`flex items-center justify-center gap-4 ${sizeStyles[size]} ${buttonStyles[buttonStyle]} ${className}`}
    >
      {text}
      {rightArrow && <Image src={RightArrowIcon} alt="rightArrow" />}
    </button>
  );
};

export default UserButtonAtom;
