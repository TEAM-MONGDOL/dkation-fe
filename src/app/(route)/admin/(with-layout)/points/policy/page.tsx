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
import SearchingBoxModule from '@/_components/common/modules/SearchingBoxModule';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { orderList } from '@/_types/adminType';
import { DatePickerTagType } from '@/_types/commonType';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const headers = [
  { title: '번호', width: '120px' },
  { title: '분류', width: '200px' },
  { title: '포인트', width: '200px' },
  { title: '상세 내용', flexGrow: true },
  { title: '등록 일시', flexGrow: true },
  { title: '', width: '160px' },
];

const data = [
  {
    id: 1,
    분류: '토이프로젝트',
    포인트: 100,
    '상세 내용': '자기계발하면 줌',
    '등록 일시': '2024-07-20',
  },
  {
    id: 2,
    분류: '봉사활동',
    포인트: 200,
    '등록 일시': '2024-07-21',
    '상세 내용': '봉사하면 줌',
  },
  {
    id: 3,
    분류: '인강 완강',
    포인트: 300,
    '상세 내용': '공부하면 줌',
    '등록 일시': '2024-07-21',
  },
  {
    id: 4,
    분류: '사내 교육',
    포인트: 400,
    '상세 내용': '참여하면 줌',
    '등록 일시': '2024-07-21',
  },
];

const AdminPointsPolicyPage = () => {
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState<DatePickerTagType>('ALL');
  const [page, setPage] = useState(1);
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [param, setParam] = useState<{
    order: string;
    startPoint: number;
    endPoint: number;
    startDate: Date | null;
    endDate: Date | null;
  }>({
    order: 'RECENT',
    startPoint: 0,
    endPoint: 1100,
    startDate: null,
    endDate: null,
  });

  const refreshHandler = () => {
    setParam({
      order: 'RECENT',
      startPoint: 0,
      endPoint: 1100,
      startDate: null,
      endDate: null,
    });
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
          <TableHeaderAtom isFirst width="100px">
            번호
          </TableHeaderAtom>
          <TableHeaderAtom width="200px">분류</TableHeaderAtom>
          <TableHeaderAtom width="200px">포인트</TableHeaderAtom>
          <TableHeaderAtom>상세 내용</TableHeaderAtom>
          <TableHeaderAtom>등록 일시</TableHeaderAtom>
          <TableHeaderAtom isLast width="160px" />
        </TableHeaderModule>
        <tbody>
          {data.length < 1 ? (
            <EmptyContainer colSpan={6} />
          ) : (
            data.map((item, idx) => (
              <TableBodyModule key={item.id}>
                <TableBodyAtom isFirst>{idx + 1}</TableBodyAtom>
                <TableBodyAtom>{item.분류}</TableBodyAtom>
                <TableBodyAtom>{item.포인트}</TableBodyAtom>
                <TableBodyAtom>{item['상세 내용']}</TableBodyAtom>
                <TableBodyAtom>{item['등록 일시']}</TableBodyAtom>
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
        <PaginationModule
          currentPage={page}
          setCurrentPage={setPage}
          totalPages={Math.ceil(data.length / 10)}
        />
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
        <RangeContainer
          title="포인트 점수"
          min={0}
          max={1580}
          onChange={({ min, max }) =>
            setParam({ ...param, startPoint: min, endPoint: max })
          }
        />
        <DatePickerContainer
          title="등록일"
          startDate={param.startDate}
          setStartDate={(startDate) => setParam({ ...param, startDate })}
          endDate={param.endDate}
          setEndDate={(endDate) => setParam({ ...param, endDate })}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      </FilteringBarContainer>
    </div>
  );
};

export default AdminPointsPolicyPage;
