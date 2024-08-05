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
      className={`flex h-12 w-12 items-center justify-center border border-stroke-100 text-4 ${onPage ? 'bg-cus-200 text-white' : 'text-cus-200'} ${disabled ? 'cursor-not-allowed bg-gray-200 text-gray-500' : ''}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {page}
    </button>
  );
};

export default PaginationButtonAtom;
