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
        className={`fixed left-0 top-0 z-10 h-full min-h-screen w-screen bg-black/10 ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      />
      <div
        role="presentation"
        className={`fixed bottom-0 right-0 top-0 z-20 flex h-full min-h-screen w-[280px] transform flex-col gap-y-3 rounded-tl-2xl bg-white py-5 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} shadow-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full items-center justify-between gap-x-2.5 px-3 py-2.5">
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
        <div className="flex w-full flex-col">{children}</div>
      </div>
    </>
  );
};

export default FilteringBarContainer;
