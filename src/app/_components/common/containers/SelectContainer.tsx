'use client';

import React from 'react';
import SelectModule from '@/_components/common/modules/SelectModule';
import CheckboxAtom from '../atoms/CheckboxAtom';

interface SelectContainerProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  setSelectedOptions: (prev: string[]) => void;
}

const SelectContainer = ({
  title,
  options,
  selectedOptions,
  setSelectedOptions,
}: SelectContainerProps) => {
  const areAllSelected = options.every((option) =>
    selectedOptions.includes(option),
  );

  const handleSelectOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => selectedOption !== option),
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSelectAllClick = () => {
    const newSelectedState = areAllSelected ? [] : options;
    setSelectedOptions(newSelectedState);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="border border-stroke-100 px-5 py-2.5 rounded-t-regular">
        <button
          className="flex items-center justify-start w-full gap-x-10 bg-white text-2 text-sub-300"
          onClick={handleSelectAllClick}
        >
          <CheckboxAtom isChecked={areAllSelected} />
          <div>{title}</div>
        </button>
      </div>
      <div className="border border-stroke-100 border-t-0 rounded-b-regular px-5 py-2.5 flex flex-col gap-2">
        {options.map((option) => (
          <SelectModule
            key={option}
            option={option}
            isChecked={selectedOptions.includes(option)}
            onClick={() => handleSelectOption(option)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectContainer;
