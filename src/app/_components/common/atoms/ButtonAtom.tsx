import React, { ReactNode } from 'react';

interface ButtonProps {
  flexGrow?: boolean;
  width?: string;
  buttonType?: 'yellow' | 'dark' | 'red';
  children: ReactNode;
}

/**
 * ButtonAtom 컴포넌트
 * @param flexGrow - 버튼의 flex-grow 여부를 결정하는 boolean 값
 * @param width - 버튼의 width를 px 단위로 지정하는 string 값 (width="48")
 * @param buttonType - 버튼의 배경색과 글자색 스타일 지정 ('yellow', 'dark', 'red')
 * @param children - 버튼에 표시될 내용
 */

const ButtonAtom = ({ flexGrow, width, buttonType, children }: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center text-3 h-[50px] font-semibold rounded-[5px]';
  const flexGrowClasses = flexGrow ? 'flex-grow' : '';

  let buttonTypeClasses = '';
  switch (buttonType) {
    case 'yellow':
      buttonTypeClasses = 'bg-primary text-sub-400';
      break;
    case 'dark':
      buttonTypeClasses = 'bg-cus-300 text-white';
      break;
    case 'red':
      buttonTypeClasses = 'bg-negative text-white';
      break;
    default:
      buttonTypeClasses = '';
  }

  return (
    <button
      type="button"
      className={`${baseClasses} ${flexGrowClasses} ${buttonTypeClasses}`}
      style={width ? { width: `${width}px` } : undefined}
    >
      {children}
    </button>
  );
};

export default ButtonAtom;
