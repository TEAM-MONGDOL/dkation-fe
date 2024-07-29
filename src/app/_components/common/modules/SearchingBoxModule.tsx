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
    <div className="flex">
      <div className="relative">
        <input
          className={`pr-10 placeholder-sub-100 border rounded-regular text-4 h-11 outline-0 pl-2.5 ${widthClass}`}
          placeholder={placeholder}
          value={value || ''}
          onChange={handleChange}
        />
        <Image
          className="cursor-pointer absolute bottom-3 right-3"
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
