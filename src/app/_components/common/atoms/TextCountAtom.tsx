interface TextCountAtomProps {
  text: string;
  maxLength?: number;
}

const TextCountAtom = ({ text, maxLength }: TextCountAtomProps) => {
  return (
    <div className="text-right text-4 text-sub-200">
      {text.length} / {maxLength}
    </div>
  );
};

export default TextCountAtom;
