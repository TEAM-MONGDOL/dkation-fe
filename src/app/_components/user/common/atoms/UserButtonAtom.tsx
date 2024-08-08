import Image from 'next/image';
import { RightArrowIcon } from '@/_assets/icons';

interface UserButtonAtomProps {
  text: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'header' | 'full';
  rightArrow?: boolean;
  buttonStyle: 'white' | 'red' | 'black' | 'lightGray' | 'darkGray' | 'yellow';
  type: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const UserButtonAtom = ({
  text,
  size,
  rightArrow,
  buttonStyle,
  type,
  className = '',
  onClick,
  disabled = false,
}: UserButtonAtomProps) => {
  const sizeStyles = {
    sm: 'px-4 py-2.5',
    md: 'px-5 py-2.5',
    lg: 'px-7 py-4',
    xl: 'px-9 py-2.5',
    header: 'rounded-lg px-4 py-2',
    full: 'w-full rounded-lg py-2.5',
  };

  const buttonStyles = {
    white: 'bg-white text-black border border-sub-100',
    red: 'bg-white text-negative border border-negative',
    black: 'bg-button text-white border border-button',
    lightGray: 'bg-sub-100 text-black border border-sub-100',
    darkGray: 'bg-sub-300 text-white border border-sub-300',
    yellow: 'bg-primary text-black border border-yellow-button-line',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-4 ${size ? sizeStyles[size] : ''} ${buttonStyles[buttonStyle]} ${disabled ? 'cursor-not-allowed' : ''} ${className}`}
    >
      {text}
      {rightArrow && <Image src={RightArrowIcon} alt="rightArrow" />}
    </button>
  );
};

export default UserButtonAtom;
