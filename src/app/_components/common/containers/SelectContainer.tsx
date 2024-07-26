'use client';

import CheckboxModule from '@/_components/common/modules/CheckboxModule';

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
    <div className="flex flex-col w-[225px] h-[200px]">
      <div className="border border-stroke-100 px-5 py-2.5 rounded-t-regular">
        <CheckboxModule
          option={title}
          isChecked={areAllSelected}
          onClick={handleSelectAllClick}
          gap="md"
        />
      </div>
      <div className="overflow-y-auto border border-stroke-100 border-t-0 rounded-b-regular px-5 py-2.5 flex flex-col gap-2">
        {options.map((option) => (
          <CheckboxModule
            key={option}
            option={option}
            isChecked={selectedOptions.includes(option)}
            onClick={() => handleSelectOption(option)}
            gap="md"
          />
        ))}
      </div>
    </div>
  );
};

export default SelectContainer;
