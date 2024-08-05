import React from 'react';

interface Option {
  label: string;
  key: string;
}

interface DropdownItemProps {
  option: Option;
  isSelect: boolean;
  onSelect: (option: Option) => void;
}

const DropdownItemAtom = ({
  option,
  isSelect,
  onSelect,
}: DropdownItemProps) => {
  return (
    <button
      onClick={() => onSelect(option)} // Pass Option instead of string
      className={`w-full px-4 py-3.5 text-left text-4 ${isSelect ? 'font-semibold text-sub-400' : 'text-sub-300'}`}
      role="menuitem"
    >
      {option.label} {/* Use option.label */}
    </button>
  );
};

export default DropdownItemAtom;
