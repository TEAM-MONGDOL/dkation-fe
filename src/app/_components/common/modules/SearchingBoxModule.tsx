import Image from 'next/image';
import { SearchingGlasses } from '@/_assets/icons';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';

interface BoxProps {
  filter?: boolean;
  onClick: () => void;
  placeholder: string;
}

const SearchingBoxModule = ({ filter, onClick, placeholder }: BoxProps) => {
  return (
    <div className="flex">
      <div className="relative">
        <input
          className={`h-11 rounded-regular border pl-2 pr-10 text-3 placeholder-sub-100 outline-0 ${filter ? 'w-[312px]' : 'w-[528px]'}`}
          placeholder={placeholder}
        />
        <Image
          className="absolute bottom-3 right-3 cursor-pointer"
          src={SearchingGlasses}
          alt="SearchingGlasses"
        />
      </div>
      <div className="ml-5">
        {filter && <FilteringButtonAtom onClick={onClick} />}
      </div>
    </div>
  );
};

export default SearchingBoxModule;
