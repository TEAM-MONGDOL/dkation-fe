'use client';

import ShowDetailButtonAtom from '@/_components/common/atoms/ShowDetailButtonAtom';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import CheckboxContainer from '@/_components/common/containers/CheckboxContainer';
import DatePickerContainer from '@/_components/common/containers/DatePickerContainer';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';
import RadioButtonContainer from '@/_components/common/containers/RadioButtonContainer';
import TableContainer from '@/_components/common/containers/TableContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import SearchingBoxModule from '@/_components/common/modules/SearchingBoxModule';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { useGetPointPolicyQuery } from '@/_hooks/admin/useGetPointPolicyQuery';
import { useGetPointSupplyQuery } from '@/_hooks/admin/useGetPointSupplyQuery';
import { orderList, pointRewardList } from '@/_types/adminType';
import { DatePickerTagType } from '@/_types/commonType';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AdminPointsRewardPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [selectedDateTag, setSelectedDateTag] =
    useState<DatePickerTagType>('ALL');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [param, setParam] = useState<{
    order: string;
    type: string[];
    reason: string[];
  }>({
    order: 'ASC',
    type: ['PERSONAL', 'GROUP'],
    reason: [],
  });

  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'ASC',
      type: ['PERSONAL', 'GROUP'],
      reason: [],
    });
    setSelectedDateTag('ALL');
    setStartDate(null);
    setEndDate(null);
  };

  const onClickRowDetail = (id: number) => {
    router.push(`/admin/points/reward/${id}`);
  };

  const { data: pointPolicyList } = useGetPointPolicyQuery({
    pageable: {
      page: 1,
      size: 100,
    },
  });

  useEffect(() => {
    console.log(param.reason);
  }, [param.reason]);

  const { data, isLoading, isError } = useGetPointSupplyQuery({
    supplyType: param.type.length > 1 ? undefined : param.type[0],
    pointPolicyIds:
      param.reason.length > 0 &&
      pointPolicyList &&
      param.reason.length < pointPolicyList?.pointPolicyList.length
        ? param.reason.join(',')
        : undefined,
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

  const { data: pointPolicyData } = useGetPointPolicyQuery({
    pageable: {
      page: 1,
      size: 100,
    },
  });

  useEffect(() => {
    pointPolicyData &&
      setParam({
        ...param,
        reason: pointPolicyData.pointPolicyList.map((item) =>
          item.id.toString(),
        ),
      });
  }, [pointPolicyData]);

  return (
    <section className="flex w-full flex-col gap-y-10 overflow-y-auto">
      <div className="flex w-full items-center justify-between">
        <TitleBarModule title="포인트 지급 내역" />
        <SearchingBoxModule
          placeholder="이름을 검색하세요."
          filter
          onClick={() => setIsFilteringBarOpen(true)}
        />
      </div>
      <TableContainer>
        <TableHeaderModule>
          <TableHeaderAtom width="80px" isFirst>
            번호
          </TableHeaderAtom>
          <TableHeaderAtom width="150px">구분</TableHeaderAtom>
          <TableHeaderAtom>분류</TableHeaderAtom>
          <TableHeaderAtom width="200px">이름</TableHeaderAtom>
          <TableHeaderAtom width="200px">지급일</TableHeaderAtom>
          <TableHeaderAtom width="160px" isLast />
        </TableHeaderModule>
        <tbody>
          {!data ? (
            isLoading ? (
              <EmptyContainer colSpan={6} text="로딩 중입니다..." />
            ) : isError ? (
              <EmptyContainer colSpan={6} text="에러가 발생하였습니다." />
            ) : (
              <EmptyContainer colSpan={6} text="데이터가 없습니다." />
            )
          ) : data.pageInfo.totalElements <= 0 ? (
            <EmptyContainer colSpan={6} />
          ) : (
            data.pointSupplyList.map((item, index) => (
              <TableBodyModule key={item.id}>
                <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                <TableBodyAtom
                  color={
                    item.pointSupplyType === 'GROUP'
                      ? 'text-primary'
                      : 'text-positive'
                  }
                >
                  {item.pointSupplyType === 'GROUP' ? '단체' : '개인'}
                </TableBodyAtom>
                <TableBodyAtom>{item.pointTitle}</TableBodyAtom>
                <TableBodyAtom>
                  {item.name}
                  {item.count > 1 && ` 외 ${item.count}`}
                </TableBodyAtom>
                <TableBodyAtom>
                  {dayjs(item.supplyTime).format('YYYY.MM.DD')}
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
        <CheckboxContainer
          title="분류"
          options={Object.entries(pointRewardList) as [string, string][]}
          selectedOptions={param.type}
          setSelectedOptions={(type: string[]) => setParam({ ...param, type })}
        />
        <hr className="h-[0.5px] w-full border-0 bg-sub-100" />
        {pointPolicyList && (
          <CheckboxContainer
            title="구분"
            options={pointPolicyList.pointPolicyList.map((item) => [
              item.id.toString(),
              item.policyTitle,
            ])}
            selectedOptions={param.reason}
            setSelectedOptions={(reason: string[]) =>
              setParam({ ...param, reason })
            }
          />
        )}
        <hr className="h-[0.5px] w-full border-0 bg-sub-100" />
        <DatePickerContainer
          title="신청 및 지급 일시"
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
        />
      </FilteringBarContainer>
    </section>
  );
};

export default AdminPointsRewardPage;
