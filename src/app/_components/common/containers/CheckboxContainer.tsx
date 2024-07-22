import { useState } from 'react';
import AccordionHeaderModule from '../modules/AccordionHeaderModule';
import CheckboxModule from '../modules/CheckboxModule';
import AccordionBodyModule from '../modules/AccordionBodyModule';

interface CheckboxContainerProps {
  title: string;
  options: string[];
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

  const handleSelectOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => selectedOption !== option),
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
        {options.map((option) => (
          <CheckboxModule
            key={`checkbox-${title}-${option}`}
            option={option}
            isChecked={selectedOptions.includes(option)}
            onClick={() => handleSelectOption(option)}
          />
        ))}
      </AccordionBodyModule>
    </div>
  );
};

export default CheckboxContainer;
