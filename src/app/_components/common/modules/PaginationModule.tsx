'use client';

import PaginationButtonAtom from '@/_components/common/atoms/PaginationButtonAtom';
import { useState } from 'react';
import Image from 'next/image';
import { LeftArrowEmptyIcon, RightArrowEmptyIcon } from '@/_assets/icons';

const PaginationModule = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 리스트 개수 받아와서 페이지수 계산

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex">
      <div className="flex h-12 w-12 items-center justify-center rounded-l-lg border border-stroke-100">
        <Image src={LeftArrowEmptyIcon} alt="LeftArrowEmptyIcon" />
      </div>
      <div className="flex">
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationButtonAtom
            key={index}
            onPage={index === currentPage - 1}
            page={index + 1}
            onClick={() => handlePageClick(index + 1)}
          />
        ))}
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-r-[8px] border border-stroke-100">
        <Image src={RightArrowEmptyIcon} alt="RightArrowEmptyIcon" />
      </div>
    </div>
  );
};

export default PaginationModule;
