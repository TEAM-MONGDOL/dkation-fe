import Image from 'next/image';
import { SearchingGlasses } from '@/_assets/icons';
import FilteringButton from '@/_components/common/atoms/FilteringButton';

interface BoxProps {
  filter?: boolean;
  placeholder: string;
}

const SearchingBoxModule = ({ filter, placeholder }: BoxProps) => {
  return (
    <div className="flex">
      <div className="relative">
        <input
          className={`pr-10 placeholder-sub-100 border rounded-regular text-4 h-11 outline-0 pl-2 ${filter ? 'w-[312px]' : 'w-[528px]'}`}
          placeholder={placeholder}
        />
        <Image
          className="cursor-pointer absolute bottom-3 right-3"
          src={SearchingGlasses}
          alt="SearchingGlasses"
        />
      </div>
      <div className="ml-5">{filter && <FilteringButton />}</div>
    </div>
  );
};

export default SearchingBoxModule;
