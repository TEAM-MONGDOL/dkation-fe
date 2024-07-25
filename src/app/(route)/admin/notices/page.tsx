'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchingBoxModule from '@/_components/common/modules/SearchingBoxModule';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import TableContainer from '@/_components/common/containers/TableContainer';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';
import RadioButtonContainer from '@/_components/common/containers/RadioButtonContainer';
import CheckboxContainer from '@/_components/common/containers/CheckboxContainer';
import DatePickerContainer from '@/_components/common/containers/DatePickerContainer';
import { DatePickerTagType } from '@/_types/commonType';

const headers = [
  { title: '번호', width: '60' },
  { title: '구분', width: '100' },
  { title: '제목', flexGrow: true },
  { title: '작성일', width: '200' },
  { title: '상세보기', width: '80' },
];

const data = [
  {
    id: 1,
    번호: '1',
    구분: '공지사항',
    제목: '공지입니다',
    작성일: '2024-07-20',
    상세보기: '상세보기',
  },
  {
    id: 2,
    번호: '2',
    구분: '이벤트 안내',
    제목: '이벤트 안내',
    작성일: '2024-07-21',
    상세보기: '상세보기',
  },
  {
    id: 3,
    번호: '3',
    구분: '결과 발표',
    제목: '8월 3주차 워케이션 결과 발표 : 양양',
    작성일: '2024-07-21',
    상세보기: '상세보기',
  },
];

const NoticesListPage = () => {
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [sortOption, setSortOption] = useState('최신 순');
  const [categoryOptions, setCategoryOptions] = useState<string[]>(['전체']);
  const [selectedTag, setSelectedTag] = useState<DatePickerTagType | null>(
    'ALL',
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const router = useRouter();

  const moveToWritePage = () => {
    router.push('/admin/notices/write');
  };

  const handleFilteringBar = () => {
    setIsFilteringBarOpen(true);
  };

  const handleRefresh = () => {
    // Add your refresh logic here
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-12">
        <TitleBarModule title="공지사항 목록" />
        <div className="flex items-center space-x-4 ml-auto">
          <SearchingBoxModule
            placeholder="이름을 검색하세요"
            filter
            onClick={handleFilteringBar}
          />
        </div>
      </div>
      {isFilteringBarOpen && (
        <FilteringBarContainer
          isOpen={isFilteringBarOpen}
          setIsOpen={setIsFilteringBarOpen}
          refreshHandler={handleRefresh}
        >
          <RadioButtonContainer
            title="정렬"
            options={['최신 순', '오래된 순']}
            selectedOption={sortOption}
            setSelectedOption={setSortOption}
          />
          <hr />
          <CheckboxContainer
            title="분류"
            options={['전체', '공지', '결과 발표', '이벤트 안내']}
            selectedOptions={categoryOptions}
            setSelectedOptions={setCategoryOptions}
          />
          <hr />
          <DatePickerContainer
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </FilteringBarContainer>
      )}
      <TableContainer headers={headers} data={data} />
      <div className="relative mt-8">
        <div className="flex justify-center">
          <PaginationModule />
        </div>
        <div className="absolute right-0 top-0">
          <ButtonAtom buttonType="yellow" onClick={moveToWritePage}>
            글쓰기
          </ButtonAtom>
        </div>
      </div>
    </div>
  );
};

export default NoticesListPage;
