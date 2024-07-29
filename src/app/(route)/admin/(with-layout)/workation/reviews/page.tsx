'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import { useState } from 'react';
import TableContainer from '@/_components/common/containers/TableContainer';
import { useRouter } from 'next/navigation';
import PaginationModule from '@/_components/common/modules/PaginationModule';

const headers = [
  { title: '번호', width: '60px' },
  { title: '평점', width: '150px' },
  { title: '워케이션', flexGrow: true },
  { title: '작성자', width: '150px' },
  { title: '등록일', width: '150px' },
  { title: '상태', width: '150px' },
  { title: '', width: '150px' },
];

const data = [
  {
    id: 1,
    평점: '⭐⭐⭐⭐⭐',
    워케이션: '1월 2주차 워케이션 : 양양',
    작성자: '홍길동',
    등록일: '2024.05.06',
    상태: { text: '블라인드', color: 'red' },
  },
  {
    id: 2,
    평점: '⭐⭐⭐⭐⭐',
    워케이션: '1월 2주차 워케이션 : 양양',
    작성자: '홍길동',
    등록일: '2024.05.06',
    상태: { text: '등록', color: 'blue' },
  },
  {
    id: 3,
    평점: '⭐⭐⭐⭐⭐',
    워케이션: '1월 2주차 워케이션 : 양양',
    작성자: '홍길동',
    등록일: '2024.05.06',
    상태: { text: '등록', color: 'blue' },
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
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-9">
        <TitleBarModule title="워케이션 후기" />
        <FilteringButtonAtom onClick={handleFilteringBar} />
      </div>
      <TableContainer
        headers={headers}
        data={data.map((item) => ({
          ...item,
          '': { onClick: () => onClickRowDetail(item.id) },
        }))}
      />
      <div className="flex justify-center mt-6">
        <PaginationModule />
      </div>
    </div>
  );
};

export default AdminWorkationReviewsPage;
