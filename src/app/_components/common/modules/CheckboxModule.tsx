import CheckboxAtom from '@/_components/common/atoms/CheckboxAtom';

interface CheckboxModuleProps {
  option: string;
  isChecked: boolean;
  onClick: () => void;
}

const CheckboxModule = ({
  option,
  isChecked,
  onClick,
}: CheckboxModuleProps) => {
  return (
    <button
      className="flex items-center justify-start w-full gap-x-2.5 bg-white"
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
