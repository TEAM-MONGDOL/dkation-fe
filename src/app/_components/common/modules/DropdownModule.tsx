'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import DropdownItemAtom from '@/_components/common/atoms/DropdownItemAtom';
import { DownArrowIcon } from '@/_assets/icons';

interface DropdownModuleProps {
  options: string[];
  onSelect: (option: string) => void;
  placeholder: string;
  initialSelectedOption?: string;
  fixed?: boolean;
}

const DropdownModule = ({
  options,
  onSelect,
  placeholder,
  initialSelectedOption,
  fixed = false,
}: DropdownModuleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    if (initialSelectedOption) {
      setSelectedOption(initialSelectedOption);
    }
  }, [initialSelectedOption]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <>
      <div
        role="presentation"
        className={`fixed w-screen top-0 left-0 min-h-screen h-full z-10 ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      />
      <div className="relative inline-block text-left w-full">
        <div>
          <button
            type="button"
            className={`flex items-center justify-between px-4 text-4 text-sub-300 border border-stroke-100 h-5xl ${fixed ? 'w-52' : 'w-full'} ${isOpen ? 'rounded-t-regular' : 'rounded-regular'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-sub-200">
              {selectedOption || placeholder}
            </span>
            <Image src={DownArrowIcon} alt="downarrow" />
          </button>
        </div>
        <div
          className={`absolute left-0 top-5xl w-full rounded-b-regular bg-white border border-stroke-100 border-t-0 transition-transform duration-600 ease-in-out transform z-20 ${fixed ? 'w-52' : 'w-full'} ${isOpen ? 'translate-y-0 opacity-100 border-t-0' : 'translate-y-[-1px] opacity-0'}`}
        >
          {isOpen && (
            <div>
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
      </div>
    </>
  );
};

export default DropdownModule;
