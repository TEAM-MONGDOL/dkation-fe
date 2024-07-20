import { KeyboardArrowDown } from '@/_assets/icons';
import Image from 'next/image';
import { useState } from 'react';
import RadioButtonModule from '../modules/RadioButtonModule';

const RadioButtonsContainer = ({
  title,
  currentChecked,
  setCurrentChecked,
  optionList,
}: {
  title: string;
  currentChecked: string;
  setCurrentChecked: (value: string) => void;
  optionList: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full flex-col px-3 py-2.5">
      <div
        role="presentation"
        className="cursor-pointer w-full flex items-center justify-between py-2 px-3 gap-x-2"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter') {
            setIsOpen(!isOpen);
          }
        }}
      >
        <div className="font-bold text-3">{title}</div>
        <Image
          className={`
          transform transition-transform duration-300 w-5 h-5 ${isOpen ? 'rotate-180' : 'rotate-0'}
          `}
          src={KeyboardArrowDown}
          alt="Arrow Down"
        />
      </div>
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="w-full flex flex-col items-start justify-start gap-y-1.5 px-3 mt-1.5">
          {optionList.map((option) => (
            <RadioButtonModule
              key={`radio-button-${title}-${option}`}
              option={option}
              isClicked={currentChecked === option}
              onClick={() => setCurrentChecked(option)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RadioButtonsContainer;
