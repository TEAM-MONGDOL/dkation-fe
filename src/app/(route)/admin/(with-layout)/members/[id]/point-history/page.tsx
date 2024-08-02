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
import { useGetMemberPointHistoryQuery } from '@/_hooks/admin/useGetMemberPointHistoryQuery';
import dayjs from 'dayjs';

interface Props {
  params: { id: string };
}

const AdminMembersPointHistoryPage = ({ params }: Props) => {
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
    point: string[];
  }>({
    order: 'DESC',
    type: [],
    point: ['INCREASE', 'DECREASE'],
  });

  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'DESC',
      type: [],
      point: ['INCREASE', 'DECREASE'],
    });
    setSelectedDateTag('ALL');
    setStartDate(null);
    setEndDate(null);
  };

  const isPositive =
    param.point.length === 1
      ? param.point[0] === 'INCREASE'
      : param.point.length === 0
        ? undefined
        : undefined;

  const { data, isLoading, isError } = useGetMemberPointHistoryQuery({
    accountId,
    startDate: startDate
      ? dayjs(startDate).format('YYYY-MM-DDTHH:mm:ss')
      : undefined,
    endDate: endDate ? dayjs(endDate).format('YYYY-MM-DDTHH:mm:ss') : undefined,
    isPositive,
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
          iconSrc={ControlPointDuplicateIcon}
          iconAlt="point"
          text="포인트 사용 내역"
        />
        <FilteringButtonAtom onClick={() => setIsFilteringBarOpen(true)} />
      </div>
      <TableContainer>
        <TableHeaderModule>
          <TableHeaderAtom isFirst width="80px">
            번호
          </TableHeaderAtom>
          <TableHeaderAtom>분류</TableHeaderAtom>
          <TableHeaderAtom width="220px">일시</TableHeaderAtom>
          <TableHeaderAtom width="200px">변동</TableHeaderAtom>
          <TableHeaderAtom isLast width="200px">
            총합
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
            data.pointInfos.map((item, index) => {
              const { totalElements } = data.pageInfo;
              const { pageSize } = data.pageInfo;
              const currentIndex = (currentPage - 1) * pageSize + index;
              const descendingIndex = totalElements - currentIndex;

              return (
                <TableBodyModule key={`${item.pointType}-${item.getTime}`}>
                  <TableBodyAtom isFirst>{descendingIndex}</TableBodyAtom>
                  <TableBodyAtom>{item.pointType}</TableBodyAtom>
                  <TableBodyAtom>
                    {dayjs(item.getTime).format('YYYY-MM-DD')}
                  </TableBodyAtom>
                  <TableBodyAtom
                    color={
                      item.usedPoint > 0 ? 'text-positive' : 'text-negative'
                    }
                  >
                    {item.usedPoint} P
                  </TableBodyAtom>
                  <TableBodyAtom isLast>{item.totalPoint}</TableBodyAtom>
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
          options={Object.entries(orderList) as [string, string][]}
          selectedOption={param.order}
          setSelectedOption={(order: string) => setParam({ ...param, order })}
        />
        <hr className="h-[0.5px] w-full border-0 bg-sub-100" />
        <DatePickerContainer
          title="일시"
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
