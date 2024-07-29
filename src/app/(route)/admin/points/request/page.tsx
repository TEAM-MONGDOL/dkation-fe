'use client';

import CheckboxContainer from '@/_components/common/containers/CheckboxContainer';
import DatePickerContainer from '@/_components/common/containers/DatePickerContainer';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';
import RadioButtonContainer from '@/_components/common/containers/RadioButtonContainer';
import TableContainer from '@/_components/common/containers/TableContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import SearchingBoxModule from '@/_components/common/modules/SearchingBoxModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { orderList, pointRequestStatusList } from '@/_types/adminType';
import { DatePickerTagType } from '@/_types/commonType';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const headers = [
  { title: '번호', width: '100px' },
  { title: '구분', width: '150px' },
  { title: '이름', widdth: '190px' },
  { title: '신청 일시', flexGrow: true },
  { title: '지급 일시', flexGrow: true },
  { title: '상태', width: '140px' },
  { title: '', width: '160px' },
];

const data = [
  {
    id: 1,
    구분: '자기계발',
    이름: '김철수',
    '신청 일시': '2024-07-20',
    '지급 일시': '-',
    상태: { text: '대기', color: 'gray' },
  },
  {
    id: 2,
    구분: '봉사활동',
    이름: '이영희',
    '신청 일시': '2024-07-21',
    '지급 일시': '2024-07-22',
    상태: { text: '지급 완료', color: 'blue' },
  },
  {
    id: 3,
    구분: '이벤트',
    이름: '박민수',
    '신청 일시': '2024-07-21',
    '지급 일시': '2024-07-22',
    상태: { text: '반려', color: 'red' },
  },
  {
    id: 4,
    구분: '자기계발',
    이름: '김철수 외 3명',
    '신청 일시': '2024-07-21',
    '지급 일시': '-',
    상태: { text: '대기', color: 'gray' },
  },
];

const AdminPointsRequestPage = () => {
  const router = useRouter();
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [param, setParam] = useState<{
    order: string;
    state: string[];
    type: string[];
  }>({
    order: 'RECENT',
    state: ['WAITING', 'REJECTED', 'ACCEPTED'],
    type: ['SELF_STUDY', 'VOLUNTEER', 'EVENT'],
  });
  const [selectedDateTag, setSelectedDateTag] =
    useState<DatePickerTagType>('ALL');
  const [startDate, setStartDate] = useState<Date>(
    dayjs().subtract(1, 'year').toDate(),
  );
  const [endDate, setEndDate] = useState<Date>(dayjs().toDate());

  const onClickRowDetail = (id: number) => {
    router.push(`/admin/points/request/${id}`);
  };

  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'RECENT',
      state: ['WAITING', 'REJECTED', 'ACCEPTED'],
      type: ['SELF_STUDY', 'VOLUNTEER', 'EVENT'],
    });
    setSelectedDateTag('ALL');
    setStartDate(dayjs().subtract(1, 'year').toDate());
    setEndDate(dayjs().toDate());
  };

  return (
    <div className="w-full flex flex-col gap-y-10 overflow-y-auto">
      <div className="w-full flex justify-between items-center">
        <TitleBarModule title="포인트 신청 내역" />
        <SearchingBoxModule
          placeholder="이름을 검색하세요."
          filter
          onClick={() => setIsFilteringBarOpen(true)}
        />
      </div>
      <TableContainer
        headers={headers}
        data={data.map((item) => ({
          ...item,
          '': { onClick: () => onClickRowDetail(item.id) },
        }))}
      />
      {/* TODO : 아예 PaginationModule에 가운데정렬 포함이 좋을 듯 */}
      <div className="w-full flex items-center justify-center">
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
          setSelectedOption={(order) => setParam({ ...param, order })}
        />
        <CheckboxContainer
          title="상태"
          options={Object.entries(pointRequestStatusList) as [string, string][]}
          selectedOptions={param.state}
          setSelectedOptions={(state: string[]) =>
            setParam({ ...param, state })
          }
        />
        <CheckboxContainer
          title="구분"
          options={[
            ['SELF_STUDY', '자기계발'],
            ['VOLUNTEER', '봉사활동'],
            ['EVENT', '이벤트'],
          ]}
          selectedOptions={param.type}
          setSelectedOptions={(type: string[]) => setParam({ ...param, type })}
        />
        <DatePickerContainer
          title="신청 및 심사 일시"
          selectedTag={selectedDateTag}
          setSelectedTag={setSelectedDateTag}
          startDate={startDate}
          setStartDate={(start: Date) => setStartDate(start)}
          endDate={endDate}
          setEndDate={(end: Date) => setEndDate(end)}
        />
      </FilteringBarContainer>
    </div>
  );
};

export default AdminPointsRequestPage;
