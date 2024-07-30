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
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import ShowDetailButtonAtom from '@/_components/common/atoms/ShowDetailButtonAtom';

const data = [
  {
    id: 1,
    이름: '홍길동',
    아이디: 'hong.gil',
    소속: '개발팀',
    보유포인트: 300,
    포인트신청: { text: '1건', color: 'text-primaryDark' },
  },
];

const AdminMembersListPage = () => {
  const router = useRouter();
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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
    <section className="flex w-full flex-col gap-y-10">
      <div className="flex w-full items-center justify-between">
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
        <hr className="h-[0.5px] w-full border-0 bg-sub-100" />
        <CheckboxContainer
          title="소속"
          options={Object.entries(teamList) as [string, string][]}
          selectedOptions={param.type}
          setSelectedOptions={(type: string[]) => setParam({ ...param, type })}
        />
      </FilteringBarContainer>
      <TableContainer>
        <TableHeaderModule>
          <TableHeaderAtom width="120px">번호</TableHeaderAtom>
          <TableHeaderAtom width="190px">이름</TableHeaderAtom>
          <TableHeaderAtom width="190px">아이디</TableHeaderAtom>
          <TableHeaderAtom>소속</TableHeaderAtom>
          <TableHeaderAtom width="140px">보유 포인트</TableHeaderAtom>
          <TableHeaderAtom width="120px">포인트 신청</TableHeaderAtom>
          <TableHeaderAtom width="160px" />
        </TableHeaderModule>

        <tbody>
          {data.length <= 0 ? (
            <EmptyContainer colSpan={7} />
          ) : (
            data.map((item, index) => (
              <TableBodyModule key={item.id}>
                <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                <TableBodyAtom>{item.이름}</TableBodyAtom>
                <TableBodyAtom>{item.아이디}</TableBodyAtom>
                <TableBodyAtom>{item.소속}</TableBodyAtom>
                <TableBodyAtom>{item.보유포인트}</TableBodyAtom>
                <TableBodyAtom color={item.포인트신청.color}>
                  {item.포인트신청.text}
                </TableBodyAtom>
                <TableBodyAtom isLast>
                  <ShowDetailButtonAtom
                    onClick={() => moveToMembersDetail(item.id)}
                  />
                </TableBodyAtom>
              </TableBodyModule>
            ))
          )}
        </tbody>
      </TableContainer>
      <div className="flex w-full items-center justify-center">
        <PaginationModule
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(data.length / 10)}
        />
      </div>
    </section>
  );
};

export default AdminMembersListPage;
