'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { usePatchWktStatusMutation } from '@/_hooks/user/usePatchWktStatusMutation';
import UserFilteringSectionContainer from '@/_components/user/common/containers/UserFilteringSectionContainer';
import UserStateFilteringContainer from '@/_components/user/common/containers/UserStateFilteringContainer';
import UserPlaceFilteringContainer from '@/_components/user/common/containers/UserPlaceFilteringContainer';
import WorkationCard from '@/_components/user/mypage/UserWktCard';
import { useGetMyWktHistoryQuery } from '@/_hooks/user/useGetMyWktHistoryQuery';
import UserWktCancelModal from '@/_components/user/mypage/UserWktCancelModal';
import UserWktConfirmModal from '@/_components/user/mypage/UserWktConfirmModal';
import { useDeleteWktApplyMutation } from '@/_hooks/user/useDeleteWktApplyMutation';
import { useSession } from 'next-auth/react';

const UserWkHistoryPage = () => {
  const router = useRouter();
  const session = useSession();
  const accountId = String(session.data?.accountId || '');
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
  const [selectedWorkationId, setSelectedWorkationId] = useState<number | null>(
    null,
  );

  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [confirmModalType, setConfirmModalType] = useState<
    | 'confirm'
    | 'cancel'
    | 'cancellationConfirmation'
    | 'acceptConfirmation'
    | null
  >(null);

  const { data, isLoading, isError } = useGetMyWktHistoryQuery({
    // statuses: param.type.join(','),
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

  const { mutate: patchWktStatus } = usePatchWktStatusMutation({
    wktId: selectedWorkationId || 0,
    successCallback: () => {},
    errorCallback: (error) => {
      alert(`에러가 발생했습니다 : ${error.message}`);
    },
  });

  const { mutate: deleteWktApply } = useDeleteWktApplyMutation({
    successCallback: () => {
      alert('신청이 취소되었습니다.');
      setIsCancelModalOpen(false);
    },
    errorCallback: (error) => {
      alert(`에러가 발생했습니다 : ${error.message}`);
    },
  });

  const handleCardClick = (applyStatusType: string, wktId: number) => {
    if (applyStatusType === 'APPLIED') {
      setSelectedWorkationId(wktId);
      setIsCancelModalOpen(true);
    } else if (applyStatusType === 'CONFIRM_WAIT') {
      setConfirmModalType('confirm');
      setSelectedWorkationId(wktId);
    } else if (applyStatusType === 'VISITED') {
      router.push(`/mypage/review/new?wktId=${wktId}`);
    }
  };

  const handleConfirm = () => {
    if (confirmModalType === 'confirm' && selectedWorkationId !== null) {
      patchWktStatus(
        { status: 'CONFIRM' },
        {
          onSuccess: () => setConfirmModalType('acceptConfirmation'),
        },
      );
    } else if (confirmModalType === 'cancel') {
      patchWktStatus(
        { status: 'CANCEL' },
        {
          onSuccess: () => setConfirmModalType('cancellationConfirmation'),
        },
      );
    }
  };

  const handleCancelConfirm = () => {
    if (selectedWorkationId !== null) {
      deleteWktApply(selectedWorkationId);
    }
    if (confirmModalType === 'cancel') {
      setConfirmModalType('cancellationConfirmation');
    } else {
      setIsCancelModalOpen(false);
    }
  };

  const handleCancelClick = () => {
    setConfirmModalType('cancel');
  };

  const handleCloseModal = () => {
    setIsCancelModalOpen(false);
    setConfirmModalType(null);
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
        {!data ? (
          isLoading ? (
            <p>loading ..</p>
          ) : (
            <p>error</p>
          )
        ) : data.pageInfo.totalElements <= 0 ? (
          <p>no data</p>
        ) : (
          data?.applyInfoList.map((wkt) => (
            <WorkationCard
              accountId={accountId}
              key={wkt.wktId}
              wktId={wkt.wktId}
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
              waitingNumber={4} // 수정 필요
              onClick={() => handleCardClick(wkt.applyStatusType, wkt.wktId)}
            />
          ))
        )}
      </div>

      {isCancelModalOpen && (
        <UserWktCancelModal
          onClose={handleCloseModal}
          onConfirm={handleCancelConfirm}
        />
      )}

      {confirmModalType && (
        <UserWktConfirmModal
          modalType={confirmModalType}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
          onCancel={handleCancelClick}
        />
      )}
    </section>
  );
};

export default UserWkHistoryPage;
