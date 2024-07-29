import React, { ReactNode } from 'react';

interface ButtonProps {
  flexGrow?: boolean;
  buttonStyle: 'yellow' | 'dark' | 'red';
  onClick?: () => void;
  children: ReactNode;
  type?: 'button' | 'submit';
}

/**
 * ButtonAtom 컴포넌트
 * @param flexGrow - 버튼의 flex-grow 여부를 결정하는 boolean 값
 * @param buttonStyle - 버튼의 배경색과 글자색 스타일 지정 ('yellow', 'dark', 'red')
 * @param children - 버튼에 표시될 내용
 * @param onClick - 버튼 클릭 시 동작
 * @param type - 버튼 타입 ('button', 'submit')
 */

const getButtonType = (
  buttonStyle: 'yellow' | 'dark' | 'red' | undefined,
): string => {
  switch (buttonStyle) {
    case 'yellow':
      return 'bg-primary text-sub-400';
    case 'dark':
      return 'bg-cus-300 text-white';
    case 'red':
      return 'bg-negative text-white';
    default:
      return ' ';
  }
};

const ButtonAtom = ({
  flexGrow,
  buttonStyle,
  children,
  onClick,
  type = 'button',
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center text-3 h-12 font-semibold rounded-regular';
  const flexGrowClasses = flexGrow ? 'flex-grow' : 'px-10';
  const buttonTypeClasses = getButtonType(buttonStyle);

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${flexGrowClasses} ${buttonTypeClasses}`}
    >
      {children}
    </button>
  );
};

export default ButtonAtom;
