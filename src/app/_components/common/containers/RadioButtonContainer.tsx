import { useState } from 'react';
import RadioButtonModule from '@/_components/common/modules/RadioButtonModule';
import AccordionHeaderModule from '@/_components/common/modules/AccordionHeaderModule';
import AccordionBodyModule from '@/_components/common/modules/AccordionBodyModule';

const RadioButtonContainer = ({
  title,
  options,
  selectedOption,
  setSelectedOption,
}: {
  title: string;
  options: string[];
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex w-full flex-col px-3 py-2.5">
      <AccordionHeaderModule
        title={title}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <AccordionBodyModule isExpanded={isExpanded}>
        {options.map((option) => (
          <RadioButtonModule
            key={`radio-button-${title}-${option}`}
            option={option}
            isClicked={selectedOption === option}
            onClick={() => setSelectedOption(option)}
          />
        ))}
      </AccordionBodyModule>
    </div>
  );
};

export default RadioButtonContainer;
