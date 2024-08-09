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

const data = {
  reviewInfosForMe: [
    {
      id: 1,
      wktTitle: '후기 1',
      lastModifiedAt: '2024-01-07T21:40:38.658Z',
    },
    {
      id: 2,
      wktTitle: '후기 2',
      lastModifiedAt: '2024-02-20T15:30:00.000Z',
    },
    {
      id: 3,
      wktTitle: '후기 3',
      lastModifiedAt: '2024-03-15T09:25:12.000Z',
    },
    {
      id: 4,
      wktTitle: '후기 4',
      lastModifiedAt: '2024-04-10T11:50:30.000Z',
    },
  ],
  pageInfo: {
    pageNum: 0,
    pageSize: 10,
    totalElements: 4,
    totalPages: 1,
  },
};

const UserMyReviewPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewInfos = data?.reviewInfosForMe || [];
  const router = useRouter();

  let isLoading; // 추후 api 연결시 삭제 예정
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
