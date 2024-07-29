import React, { ReactNode } from 'react';

interface ButtonProps {
  buttonStyle: 'yellow' | 'dark' | 'red';
  onClick?: () => void;
  children: ReactNode;
  type?: 'button' | 'submit';
  width?: 'fixed' | 'grow';
}

/**
 * ButtonAtom 컴포넌트
 * @param buttonStyle - 버튼의 배경색과 글자색 스타일 지정 ('yellow', 'dark', 'red')
 * @param children - 버튼에 표시될 내용
 * @param onClick - 버튼 클릭 시 동작
 * @param type - 버튼 타입 ('button', 'submit')
 * @param width - 버튼 너비 지정 ('fixed'-150px , grow, 미지정시 px-10)
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

const getWidthClasses = (width: 'fixed' | 'grow' | undefined): string => {
  switch (width) {
    case 'fixed':
      return 'w-[150px]';
    case 'grow':
      return 'grow';
    default:
      return 'px-10';
  }
};

const ButtonAtom = ({
  buttonStyle,
  children,
  onClick,
  type = 'button',
  width,
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center text-3 h-12 font-semibold rounded-regular';
  const widthClasses = getWidthClasses(width);
  const buttonTypeClasses = getButtonType(buttonStyle);

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${widthClasses} ${buttonTypeClasses}`}
    >
      {children}
    </button>
  );
};

export default ButtonAtom;
