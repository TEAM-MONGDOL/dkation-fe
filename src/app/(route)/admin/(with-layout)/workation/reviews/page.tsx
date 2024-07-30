'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import { useState } from 'react';
import TableContainer from '@/_components/common/containers/TableContainer';
import { useRouter } from 'next/navigation';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import ShowDetailButtonAtom from '@/_components/common/atoms/ShowDetailButtonAtom';

const data = [
  {
    id: 1,
    평점: '⭐⭐⭐⭐⭐',
    워케이션: '1월 2주차 워케이션 : 양양',
    작성자: '홍길동',
    등록일: '2024.05.06',
    상태: { text: '블라인드', color: 'text-negative' },
  },
  {
    id: 2,
    평점: '⭐⭐⭐⭐⭐',
    워케이션: '1월 2주차 워케이션 : 양양',
    작성자: '홍길동',
    등록일: '2024.05.06',
    상태: { text: '등록', color: 'text-positive' },
  },
  {
    id: 3,
    평점: '⭐⭐⭐⭐⭐',
    워케이션: '1월 2주차 워케이션 : 양양',
    작성자: '홍길동',
    등록일: '2024.05.06',
    상태: { text: '등록', color: 'text-positive' },
  },
];

const AdminWorkationReviewsPage = () => {
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const router = useRouter();
  const onClickRowDetail = (id: number) => {
    router.push(`/admin/workation/reviews/${id}`);
  };
  const handleFilteringBar = () => {
    setIsFilteringBarOpen(true);
  };
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="flex flex-col">
      <div className="mb-9 flex items-center justify-between">
        <TitleBarModule title="워케이션 후기" />
        <FilteringButtonAtom onClick={handleFilteringBar} />
      </div>
      <TableContainer>
        <TableHeaderModule>
          <TableHeaderAtom width="80px" isFirst>
            번호
          </TableHeaderAtom>
          <TableHeaderAtom width="150px">평점</TableHeaderAtom>
          <TableHeaderAtom>워케이션</TableHeaderAtom>
          <TableHeaderAtom width="100px">작성자</TableHeaderAtom>
          <TableHeaderAtom width="150px">등록일</TableHeaderAtom>
          <TableHeaderAtom width="100px">상태</TableHeaderAtom>
          <TableHeaderAtom width="160px" isLast />
        </TableHeaderModule>
        <tbody>
          {data.length <= 0 ? (
            <EmptyContainer colSpan={6} />
          ) : (
            data.map((item, index) => (
              <TableBodyModule key={item.id}>
                <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                <TableBodyAtom>{item.평점}</TableBodyAtom>
                <TableBodyAtom>{item.워케이션}</TableBodyAtom>
                <TableBodyAtom>{item.작성자}</TableBodyAtom>
                <TableBodyAtom>{item.등록일}</TableBodyAtom>
                <TableBodyAtom color={item.상태.color}>
                  {item.상태.text}
                </TableBodyAtom>
                <TableBodyAtom isLast>
                  <ShowDetailButtonAtom
                    onClick={() => onClickRowDetail(item.id)}
                  />
                </TableBodyAtom>
              </TableBodyModule>
            ))
          )}
        </tbody>
      </TableContainer>
      <div className="mt-6 flex justify-center">
        <PaginationModule
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={1}
        />
      </div>
    </div>
  );
};

export default AdminWorkationReviewsPage;
