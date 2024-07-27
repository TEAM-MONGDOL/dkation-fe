'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import { useState } from 'react';
import TableContainer from '@/_components/common/containers/TableContainer';
import { useRouter } from 'next/navigation';

const headers = [
  { title: '번호', width: '47px' },
  { title: '제목', flexGrow: true },
  { title: '등록일시', width: '100px' },
  { title: '모집기간', width: '140px' },
  { title: '워케이션기간', width: '140px' },
  { title: '상태', width: '110px' },
  { title: '결과및패널티', width: '130px' },
  { title: '내용', width: '150px' },
];

const data = [
  // {
  //   id: 1,
  //   제목: '2024년 5월 3주차 워케이션 : 양양',
  //   등록일시: '2024.06.05',
  //   모집기간: '2024.07.03 - 2024.07.03',
  //   워케이션기간: '2024.07.03 - 2024.07.03',
  //   상태: { text: '모집 예정' },
  // },
  // {
  //   id: 2,
  //   제목: '2024년 5월 3주차 워케이션 : 양양',
  //   등록일시: '2024.06.05',
  //   모집기간: '2024.07.03 - 2024.07.03',
  //   워케이션기간: '2024.07.03 - 2024.07.03',
  //   상태: { text: '모집 중', color: 'blue' },
  // },
  // {
  //   id: 3,
  //   제목: '2024년 5월 3주차 워케이션 : 양양',
  //   등록일시: '2024.06.05',
  //   모집기간: '2024.07.03 - 2024.07.03',
  //   워케이션기간: '2024.07.03 - 2024.07.03',
  //   상태: { text: '모집 완료', color: 'orange' },
  // },
];
const WorkationList = () => {
  const router = useRouter();
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const handleFilteringBar = () => {
    setIsFilteringBarOpen(true);
  };
  const onClickRowDetail = (id: number) => {
    router.push(`/admin/points/reward/${id}`);
  };
  return (
    <div>
      <div className="flex justify-between">
        <TitleBarModule title="워케이션 목록" />
        <FilteringButtonAtom onClick={handleFilteringBar} />
      </div>
      <TableContainer
        headers={headers}
        data={data.map((item) => ({
          ...item,
          결과및패널티: { onClick: () => onClickRowDetail(item.id) },
          내용: { onClick: () => onClickRowDetail(item.id) },
        }))}
      />
    </div>
  );
};

export default WorkationList;
