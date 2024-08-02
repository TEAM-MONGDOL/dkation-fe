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
import { noticeList, orderList } from '@/_types/adminType';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import ShowDetailButtonAtom from '@/_components/common/atoms/ShowDetailButtonAtom';
import { useGetNoticeListQuery } from '@/_hooks/admin/useGetNoticeListQuery';
import dayjs from 'dayjs';

const noticeTypeMapping = {
  ANNOUNCEMENT: '공지사항',
  EVENT: '이벤트 안내',
  RESULT: '결과 발표',
};

const NoticesListPage = () => {
  const router = useRouter();
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [selectedDateTag, setSelectedDateTag] =
    useState<DatePickerTagType>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [param, setParam] = useState<{
    order: string;
    noticeType: string[];
  }>({
    order: 'DESC',
    noticeType: ['ANNOUNCEMENT', 'RESULT', 'EVENT'],
  });

  const moveToWritePage = () => {
    router.push('/admin/notices/new');
  };

  const handleFilteringBar = () => {
    setIsFilteringBarOpen(true);
  };

  const handleRefresh = () => {
    setParam({
      ...param,
      order: 'DESC',
      noticeType: ['ANNOUNCEMENT', 'RESULT', 'EVENT'],
    });
    setSelectedDateTag('ALL');
    setStartDate(null);
    setEndDate(null);
  };

  function moveToNoticesDetail(id: number) {
    router.push(`/admin/notices/${id}`);
  }

  const { data, isLoading, isError } = useGetNoticeListQuery({
    type: param.noticeType.join(','),
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

  return (
    <section className="w-full">
      <div className="mb-12 flex items-center justify-between">
        <TitleBarModule title="공지사항 목록" />
        <div className="ml-auto flex items-center space-x-4">
          <SearchingBoxModule
            placeholder="이름을 검색하세요"
            filter
            onClick={handleFilteringBar}
          />
        </div>
      </div>
      <FilteringBarContainer
        isOpen={isFilteringBarOpen}
        setIsOpen={setIsFilteringBarOpen}
        refreshHandler={handleRefresh}
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
          options={Object.entries(noticeList) as [string, string][]}
          selectedOptions={param.noticeType}
          setSelectedOptions={(noticeType: string[]) =>
            setParam({ ...param, noticeType })
          }
        />
        <hr className="h-[0.5px] w-full border-0 bg-sub-100" />
        <DatePickerContainer
          title="등록 일시"
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
          endDatePlaceholder="마감일 선택"
        />
      </FilteringBarContainer>
      <TableContainer>
        <TableHeaderModule>
          <TableHeaderAtom isFirst width="80px">
            번호
          </TableHeaderAtom>
          <TableHeaderAtom width="140px">구분</TableHeaderAtom>
          <TableHeaderAtom>제목</TableHeaderAtom>
          <TableHeaderAtom width="190px">작성일</TableHeaderAtom>
          <TableHeaderAtom isLast width="160px" />
        </TableHeaderModule>

        <tbody>
          {!data ? (
            isLoading ? (
              <EmptyContainer colSpan={5} text="loading" />
            ) : (
              <EmptyContainer colSpan={5} text="error" />
            )
          ) : data.pageInfo.totalElements <= 0 ? (
            <EmptyContainer colSpan={5} />
          ) : (
            data.announcementInfos.map((item, index) => (
              <TableBodyModule key={item.id}>
                <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                <TableBodyAtom>
                  {noticeTypeMapping[item.announcementType]}
                </TableBodyAtom>
                <TableBodyAtom>{item.title}</TableBodyAtom>
                <TableBodyAtom>
                  {dayjs(item.createdAt).format('YYYY-MM-DD')}
                </TableBodyAtom>
                <TableBodyAtom isLast>
                  <ShowDetailButtonAtom
                    onClick={() => moveToNoticesDetail(item.id)}
                  />
                </TableBodyAtom>
              </TableBodyModule>
            ))
          )}
        </tbody>
      </TableContainer>
      <div className="relative mt-8">
        {data && data.pageInfo.totalElements > 0 && (
          <div className="flex justify-center">
            <PaginationModule
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={data.pageInfo.totalPages}
            />
          </div>
        )}
        <div className="absolute right-0 top-0">
          <ButtonAtom
            type="button"
            buttonStyle="yellow"
            onClick={moveToWritePage}
            text="글쓰기"
          />
        </div>
      </div>
    </section>
  );
};

export default NoticesListPage;
