'use client';

import { useState } from 'react';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import UserFAQModule from '@/_components/user/common/modules/UserFAQModule';
import { FAQData } from '@/_constants/faq';

const FAQPage = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(FAQData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageItems = FAQData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className="pt-18 px-40">
      <div className="flex flex-col gap-y-14">
        <h2 className="text-h2 font-semibold">자주 묻는 질문</h2>
        <div>
          {currentPageItems.map((item) => (
            <UserFAQModule
              key={item.title}
              title={item.title}
              content={item.content}
            />
          ))}
        </div>
      </div>
      <div className="mt-40 flex justify-center">
        <PaginationModule
          user
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default FAQPage;
