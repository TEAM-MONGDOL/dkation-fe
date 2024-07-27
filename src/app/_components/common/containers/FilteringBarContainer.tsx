import { FilterListIcon, RefreshIcon } from '@/_assets/icons';
import Image from 'next/image';
import { ReactNode } from 'react';

interface FilteringBarContainerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  refreshHandler: () => void;
  children: ReactNode;
}

const FilteringBarContainer = ({
  isOpen,
  setIsOpen,
  refreshHandler,
  children,
}: FilteringBarContainerProps) => {
  return (
    <>
      <div
        role="presentation"
        className={`fixed w-screen top-0 left-0 min-h-screen h-full bg-black/10 z-10 ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      />
      <div
        role="presentation"
        className={`fixed z-20 right-0 top-0 bottom-0 min-h-screen h-full w-[280px] flex flex-col py-5 gap-y-3 rounded-tl-2xl bg-white transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} shadow-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex items-center justify-between px-3 py-2.5 gap-x-2.5">
          <div className="flex items-center gap-x-2">
            <Image src={FilterListIcon} alt="filter" width={24} height={24} />
            <p className="font-bold">필터 선택</p>
          </div>
          <Image
            src={RefreshIcon}
            alt="refresh"
            width={24}
            height={24}
            className="cursor-pointer"
            onClick={refreshHandler}
          />
        </div>
        <div className="w-full flex flex-col">{children}</div>
      </div>
    </>
  );
};

export default FilteringBarContainer;
