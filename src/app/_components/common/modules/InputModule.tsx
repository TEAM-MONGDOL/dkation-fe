import React from 'react';
import InputSubtitleAtom from '@/_components/common/atoms/InputSubtitleAtom';
import InputAreaAtom from '@/_components/common/atoms/InputAreaAtom';

interface InputProps {
  placeholder?: string;
  status?: 'error' | 'correct' | 'readonly' | 'disabled';
  value?: string;
  subtitle?: string;
  message?: string;
  textCount?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputModule = ({
  placeholder,
  status,
  value,
  subtitle,
  message,
  textCount,
  onChange,
}: InputProps) => {
  return (
    <div className="flex flex-col">
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
        onChange={onChange}
      />
    </div>
  );
};

export default InputModule;
