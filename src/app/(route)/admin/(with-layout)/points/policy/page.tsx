'use client';

import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import ShowDetailButtonAtom from '@/_components/common/atoms/ShowDetailButtonAtom';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import DatePickerContainer from '@/_components/common/containers/DatePickerContainer';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';
import RadioButtonContainer from '@/_components/common/containers/RadioButtonContainer';
import RangeContainer from '@/_components/common/containers/RangeContainer';
import TableContainer from '@/_components/common/containers/TableContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { useGetPointPolicyQuery } from '@/_hooks/admin/useGetPointPolicyQuery';
import { orderList } from '@/_types/adminType';
import { DatePickerTagType } from '@/_types/commonType';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AdminPointsPolicyPage = () => {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<DatePickerTagType>('ALL');
  const [page, setPage] = useState(1);
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [param, setParam] = useState<{
    order: string;
    startPoint: number;
    endPoint: number;
  }>({
    order: 'DESC',
    startPoint: 0,
    endPoint: 1100,
  });
  const { data, isLoading, isError } = useGetPointPolicyQuery({
    pageable: {
      page,
      size: 10,
      sort: `lastModifiedAt,${param.order}`,
    },
    searchParam: {
      startDate: startDate
        ? dayjs(startDate.setHours(0, 0, 0, 0)).format('YYYY-MM-DDTHH:mm:ss')
        : undefined,
      endDate: endDate
        ? dayjs(endDate.setHours(23, 59, 59, 999)).format('YYYY-MM-DDTHH:mm:ss')
        : undefined,
      minPoint: param.startPoint,
      maxPoint: param.endPoint,
    },
  });

  const refreshHandler = () => {
    setParam({
      order: 'DESC',
      startPoint: 0,
      endPoint: 1100,
    });
    setSelectedTag('ALL');
    setStartDate(null);
    setEndDate(null);
  };

  const onClickRowDetail = (id: number) => {
    router.push(`/admin/points/policy/${id}`);
  };

  return (
    <div className="flex w-full flex-col gap-y-10">
      <div className="flex w-full items-center justify-between">
        <TitleBarModule title="포인트 정책 설정" />
        <FilteringButtonAtom onClick={() => setIsFilteringBarOpen(true)} />
      </div>
      <TableContainer>
        <TableHeaderModule>
          <TableHeaderAtom isFirst width="80px">
            번호
          </TableHeaderAtom>
          <TableHeaderAtom width="200px">분류</TableHeaderAtom>
          <TableHeaderAtom width="200px">포인트</TableHeaderAtom>
          <TableHeaderAtom>상세 내용</TableHeaderAtom>
          <TableHeaderAtom>등록/수정 일시</TableHeaderAtom>
          <TableHeaderAtom isLast width="160px" />
        </TableHeaderModule>
        <tbody>
          {!data ? (
            isLoading ? (
              <EmptyContainer colSpan={6} text="로딩 중..." />
            ) : isError ? (
              <EmptyContainer colSpan={6} text="에러가 발생했습니다." />
            ) : (
              <EmptyContainer colSpan={6} text="데이터가 없습니다." />
            )
          ) : data.pointPolicyList.length < 1 ? (
            <EmptyContainer colSpan={6} />
          ) : (
            data.pointPolicyList.map((item, idx) => (
              <TableBodyModule key={item.id}>
                <TableBodyAtom isFirst>{idx + 1}</TableBodyAtom>
                <TableBodyAtom>{item.policyTitle}</TableBodyAtom>
                <TableBodyAtom>{item.quantity}</TableBodyAtom>
                <TableBodyAtom>{item.detail}</TableBodyAtom>
                <TableBodyAtom>
                  {dayjs(item.modifiedAt).format('YYYY.MM.DD')}
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
      <div className="relative flex w-full items-center justify-center">
        {data && data?.pageInfo.totalElements > 0 && (
          <PaginationModule
            currentPage={page}
            setCurrentPage={setPage}
            totalPages={data.pageInfo.totalPages}
          />
        )}
        <div className="absolute bottom-0 right-0 top-0">
          <ButtonAtom
            type="button"
            buttonStyle="yellow"
            onClick={() => {
              router.push('/admin/points/policy/new');
            }}
            text="정책 추가"
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
        <hr className="h-[0.5px] w-full border-0 bg-sub-100" />
        <RangeContainer
          title="포인트 점수"
          min={0}
          max={100000}
          step={10}
          onChange={({ min, max }) =>
            setParam({ ...param, startPoint: min, endPoint: max })
          }
        />
        <hr className="h-[0.5px] w-full border-0 bg-sub-100" />
        <DatePickerContainer
          title="등록일"
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      </FilteringBarContainer>
    </div>
  );
};

export default AdminPointsPolicyPage;
