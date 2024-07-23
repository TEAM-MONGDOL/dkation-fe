'use client';

import PaginationButton from '@/_components/common/atoms/PaginationButton';
import { useState } from 'react';
import Image from 'next/image';
import { LeftArrowEmptyIcon, RightArrowEmptyIcon } from '@/_assets/icons';

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 리스트 개수 받아와서 페이지수 계산

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex">
      <div className="rounded-l-lg w-12 h-12 border border-stroke-100 flex items-center justify-center">
        <Image src={LeftArrowEmptyIcon} alt="LeftArrowEmptyIcon" />
      </div>
      <div className="flex">
        {Array.from({ length: totalPages }, (_, index) => (
          <PaginationButton
            key={index}
            onPage={index === currentPage - 1}
            page={index + 1}
            onClick={() => handlePageClick(index + 1)}
          />
        ))}
      </div>
      <div className="rounded-r-[8px] w-12 h-12 border border-stroke-100 flex items-center justify-center">
        <Image src={RightArrowEmptyIcon} alt="RightArrowEmptyIcon" />
      </div>
    </div>
  );
};

export default Pagination;
