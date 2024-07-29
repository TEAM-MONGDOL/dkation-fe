import React, { ReactNode } from 'react';

interface ButtonProps {
  flexGrow?: boolean;
  buttonType: 'yellow' | 'dark' | 'red';
  onClick?: () => void;
  children: ReactNode;
}

/**
 * ButtonAtom 컴포넌트
 * @param flexGrow - 버튼의 flex-grow 여부를 결정하는 boolean 값
 * @param buttonType - 버튼의 배경색과 글자색 스타일 지정 ('yellow', 'dark', 'red')
 * @param children - 버튼에 표시될 내용
 * @param onClick - 버튼 클릭 시 동작
 */

const getButtonType = (
  buttonType: 'yellow' | 'dark' | 'red' | undefined,
): string => {
  switch (buttonType) {
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
  buttonType,
  children,
  onClick,
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center text-3 py-3.5 font-semibold rounded-[5px]';
  const flexGrowClasses = flexGrow ? 'flex-grow' : 'px-10';
  const buttonTypeClasses = getButtonType(buttonType);

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${flexGrowClasses} ${buttonTypeClasses}`}
    >
      {children}
    </button>
  );
};

export default ButtonAtom;
