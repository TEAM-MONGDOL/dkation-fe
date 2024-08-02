'use client';

import { useState } from 'react';
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

const wkHistoryOrderList = {
  ...orderList,
  ...pointOrderList,
};

const data = [
  {
    id: 1,
    워케이션: '9월 2주차 워케이션 : 양양',
    신청일시: '2024.07.04',
    배팅포인트: { text: '350 P', color: 'text-primaryDark' },
    확률: { text: '3.8%', color: 'text-primaryDark' },
    상태: { text: '신청완료', color: 'text-positive' },
  },
  {
    id: 2,
    워케이션: '9월 2주차 워케이션 : 양양',
    신청일시: '2024.07.04',
    배팅포인트: { text: '350 P', color: 'text-primaryDark' },
    확률: { text: '3.8%', color: 'text-primaryDark' },
    상태: { text: '추첨대기', color: 'text-green-700' },
  },
];

const AdminMembersWkHistoryPage = () => {
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
    order: 'RECENT',
    type: [
      'APPLIED',
      'DRAW_WAITING',
      'FAIL',
      'CONFIRMED_WAITING',
      'CANCEL',
      'CONFIRM',
      'WAITING',
      'COMPLETED',
    ],
  });

  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'RECENT',
      type: [
        'APPLIED',
        'DRAW_WAITING',
        'FAIL',
        'CONFIRMED_WAITING',
        'CANCEL',
        'CONFIRM',
        'WAITING',
        'COMPLETED',
      ],
    });
    setSelectedDateTag('ALL');
    setStartDate(null);
    setEndDate(null);
  };

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
          {data.length <= 0 ? (
            <EmptyContainer colSpan={6} />
          ) : (
            data.map((item, index) => (
              <TableBodyModule key={item.id}>
                <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                <TableBodyAtom>{item.워케이션}</TableBodyAtom>
                <TableBodyAtom>{item.신청일시}</TableBodyAtom>
                <TableBodyAtom color={item.배팅포인트.color}>
                  {item.배팅포인트.text}
                </TableBodyAtom>
                <TableBodyAtom color={item.확률.color}>
                  {item.확률.text}
                </TableBodyAtom>
                <TableBodyAtom isLast color={item.상태.color}>
                  {item.상태.text}
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
