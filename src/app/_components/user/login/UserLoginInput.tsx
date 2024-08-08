import { ErrorIcon } from '@/_assets/icons';
import Image from 'next/image';

interface UserLoginInputProps {
  type: 'text' | 'password';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error: string | null;
}

const UserLoginInput = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
}: UserLoginInputProps) => {
  return (
    <div className="flex w-full flex-col">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`h-14 w-full rounded-lg ${error ? 'border-2 border-negative' : 'border border-yellow-button-line'} px-5 py-2.5 font-medium text-sub-400 outline-none placeholder:text-sub-200 ${
          type === 'password' ? 'tracking-widest' : ''
        }`}
        placeholder={placeholder}
      />
      <span className="flex items-center gap-x-0.5 text-sm leading-7 text-negative">
        {error && (
          <>
            <Image src={ErrorIcon} alt="Error Icon" />
            <span>{error}</span>
          </>
        )}
      </span>
    </div>
  );
};

export default UserLoginInput;
