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
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import ShowDetailButtonAtom from '@/_components/common/atoms/ShowDetailButtonAtom';

const data = [
  {
    id: 1,
    제목: '2024년 5월 3주차 워케이션 : 양양',
    등록일시: '2024.06.05',
    모집기간: '2024.07.03 - 2024.07.03',
    워케이션기간: '2024.07.03 - 2024.07.03',
    상태: { text: '모집 예정' },
    결과및페널티: '',
    내용: '',
  },
  {
    id: 2,
    제목: '2024년 5월 3주차 워케이션 : 양양',
    등록일시: '2024.06.05',
    모집기간: '2024.07.03 - 2024.07.03',
    워케이션기간: '2024.07.03 - 2024.07.03',
    상태: { text: '모집 중', color: 'text-positive' },
    결과및페널티: '',
    내용: '',
  },
  {
    id: 3,
    제목: '2024년 5월 3주차 워케이션 : 양양',
    등록일시: '2024.06.05',
    모집기간: '2024.07.03 - 2024.07.03',
    워케이션기간: '2024.07.03 - 2024.07.03',
    상태: { text: '모집 완료', color: 'text-primaryDark' },
    결과및페널티: '',
    내용: '',
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
    <div className="flex w-full flex-col gap-y-10 overflow-y-auto">
      <div className="flex w-full items-center justify-between">
        <TitleBarModule title="워케이션 목록" />
        <FilteringButtonAtom onClick={handleFilteringBar} />
      </div>
      <TableContainer>
        <TableHeaderModule>
          <TableHeaderAtom width="78px" isFirst>
            번호
          </TableHeaderAtom>
          <TableHeaderAtom>제목</TableHeaderAtom>
          <TableHeaderAtom width="100px">등록 일시</TableHeaderAtom>
          <TableHeaderAtom width="140px">모집 기간</TableHeaderAtom>
          <TableHeaderAtom width="140px">워케이션 기간</TableHeaderAtom>
          <TableHeaderAtom width="110px">상태</TableHeaderAtom>
          <TableHeaderAtom width="130px">결과및 페널티</TableHeaderAtom>
          <TableHeaderAtom width="150px" isLast>
            내용
          </TableHeaderAtom>
        </TableHeaderModule>
        <tbody>
          {data.length <= 0 ? (
            <EmptyContainer colSpan={8} />
          ) : (
            data.map((item, index) => (
              <TableBodyModule key={item.id}>
                <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                <TableBodyAtom>{item.제목}</TableBodyAtom>
                <TableBodyAtom>{item.등록일시}</TableBodyAtom>
                <TableBodyAtom>{item.모집기간}</TableBodyAtom>
                <TableBodyAtom>{item.워케이션기간}</TableBodyAtom>
                <TableBodyAtom color={item.상태.color}>
                  {item.상태.text}
                </TableBodyAtom>
                <TableBodyAtom>
                  <button className="rounded-full bg-primary px-6 py-2 text-4 font-semibold text-white">
                    자세히
                  </button>
                </TableBodyAtom>
                <TableBodyAtom isLast>
                  <ShowDetailButtonAtom
                    onClick={() => onClickRowDetail(item.id)}
                  />
                </TableBodyAtom>
              </TableBodyModule>
            ))
          )}
        </tbody>
      </TableContainer>

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
