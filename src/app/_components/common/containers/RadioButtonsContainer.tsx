import { KeyboardArrowDown } from '@/_assets/icons';
import Image from 'next/image';
import { useState } from 'react';
import RadioButtonModule from '../modules/RadioButtonModule';
import AccordionHeaderModule from '../modules/AccordionHeaderModule';

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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex w-full flex-col px-3 py-2.5">
      <AccordionHeaderModule
        title={title}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
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
