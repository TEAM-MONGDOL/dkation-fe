'use client';

import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import TableContainer from '@/_components/common/containers/TableContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import SearchingBoxModule from '@/_components/common/modules/SearchingBoxModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const headers = [
  { title: '번호', width: '120px' },
  { title: '분류', width: '200px' },
  { title: '포인트', width: '200px' },
  { title: '상세 내용', flexGrow: true },
  { title: '등록 일시', flexGrow: true },
  { title: '', width: '160px' },
];

const data = [
  {
    id: 1,
    분류: '토이프로젝트',
    포인트: 100,
    '상세 내용': '자기계발하면 줌',
    '등록 일시': '2024-07-20',
  },
  {
    id: 2,
    분류: '봉사활동',
    포인트: 200,
    '등록 일시': '2024-07-21',
    '상세 내용': '봉사하면 줌',
  },
  {
    id: 3,
    분류: '인강 완강',
    포인트: 300,
    '상세 내용': '공부하면 줌',
    '등록 일시': '2024-07-21',
  },
  {
    id: 4,
    분류: '사내 교육',
    포인트: 400,
    '상세 내용': '참여하면 줌',
    '등록 일시': '2024-07-21',
  },
];

const AdminPointsPolicyPage = () => {
  const router = useRouter();
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);

  const onClickRowDetail = (id: number) => {
    router.push(`/admin/points/policy/${id}`);
  };

  return (
    // TODO : overflow 바깥으로 빼기
    <div className="w-full flex flex-col gap-y-10 overflow-y-auto">
      <div className="w-full flex justify-between items-center">
        <TitleBarModule title="포인트 정책 설정" />
        <FilteringButtonAtom onClick={() => setIsFilteringBarOpen(true)} />
      </div>
      <TableContainer
        headers={headers}
        data={data.map((item) => ({
          ...item,
          '': { onClick: () => onClickRowDetail(item.id) },
        }))}
      />
      <div className="w-full flex items-center justify-center relative">
        <PaginationModule />
        {/* TODO : 높이 맞춰야 됨 */}
        <div className="absolute right-0 top-0 bottom-0">
          <ButtonAtom buttonType="yellow" onClick={() => {}}>
            정책 추가
          </ButtonAtom>
        </div>
      </div>
    </div>
  );
};

export default AdminPointsPolicyPage;
