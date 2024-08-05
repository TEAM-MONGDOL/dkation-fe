import React, { useState } from 'react';
import Image from 'next/image';
import DropdownItemAtom from '@/_components/common/atoms/DropdownItemAtom';
import { KeyboardArrowDownIcon } from '@/_assets/icons';

interface Option {
  label: string;
  key: string;
}

interface DropdownModuleProps {
  options: Option[];
  onSelect: (option: Option) => void;
  placeholder: string;
  selectedOption: Option | undefined | null;
  size?: 'small' | 'large' | 'full';
}

const DropdownModule = ({
  options,
  onSelect,
  placeholder,
  selectedOption,
  size = 'full',
}: DropdownModuleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClass =
    size === 'small' ? 'w-28' : size === 'large' ? 'w-52' : 'w-full';

  return (
    <div>
      <div
        role="presentation"
        className={`fixed left-0 top-0 z-10 h-full min-h-screen w-full ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsOpen(false)}
      />
      <div className={`relative inline-block ${sizeClass} text-left`}>
        <div>
          <button
            type="button"
            className={`flex h-5xl w-full items-center justify-between border border-stroke-100 px-4 text-4 ${
              isOpen ? 'rounded-t-regular' : 'rounded-regular'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={`${selectedOption ? 'text-sub-400' : 'text-sub-200'}`}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <Image
              src={KeyboardArrowDownIcon}
              alt="downarrow"
              className={`transform transition-transform duration-300 ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
        </div>
        <div
          className={`top-5xl duration-600 absolute z-20 w-full transform rounded-b-regular border border-t-0 border-stroke-100 bg-white transition-transform ease-in-out ${sizeClass} ${
            isOpen
              ? 'translate-y-0 border-t-0 opacity-100'
              : 'translate-y-[-1px] opacity-0'
          }`}
        >
          {isOpen && (
            <div className="w-full">
              {options.map((opt) => (
                <DropdownItemAtom
                  key={opt.key}
                  option={opt}
                  isSelect={selectedOption?.key === opt.key}
                  onSelect={(selectedOpt) => {
                    onSelect(selectedOpt);
                    setIsOpen(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropdownModule;
