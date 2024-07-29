'use client';

import { useState } from 'react';
import Image from 'next/image';
import DropdownItemAtom from '@/_components/common/atoms/DropdownItemAtom';
import { DownArrowIcon } from '@/_assets/icons';

interface DropdownModuleProps {
  options: string[];
  onSelect: (option: string) => void;
  placeholder: string;
}

const DropdownModule = ({
  options,
  onSelect,
  placeholder,
}: DropdownModuleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={`inline-flex items-center w-full justify-between px-4 py-3.5 text-4 text-sub-300 border border-stroke-100 ${isOpen ? 'rounded-t-regular' : 'rounded-regular'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-sub-200">{selectedOption || placeholder}</span>
          <Image src={DownArrowIcon} alt="downarrow" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 w-full rounded-b-regular bg-white border border-stroke-100 border-t-0">
          {options.map((option, index) => (
            <DropdownItemAtom
              key={option}
              option={option}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownModule;
