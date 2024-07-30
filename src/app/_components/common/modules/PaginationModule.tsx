'use client';

import PaginationButtonAtom from '@/_components/common/atoms/PaginationButtonAtom';
import { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';
import {
  LeftArrowBlackIcon,
  LeftArrowEmptyIcon,
  RightArrowBlackIcon,
  RightArrowEmptyIcon,
} from '@/_assets/icons';

interface PageProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const PaginationModule = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PageProps) => {
  const [startPage, setStartPage] = useState(1);
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };
  const handleNext = () => {
    const nextStartPage = startPage + 5;
    if (nextStartPage <= totalPages) {
      setStartPage(nextStartPage);
      setCurrentPage(nextStartPage);
    }
  };

  const handlePrev = () => {
    const prevStartPage = startPage - 5;
    if (prevStartPage > 0) {
      setStartPage(prevStartPage);
      setCurrentPage(prevStartPage);
    }
  };

  const getLeftArrowIcon = () =>
    startPage > 1 ? LeftArrowBlackIcon : LeftArrowEmptyIcon;
  const getRightArrowIcon = () =>
    startPage + 5 <= totalPages ? RightArrowBlackIcon : RightArrowEmptyIcon;

  const endPage = Math.min(startPage + 4, totalPages);

  return (
    <div className="flex bg-white">
      <div className="rounded-l-lg w-12 h-12 border border-stroke-100 flex items-center justify-center">
        <button onClick={handlePrev} disabled={startPage === 1}>
          <Image src={getLeftArrowIcon()} alt="LeftArrowIcon" />
        </button>
      </div>
      <div className="flex">
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <PaginationButtonAtom
            key={index}
            onPage={index + startPage === currentPage}
            page={index + startPage}
            onClick={() => handlePageClick(index + startPage)}
            disabled={index + startPage > totalPages}
          />
        ))}
      </div>
      <div className="rounded-r-[8px] w-12 h-12 border border-stroke-100 flex items-center justify-center">
        <button onClick={handleNext} disabled={endPage === totalPages}>
          <Image src={getRightArrowIcon()} alt="RightArrowIcon" />
        </button>
      </div>
    </div>
  );
};

export default PaginationModule;
