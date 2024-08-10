'use client';

import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import UserTableHeaderAtom from '@/_components/user/common/atoms/UserTableHeaderAtom';
import UserTableBodyAtom from '@/_components/user/common/atoms/UserTableBodyAtom';
import UserTableBodyModule from '@/_components/user/common/modules/UserTableBodyModule';
import UserTableContainer from '@/_components/user/common/containers/UserTableContainer';
import UserTableHeaderModule from '@/_components/user/common/modules/UserTableHeaderModule';
import { useGetPointPolicyQuery } from '@/_hooks/admin/useGetPointPolicyQuery';
import { useState } from 'react';
import Image from 'next/image';
import { DownArrowIcon } from '@/_assets/icons';
import { dateConverter } from '@/_types/converter';
import PaginationModule from '@/_components/common/modules/PaginationModule';

const PointsPolicyPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetPointPolicyQuery({
    pageable: {
      page: currentPage,
      size: 5,
      sort: 'lastModifiedAt,DESC',
    },
  });
  return (
    <section className="flex w-full flex-col gap-y-14 px-40 pb-20 pt-18">
      <h2 className="text-h2 font-semibold text-sub-400">포인트 정책</h2>
      <div className="flex w-full flex-col gap-y-[200px]">
        <div className="flex w-full flex-col gap-y-2.5">
          <div className="flex h-10 w-full items-center justify-center gap-x-7 bg-sub-100/20 px-6 text-center text-4 text-sub-300">
            <p className="w-[60px]">번호</p>
            <p className="grow">분류</p>
            <p className="w-40">점수</p>
            <p className="w-36">등록 일시</p>
          </div>
        </div>
        <UserTableContainer>
          <UserTableHeaderModule>
            <UserTableHeaderAtom isFirst text="번호" width="200px" />
            <UserTableHeaderAtom text="분류" />
            <UserTableHeaderAtom text="점수" width="200px" />
            <UserTableHeaderAtom text="등록 일시" width="250px" />
            <UserTableHeaderAtom isLast text="" width="100px" />
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
            ) : data.pointPolicyList.length < 1 ? (
              <EmptyContainer colSpan={5} />
            ) : (
              data.pointPolicyList.map((item, idx) => (
                <UserTableBodyModule key={item.id}>
                  <UserTableBodyAtom isFirst>
                    {(currentPage - 1) * 5 + idx + 1}
                  </UserTableBodyAtom>
                  <UserTableBodyAtom>{item.policyTitle}</UserTableBodyAtom>
                  <UserTableBodyAtom>
                    {item.quantity.toLocaleString()}
                  </UserTableBodyAtom>
                  <UserTableBodyAtom>
                    {dateConverter(item.modifiedAt)}
                  </UserTableBodyAtom>
                  <UserTableBodyAtom isLast>
                    <Image
                      src={DownArrowIcon}
                      alt="downArrow"
                      className="ml-2 transition-transform duration-300"
                    />
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

export default PointsPolicyPage;
