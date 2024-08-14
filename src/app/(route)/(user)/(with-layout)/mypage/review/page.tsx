'use client';

import React, { useState } from 'react';
import UserTableContainer from '@/_components/user/common/containers/UserTableContainer';
import UserTableHeaderModule from '@/_components/user/common/modules/UserTableHeaderModule';
import UserTableHeaderAtom from '@/_components/user/common/atoms/UserTableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import UserTableBodyModule from '@/_components/common/modules/TableBodyModule';
import UserTableBodyAtom from '@/_components/user/common/atoms/UserTableBodyAtom';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import dayjs from 'dayjs';
import UserShowDetailButtonAtom from '@/_components/user/common/atoms/UserShowDetailButtonAtom';
import { useRouter } from 'next/navigation';
import { useGetMyReviewQuery } from '@/_hooks/user/useGetMyReviewQuery';

const UserMyReviewPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const { data, isLoading, isError } = useGetMyReviewQuery({
    pageParam: {
      page: currentPage,
      size: 10,
      sort: `lastModifiedAt,DESC`,
    },
  });

  const reviewInfos = data?.reviewInfosForMe || [];

  return (
    <section className="px-40 pt-18">
      <div className="flex flex-col gap-y-14">
        <div className="flex justify-between">
          <h2 className="text-h2 font-semibold">내가 쓴 후기</h2>
        </div>

        <UserTableContainer>
          <UserTableHeaderModule>
            <UserTableHeaderAtom isFirst width="160px" text="번호" />
            <UserTableHeaderAtom text="제목" />
            <UserTableHeaderAtom text="작성일" />
            <UserTableHeaderAtom isLast width="200px" text="" />
          </UserTableHeaderModule>

          <tbody>
            {!data ? (
              isLoading ? (
                <EmptyContainer colSpan={4} text="loading" />
              ) : (
                <EmptyContainer colSpan={4} text="error" />
              )
            ) : data.pageInfo.totalElements <= 0 ? (
              <EmptyContainer colSpan={4} />
            ) : (
              [...reviewInfos].reverse().map((item, index) => (
                <UserTableBodyModule key={item.id}>
                  <UserTableBodyAtom isFirst>
                    {reviewInfos.length - index}
                  </UserTableBodyAtom>
                  <UserTableBodyAtom>{item.wktTitle}</UserTableBodyAtom>
                  <UserTableBodyAtom>
                    {dayjs(item.lastModifiedAt).format('YYYY.MM.DD')}
                  </UserTableBodyAtom>
                  <UserTableBodyAtom isLast>
                    <UserShowDetailButtonAtom
                      onClick={() => router.push(`/mypage/review/${item.id}`)}
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
            user
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={data.pageInfo.totalPages}
          />
        </div>
      )}
    </section>
  );
};

export default UserMyReviewPage;
