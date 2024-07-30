import TextCountAtom from '@/_components/common/atoms/TextCountAtom';

interface InputProps {
  placeholder?: string;
  status?: 'error' | 'correct' | 'readonly' | 'disabled';
  value: string;
  textCount?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const InputAreaAtom = ({
  placeholder,
  status,
  value,
  textCount,
  onChange,
  name,
}: InputProps) => {
  const getStatus = () => {
    switch (status) {
      case 'error':
        return 'border-negative';
      case 'correct':
        return 'border-positive';
      case 'readonly':
        return 'border-sub-100 cursor-not-allowed';
      case 'disabled':
        return 'bg-cus-100 cursor-not-allowed';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (textCount === undefined || e.target.value.length <= textCount) {
      onChange?.(e);
    }
  };

  const isInteractive = status !== 'readonly' && status !== 'disabled';

  return (
    <div className="relative">
      <input
        className={`w-full rounded-regular border border-stroke-100 py-3.5 pl-3 text-4 placeholder-sub-200 outline-0 ${getStatus()}`}
        placeholder={placeholder}
        readOnly={!isInteractive}
        value={value || ''}
        onChange={handleChange}
        name={name}
      />
      {isInteractive && textCount && (
        <div className="absolute bottom-3.5 right-3.5">
          <TextCountAtom text={value} maxLength={textCount} />
        </div>
      )}
    </div>
  );
};

export default InputAreaAtom;
