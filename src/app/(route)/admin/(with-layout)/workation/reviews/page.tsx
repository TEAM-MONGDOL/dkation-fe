'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import { useState } from 'react';
import TableContainer from '@/_components/common/containers/TableContainer';
import { useRouter } from 'next/navigation';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import ShowDetailButtonAtom from '@/_components/common/atoms/ShowDetailButtonAtom';
import RadioButtonContainer from '@/_components/common/containers/RadioButtonContainer';
import { reviewOrderList } from '@/_types/adminType';
import CheckboxContainer from '@/_components/common/containers/CheckboxContainer';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';
import RangeContainer from '@/_components/common/containers/RangeContainer';
import { useGetWkReviewListQuery } from '@/_hooks/admin/useGetWkReviewListQuery';

// 워케이션 장소 목록 api가져와서 변경
const placeOrderList = {
  '201': 'Region 1',
  '202': 'Region 2',
};
const AdminWorkationReviewsPage = () => {
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const router = useRouter();
  const onClickRowDetail = (id: number) => {
    router.push(`/admin/workation/reviews/${id}`);
  };
  const handleFilteringBar = () => {
    setIsFilteringBarOpen(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [param, setParam] = useState<{
    order: string;
    type: string[];
    startPoint: number;
    endPoint: number;
  }>({
    order: 'RECENT',
    type: Object.keys(placeOrderList),
    startPoint: 0,
    endPoint: 5,
  });

  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'RECENT',
      type: Object.keys(placeOrderList),
    });
  };
  const { data, isLoading, isError } = useGetWkReviewListQuery({
    wktPlaceFilter: param.type.join(','),
    minRating: param.startPoint,
    maxRating: param.endPoint,
    pageParam: {
      page: currentPage,
      size: 10,
      // sort: param.order,
    },
  });
  return (
    <div className="flex flex-col">
      <div className="mb-9 flex items-center justify-between">
        <TitleBarModule title="워케이션 후기" />
        <FilteringButtonAtom onClick={handleFilteringBar} />
      </div>
      <TableContainer>
        <TableHeaderModule>
          <TableHeaderAtom width="80px" isFirst>
            번호
          </TableHeaderAtom>
          <TableHeaderAtom width="150px">평점</TableHeaderAtom>
          <TableHeaderAtom>워케이션</TableHeaderAtom>
          <TableHeaderAtom width="100px">작성자</TableHeaderAtom>
          <TableHeaderAtom width="150px">등록일</TableHeaderAtom>
          <TableHeaderAtom width="100px">상태</TableHeaderAtom>
          <TableHeaderAtom width="160px" isLast />
        </TableHeaderModule>
        <tbody>
          {!data ? (
            isLoading ? (
              <EmptyContainer colSpan={7} text="loading" />
            ) : (
              <EmptyContainer colSpan={7} text="no data" />
            )
          ) : data.pageInfo.totalElements <= 0 ? (
            <EmptyContainer colSpan={7} />
          ) : (
            data.reviewList.map((item) => (
              <TableBodyModule key={item.id}>
                <TableBodyAtom isFirst>{item.id + 1}</TableBodyAtom>
                <TableBodyAtom>{item.rating}</TableBodyAtom>
                <TableBodyAtom>{item.wktPlace}</TableBodyAtom>
                <TableBodyAtom>{item.reviewer}</TableBodyAtom>
                <TableBodyAtom>
                  {item.lastModifiedAt.slice(0, 10)}
                </TableBodyAtom>
                <TableBodyAtom
                  color={item.blindedType ? 'text-positive' : 'text-negative'}
                >
                  {item.blindedType ? '등록' : '블라인드'}
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
      {data && data.pageInfo.totalPages > 0 && (
        <div className="mt-6 flex justify-center">
          <PaginationModule
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={1}
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
          options={Object.entries(reviewOrderList) as [string, string][]}
          selectedOption={param.order}
          setSelectedOption={(order: string) => setParam({ ...param, order })}
        />
        <hr />
        <CheckboxContainer
          title="지역"
          options={Object.entries(placeOrderList) as [string, string][]}
          selectedOptions={param.type}
          setSelectedOptions={(type: string[]) => setParam({ ...param, type })}
        />
        <hr />
        <RangeContainer
          onChange={({ min, max }) =>
            setParam({ ...param, startPoint: min, endPoint: max })
          }
          title="평점"
          min={0}
          max={5}
        />
      </FilteringBarContainer>
    </div>
  );
};

export default AdminWorkationReviewsPage;
