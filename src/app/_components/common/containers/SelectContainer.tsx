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
    <div className="flex h-[200px] w-[225px] flex-col">
      <div className="rounded-t-regular border border-stroke-100 px-5 py-2.5">
        <CheckboxModule
          option={title}
          isChecked={areAllSelected}
          onClick={handleSelectAllClick}
          gap="md"
        />
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto rounded-b-regular border border-t-0 border-stroke-100 px-5 py-2.5">
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
