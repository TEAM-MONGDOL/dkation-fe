'use client';

import React, { useState } from 'react';
import TableContainer from '@/_components/common/containers/TableContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import { ExtensionIcon } from '@/_assets/icons';
import SubtitleModule from '@/_components/common/modules/SubtitleModule';
import { orderList, pointOrderList, statusList } from '@/_types/adminType';
import { DatePickerTagType } from '@/_types/commonType';
import RadioButtonContainer from '@/_components/common/containers/RadioButtonContainer';
import DatePickerContainer from '@/_components/common/containers/DatePickerContainer';
import CheckboxContainer from '@/_components/common/containers/CheckboxContainer';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import { useGetMemberWkHistoryQuery } from '@/_hooks/admin/useGetMemberWkHistoryQuery';
import dayjs from 'dayjs';

const wkHistoryOrderList = {
  ...orderList,
  ...pointOrderList,
};

interface Props {
  params: { id: string };
}

const AdminMembersWkHistoryPage = ({ params }: Props) => {
  const accountId = params.id;
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [selectedDateTag, setSelectedDateTag] =
    useState<DatePickerTagType>('ALL');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [param, setParam] = useState<{
    order: string;
    type: string[];
  }>({
    order: 'ASC',
    type: [
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

  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'ASC',
      type: [
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
    setSelectedDateTag('ALL');
    setStartDate(null);
    setEndDate(null);
  };

  const { data, isLoading, isError } = useGetMemberWkHistoryQuery({
    accountId,
    statuses: param.type.join(','),
    startDate: startDate
      ? dayjs(startDate).format('YYYY-MM-DDTHH:mm:ss')
      : undefined,
    endDate: endDate ? dayjs(endDate).format('YYYY-MM-DDTHH:mm:ss') : undefined,
    pageParam: {
      page: currentPage,
      size: 10,
      sort: `createdAt,${param.order}`,
    },
  });

  return (
    <section className="flex w-full flex-col gap-y-10">
      <div className="flex w-full items-center justify-between">
        <SubtitleModule
          iconSrc={ExtensionIcon}
          iconAlt="extension"
          text="워케이션 신청 내역"
        />
        <FilteringButtonAtom onClick={() => setIsFilteringBarOpen(true)} />
      </div>
      <TableContainer>
        <TableHeaderModule>
          <TableHeaderAtom isFirst width="80px">
            번호
          </TableHeaderAtom>
          <TableHeaderAtom>워케이션</TableHeaderAtom>
          <TableHeaderAtom width="190px">신청 일시</TableHeaderAtom>
          <TableHeaderAtom width="160px">배팅 포인트</TableHeaderAtom>
          <TableHeaderAtom width="160px">확률</TableHeaderAtom>
          <TableHeaderAtom isLast width="160px">
            상태
          </TableHeaderAtom>
        </TableHeaderModule>

        <tbody>
          {!data ? (
            isLoading ? (
              <EmptyContainer colSpan={6} text="로딩 중입니다..." />
            ) : (
              <EmptyContainer colSpan={6} text="error" />
            )
          ) : data.pageInfo.totalElements <= 0 ? (
            <EmptyContainer colSpan={6} />
          ) : (
            [...data.applyInfoList].reverse().map((item, index) => {
              const { totalElements, pageSize } = data.pageInfo;
              const currentIndex = (currentPage - 1) * pageSize + index;
              const descendingIndex = totalElements - currentIndex;
              return (
                <TableBodyModule key={item.wktName}>
                  <TableBodyAtom isFirst>{descendingIndex}</TableBodyAtom>
                  <TableBodyAtom>{item.wktName}</TableBodyAtom>
                  <TableBodyAtom>
                    {dayjs(item.applicationDate).format('YYYY.MM.DD')}
                  </TableBodyAtom>
                  <TableBodyAtom>{item.bettingPoint}</TableBodyAtom>
                  <TableBodyAtom>{item.winningProbability}</TableBodyAtom>
                  <TableBodyAtom isLast>{item.applyStatusType}</TableBodyAtom>
                </TableBodyModule>
              );
            })
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
      <FilteringBarContainer
        isOpen={isFilteringBarOpen}
        setIsOpen={setIsFilteringBarOpen}
        refreshHandler={refreshHandler}
      >
        <RadioButtonContainer
          title="정렬"
          options={Object.entries(wkHistoryOrderList) as [string, string][]}
          selectedOption={param.order}
          setSelectedOption={(order: string) => setParam({ ...param, order })}
        />
        <hr className="h-[0.5px] w-full border-0 bg-sub-100" />
        <DatePickerContainer
          title="신청 일시"
          selectedTag={selectedDateTag}
          setSelectedTag={setSelectedDateTag}
          startDate={startDate}
          setStartDate={(start: Date | null) => {
            setStartDate(start);
          }}
          endDate={endDate}
          setEndDate={(end: Date | null) => {
            setEndDate(end);
          }}
          startDatePlaceholder="시작일 선택"
          endDatePlaceholder="종료일 선택"
        />
        <hr className="h-[0.5px] w-full border-0 bg-sub-100" />
        <CheckboxContainer
          title="진행 상태"
          options={Object.entries(statusList) as [string, string][]}
          selectedOptions={param.type}
          setSelectedOptions={(type: string[]) => setParam({ ...param, type })}
        />
      </FilteringBarContainer>
    </section>
  );
};

export default AdminMembersWkHistoryPage;
