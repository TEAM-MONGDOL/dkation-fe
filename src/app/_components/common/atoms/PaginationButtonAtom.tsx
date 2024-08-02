interface ButtonProps {
  onPage?: boolean;
  page: number;
  onClick: () => void;
  disabled?: boolean;
}
const PaginationButtonAtom = ({
  onPage = false,
  page,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`text-4 border border-stroke-100 w-12 h-12 flex items-center justify-center ${onPage ? 'bg-cus-200 text-white' : 'text-cus-200'} ${disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : ''}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {page}
    </button>
  );
};

export default PaginationButtonAtom;
