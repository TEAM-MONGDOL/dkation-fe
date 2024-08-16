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
import { useGetPointApply } from '@/_hooks/admin/useGetPointApply';
import { useGetPointPolicyQuery } from '@/_hooks/admin/useGetPointPolicyQuery';
import {
  orderList,
  PointApplyType,
  pointApplyTypeConvertList,
  pointApplyTypeList,
  pointRequestStatusList,
} from '@/_types/adminType';
import { DatePickerTagType } from '@/_types/commonType';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const getStatusColor = (
  status: PointApplyType,
): 'text-sub-200' | 'text-negative' | 'text-positive' | undefined => {
  if (status === 'PENDING') return 'text-sub-200';
  if (status === 'DECLINED') return 'text-negative';
  if (status === 'APPROVED') return 'text-positive';
  return undefined;
};

const AdminPointsRequestPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [param, setParam] = useState<{
    order: string;
    state: string[];
    type: string[];
  }>({
    order: 'DESC',
    state: pointApplyTypeList,
    type: [],
  });
  const [selectedDateTag, setSelectedDateTag] =
    useState<DatePickerTagType>('ALL');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const { data: pointPolicyList } = useGetPointPolicyQuery({
    pageable: {
      page: 1,
      size: 100,
      sort: 'createdAt,DESC',
    },
  });

  const { data, isLoading, isError } = useGetPointApply({
    params: {
      name: searchValue || undefined,
      accountId: searchValue || undefined,
      applyTypes:
        param.state.length > 0 && param.state.length < 3
          ? param.state.join(',')
          : undefined,
      pointPolicyIds: param.type.length > 0 ? param.type.join(',') : undefined,
      startDate: startDate
        ? dayjs(startDate).format('YYYY-MM-DDTHH:mm:ss')
        : undefined,
      endDate: endDate
        ? dayjs(endDate).format('YYYY-MM-DDTHH:mm:ss')
        : undefined,
    },
    pageable: {
      page,
      size: 10,
      sort: `createdAt,${param.order}`,
    },
  });

  const onClickRowDetail = (id: number) => {
    router.push(`/admin/points/request/${id}`);
  };

  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'RECENT',
      state: pointApplyTypeList,
      type: pointPolicyList
        ? pointPolicyList.pointPolicyList.map((item) => item.id.toString())
        : [],
    });
    setSelectedDateTag('ALL');
    setStartDate(null);
    setEndDate(null);
  };

  useEffect(() => {
    pointPolicyList &&
      setParam((prev) => ({
        ...prev,
        type: pointPolicyList.pointPolicyList.map((item) => item.id.toString()),
      }));
  }, [pointPolicyList]);

  return (
    <div className="flex w-full flex-col gap-y-10 overflow-y-auto">
      <div className="flex w-full items-center justify-between gap-x-10">
        <TitleBarModule title="포인트 신청 내역" />
        <SearchingBoxModule
          placeholder="이름을 검색하세요."
          filter
          onClick={() => setIsFilteringBarOpen(true)}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <TableContainer minWidth="1000px">
        <TableHeaderModule>
          <TableHeaderAtom isFirst width="80px">
            번호
          </TableHeaderAtom>
          <TableHeaderAtom width="150px">분류</TableHeaderAtom>
          <TableHeaderAtom width="190px">이름</TableHeaderAtom>
          <TableHeaderAtom>신청 일시</TableHeaderAtom>
          <TableHeaderAtom>지급 일시</TableHeaderAtom>
          <TableHeaderAtom width="140px">상태</TableHeaderAtom>
          <TableHeaderAtom isLast width="160px" />
        </TableHeaderModule>
        <tbody>
          {!data ? (
            isLoading ? (
              <EmptyContainer colSpan={7} text="로딩 중..." />
            ) : isError ? (
              <EmptyContainer colSpan={7} text="에러가 발생했습니다." />
            ) : (
              <EmptyContainer
                colSpan={7}
                text="알 수 없는 에러가 발생했습니다."
              />
            )
          ) : data.pointApplyInfos.length <= 0 ? (
            <EmptyContainer colSpan={7} />
          ) : (
            data.pointApplyInfos.map((item, idx) => (
              <TableBodyModule key={item.pointApplyId}>
                <TableBodyAtom isFirst>{idx + 1}</TableBodyAtom>
                <TableBodyAtom>{item.pointTitle}</TableBodyAtom>
                <TableBodyAtom>{item.name}</TableBodyAtom>
                <TableBodyAtom>
                  {dayjs(item.applyTime).format('YYYY.MM.DD')}
                </TableBodyAtom>
                <TableBodyAtom>
                  {dayjs(item.reviewTime).format('YYYY.MM.DD')}
                </TableBodyAtom>
                <TableBodyAtom color={getStatusColor(item.applyType)}>
                  {pointApplyTypeConvertList[item.applyType]}
                </TableBodyAtom>
                <TableBodyAtom isLast>
                  <ShowDetailButtonAtom
                    onClick={() => onClickRowDetail(item.pointApplyId)}
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
            currentPage={page}
            setCurrentPage={setPage}
            totalPages={data.pageInfo.totalPages}
          />
        </div>
      )}
      <div className="flex w-full items-center justify-center" />
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
        <hr className="h-[0.5px] w-full border-0 bg-sub-100" />
        <CheckboxContainer
          title="분류"
          options={
            Object.entries(pointApplyTypeConvertList) as [string, string][]
          }
          selectedOptions={param.state}
          setSelectedOptions={(state: string[]) =>
            setParam({ ...param, state })
          }
        />
        <hr className="h-[0.5px] w-full border-0 bg-sub-100" />
        {pointPolicyList && (
          <CheckboxContainer
            title="구분"
            options={pointPolicyList.pointPolicyList.map((item) => [
              item.id.toString(),
              item.policyTitle,
            ])}
            selectedOptions={param.type}
            setSelectedOptions={(reason: string[]) =>
              setParam({ ...param, type: reason })
            }
          />
        )}
        <hr className="h-[0.5px] w-full border-0 bg-sub-100" />
        <DatePickerContainer
          title="신청 및 심사 일시"
          selectedTag={selectedDateTag}
          setSelectedTag={setSelectedDateTag}
          startDate={startDate}
          setStartDate={(start: Date | null) => setStartDate(start)}
          endDate={endDate}
          setEndDate={(end: Date | null) => setEndDate(end)}
        />
      </FilteringBarContainer>
    </div>
  );
};

export default AdminPointsRequestPage;
