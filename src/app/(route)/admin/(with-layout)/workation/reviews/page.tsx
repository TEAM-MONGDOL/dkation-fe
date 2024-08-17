'use client';

import { useEffect, useMemo, useState } from 'react';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
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
import CheckboxContainer from '@/_components/common/containers/CheckboxContainer';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';
import RangeContainer from '@/_components/common/containers/RangeContainer';
import { useGetAdminWkReviewListQuery } from '@/_hooks/admin/useGetAdminWkReviewListQuery';
import { StarRateEmptyIcon, StarRateIcon } from '@/_assets/icons';
import Image from 'next/image';
import { reviewOrderList } from '@/_types/adminType';
import { useGetWkPlaceListQuery } from '@/_hooks/admin/useGetWkPlaceListQuery';

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
    order: 'DESC',
    type: [],
    startPoint: 0,
    endPoint: 5,
  });

  const getSortField = (order: string) => {
    if (order === 'STARASC' || order === 'STARDESC') {
      return `starRating,${order === 'STARASC' ? 'DESC' : 'ASC'}`;
    }
    return `lastModifiedAt,${order}`;
  };

  const { data, isLoading, isError } = useGetAdminWkReviewListQuery({
    wktPlaceFilter: param.type.length > 0 ? param.type.join(',') : undefined,
    minRating: param.startPoint,
    maxRating: param.endPoint,
    pageParam: {
      page: currentPage,
      size: 10,
      sort: getSortField(param.order),
    },
  });

  const {
    data: placeData,
    isLoading: isPlaceLoading,
    isError: isPlaceError,
  } = useGetWkPlaceListQuery({
    pageParam: {
      page: 1,
      size: 100,
    },
  });
  const placeOptions = useMemo(() => {
    return (
      placeData?.wktPlaceInfos.map((place) => ({
        id: place.id.toString(),
        place: place.place,
      })) || []
    );
  }, [placeData]);

  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'RECENT',
      type: placeOptions.map((option) => option.id),
    });
  };
  useEffect(() => {
    if (placeOptions.length > 0 && param.type.length === 0) {
      setParam((prevParam) => ({
        ...prevParam,
        type: placeOptions.map((option) => option.id),
      }));
    }
  }, [placeOptions]);

  return (
    <div className="flex flex-col">
      <div className="mb-9 flex items-center justify-between">
        <TitleBarModule title="워케이션 후기" />
        <FilteringButtonAtom onClick={handleFilteringBar} />
      </div>
      <TableContainer minWidth="1000px">
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
          {param.type.length === 0 ? (
            <EmptyContainer colSpan={7} />
          ) : !data ? (
            isLoading || isPlaceLoading ? (
              <EmptyContainer colSpan={7} text="loading" />
            ) : (
              <EmptyContainer colSpan={7} />
            )
          ) : data.pageInfo.totalElements <= 0 ? (
            <EmptyContainer colSpan={7} />
          ) : (
            data.reviewList.map((item, order) => (
              <TableBodyModule key={item.id}>
                <TableBodyAtom isFirst>{order + 1}</TableBodyAtom>
                <TableBodyAtom>
                  <div className="flex justify-center">
                    {[...Array(item.rating)].map((_, index) => (
                      <Image
                        key={item.id}
                        src={StarRateIcon}
                        alt="StarRateIcon"
                      />
                    ))}
                    {[...Array(5 - item.rating)].map((_, index) => (
                      <Image
                        key={item.id}
                        src={StarRateEmptyIcon}
                        alt="StarRateEmptyIcon"
                      />
                    ))}
                  </div>
                </TableBodyAtom>
                <TableBodyAtom>{item.wktPlace}</TableBodyAtom>
                <TableBodyAtom>{item.reviewer}</TableBodyAtom>
                <TableBodyAtom>
                  {item.lastModifiedAt.slice(0, 10)}
                </TableBodyAtom>
                <TableBodyAtom
                  color={
                    item.blindedType === 'TRUE'
                      ? 'text-negative'
                      : 'text-positive'
                  }
                >
                  {item.blindedType === 'TRUE' ? '블라인드' : '등록'}
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
      {param.type.length === 0 ||
        (data && data.pageInfo.totalPages > 0 && (
          <div className="mt-6 flex justify-center">
            <PaginationModule
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={1}
            />
          </div>
        ))}
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
          options={placeOptions.map(({ id, place }) => [id, place])}
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
