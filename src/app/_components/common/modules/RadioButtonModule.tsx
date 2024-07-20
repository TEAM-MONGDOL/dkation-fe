import React from 'react';
import RadioButtonAtom from '../atoms/RadioButtonAtom';

const RadioButtonModule = ({
  option,
  isClicked,
  onClick,
}: {
  option: string;
  isClicked: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className="flex items-center justify-start w-full gap-x-2.5 bg-white border-0"
      onClick={onClick}
    >
      <RadioButtonAtom isChecked={isClicked} />
      <div
        className={`text-2 ${isClicked ? 'font-medium text-sub-300' : 'font-normal text-sub-200'}`}
      >
        {option}
      </div>
    </button>
  );
};

export default RadioButtonModule;
