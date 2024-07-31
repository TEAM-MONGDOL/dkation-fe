'use client';

import React from 'react';
import InputSubtitleAtom from '@/_components/common/atoms/InputSubtitleAtom';
import InputAreaAtom from '@/_components/common/atoms/InputAreaAtom';

interface InputProps {
  placeholder?: string;
  status?: 'error' | 'correct' | 'readonly' | 'disabled';
  value: string;
  subtitle?: string;
  message?: string;
  textCount?: number;
  name?: string;
  type?: 'text' | 'password' | 'number';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputModule = ({
  placeholder,
  status,
  value,
  subtitle,
  message,
  textCount,
  name,
  type,
  onChange = () => {},
}: InputProps) => {
  return (
    <div className={`flex w-full flex-col ${subtitle && 'gap-4'}`}>
      <InputSubtitleAtom
        message={message}
        status={status}
        subtitle={subtitle}
      />
      <InputAreaAtom
        placeholder={placeholder}
        status={status}
        value={value}
        textCount={textCount}
        name={name}
        type={type}
        onChange={onChange}
      />
    </div>
  );
};

export default InputModule;
