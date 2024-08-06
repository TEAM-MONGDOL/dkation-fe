'use client';

import { useState } from 'react';
import UserTableContainer from '@/_components/user/common/containers/UserTableContainer';
import UserTableHeaderModule from '@/_components/user/common/modules/UserTableHeaderModule';
import UserTableHeaderAtom from '@/_components/user/common/atoms/UserTableHeaderAtom';
import UserTableBodyModule from '@/_components/user/common/modules/UserTableBodyModule';
import UserTableBodyAtom from '@/_components/user/common/atoms/UserTableBodyAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import UserShowDetailButtonAtom from '@/_components/user/common/atoms/UserShowDetailButtonAtom';
import UserTextLabelAtom from '@/_components/user/common/atoms/UserTextLabelAtom';
import { noticeList } from '@/_types/adminType'; // Adjust the path as necessary

const data = [
  { id: 1, 구분: 'ANNOUNCEMENT', 제목: '공지사항', 작성일: '2024-08-01' },
  { id: 2, 구분: 'EVENT', 제목: '이벤트', 작성일: '2024-08-02' },
  { id: 3, 구분: 'RESULT', 제목: '결과', 작성일: '2024-08-03' },
];

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
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / 10);

  return (
    <section className="pt-18 px-40">
      <div className="flex flex-col gap-y-14">
        <h2 className="text-h2 font-semibold">공지사항</h2>
        <div>
          <UserTableContainer>
            <UserTableHeaderModule>
              <UserTableHeaderAtom isFirst width="120px" text="번호" />
              <UserTableHeaderAtom width="180px" text="구분" />
              <UserTableHeaderAtom text="제목" />
              <UserTableHeaderAtom width="200px" text="등록 일시" />
              <UserTableHeaderAtom isLast width="140px" text="" />
            </UserTableHeaderModule>

            <tbody>
              {data.length <= 0 ? (
                <EmptyContainer colSpan={5} />
              ) : (
                data.map((item, index) => (
                  <UserTableBodyModule key={item.id}>
                    <UserTableBodyAtom isFirst>{index + 1}</UserTableBodyAtom>
                    <UserTableBodyAtom>
                      <UserTextLabelAtom
                        text={noticeList[item.구분]}
                        size="sm"
                        className={getCategoryStyle(item.구분)}
                      />
                    </UserTableBodyAtom>
                    <UserTableBodyAtom>{item.제목}</UserTableBodyAtom>
                    <UserTableBodyAtom>{item.작성일}</UserTableBodyAtom>
                    <UserTableBodyAtom isLast>
                      <UserShowDetailButtonAtom />
                    </UserTableBodyAtom>
                  </UserTableBodyModule>
                ))
              )}
            </tbody>
          </UserTableContainer>
        </div>
      </div>
      <div className="mt-40 flex justify-center">
        <PaginationModule
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default UserNoticePage;
