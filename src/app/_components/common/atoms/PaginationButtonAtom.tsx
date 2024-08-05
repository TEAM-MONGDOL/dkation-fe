interface ButtonProps {
  onPage?: boolean;
  page: number;
  onClick: () => void;
  disabled?: boolean;
  user?: boolean;
}
const PaginationButtonAtom = ({
  onPage = false,
  page,
  onClick,
  disabled = false,
  user = false,
}: ButtonProps) => {
  return (
    <button
      className={`flex h-12 w-12 items-center justify-center border text-4 ${onPage ? (user ? 'border-[#9A9998] bg-[#9A9998] text-white' : 'bg-cus-200 text-white') : 'border-stroke-100 text-cus-200'} ${disabled ? 'cursor-not-allowed bg-gray-200 text-gray-500' : ''}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {page}
    </button>
  );
};

export default PaginationButtonAtom;
