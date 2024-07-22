interface ButtonProps {
  onPage?: boolean;
  page: number;
  onClick: () => void;
}
const PaginationButton = ({ onPage = false, page, onClick }: ButtonProps) => {
  return (
    <button
      className={`text-2 border border-stroke-100 w-12 h-12 flex items-center justify-center ${onPage ? 'bg-cus-200 text-white' : 'text-cus-200'}`}
      onClick={onClick}
    >
      {page}
    </button>
  );
};

export default PaginationButton;
