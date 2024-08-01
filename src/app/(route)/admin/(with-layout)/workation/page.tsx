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
import { useGetWkListQuery } from '@/_hooks/admin/useGetWktListQuery';
import { useGetPointSupplyQuery } from '@/_hooks/admin/useGetPointSupplyQuery';

const WorkationList = () => {
  const router = useRouter();
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [param, setParam] = useState<{
    order: string;
    status: string[];
  }>({
    order: 'RECENT',
    status: ['WILL', 'PROCEED', 'COMPLETE'],
  });
  const [currentPage, setCurrentPage] = useState(1);

  const penaltyRouteButtonClick = (id: number) => {
    router.push(`/admin/workation/${id}/result`);
  };
  const [selectedTag, setSelectedTag] = useState<DatePickerTagType>('ALL');
  const [selectedApplyTag, setApplySelectedTag] =
    useState<DatePickerTagType>('ALL');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [applyStartDate, setApplyStartDate] = useState<Date | null>(null);
  const [applyEndDate, setApplyEndDate] = useState<Date | null>(null);
  const handleFilteringBar = () => {
    setIsFilteringBarOpen(true);
  };
  const onClickRowDetail = (id: number) => {
    router.push(`/admin/workation/${id}`);
  };
  const moveToWritePage = () => {
    router.push('/admin/workation/new');
  };
  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'RECENT',
      status: ['WILL', 'PROCEED', 'COMPLETE'],
    });
    setStartDate(dayjs().subtract(1, 'year').toDate());
    setEndDate(dayjs().subtract(1, 'year').toDate());
    setApplyStartDate(dayjs().subtract(1, 'year').toDate());
    setApplyEndDate(dayjs().toDate());
  };
  const { data, isLoading, isError } = useGetWkListQuery({
    wktStartDate: startDate === null ? undefined : startDate,
    wktEndDate: endDate === null ? undefined : endDate,
    applyStartDate: applyStartDate === null ? undefined : applyStartDate,
    applyEndDate: applyEndDate === null ? undefined : applyEndDate,
    pageParam: {
      page: currentPage,
      size: 10,
      // sort: param.order,
    },
  });

  return (
    <section className="flex w-full flex-col gap-y-10 overflow-y-auto">
      <div className="flex w-full items-center justify-between">
        <TitleBarModule title="워케이션 목록" />
        <FilteringButtonAtom onClick={handleFilteringBar} />
      </div>
      <TableContainer>
        <TableHeaderModule>
          <TableHeaderAtom width="80px" isFirst>
            번호
          </TableHeaderAtom>
          <TableHeaderAtom>제목</TableHeaderAtom>
          <TableHeaderAtom width="100px">등록 일시</TableHeaderAtom>
          <TableHeaderAtom width="140px">모집 기간</TableHeaderAtom>
          <TableHeaderAtom width="140px">워케이션 기간</TableHeaderAtom>
          <TableHeaderAtom width="110px">상태</TableHeaderAtom>
          <TableHeaderAtom width="130px">결과 및 페널티</TableHeaderAtom>
          <TableHeaderAtom width="150px" isLast>
            내용
          </TableHeaderAtom>
        </TableHeaderModule>
        <tbody>
          {!data ? (
            isLoading ? (
              <EmptyContainer colSpan={8} text="loading" />
            ) : (
              <EmptyContainer colSpan={8} text="no data" />
            )
          ) : data.pageInfo.totalElements <= 0 ? (
            <EmptyContainer colSpan={8} />
          ) : (
            data.wktInfos.map((item, index) => (
              <TableBodyModule key={item.wkId}>
                <TableBodyAtom isFirst>{item.wkId + 1}</TableBodyAtom>
                <TableBodyAtom>{item.title}</TableBodyAtom>
                <TableBodyAtom>
                  {dayjs(item.createdAt).format('YYYY-MM-DD')}
                </TableBodyAtom>
                <TableBodyAtom>
                  {dayjs(item.startDate).format('YYYY-MM-DD')} -
                  {dayjs(item.endDate).format('YYYY-MM-DD')}
                </TableBodyAtom>
                <TableBodyAtom>
                  {dayjs(item.applyStartDate).format('YYYY-MM-DD')} -
                  {dayjs(item.applyEndDate).format('YYYY-MM-DD')}
                </TableBodyAtom>
                <TableBodyAtom>status 받아야함</TableBodyAtom>
                <TableBodyAtom>
                  <button
                    onClick={() => penaltyRouteButtonClick(item.wkId)}
                    className="rounded-full bg-primary px-6 py-2 text-4 font-semibold text-white"
                  >
                    자세히
                  </button>
                </TableBodyAtom>
                <TableBodyAtom isLast>
                  <ShowDetailButtonAtom
                    onClick={() => onClickRowDetail(item.wkId)}
                  />
                </TableBodyAtom>
              </TableBodyModule>
            ))
          )}
        </tbody>
      </TableContainer>
      <div className="relative mt-8">
        {data && data.pageInfo.totalPages > 0 && (
          <div className="flex justify-center">
            <PaginationModule
              totalPages={data.pageInfo.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
        {/* 등록버튼 안생김ㅠ ㅠ */}
        <div className="absolute right-0 top-0">
          <ButtonAtom
            text="워케이션 등록"
            type="button"
            buttonStyle="yellow"
            onClick={moveToWritePage}
          />
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
          selectedTag={selectedApplyTag}
          setSelectedTag={setApplySelectedTag}
          startDate={applyStartDate}
          setStartDate={setApplyStartDate}
          endDate={applyEndDate}
          setEndDate={setApplyEndDate}
        />
        <DatePickerContainer
          title="워케이션 기간"
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </FilteringBarContainer>
    </section>
  );
};

export default WorkationList;
