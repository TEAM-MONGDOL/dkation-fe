import Image from 'next/image';
import { ErrorIcon } from '@/_assets/icons';

interface UserPasswordInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string | null;
}

const UserPasswordInput = ({
  name,
  value,
  onChange,
  placeholder,
  error,
}: UserPasswordInputProps) => {
  return (
    <div className="flex w-full flex-col">
      <input
        type="password"
        name={name}
        value={value}
        onChange={onChange}
        className="h-14 w-full rounded bg-sub-100/30 px-5 py-2.5 text-sub-400 outline-none placeholder:text-sub-200"
        placeholder={placeholder}
      />
      {error && (
        <span className="mt-1 flex items-center gap-x-0.5 text-sm leading-7 text-negative">
          <Image src={ErrorIcon} alt="Error Icon" />
          <span>{error}</span>
        </span>
      )}
    </div>
  );
};

export default UserPasswordInput;
