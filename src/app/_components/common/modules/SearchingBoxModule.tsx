'use client';

import Image from 'next/image';
import { SearchingGlasses } from '@/_assets/icons';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import { useState } from 'react';

interface BoxProps {
  filter?: boolean;
  onClick: () => void;
  placeholder: string;
  widthFull?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchingBoxModule = ({
  filter,
  widthFull,
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
      <div className={`relative ${widthFull ? 'w-full' : ''}`}>
        <input
          className={`h-11 rounded-regular border pl-2.5 pr-10 text-4 placeholder-sub-100 outline-0 ${widthClass}`}
          placeholder={placeholder}
          value={value || ''}
          onChange={handleChange}
        />
        <Image
          className="absolute bottom-3 right-3 cursor-pointer"
          src={SearchingGlasses}
          alt="SearchingGlasses"
        />
      </div>
      <div className="ml-5">
        {filter && <FilteringButtonAtom onClick={onClick} />}
      </div>
    </div>
  );
};

export default SearchingBoxModule;
