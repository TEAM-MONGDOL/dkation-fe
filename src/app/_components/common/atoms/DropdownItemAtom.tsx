interface DropdownItemProps {
  option: string;
  onSelect: (option: string) => void;
}

const DropdownItem = ({ option, onSelect }: DropdownItemProps) => {
  return (
    <button
      onClick={() => onSelect(option)}
      className="px-4 py-3.5 text-4 text-sub-300 w-full text-left"
      role="menuitem"
    >
      {option}
    </button>
  );
};

export default DropdownItem;
