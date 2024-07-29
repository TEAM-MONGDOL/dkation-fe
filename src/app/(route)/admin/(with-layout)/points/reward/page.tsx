'use client';

import CheckboxContainer from '@/_components/common/containers/CheckboxContainer';
import DatePickerContainer from '@/_components/common/containers/DatePickerContainer';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';
import RadioButtonContainer from '@/_components/common/containers/RadioButtonContainer';
import TableContainer from '@/_components/common/containers/TableContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import SearchingBoxModule from '@/_components/common/modules/SearchingBoxModule';
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
    startDate: Date | null;
    endDate: Date | null;
  }>({
    order: 'RECENT',
    type: ['PERSONAL', 'GROUP'],
    reason: ['SELF_STUDY', 'VOLUNTEER', 'EVENT'],
    startDate: null,
    endDate: null,
  });

  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'RECENT',
      type: ['PERSONAL', 'GROUP'],
      reason: ['SELF_STUDY', 'VOLUNTEER', 'EVENT'],
      startDate: null,
      endDate: null,
    });
    setSelectedDateTag('ALL');
  };

  const onClickRowDetail = (id: number) => {
    router.push(`/admin/points/reward/${id}`);
  };

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
      <TableContainer
        headers={headers}
        data={data.map((item) => ({
          ...item,
          '': { onClick: () => onClickRowDetail(item.id) },
        }))}
      />
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
        <CheckboxContainer
          title="분류"
          options={Object.entries(pointRewardList) as [string, string][]}
          selectedOptions={param.type}
          setSelectedOptions={(type: string[]) => setParam({ ...param, type })}
        />
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
        <DatePickerContainer
          title="신청 및 지급 일시"
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
          startDatePlaceholder="모집 시작일"
          endDatePlaceholder="모집 마감일"
        />
      </FilteringBarContainer>
    </div>
  );
};

export default AdminPointsRewardPage;
