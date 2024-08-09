'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import UserFilteringSectionContainer from '@/_components/user/common/containers/UserFilteringSectionContainer';
import UserStateFilteringContainer from '@/_components/user/common/containers/UserStateFilteringContainer';
import UserPlaceFilteringContainer from '@/_components/user/common/containers/UserPlaceFilteringContainer';
import WorkationCard from '@/_components/user/mypage/UserWktCard';
import { useGetMyWktHistoryQuery } from '@/_hooks/user/useGetMyWktHistoryQuery';
import UserWktCancelModal from '@/_components/user/mypage/UserWktCancelModal';

const UserWkHistoryPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [param, setParam] = useState<{
    order: string;
    type: string[];
  }>({
    order: 'DESC',
    type: [
      'APPLIED',
      'RAFFLE_WAIT',
      'NO_WINNING',
      'CONFIRM_WAIT',
      'CANCEL',
      'CONFIRM',
      'WAIT',
      'VISITED',
    ],
  });

  const [isFilteringSectionOpen, setIsFilteringSectionOpen] = useState<
    'FILTER' | 'ORDER' | null
  >(null);
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedOrder, setSelectedOrder] = useState<string>('createdAt,DESC');
  const [selectedSpace, setSelectedSpace] = useState<string[]>(['양양 쏠비치']);

  // 모달 상태 관리
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);

  const { data, isLoading, isError } = useGetMyWktHistoryQuery({
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

  const handleCardClick = (applyStatusType: string) => {
    switch (applyStatusType) {
      case 'APPLIED':
        setIsCancelModalOpen(true);
        break;
      case 'CONFIRM_WAIT':
        console.log('방문 확정하기 클릭');
        break;
      case 'VISITED':
        router.push('/mypage/review/new');
        break;
      default:
        break;
    }
  };

  const handleCancelConfirm = () => {
    alert('워케이션 신청이 취소되었습니다.');
    setIsCancelModalOpen(false);
  };

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
        {data?.applyInfoList.length === 0 ? (
          <p>등록된 워케이션이 없습니다.</p>
        ) : (
          data?.applyInfoList.map((wkt) => (
            <WorkationCard
              key={wkt.wktName}
              thumbnailUrl={wkt.thumbnailUrl}
              wktName={wkt.wktName}
              place={wkt.place}
              totalRecruit={wkt.totalRecruit}
              applyStartDate={wkt.applyStartDate}
              applyEndDate={wkt.applyEndDate}
              startDate={wkt.startDate}
              endDate={wkt.endDate}
              bettingPoint={wkt.bettingPoint}
              applyStatusType={wkt.applyStatusType}
              waitingNumber={4} // Adjust as needed
              onClick={handleCardClick}
            />
          ))
        )}
      </div>

      {isCancelModalOpen && (
        <UserWktCancelModal
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={handleCancelConfirm}
        />
      )}
    </section>
  );
};

export default UserWkHistoryPage;
