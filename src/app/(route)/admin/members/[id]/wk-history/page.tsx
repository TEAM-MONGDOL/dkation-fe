'use client';

import { useState } from 'react';
import TableContainer from '@/_components/common/containers/TableContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import { Puzzle } from '@/_assets/icons';
import SubtitleModule from '@/_components/common/modules/SubtitleModule';
import { orderList, pointOrderList, statusList } from '@/_types/adminType';
import { DatePickerTagType } from '@/_types/commonType';
import dayjs from 'dayjs';
import RadioButtonContainer from '@/_components/common/containers/RadioButtonContainer';
import DatePickerContainer from '@/_components/common/containers/DatePickerContainer';
import CheckboxContainer from '@/_components/common/containers/CheckboxContainer';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';

const wkHistoryOrderList = {
  ...orderList,
  ...pointOrderList,
};

const headers = [
  { title: '번호', width: '90px' },
  { title: '워케이션', flexGrow: true },
  { title: '신청일시', width: '190px' },
  { title: '배팅 포인트', width: '160px' },
  { title: '확률', width: '160px' },
  { title: '상태', width: '160px' },
];

const data = [
  {
    id: 1,
    워케이션: '9월 2주차 워케이션 : 양양',
    신청일시: '2024.07.04',
    '배팅 포인트': { text: '350 P', color: 'orange' },
    확률: { text: '3.8%', color: 'orange' },
    상태: { text: '신청완료', color: 'blue' },
  },
  {
    id: 2,
    워케이션: '9월 2주차 워케이션 : 양양',
    신청일시: '2024.07.04',
    '배팅 포인트': { text: '350 P', color: 'orange' },
    확률: { text: '3.8%', color: 'orange' },
    상태: { text: '추첨대기', color: 'green' },
  },
];

const AdminMembersWkHistoryPage = () => {
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [selectedDateTag, setSelectedDateTag] =
    useState<DatePickerTagType>('ALL');
  const [startDate, setStartDate] = useState<Date>(
    dayjs().subtract(1, 'year').toDate(),
  );
  const [endDate, setEndDate] = useState<Date>(dayjs().toDate());

  const [param, setParam] = useState<{
    order: string;
    type: string[];
  }>({
    order: 'RECENT',
    type: [],
  });

  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'RECENT',
      type: [],
    });
    setSelectedDateTag('ALL');
    setStartDate(dayjs().subtract(1, 'year').toDate());
    setEndDate(dayjs().toDate());
  };

  return (
    <div className="flex flex-col gap-y-10 w-full">
      <div className="w-full flex justify-between items-center">
        <SubtitleModule
          iconSrc={Puzzle}
          iconAlt="puzzle"
          text="워케이션 신청 내역"
        />
        <FilteringButtonAtom onClick={() => setIsFilteringBarOpen(true)} />
      </div>
      <TableContainer
        headers={headers}
        data={data.map((item) => ({
          ...item,
        }))}
      />
      <div className="flex items-center justify-center w-full">
        <PaginationModule />
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
        <hr />
        <DatePickerContainer
          title="날짜"
          selectedTag={selectedDateTag}
          setSelectedTag={setSelectedDateTag}
          startDate={startDate}
          setStartDate={(start: Date) => setStartDate(start)}
          endDate={endDate}
          setEndDate={(end: Date) => setEndDate(end)}
        />
        <hr />
        <CheckboxContainer
          title="진행 상태"
          options={Object.entries(statusList) as [string, string][]}
          selectedOptions={param.type}
          setSelectedOptions={(type: string[]) => setParam({ ...param, type })}
        />
      </FilteringBarContainer>
    </div>
  );
};

export default AdminMembersWkHistoryPage;
