'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetNoticeListQuery } from '@/_hooks/admin/useGetNoticeListQuery';
import dayjs from 'dayjs';
import UserFilteringSectionContainer from '@/_components/user/common/containers/UserFilteringSectionContainer';
import UserStateFilteringContainer from '@/_components/user/common/containers/UserStateFilteringContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import UserPlaceFilteringContainer from '@/_components/user/common/containers/UserPlaceFilteringContainer';
import WorkationCard from '@/_components/user/mypage/UserWktCard';
import place from '@/_assets/images/place_impy.png';

const UserWkHistoryPage = () => {
  const router = useRouter();
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

  const [isFilteringSectionOpen, setIsFilteringSectionOpen] = useState<
    'FILTER' | 'ORDER' | null
  >(null);
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<string>('createdAt,DESC');
  const [selectedSpace, setSelectedSpace] = useState<string[]>(['양양 쏠비치']);

  const { data, isLoading, isError } = useGetNoticeListQuery({
    types: param.noticeType.join(','),
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
    <section className="px-40 pt-18">
      <div className="flex flex-col gap-y-14">
        <div className="flex justify-end">
          <UserFilteringSectionContainer
            filterOption={{
              type: 'FILTER',
              onClickFilter: () => {
                setIsFilteringSectionOpen(
                  isFilteringSectionOpen === 'FILTER' ? null : 'FILTER',
                );
              },
              isFilterOpen: isFilteringSectionOpen === 'FILTER',
              filterChildren: (
                <>
                  <UserStateFilteringContainer
                    type="MYPAGE"
                    selectedOption={selectedState}
                    onClickOption={setSelectedState}
                  />
                  <UserPlaceFilteringContainer
                    places={['양양 쏠비치', '양양 쏠비치2', '양양 쏠비치3']}
                    clickedPlace={selectedSpace}
                    onClickPlace={setSelectedSpace}
                  />
                </>
              ),
              onRefresh: () => console.log('refresh'),
            }}
            orderOption={{
              onClickOrder: () => {
                setIsFilteringSectionOpen(
                  isFilteringSectionOpen === 'ORDER' ? null : 'ORDER',
                );
              },
              isOrderOpen: isFilteringSectionOpen === 'ORDER',
              orderProps: {
                orders: [
                  { key: 'createdAt,DESC', value: '최신순' },
                  { key: 'createdAt,ASC', value: '오래된순' },
                ],
                selectedOrder,
                setSelectedOrder,
              },
            }}
          />
        </div>
        <WorkationCard
          thumbnailUrl={place.src}
          wktName="2024년 7월 3주차 워케이션"
          place="양양"
          totalRecruit={2}
          applyStartDate="2024.07.01"
          applyEndDate="2024.07.15"
          startDate="2024.07.10"
          endDate="2024.07.12"
          bettingPoint={400}
          applyStatusType="APPLIED"
          waitingNumber={4}
        />
      </div>
      {data && data.pageInfo.totalElements > 0 && (
        <div className="mt-40 flex justify-center">
          <PaginationModule
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={data.pageInfo.totalPages}
          />
        </div>
      )}
    </section>
  );
};

export default UserWkHistoryPage;
