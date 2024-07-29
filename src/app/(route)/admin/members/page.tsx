'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import SearchingBoxModule from '@/_components/common/modules/SearchingBoxModule';
import TableContainer from '@/_components/common/containers/TableContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import RadioButtonContainer from '@/_components/common/containers/RadioButtonContainer';
import { membersOrderList, teamList } from '@/_types/adminType';
import CheckboxContainer from '@/_components/common/containers/CheckboxContainer';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';

const headers = [
  { title: '번호', width: '120px' },
  { title: '이름', width: '190px' },
  { title: '아이디', width: '190px' },
  { title: '소속', flexGrow: true },
  { title: '보유 포인트', width: '140px' },
  { title: '포인트 신청', width: '120px' },
  { title: '', width: '160px' },
];

const data = [
  {
    id: 1,
    이름: '홍길동',
    아이디: 'hong.gil',
    소속: '개발팀',
    '보유 포인트': 300,
    '포인트 신청': { text: '1건', color: 'orange' },
  },
  {
    id: 2,
    이름: '김누구',
    아이디: 'kim.nugunugunu',
    소속: '기획팀',
    '보유 포인트': 1000,
    '포인트 신청': { text: '1건', color: 'orange' },
  },
  {
    id: 3,
    이름: '이누구',
    아이디: 'lee.nugu',
    소속: '개발팀',
    '보유 포인트': 800,
    '포인트 신청': { text: '1건', color: 'orange' },
  },
];

const AdminMembersListPage = () => {
  const router = useRouter();
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [param, setParam] = useState<{
    order: string;
    type: string[];
  }>({
    order: 'NAME',
    type: ['MANAGEMENT', 'SALES', 'MARKETING', 'PROMOTION', 'DEV'],
  });

  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'NAME',
      type: ['MANAGEMENT', 'SALES', 'MARKETING', 'PROMOTION', 'DEV'],
    });
  };

  const moveToMembersDetail = (id: number) => {
    router.push(`/admin/members/${id}`);
  };

  return (
    <div className="flex flex-col gap-y-10 w-full">
      <div className="w-full flex justify-between items-center">
        <TitleBarModule title="회원 목록" />
        <SearchingBoxModule
          placeholder="이름을 검색하세요."
          filter
          onClick={() => setIsFilteringBarOpen(true)}
        />
      </div>
      <FilteringBarContainer
        isOpen={isFilteringBarOpen}
        setIsOpen={setIsFilteringBarOpen}
        refreshHandler={refreshHandler}
      >
        <RadioButtonContainer
          title="정렬"
          options={Object.entries(membersOrderList) as [string, string][]}
          selectedOption={param.order}
          setSelectedOption={(order: string) => setParam({ ...param, order })}
        />
        <CheckboxContainer
          title="소속"
          options={Object.entries(teamList) as [string, string][]}
          selectedOptions={param.type}
          setSelectedOptions={(type: string[]) => setParam({ ...param, type })}
        />
      </FilteringBarContainer>
      <TableContainer
        headers={headers}
        data={data.map((item) => ({
          ...item,
          '': { onClick: () => moveToMembersDetail(item.id) },
        }))}
      />
      <div className="flex items-center justify-center w-full">
        <PaginationModule />
      </div>
    </div>
  );
};

export default AdminMembersListPage;
