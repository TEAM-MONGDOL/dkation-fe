import CheckboxAtom from '@/_components/common/atoms/CheckboxAtom';

interface CheckboxModuleProps {
  option: string;
  isChecked: boolean;
  onClick: () => void;
  gap?: 'sm' | 'md';
  size?: number;
}

const CheckboxModule = ({
  option,
  isChecked,
  onClick,
  gap = 'sm',
  size = 24,
}: CheckboxModuleProps) => {
  return (
    <button
      className={`flex w-full items-center justify-start ${gap === 'sm' ? 'gap-x-2.5' : 'gap-x-10'} bg-white py-[5px]`}
      onClick={onClick}
    >
      <CheckboxAtom isChecked={isChecked} size={size} />
      <div
        className={`text-4 ${isChecked ? 'font-medium text-sub-300' : 'text-sub-200'}`}
      >
        {option}
      </div>
    </button>
  );
};

export default CheckboxModule;
