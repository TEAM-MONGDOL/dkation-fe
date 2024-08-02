import React from 'react';

interface TextboxAtomProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  sizeClass: string;
  name: string;
  readOnly?: boolean;
  bgColor?: string;
}

const TextAreaAtom = ({
  placeholder,
  value,
  onChange,
  sizeClass,
  name,
  readOnly,
  bgColor,
}: TextboxAtomProps) => {
  return (
    <textarea
      className={`w-full resize-none rounded-regular border border-stroke-100 p-3 text-3 placeholder-sub-200 outline-none ${readOnly ? 'cursor-not-allowed' : ''} ${sizeClass} ${bgColor}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      readOnly={readOnly}
    />
  );
};

export default TextAreaAtom;
