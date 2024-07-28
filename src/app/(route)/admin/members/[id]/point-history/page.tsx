'use client';

import { useState } from 'react';
import TableContainer from '@/_components/common/containers/TableContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import { orderList, pointChangeList } from '@/_types/adminType';
import { DatePickerTagType } from '@/_types/commonType';
import dayjs from 'dayjs';
import RadioButtonContainer from '@/_components/common/containers/RadioButtonContainer';
import DatePickerContainer from '@/_components/common/containers/DatePickerContainer';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';
import { PointYellowIcon } from '@/_assets/icons';
import SubtitleModule from '@/_components/common/modules/SubtitleModule';

const headers = [
  { title: '번호', width: '90px' },
  { title: '분류', flexGrow: true },
  { title: '일시', width: '220px' },
  { title: '변동', width: '200px' },
  { title: '총합', width: '200px' },
];

const data = [
  {
    id: 1,
    분류: '워케이션 당첨',
    일시: '2024.07.04',
    변동: { text: '-380 P', color: 'red' },
    총합: 1000,
  },
  {
    id: 2,
    분류: '봉사활동',
    일시: '2024.07.04',
    변동: { text: '+300 P', color: 'blue' },
    총합: 1000,
  },
];

const AdminMembersPointHistoryPage = () => {
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
    point: string;
  }>({
    order: 'RECENT',
    type: [],
    point: '',
  });

  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'RECENT',
      type: [],
      point: '',
    });
    setSelectedDateTag('ALL');
    setStartDate(dayjs().subtract(1, 'year').toDate());
    setEndDate(dayjs().toDate());
  };

  return (
    <div className="flex flex-col gap-y-10 w-full">
      <div className="w-full flex justify-between items-center">
        <SubtitleModule
          iconSrc={PointYellowIcon}
          iconAlt="point"
          text="포인트 사용 내역"
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
          options={Object.entries(orderList) as [string, string][]}
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
        <RadioButtonContainer
          title="포인트 변동"
          options={Object.entries(pointChangeList) as [string, string][]}
          selectedOption={param.point}
          setSelectedOption={(point: string) => setParam({ ...param, point })}
        />
      </FilteringBarContainer>
    </div>
  );
};

export default AdminMembersPointHistoryPage;
