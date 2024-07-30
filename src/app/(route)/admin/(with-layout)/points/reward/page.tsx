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
import { orderList, pointRewardList } from '@/_types/adminType';
import { DatePickerTagType } from '@/_types/commonType';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const headers = [
  { title: '번호', width: '80px' },
  { title: '구분', width: '150px' },
  { title: '분류', flexGrow: true },
  { title: '이름', flexGrow: true },
  { title: '지급일', width: '200px' },
  { title: '', width: '160px' },
];

const data = [
  {
    id: 1,
    구분: { text: '개인', color: 'red' },
    분류: '자기계발',
    이름: '김철수',
    지급일: '2024-07-20',
  },
  {
    id: 2,
    구분: { text: '개인', color: 'red' },
    분류: '봉사활동',
    이름: '이영희',
    지급일: '2024-07-21',
  },
  {
    id: 3,
    구분: { text: '단체', color: 'blue' },
    분류: '이벤트',
    이름: '박민수',
    지급일: '2024-07-21',
  },
  {
    id: 4,
    구분: { text: '단체', color: 'blue' },
    분류: '자기계발',
    이름: '김철수 외 3명',
    지급일: '2024-07-21',
  },
];

const AdminPointsRewardPage = () => {
  const router = useRouter();
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [selectedDateTag, setSelectedDateTag] =
    useState<DatePickerTagType>('ALL');
  const [param, setParam] = useState<{
    order: string;
    type: string[];
    reason: string[]; // 포인트 정책 추가가 자유로우니 이는 Type으로 선언 불가
  }>({
    order: 'RECENT',
    type: ['PERSONAL', 'GROUP'],
    reason: ['SELF_STUDY', 'VOLUNTEER', 'EVENT'],
  });
  const [startDate, setStartDate] = useState<Date>(
    dayjs().subtract(1, 'year').toDate(),
  );
  const [endDate, setEndDate] = useState<Date>(dayjs().toDate());

  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'RECENT',
      type: ['PERSONAL', 'GROUP'],
      reason: ['SELF_STUDY', 'VOLUNTEER', 'EVENT'],
    });
    setSelectedDateTag('ALL');
    setStartDate(dayjs().subtract(1, 'year').toDate());
    setEndDate(dayjs().toDate());
  };

  const onClickRowDetail = (id: number) => {
    router.push(`/admin/points/reward/${id}`);
  };

  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="w-full flex flex-col gap-y-10 overflow-y-auto">
      <div className="w-full flex justify-between items-center">
        <TitleBarModule title="포인트 지급 내역" />
        <SearchingBoxModule
          placeholder="이름을 검색하세요."
          filter
          onClick={() => setIsFilteringBarOpen(true)}
        />
      </div>
      <TableContainer>
        <thead>
          <TableHeaderModule>
            <TableHeaderAtom width="80px" isFirst>
              번호
            </TableHeaderAtom>
            <TableHeaderAtom width="150px">구분</TableHeaderAtom>
            <TableHeaderAtom>분류</TableHeaderAtom>
            <TableHeaderAtom>이름</TableHeaderAtom>
            <TableHeaderAtom width="200px">지급일</TableHeaderAtom>
            <TableHeaderAtom width="160px" isLast />
          </TableHeaderModule>
        </thead>
        <tbody>
          {data.length <= 0 ? (
            <EmptyContainer colSpan={headers.length} />
          ) : (
            data.map((item, index) => (
              <TableBodyModule key={item.id}>
                <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                <TableBodyAtom color={item.구분.color}>
                  {item.구분.text}
                </TableBodyAtom>
                <TableBodyAtom>{item.분류}</TableBodyAtom>
                <TableBodyAtom>{item.이름}</TableBodyAtom>
                <TableBodyAtom>{item.지급일}</TableBodyAtom>
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
          setSelectedOption={(order: string) => setParam({ ...param, order })}
        />
        <hr className="w-full border-0 h-[0.5px] bg-sub-100" />
        <CheckboxContainer
          title="분류"
          options={Object.entries(pointRewardList) as [string, string][]}
          selectedOptions={param.type}
          setSelectedOptions={(type: string[]) => setParam({ ...param, type })}
        />
        <hr className="w-full border-0 h-[0.5px] bg-sub-100" />
        <CheckboxContainer
          title="구분"
          options={[
            ['SELF_STUDY', '자기계발'],
            ['VOLUNTEER', '봉사활동'],
            ['EVENT', '이벤트'],
          ]}
          selectedOptions={param.reason}
          setSelectedOptions={(reason: string[]) =>
            setParam({ ...param, reason })
          }
        />
        <hr className="w-full border-0 h-[0.5px] bg-sub-100" />
        <DatePickerContainer
          title="신청 및 지급 일시"
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

export default AdminPointsRewardPage;
