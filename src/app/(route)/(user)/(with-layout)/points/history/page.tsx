'use client';

import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import UserTableBodyAtom from '@/_components/user/common/atoms/UserTableBodyAtom';
import UserTableHeaderAtom from '@/_components/user/common/atoms/UserTableHeaderAtom';
import UserTableContainer from '@/_components/user/common/containers/UserTableContainer';
import UserTableBodyModule from '@/_components/user/common/modules/UserTableBodyModule';
import UserTableHeaderModule from '@/_components/user/common/modules/UserTableHeaderModule';
import NegativeLabel from '@/_components/user/points/NegativeLabel';
import PositiveLabel from '@/_components/user/points/PositiveLabel';
import { useGetMemberPointHistoryQuery } from '@/_hooks/admin/useGetMemberPointHistoryQuery';
import { dateConverter } from '@/_types/converter';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const PointsHistoryPage = () => {
  const session = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetMemberPointHistoryQuery({
    enable: !!session.data?.accountId,
    accountId: session.data?.accountId.toString() || undefined,
    pageParam: {
      page: currentPage,
      size: 6,
      sort: 'lastModifiedAt,DESC',
    },
  });
  return (
    <section className="flex w-full flex-col gap-y-14 px-40 pb-20 pt-18">
      <h2 className="text-h2 font-semibold text-sub-400">포인트 사용 내역</h2>
      <div className="flex w-full flex-col gap-y-[200px]">
        <UserTableContainer>
          <UserTableHeaderModule>
            <UserTableHeaderAtom isFirst text="번호" width="200px" />
            <UserTableHeaderAtom text="사유" />
            <UserTableHeaderAtom text="일시" width="200px" />
            <UserTableHeaderAtom text="적립/사용" width="250px" />
            <UserTableHeaderAtom isLast text="잔여 포인트" width="200px" />
          </UserTableHeaderModule>
          <tbody>
            {!data ? (
              isLoading ? (
                <EmptyContainer colSpan={5} text="로딩 중..." />
              ) : isError ? (
                <EmptyContainer colSpan={5} text="에러 발생" />
              ) : (
                <EmptyContainer colSpan={5} text="데이터 없음" />
              )
            ) : data.pointInfos.length < 1 ? (
              <EmptyContainer colSpan={5} />
            ) : (
              data.pointInfos.map((item, idx) => (
                <UserTableBodyModule key={item.getTime}>
                  <UserTableBodyAtom isFirst>
                    {(currentPage - 1) * 6 + idx + 1}
                  </UserTableBodyAtom>
                  <UserTableBodyAtom>{item.pointTitle}</UserTableBodyAtom>
                  <UserTableBodyAtom>
                    {dateConverter(item.getTime)}
                  </UserTableBodyAtom>
                  <UserTableBodyAtom>
                    {item.usedPoint > 0 ? (
                      <PositiveLabel
                        text={`+${item.usedPoint.toLocaleString()}`}
                      />
                    ) : (
                      <NegativeLabel
                        text={`${item.usedPoint.toLocaleString()}`}
                      />
                    )}
                  </UserTableBodyAtom>
                  <UserTableBodyAtom isLast>
                    {item.totalPoint.toLocaleString()}
                  </UserTableBodyAtom>
                </UserTableBodyModule>
              ))
            )}
          </tbody>
        </UserTableContainer>
        {data && data.pageInfo.totalElements > 0 && (
          <div className="flex w-full items-center justify-center">
            <PaginationModule
              totalPages={data.pageInfo.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              user
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PointsHistoryPage;
