interface TextboxAtomProps {
  placeholder: string;
  size: 'SMALL' | 'MEDIUM' | 'LARGE';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaAtom = ({
  placeholder,
  size,
  value,
  onChange,
}: TextboxAtomProps) => {
  const sizeClass = {
    SMALL: 'h-[100px]',
    MEDIUM: 'h-[150px]',
    LARGE: 'h-[300px]',
  }[size];

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
