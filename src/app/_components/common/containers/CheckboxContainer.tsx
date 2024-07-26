'use client';

import { useState } from 'react';
import AccordionHeaderModule from '@/_components/common/modules/AccordionHeaderModule';
import CheckboxModule from '@/_components/common/modules/CheckboxModule';
import AccordionBodyModule from '@/_components/common/modules/AccordionBodyModule';

interface CheckboxContainerProps {
  title: string;
  options: [string, string][];
  selectedOptions: string[];
  setSelectedOptions: (prev: string[]) => void;
}

const CheckboxContainer = ({
  title,
  options,
  selectedOptions,
  setSelectedOptions,
}: CheckboxContainerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedOptionHandler = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(
        selectedOptions.filter((selected) => selected !== option),
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="flex w-full flex-col py-2.5 px-3">
      <AccordionHeaderModule
        title={title}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <AccordionBodyModule isExpanded={isExpanded}>
        {options.map(([check, option]) => (
          <CheckboxModule
            key={`checkbox-${check}`}
            option={option}
            isChecked={selectedOptions.includes(check)}
            onClick={() => selectedOptionHandler(check)}
          />
        ))}
      </AccordionBodyModule>
    </div>
  );
};

export default CheckboxContainer;
