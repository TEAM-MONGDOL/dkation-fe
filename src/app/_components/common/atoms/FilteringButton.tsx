import Image from 'next/image';
import { FilterIcon } from '@/_assets/icons';

const FilteringButton = () => {
  return (
    <button className="items-center border border-stroke-100 flex px-2 h-11 bg-cus-100 rounded-xl gap-3">
      <p className="font-bold text-5 text-sub-300">필터링 및 정렬</p>
      <Image src={FilterIcon} alt="filtericon" />
    </button>
  );
};

export default FilteringButton;
