import Image from 'next/image';
import { FilterListIcon } from '@/_assets/icons';

interface FilteringButtonAtomProps {
  onClick: () => void;
}

const FilteringButtonAtom = ({ onClick }: FilteringButtonAtomProps) => {
  return (
    <button
      className="flex h-5xl items-center gap-3 rounded-xl border border-stroke-100 bg-cus-100 px-2"
      onClick={onClick}
    >
      <p className="text-5 font-bold text-sub-300">필터링 및 정렬</p>
      <Image src={FilterListIcon} alt="filtericon" />
    </button>
  );
};

export default FilteringButtonAtom;
