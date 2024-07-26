import React, { useState } from 'react';
import TextAreaAtom from '@/_components/common/atoms/TextAreaAtom';
import TextCountAtom from '@/_components/common/atoms/TextCountAtom';

interface TextboxModuleProps {
  placeholder: string;
  size: 'SMALL' | 'MEDIUM' | 'LARGE';
  maxLength: number;
}

const TextAreaModule = ({
  placeholder,
  size,
  maxLength,
}: TextboxModuleProps) => {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setText(e.target.value);
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
        size={size}
        value={text}
        onChange={handleChange}
      />
      <div className="absolute bottom-3.5 right-3.5 text-4 text-sub-200">
        <TextCountAtom text={text} maxLength={maxLength} />
      </div>
    </div>
  );
};

export default TextAreaModule;
