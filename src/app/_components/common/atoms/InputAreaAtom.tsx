import TextCountAtom from '@/_components/common/atoms/TextCountAtom';

interface InputProps {
  placeholder?: string;
  status?: 'error' | 'correct' | 'readonly' | 'disabled' | 'cursor';
  value: string | number;
  textCount?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: 'text' | 'password' | 'number';
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const InputAreaAtom = ({
  placeholder,
  status,
  value,
  textCount,
  onChange,
  name,
  type = 'text',
  onClick,
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
      case 'cursor':
        return 'cursor-pointer';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (textCount === undefined || e.target.value.length <= textCount) {
      onChange?.(e);
    }
  };

  const isInteractive =
    status !== 'readonly' && status !== 'disabled' && status !== 'cursor';

  return (
    <div
      role="presentation"
      className={`flex w-full items-center gap-x-4 rounded-regular border border-stroke-100 px-3 py-3.5 text-4 ${getStatus()}`}
      onClick={onClick}
    >
      <input
        className="min-w-0 grow bg-transparent placeholder-sub-200 outline-0"
        placeholder={placeholder}
        readOnly={!isInteractive}
        value={value || ''}
        onChange={handleChange}
        name={name}
        type={type}
        onWheel={(e) => e.currentTarget.blur()}
      />
      {isInteractive && textCount && (
        <div className="flex shrink-0 items-center justify-center">
          <TextCountAtom text={value.toString()} maxLength={textCount} />
        </div>
      )}
    </div>
  );
};

export default InputAreaAtom;
