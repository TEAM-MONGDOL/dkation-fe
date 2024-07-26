import React from 'react';

interface TextboxAtomProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  sizeClass: string;
}

const TextAreaAtom = ({
  placeholder,
  value,
  onChange,
  sizeClass,
}: TextboxAtomProps) => {
  return (
    <textarea
      className={`w-full p-3 border border-stroke-100 placeholder-sub-200 rounded-regular text-3 outline-none resize-none ${sizeClass}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextAreaAtom;
