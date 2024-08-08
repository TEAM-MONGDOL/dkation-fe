import { ErrorIcon } from '@/_assets/icons';
import Image from 'next/image';
import { ReactNode } from 'react';

interface UserLoginInputProps {
  type: 'text' | 'password';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error: string | null;
  sideChildren?: ReactNode;
}

const UserLoginInput = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  error,
  sideChildren,
}: UserLoginInputProps) => {
  return (
    <div className="flex w-full flex-col">
      <div
        className={`flex h-14 w-full items-center gap-x-2.5 rounded-lg ${error ? 'border-2 border-negative' : 'border border-sub-100'} px-5 py-2.5`}
      >
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="h-full grow font-medium text-sub-400 outline-none placeholder:text-sub-200"
          placeholder={placeholder}
        />
        {sideChildren}
      </div>
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
