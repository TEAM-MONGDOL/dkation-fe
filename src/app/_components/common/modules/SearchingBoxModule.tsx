'use client';

import Image from 'next/image';
import { SearchIcon } from '@/_assets/icons';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import { useState } from 'react';
import DropdownModule from '@/_components/common/modules/DropdownModule';

interface BoxProps {
  filter?: boolean;
  onClick: () => void;
  placeholder: string;
  widthFull?: boolean;
  height?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (query: string) => void;
  options?: string[];
  onSelect?: (option: string) => void;
  dropdownPlaceholder?: string;
  selectedOption?: string;
}

const SearchingBoxModule = ({
  filter,
  widthFull,
  height = 'h-5xl',
  onClick,
  placeholder,
  value: initialValue = '',
  onChange,
  onSearch,
  options = [],
  onSelect = () => {},
  dropdownPlaceholder = '',
  selectedOption,
}: BoxProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange?.(e);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  let widthClass = '';

  if (widthFull) {
    widthClass = 'w-full';
  } else {
    widthClass = filter ? 'max-w-[312px]' : 'max-w-[528px]';
  }

  return (
    <form
      className={`flex grow items-start justify-end gap-x-2.5 ${widthFull ? 'w-full' : ''}`}
      onSubmit={handleSearch}
    >
      {options && options.length > 0 ? (
        <DropdownModule
          size="small"
          options={options}
          onSelect={onSelect}
          placeholder={dropdownPlaceholder}
          selectedOption={selectedOption}
        />
      ) : null}
      <div
        className={`flex ${height} ${widthClass} grow items-center gap-x-2.5 rounded-regular border border-stroke-100 bg-white px-3 py-1.5`}
      >
        <input
          className="h-full grow text-4 placeholder-sub-100 outline-0"
          placeholder={placeholder}
          value={value || ''}
          onChange={handleChange}
        />
        <button type="submit">
          <Image
            className="cursor-pointer"
            src={SearchIcon}
            alt="SearchingGlasses"
          />
        </button>
      </div>
      {filter && <FilteringButtonAtom onClick={onClick} />}
    </form>
  );
};

export default SearchingBoxModule;
