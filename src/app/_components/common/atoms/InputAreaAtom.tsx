'use client';

import { useEffect, useState } from 'react';

interface InputProps {
  placeholder?: string;
  status?: 'error' | 'correct' | 'readonly' | 'disabled';
  value?: string;
  textCount?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
}

const InputAreaAtom = ({
  placeholder,
  status,
  value: initialValue = '',
  textCount,
  onChange,
}: InputProps) => {
  const [value, setValue] = useState(initialValue);

  const getStatus = () => {
    switch (status) {
      case 'error':
        return 'border-negative';
      case 'correct':
        return 'border-positive';
      case 'readonly':
        return 'border-sub-100';
      case 'disabled':
        return 'bg-cus-100 cursor-not-allowed';
      default:
        return '';
    }
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (textCount !== undefined && e.target.value.length <= textCount) {
      setValue(e.target.value);
      onChange?.(e);
    }
  };

  return (
    <div className="relative">
      <input
        className={`rounded-regular pl-3 border border-stroke-100 outline-0 w-full py-3.5 placeholder-sub-200 text-4 ${getStatus()}`}
        placeholder={placeholder}
        readOnly={status === 'readonly' || status === 'disabled'}
        value={value || ''}
        onChange={handleChange}
      />
      {textCount && (
        <div className="absolute bottom-3.5 right-3.5 text-4 text-sub-200">
          {value.length}/{textCount}
        </div>
      )}
    </div>
  );
};

export default InputAreaAtom;
