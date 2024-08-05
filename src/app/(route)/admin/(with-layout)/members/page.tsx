'use client';

import React, { useState } from 'react';
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
import { useGetMemberListQuery } from '@/_hooks/admin/useGetMemberListQuery';
import { MembersSearchQueryOptions } from '@/_constants/common';

const AdminMembersListPage = () => {
  const router = useRouter();
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [param, setParam] = useState<{
    order: string;
    departmentType: string[];
  }>({
    order: 'NAME',
    departmentType: ['MANAGEMENT', 'SALES', 'MARKETING', 'PROMOTION', 'DEV'],
  });

  const [selectedOption, setSelectedOption] = useState(
    MembersSearchQueryOptions.NAME,
  );

  const { data, isLoading, error } = useGetMemberListQuery({
    department: param.departmentType.join(','),
    pageParam: {
      page: currentPage,
      size: 10,
      sort: param.order,
    },
  });

  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'NAME',
      departmentType: ['MANAGEMENT', 'SALES', 'MARKETING', 'PROMOTION', 'DEV'],
    });
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option); // Update the selected option
  };

  const moveToMembersDetail = (id: string) => {
    router.push(`/admin/members/${id}`);
  };

  return (
    <section className="flex w-full flex-col gap-y-10">
      <div className="flex w-full items-center justify-between">
        <TitleBarModule title="회원 목록" />
        <SearchingBoxModule
          options={Object.values(MembersSearchQueryOptions)}
          onSelect={handleSelect}
          dropdownPlaceholder="검색 조건 선택"
          selectedOption={selectedOption}
          placeholder="검색어를 입력하세요."
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
          selectedOptions={param.departmentType}
          setSelectedOptions={(departmentType: string[]) =>
            setParam({ ...param, departmentType })
          }
        />
      </FilteringBarContainer>
      <TableContainer>
        <TableHeaderModule>
          <TableHeaderAtom isFirst width="80px">
            번호
          </TableHeaderAtom>
          <TableHeaderAtom width="190px">이름</TableHeaderAtom>
          <TableHeaderAtom width="190px">아이디</TableHeaderAtom>
          <TableHeaderAtom>소속</TableHeaderAtom>
          <TableHeaderAtom width="140px">보유 포인트</TableHeaderAtom>
          <TableHeaderAtom width="120px">포인트 신청</TableHeaderAtom>
          <TableHeaderAtom isLast width="160px" />
        </TableHeaderModule>
        <tbody>
          {!data ? (
            isLoading ? (
              <EmptyContainer colSpan={7} text="loading" />
            ) : (
              <EmptyContainer colSpan={7} text="no data" />
            )
          ) : data.pageInfo.totalElements <= 0 ? (
            <div>
              <EmptyContainer colSpan={7} />
            </div>
          ) : (
            data.memberInfos.map((item, index) => (
              <TableBodyModule key={item.accountId}>
                <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                <TableBodyAtom>{item.name}</TableBodyAtom>
                <TableBodyAtom>{item.accountId}</TableBodyAtom>
                <TableBodyAtom>{item.department}</TableBodyAtom>
                <TableBodyAtom>{item.pointQuantity}</TableBodyAtom>
                <TableBodyAtom>{item.pointApplicationQuantity}</TableBodyAtom>
                <TableBodyAtom isLast>
                  <ShowDetailButtonAtom
                    onClick={() => moveToMembersDetail(item.accountId)}
                  />
                </TableBodyAtom>
              </TableBodyModule>
            ))
          )}
        </tbody>
      </TableContainer>
      {data && data.pageInfo.totalElements > 0 && (
        <div className="flex w-full items-center justify-center">
          <PaginationModule
            totalPages={data.pageInfo.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
};

export default AdminMembersListPage;
