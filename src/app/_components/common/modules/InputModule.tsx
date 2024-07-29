'use client';

import React, { useState } from 'react';
import InputSubtitleAtom from '@/_components/common/atoms/InputSubtitleAtom';
import InputAreaAtom from '@/_components/common/atoms/InputAreaAtom';

interface InputProps {
  placeholder?: string;
  status?: 'error' | 'correct' | 'readonly' | 'disabled';
  value?: string;
  subtitle?: string;
  message?: string;
  textCount?: number;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputModule = ({
  placeholder,
  status,
  value = '',
  subtitle,
  message,
  textCount,
  name,
  onChange,
}: InputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };
  return (
    <div className={`flex flex-col w-full ${subtitle && 'gap-4'}`}>
      <InputSubtitleAtom
        message={message}
        status={status}
        subtitle={subtitle}
      />
      <InputAreaAtom
        placeholder={placeholder}
        status={status}
        value={inputValue}
        textCount={textCount}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputModule;
