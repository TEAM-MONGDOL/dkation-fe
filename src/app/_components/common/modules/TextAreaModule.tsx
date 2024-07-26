import React, { useState } from 'react';
import TextAreaAtom from '@/_components/common/atoms/TextAreaAtom';
import TextCountAtom from '@/_components/common/atoms/TextCountAtom';

interface TextboxModuleProps {
  placeholder: string;
  size: 'SMALL' | 'MEDIUM' | 'LARGE';
  maxLength: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaModule = ({
  placeholder,
  size,
  maxLength,
  value,
  onChange,
}: TextboxModuleProps) => {
  const [text, setText] = useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      setText(newValue);
      onChange?.(e);
    }
  };

  const sizeClass = {
    SMALL: 'h-[100px]',
    MEDIUM: 'h-[150px]',
    LARGE: 'h-[300px]',
  }[size];

  return (
    <div className={`relative w-full ${sizeClass}`}>
      <TextAreaAtom
        placeholder={placeholder}
        value={text}
        onChange={handleChange}
        sizeClass={sizeClass}
      />
      <div className="absolute bottom-3.5 right-3.5 text-4 text-sub-200">
        <TextCountAtom text={text} maxLength={maxLength} />
      </div>
    </div>
  );
};

export default TextAreaModule;
