'use client';

import { useState } from 'react';
import TableContainer from '@/_components/common/containers/TableContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import { orderList, pointChangeList } from '@/_types/adminType';
import { DatePickerTagType } from '@/_types/commonType';
import RadioButtonContainer from '@/_components/common/containers/RadioButtonContainer';
import DatePickerContainer from '@/_components/common/containers/DatePickerContainer';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';
import CheckboxContainer from '@/_components/common/containers/CheckboxContainer';
import SubtitleModule from '@/_components/common/modules/SubtitleModule';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import { ControlPointDuplicateIcon } from '@/_assets/icons';

const data = [
  {
    id: 1,
    분류: '워케이션 당첨',
    일시: '2024.07.04',
    변동: { text: '-380', color: 'text-negative' },
    총합: 1000,
  },
  {
    id: 2,
    분류: '봉사활동',
    일시: '2024.07.04',
    변동: { text: '+300', color: 'text-positive' },
    총합: 1000,
  },
];

const AdminMembersPointHistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [selectedDateTag, setSelectedDateTag] =
    useState<DatePickerTagType>('ALL');

  const [param, setParam] = useState<{
    order: string;
    type: string[];
    point: string[];
    startDate: Date | null;
    endDate: Date | null;
  }>({
    order: 'RECENT',
    type: [],
    point: ['INCREASE', 'DECREASE'],
    startDate: null,
    endDate: null,
  });

  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'RECENT',
      type: [],
      point: ['INCREASE', 'DECREASE'],
      startDate: null,
      endDate: null,
    });
    setSelectedDateTag('ALL');
  };

  return (
    <section className="flex w-full flex-col gap-y-10">
      <div className="flex w-full items-center justify-between">
        <SubtitleModule
          iconSrc={ControlPointDuplicateIcon}
          iconAlt="point"
          text="포인트 사용 내역"
        />
        <FilteringButtonAtom onClick={() => setIsFilteringBarOpen(true)} />
      </div>
      <TableContainer>
        <TableHeaderModule>
          <TableHeaderAtom width="90px">번호</TableHeaderAtom>
          <TableHeaderAtom>분류</TableHeaderAtom>
          <TableHeaderAtom width="220px">일시</TableHeaderAtom>
          <TableHeaderAtom width="200px">변동</TableHeaderAtom>
          <TableHeaderAtom width="200px">확률</TableHeaderAtom>
        </TableHeaderModule>

        <tbody>
          {data.length <= 0 ? (
            <EmptyContainer colSpan={5} />
          ) : (
            data.map((item, index) => (
              <TableBodyModule key={item.id}>
                <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                <TableBodyAtom>{item.분류}</TableBodyAtom>
                <TableBodyAtom>{item.일시}</TableBodyAtom>
                <TableBodyAtom color={item.변동.color}>
                  ${item.변동.text} P
                </TableBodyAtom>
                <TableBodyAtom>{item.총합}</TableBodyAtom>
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
          options={Object.entries(orderList) as [string, string][]}
          selectedOption={param.order}
          setSelectedOption={(order: string) => setParam({ ...param, order })}
        />
        <hr className="h-[0.5px] w-full border-0 bg-sub-100" />
        <DatePickerContainer
          title="날짜"
          selectedTag={selectedDateTag}
          setSelectedTag={setSelectedDateTag}
          startDate={param.startDate}
          setStartDate={(start: Date | null) => {
            setParam({ ...param, startDate: start });
          }}
          endDate={param.endDate}
          setEndDate={(end: Date | null) => {
            setParam({ ...param, endDate: end });
          }}
          startDatePlaceholder="시작일 선택"
          endDatePlaceholder="종료일 선택"
        />
        <hr className="h-[0.5px] w-full border-0 bg-sub-100" />
        <CheckboxContainer
          title="포인트 변동"
          options={Object.entries(pointChangeList) as [string, string][]}
          selectedOptions={param.point}
          setSelectedOptions={(point: string[]) =>
            setParam({ ...param, point })
          }
        />
      </FilteringBarContainer>
    </section>
  );
};

export default AdminMembersPointHistoryPage;
