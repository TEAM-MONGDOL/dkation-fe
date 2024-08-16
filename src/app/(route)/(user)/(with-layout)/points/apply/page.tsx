'use client';

import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import UserTableBodyAtom from '@/_components/user/common/atoms/UserTableBodyAtom';
import UserTableHeaderAtom from '@/_components/user/common/atoms/UserTableHeaderAtom';
import UserTableContainer from '@/_components/user/common/containers/UserTableContainer';
import UserTableBodyModule from '@/_components/user/common/modules/UserTableBodyModule';
import UserTableHeaderModule from '@/_components/user/common/modules/UserTableHeaderModule';
import { dateConverter } from '@/_types/converter';

import { useGetPointApply } from '@/_hooks/admin/useGetPointApply';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import PositiveLabel from '@/_components/user/points/PositiveLabel';
import NegativeLabel from '@/_components/user/points/NegativeLabel';
import PendingLabel from '@/_components/user/points/PendingLabel';
import Image from 'next/image';
import { UserShowDetailButtonIcon } from '@/_assets/icons';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import { useRouter } from 'next/navigation';

const PointsApplyPage = () => {
  const session = useSession();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetPointApply({
    params: {
      accountId: session.data?.accountId.toString() || undefined,
    },
    pageable: {
      page: currentPage,
      size: 10,
      sort: 'lastModifiedAt,DESC',
    },
    enable: !!session.data?.accountId,
  });
  return (
    <section className="flex w-full flex-col gap-y-14 px-40 pb-20 pt-18">
      <h2 className="text-h2 font-semibold text-sub-400">포인트 신청 내역</h2>
      <div className="flex w-full flex-col">
        <UserTableContainer>
          <UserTableHeaderModule>
            <UserTableHeaderAtom isFirst text="번호" width="100px" />
            <UserTableHeaderAtom text="구분" />
            <UserTableHeaderAtom text="신청 일시" width="200px" />
            <UserTableHeaderAtom text="상태" width="150px" />
            <UserTableHeaderAtom isLast text="" width="80px" />
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
            ) : data.pointApplyInfos.length < 1 ? (
              <EmptyContainer colSpan={5} />
            ) : (
              data.pointApplyInfos.map((item, idx) => (
                <UserTableBodyModule key={item.pointApplyId}>
                  <UserTableBodyAtom isFirst>
                    {(currentPage - 1) * 10 + idx + 1}
                  </UserTableBodyAtom>
                  <UserTableBodyAtom>{item.pointTitle}</UserTableBodyAtom>
                  <UserTableBodyAtom>
                    {dateConverter(item.applyTime)}
                  </UserTableBodyAtom>
                  <UserTableBodyAtom>
                    {item.applyType === 'APPROVED' ? (
                      <PositiveLabel text="승인" />
                    ) : item.applyType === 'DECLINED' ? (
                      <NegativeLabel text="반려" />
                    ) : (
                      <PendingLabel text="대기중" />
                    )}
                  </UserTableBodyAtom>
                  <UserTableBodyAtom isLast>
                    <Image
                      className="cursor-pointer"
                      src={UserShowDetailButtonIcon}
                      alt="상세보기"
                      onClick={() => {
                        router.push(`/points/apply/${item.pointApplyId}`);
                      }}
                    />
                  </UserTableBodyAtom>
                </UserTableBodyModule>
              ))
            )}
          </tbody>
        </UserTableContainer>
        <div className="mt-6 flex w-full items-center justify-end">
          <UserButtonAtom
            buttonStyle="black"
            size="md"
            text="포인트 신청하기"
            type="button"
            className="rounded-lg"
            onClick={() => router.push('/points/apply/new')}
          />
        </div>
        {data && data.pageInfo.totalElements > 0 && (
          <div className="mt-[200px] flex w-full items-center justify-center">
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

export default PointsApplyPage;
