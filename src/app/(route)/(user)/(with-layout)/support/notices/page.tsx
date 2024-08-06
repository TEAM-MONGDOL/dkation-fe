'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UserTableContainer from '@/_components/user/common/containers/UserTableContainer';
import UserTableHeaderModule from '@/_components/user/common/modules/UserTableHeaderModule';
import UserTableHeaderAtom from '@/_components/user/common/atoms/UserTableHeaderAtom';
import UserTableBodyModule from '@/_components/user/common/modules/UserTableBodyModule';
import UserTableBodyAtom from '@/_components/user/common/atoms/UserTableBodyAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import UserShowDetailButtonAtom from '@/_components/user/common/atoms/UserShowDetailButtonAtom';
import UserTextLabelAtom from '@/_components/user/common/atoms/UserTextLabelAtom';
import { noticeTypeConverter } from '@/_types/adminType';
import UserFilteringSectionContainer from '@/_components/user/common/containers/UserFilteringSectionContainer';
import UserStateFilteringContainer from '@/_components/user/common/containers/UserStateFilteringContainer';
import { useGetNoticeListQuery } from '@/_hooks/admin/useGetNoticeListQuery';
import dayjs from 'dayjs';

const getCategoryStyle = (category: string) => {
  switch (category) {
    case 'ANNOUNCEMENT':
      return 'bg-sub-400 text-white';
    case 'EVENT':
      return 'bg-primary/10 text-primary';
    case 'RESULT':
      return 'bg-negative/10 text-negative';
    default:
      return '';
  }
};

const UserNoticePage = () => {
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
    <section className="pt-18 px-40">
      <div className="flex flex-col gap-y-14">
        <div className="flex justify-between">
          <h2 className="text-h2 font-semibold">공지사항</h2>
          <UserFilteringSectionContainer
            filterOption={{
              type: 'NOTICE',
              onClickFilter: () =>
                setIsFilteringSectionOpen(
                  isFilteringSectionOpen === 'FILTER' ? null : 'FILTER',
                ),
              isFilterOpen: isFilteringSectionOpen === 'FILTER',
              filterChildren: (
                <UserStateFilteringContainer
                  type="NOTICE"
                  selectedOption={selectedState}
                  onClickOption={setSelectedState}
                />
              ),
              onRefresh: () => console.log('refresh'),
            }}
            orderOption={{
              onClickOrder: () =>
                setIsFilteringSectionOpen(
                  isFilteringSectionOpen === 'ORDER' ? null : 'ORDER',
                ),
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

        <UserTableContainer>
          <UserTableHeaderModule>
            <UserTableHeaderAtom isFirst width="120px" text="번호" />
            <UserTableHeaderAtom width="180px" text="구분" />
            <UserTableHeaderAtom text="제목" />
            <UserTableHeaderAtom width="200px" text="등록 일시" />
            <UserTableHeaderAtom isLast width="140px" text="" />
          </UserTableHeaderModule>

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
                <UserTableBodyModule key={item.id}>
                  <UserTableBodyAtom isFirst>{index + 1}</UserTableBodyAtom>
                  <UserTableBodyAtom>
                    <UserTextLabelAtom
                      text={noticeTypeConverter[item.announcementType]}
                      size="sm"
                      className={getCategoryStyle(item.announcementType)}
                    />
                  </UserTableBodyAtom>
                  <UserTableBodyAtom>{item.title}</UserTableBodyAtom>
                  <UserTableBodyAtom>
                    {dayjs(item.createdAt).format('YYYY.MM.DD')}
                  </UserTableBodyAtom>
                  <UserTableBodyAtom isLast>
                    <UserShowDetailButtonAtom
                      onClick={() => router.push(`/support/notices/${item.id}`)}
                    />
                  </UserTableBodyAtom>
                </UserTableBodyModule>
              ))
            )}
          </tbody>
        </UserTableContainer>
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

export default UserNoticePage;
