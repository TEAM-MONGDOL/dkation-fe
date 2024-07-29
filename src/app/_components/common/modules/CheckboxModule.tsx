import CheckboxAtom from '@/_components/common/atoms/CheckboxAtom';

interface CheckboxModuleProps {
  option: string;
  isChecked: boolean;
  onClick: () => void;
  gap?: 'sm' | 'md';
}

const CheckboxModule = ({
  option,
  isChecked,
  onClick,
  gap = 'sm',
}: CheckboxModuleProps) => {
  return (
    <button
      className={`flex items-center justify-start w-full ${gap === 'sm' ? 'gap-x-2.5' : 'gap-x-10'} py-[5px] bg-white`}
      onClick={onClick}
    >
      <CheckboxAtom isChecked={isChecked} />
      <div
        className={`text-4 ${isChecked ? 'font-medium text-sub-300' : 'text-sub-200'}`}
      >
        {option}
      </div>
    </button>
  );
};

export default CheckboxModule;
