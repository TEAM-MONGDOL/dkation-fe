'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import { useState } from 'react';
import TableContainer from '@/_components/common/containers/TableContainer';
import { useRouter } from 'next/navigation';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';
import RadioButtonContainer from '@/_components/common/containers/RadioButtonContainer';
import { orderList } from '@/_types/adminType';
import DatePickerContainer from '@/_components/common/containers/DatePickerContainer';
import { DatePickerTagType } from '@/_types/commonType';
import dayjs from 'dayjs';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import CheckboxContainer from '@/_components/common/containers/CheckboxContainer';

const headers = [
  { title: '번호', width: '47px' },
  { title: '제목', flexGrow: true },
  { title: '등록일시', width: '100px' },
  { title: '모집기간', width: '140px' },
  { title: '워케이션기간', width: '140px' },
  { title: '상태', width: '110px' },
  { title: '결과 및 패널티', width: '130px' },
  { title: '내용', width: '150px' },
];

const data = [
  {
    id: 1,
    제목: '2024년 5월 3주차 워케이션 : 양양',
    등록일시: '2024.06.05',
    모집기간: '2024.07.03 - 2024.07.03',
    워케이션기간: '2024.07.03 - 2024.07.03',
    상태: { text: '모집 예정' },
  },
  {
    id: 2,
    제목: '2024년 5월 3주차 워케이션 : 양양',
    등록일시: '2024.06.05',
    모집기간: '2024.07.03 - 2024.07.03',
    워케이션기간: '2024.07.03 - 2024.07.03',
    상태: { text: '모집 중', color: 'blue' },
  },
  {
    id: 3,
    제목: '2024년 5월 3주차 워케이션 : 양양',
    등록일시: '2024.06.05',
    모집기간: '2024.07.03 - 2024.07.03',
    워케이션기간: '2024.07.03 - 2024.07.03',
    상태: { text: '모집 완료', color: 'orange' },
  },
];
const WorkationList = () => {
  const router = useRouter();
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [selectedDateTag, setSelectedDateTag] =
    useState<DatePickerTagType>('ALL');
  const [selectedDateTagSec, setSelectedDateTagSec] =
    useState<DatePickerTagType>('ALL');
  const [param, setParam] = useState<{
    order: string;
    status: string[];
  }>({
    order: 'RECENT',
    status: ['WILL', 'PROCEED', 'COMPLETE'],
  });

  const [startDate, setStartDate] = useState<Date>(
    dayjs().subtract(1, 'year').toDate(),
  );
  const [endDate, setEndDate] = useState<Date>(dayjs().toDate());
  const [startDateSec, setStartDateSec] = useState<Date>(
    dayjs().subtract(1, 'year').toDate(),
  );
  const [endDateSec, setEndDateSec] = useState<Date>(dayjs().toDate());
  const handleFilteringBar = () => {
    setIsFilteringBarOpen(true);
  };
  const onClickRowDetail = (id: number) => {
    router.push(`/admin/workation/list/${id}`);
  };
  const moveToWritePage = () => {
    router.push('/admin/workation/list/new');
  };
  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'RECENT',
      status: ['WILL', 'PROCEED', 'COMPLETE'],
    });
    setSelectedDateTag('ALL');
    setStartDate(dayjs().subtract(1, 'year').toDate());
    setEndDate(dayjs().toDate());
    setSelectedDateTagSec('ALL');
    setStartDateSec(dayjs().subtract(1, 'year').toDate());
    setEndDateSec(dayjs().toDate());
  };
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="w-full flex flex-col gap-y-10 overflow-y-auto">
      <div className="w-full flex justify-between items-center">
        <TitleBarModule title="워케이션 목록" />
        <FilteringButtonAtom onClick={handleFilteringBar} />
      </div>
      <TableContainer
        headers={headers}
        data={data.map((item) => ({
          ...item,
          내용: { onClick: () => onClickRowDetail(item.id) },
        }))}
      />
      <div className="relative mt-8">
        <div className="flex justify-center">
          <PaginationModule
            totalPages={6}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className="absolute right-0 top-0">
          <ButtonAtom buttonType="yellow" onClick={moveToWritePage}>
            워케이션 등록
          </ButtonAtom>
        </div>
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
        <CheckboxContainer
          title="상태"
          options={[
            ['WILL', '모집 예정'],
            ['PROCEED', '모집 중'],
            ['COMPLETE', '모집 완료'],
          ]}
          selectedOptions={param.status}
          setSelectedOptions={(status: string[]) =>
            setParam({ ...param, status })
          }
        />
        <DatePickerContainer
          title="모집 기간"
          selectedTag={selectedDateTag}
          setSelectedTag={setSelectedDateTag}
          startDate={startDate}
          setStartDate={(start: Date) => setStartDate(start)}
          endDate={endDate}
          setEndDate={(end: Date) => setEndDate(end)}
        />
        <DatePickerContainer
          title="워케이션 기간"
          selectedTag={selectedDateTagSec}
          setSelectedTag={setSelectedDateTagSec}
          startDate={startDateSec}
          setStartDate={(start: Date) => setStartDateSec(start)}
          endDate={endDateSec}
          setEndDate={(end: Date) => setEndDateSec(end)}
        />
      </FilteringBarContainer>
    </div>
  );
};

export default WorkationList;
