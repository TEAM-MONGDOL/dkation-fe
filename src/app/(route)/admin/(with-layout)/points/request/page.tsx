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
import { orderList, pointRequestStatusList } from '@/_types/adminType';
import { DatePickerTagType } from '@/_types/commonType';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const data: {
  id: number;
  category: string;
  name: string;
  requestedAt: string;
  rewardAt: string;
  status: string;
}[] = [
  {
    id: 1,
    category: '자기계발',
    name: '김철수',
    requestedAt: '2024-07-20',
    rewardAt: '-',
    status: 'WAITING',
  },
  {
    id: 2,
    category: '봉사활동',
    name: '이영희',
    requestedAt: '2024-07-21',
    rewardAt: '2024-07-22',
    status: 'APPROVED',
  },
  {
    id: 3,
    category: '이벤트',
    name: '박민수',
    requestedAt: '2024-07-21',
    rewardAt: '2024-07-22',
    status: 'WAITING',
  },
  {
    id: 4,
    category: '자기계발',
    name: '김철수 외 3명',
    requestedAt: '2024-07-21',
    rewardAt: '-',
    status: 'REJECT',
  },
];

const AdminPointsRequestPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
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
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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

  const getStatusColor = (
    status: string,
  ): 'text-sub-200' | 'text-negative' | 'text-positive' | undefined => {
    if (status === 'WAITING') return 'text-sub-200';
    if (status === 'REJECT') return 'text-negative';
    if (status === 'APPROVED') return 'text-positive';
    return undefined;
  };

  return (
    <div className="flex w-full flex-col gap-y-10 overflow-y-auto">
      <div className="flex w-full items-center justify-between">
        <TitleBarModule title="포인트 신청 내역" />
        <SearchingBoxModule
          placeholder="이름을 검색하세요."
          filter
          onClick={() => setIsFilteringBarOpen(true)}
        />
      </div>
      <TableContainer>
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
        {data.length <= 0 ? (
          <EmptyContainer colSpan={7} />
        ) : (
          data.map((item, idx) => (
            <TableBodyModule key={item.id}>
              <TableBodyAtom isFirst>{idx + 1}</TableBodyAtom>
              <TableBodyAtom>{item.category}</TableBodyAtom>
              <TableBodyAtom>{item.name}</TableBodyAtom>
              <TableBodyAtom>{item.requestedAt}</TableBodyAtom>
              <TableBodyAtom>{item.rewardAt}</TableBodyAtom>
              <TableBodyAtom color={getStatusColor(item.status)}>
                {item.status === 'WAITING' && '대기'}
                {item.status === 'REJECT' && '반려'}
                {item.status === 'APPROVED' && '승인'}
              </TableBodyAtom>
              <TableBodyAtom isLast>
                <ShowDetailButtonAtom
                  onClick={() => onClickRowDetail(item.id)}
                />
              </TableBodyAtom>
            </TableBodyModule>
          ))
        )}
      </TableContainer>
      {data.length > 0 && (
        <div className="flex w-full items-center justify-center">
          <PaginationModule
            currentPage={page}
            setCurrentPage={setPage}
            totalPages={Math.ceil(data.length / 10)}
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
          options={Object.entries(pointRequestStatusList) as [string, string][]}
          selectedOptions={param.state}
          setSelectedOptions={(state: string[]) =>
            setParam({ ...param, state })
          }
        />
        <hr className="h-[0.5px] w-full border-0 bg-sub-100" />
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
