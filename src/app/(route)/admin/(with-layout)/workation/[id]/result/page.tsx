'use client';

import React, { useState } from 'react';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import Image from 'next/image';
import { ExtensionIcon } from '@/_assets/icons';
import TableContainer from '@/_components/common/containers/TableContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import RadioButtonContainer from '@/_components/common/containers/RadioButtonContainer';
import { resultOrderList } from '@/_types/adminType';
import CheckboxContainer from '@/_components/common/containers/CheckboxContainer';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import WkResultSide from '@/(route)/admin/(with-layout)/workation/[id]/result/wkResultSide';
import { useGetWkResultQuery } from '@/_hooks/admin/useGetWkResultQuery';

interface WkResultProps {
  params: { id: number };
}

const AdminWorkationListResultPage = ({ params }: WkResultProps) => {
  const { id } = params;
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState<{
    order: string;
    status: string[];
  }>({
    order: 'ASC',
    status: [
      'APPLIED',
      'RAFFLE_WAIT',
      'NO_WINNING',
      'CONFIRM_WAIT',
      'CANCEL',
      'CONFIRM',
      'WAIT',
      'VISITED',
    ],
  });
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);

  const getSortField = (order: string) => {
    if (order === 'PERCENTAGEASC' || order === 'PERCENTAGEDESC') {
      return `percentage,${order === 'PERCENTAGEASC' ? 'DESC' : 'ASC'}`;
    }
    return `name,${order}`;
  };

  const refreshHandler = () => {
    setFilterOptions({
      order: 'DESC',
      status: [
        'APPLIED',
        'RAFFLE_WAIT',
        'NO_WINNING',
        'CONFIRM_WAIT',
        'CANCEL',
        'CONFIRM',
        'WAIT',
        'VISITED',
      ],
    });
  };

  const { data, isLoading, isError } = useGetWkResultQuery({
    wktId: id,
    status: filterOptions.status.join(','),
    pageParam: {
      page: currentPage,
      size: 7,
      sort: getSortField(filterOptions.order),
    },
  });
  const statusLabels: { [key: string]: string } = {
    APPLIED: '신청완료',
    RAFFLE_WAIT: '추첨대기',
    NO_WINNING: '미당첨',
    CONFIRM_WAIT: '확정대기',
    CANCEL: '당첨취소',
    CONFIRM: '당첨확정',
    WAIT: '대기',
    VISITED: '일정종료',
  };

  const statusColors: { [key: string]: string } = {
    APPLIED: 'text-[#2F69FF]',
    RAFFLE_WAIT: 'text-purple-800',
    NO_WINNING: 'text-[#696969]',
    CONFIRM_WAIT: 'text-primary',
    CANCEL: 'text-[#FF2424]',
    CONFIRM: 'text-[#008726]',
    WAIT: 'text-[#003AD1]',
    VISITED: 'text-lime',
  };

  if (isLoading) {
    return <div>Loading...</div>; // 로딩컴포넌트 추가시 변경예정
  }
  if (isError) {
    return <div>Error loading data</div>; // 에러컴포넌트 추가시 변경예정
  }
  if (!data) {
    return <div>No data</div>;
  }

  return (
    <section className="flex">
      <WkResultSide id={id} />
      <div className="w-full">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2">
            <Image src={ExtensionIcon} alt="ResultIcon" />
            <p className="text-h3 font-bold">추첨 결과</p>
          </div>
          <FilteringButtonAtom onClick={() => setIsFilteringBarOpen(true)} />
        </div>
        <TableContainer>
          <TableHeaderModule>
            <TableHeaderAtom width="80px" isFirst>
              번호
            </TableHeaderAtom>
            <TableHeaderAtom width="130px">이름</TableHeaderAtom>
            <TableHeaderAtom>아이디</TableHeaderAtom>
            <TableHeaderAtom>소속</TableHeaderAtom>
            <TableHeaderAtom width="100px">확률</TableHeaderAtom>
            <TableHeaderAtom width="130px" isLast>
              상태
            </TableHeaderAtom>
          </TableHeaderModule>
          <tbody>
            {data.wktMemberResultInfos.length <= 0 ? (
              <EmptyContainer colSpan={6} />
            ) : (
              data.wktMemberResultInfos.map((item, index) => (
                <TableBodyModule key={item.accountId}>
                  <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                  <TableBodyAtom>{item.name}</TableBodyAtom>
                  <TableBodyAtom>{item.accountId}</TableBodyAtom>
                  <TableBodyAtom>{item.department}</TableBodyAtom>
                  <TableBodyAtom color="text-primaryDark">
                    {item.percentage}
                  </TableBodyAtom>
                  <TableBodyAtom
                    isLast
                    color={statusColors[item.applyStatusType]}
                  >
                    {statusLabels[item.applyStatusType] || item.applyStatusType}
                  </TableBodyAtom>{' '}
                </TableBodyModule>
              ))
            )}
          </tbody>
        </TableContainer>
        {data && data.pageInfo.totalPages > 0 && (
          <div className="mt-6 flex justify-center">
            <PaginationModule
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={data.pageInfo.totalPages}
            />
          </div>
        )}
      </div>
      <FilteringBarContainer
        isOpen={isFilteringBarOpen}
        setIsOpen={setIsFilteringBarOpen}
        refreshHandler={refreshHandler}
      >
        <RadioButtonContainer
          title="정렬"
          options={Object.entries(resultOrderList) as [string, string][]}
          selectedOption={filterOptions.order}
          setSelectedOption={(order: string) =>
            setFilterOptions({ ...filterOptions, order })
          }
        />
        <CheckboxContainer
          title="진행 상태"
          options={[
            ['APPLIED', '신청완료'],
            ['RAFFLE_WAIT', '추첨대기'],
            ['NO_WINNING', '미당첨'],
            ['CONFIRM_WAIT', '확정대기'],
            ['CANCEL', '당첨취소'],
            ['CONFIRM', '당첨확정'],
            ['WAIT', '대기'],
            ['VISITED', '일정종료'],
          ]}
          selectedOptions={filterOptions.status}
          setSelectedOptions={(status: string[]) =>
            setFilterOptions({ ...filterOptions, status })
          }
        />
      </FilteringBarContainer>
    </section>
  );
};

export default AdminWorkationListResultPage;
