interface DropdownItemProps {
  option: string;
  isSelect: boolean;
  onSelect: (option: string) => void;
}

const DropdownItem = ({ option, isSelect, onSelect }: DropdownItemProps) => {
  return (
    <button
      onClick={() => onSelect(option)}
      className={`w-full px-4 py-3.5 text-left text-4 ${isSelect ? 'font-semibold text-sub-400' : 'text-sub-300'}`}
      role="menuitem"
    >
      {option}
    </button>
  );
};

export default DropdownItem;
