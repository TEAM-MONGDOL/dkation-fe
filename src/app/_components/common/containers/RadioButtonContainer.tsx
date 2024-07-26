'use client';

import { useState } from 'react';
import RadioButtonModule from '@/_components/common/modules/RadioButtonModule';
import AccordionHeaderModule from '@/_components/common/modules/AccordionHeaderModule';
import AccordionBodyModule from '@/_components/common/modules/AccordionBodyModule';

interface RadioButtonContainerProps {
  title: string;
  options: [string, string][];
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

const RadioButtonContainer = ({
  title,
  options,
  selectedOption,
  setSelectedOption,
}: RadioButtonContainerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex w-full flex-col px-3 py-2.5">
      <AccordionHeaderModule
        title={title}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <AccordionBodyModule isExpanded={isExpanded}>
        {options.map(([radio, option]) => (
          <RadioButtonModule
            key={`radio-button-${radio}`}
            option={option}
            isClicked={selectedOption === radio}
            onClick={() => setSelectedOption(radio)}
          />
        ))}
      </AccordionBodyModule>
    </div>
  );
};

export default RadioButtonContainer;
