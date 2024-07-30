'use client';

import Image from 'next/image';
import { SearchIcon } from '@/_assets/icons';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import { useState } from 'react';

interface BoxProps {
  filter?: boolean;
  onClick: () => void;
  placeholder: string;
  widthFull?: boolean;
  height?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchingBoxModule = ({
  filter,
  widthFull,
  height = 'h-11',
  onClick,
  placeholder,
  value: initialValue = '',
  onChange,
}: BoxProps) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };
  let widthClass = '';

  if (widthFull) {
    widthClass = 'w-full';
  } else {
    widthClass = filter ? 'w-[312px]' : 'w-[528px]';
  }
  return (
    <div className={`flex ${widthFull ? 'w-full' : ''}`}>
      <div
        className={`flex ${height} items-center gap-x-2.5 rounded-regular border border-stroke-100 bg-white px-3 py-1.5 ${widthClass}`}
      >
        <input
          className="h-full grow text-4 placeholder-sub-100 outline-0"
          placeholder={placeholder}
          value={value || ''}
          onChange={handleChange}
        />
        <Image
          className="cursor-pointer"
          src={SearchIcon}
          alt="SearchingGlasses"
        />
      </div>
      {filter && (
        <div className="ml-5">
          <FilteringButtonAtom onClick={onClick} />
        </div>
      )}
    </div>
  );
};

export default SearchingBoxModule;
