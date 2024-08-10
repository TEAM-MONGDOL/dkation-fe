'use client';

import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import UserTableHeaderAtom from '@/_components/user/common/atoms/UserTableHeaderAtom';
import UserTableContainer from '@/_components/user/common/containers/UserTableContainer';
import UserTableHeaderModule from '@/_components/user/common/modules/UserTableHeaderModule';
import { useState } from 'react';

const PointsHistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="flex w-full flex-col gap-y-14 px-40 pb-20 pt-18">
      <h2 className="text-h2 font-semibold text-sub-400">포인트 사용 내역</h2>
      <div className="flex w-full flex-col gap-y-[200px]">
        <UserTableContainer>
          <UserTableHeaderModule>
            <UserTableHeaderAtom isFirst text="번호" width="200px" />
            <UserTableHeaderAtom text="사유" />
            <UserTableHeaderAtom text="적립/사용" width="300px" />
            <UserTableHeaderAtom isLast text="잔여 포인트" width="200px" />
          </UserTableHeaderModule>
          <tbody>
            <EmptyContainer colSpan={4} />
          </tbody>
        </UserTableContainer>
        <div className="flex w-full items-center justify-center">
          <PaginationModule
            totalPages={10}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            user
          />
        </div>
      </div>
    </div>
  );
};

export default PointsHistoryPage;
