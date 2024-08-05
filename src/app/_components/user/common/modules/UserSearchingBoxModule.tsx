'use client';

import Image from 'next/image';
import { SearchIcon } from '@/_assets/icons';
import { useState } from 'react';

interface BoxProps {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
}

const UserSearchingBoxModule = ({
  placeholder,
  value: initialValue = '',
  onChange,
  onClick,
}: BoxProps) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  return (
    <div className="flex h-[34px] w-[312px] rounded-regular border px-3 py-1.5">
      <input
        className="grow text-4 placeholder-sub-100 outline-0"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      <Image
        className="cursor-pointer"
        src={SearchIcon}
        alt="SearchingGlasses"
        onClick={onClick}
      />
    </div>
  );
};

export default UserSearchingBoxModule;
