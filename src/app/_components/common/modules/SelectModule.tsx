import CheckboxAtom from '../atoms/CheckboxAtom';

interface SelectHeaderModuleProps {
  option: string;
  isChecked: boolean;
  onClick: () => void;
}

const SelectModule = ({
  option,
  isChecked,
  onClick,
}: SelectHeaderModuleProps) => {
  return (
    <button
      className="flex w-full items-center gap-x-10 bg-white text-2 text-sub-300"
      onClick={onClick}
    >
      <CheckboxAtom isChecked={isChecked} />
      <p>{option}</p>
    </button>
  );
};

export default SelectModule;
