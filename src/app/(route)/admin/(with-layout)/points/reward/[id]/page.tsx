'use client';

import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import TableContainer from '@/_components/common/containers/TableContainer';
import InputModule from '@/_components/common/modules/InputModule';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import SearchingBoxModule from '@/_components/common/modules/SearchingBoxModule';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { useState } from 'react';

const data = {
  id: 1,
  구분: { text: '개인', color: 'red' },
  분류: '자기계발',
  이름: '김철수',
  지급일: '2024-07-20',
  포인트: 100,
};

const users: {
  id: number;
  이름: string;
  소속: string;
  아이디: string;
}[] = [
  {
    id: 1,
    이름: '김철수',
    소속: '개발팀',
    아이디: 'chulsu',
  },
  {
    id: 1,
    이름: '김철수',
    소속: '개발팀',
    아이디: 'chulsu',
  },
  {
    id: 1,
    이름: '김철수',
    소속: '개발팀',
    아이디: 'chulsu',
  },
  {
    id: 1,
    이름: '김철수',
    소속: '개발팀',
    아이디: 'chulsu',
  },
  {
    id: 1,
    이름: '김철수',
    소속: '개발팀',
    아이디: 'chulsu',
  },
  {
    id: 1,
    이름: '김철수',
    소속: '개발팀',
    아이디: 'chulsu',
  },
  {
    id: 1,
    이름: '김철수',
    소속: '개발팀',
    아이디: 'chulsu',
  },
];

const AdminPointsRewardDetailPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="flex w-full flex-col gap-y-10 overflow-y-auto">
      {/* TODO : Left onClick에 -1 적용 필요 */}
      <TitleBarModule title="포인트 지급 내역 상세" type="LEFT" />
      <div className="flex w-full items-start gap-x-[30px]">
        <div className="flex min-w-[400px] basis-1/3 flex-col gap-y-[30px]">
          {/* TODO : InputModule에 Readonly 필요, gap 추가 필요 */}
          <InputModule
            subtitle="구분"
            value={data['구분'].text}
            onChange={() => {}}
            status="readonly"
          />
          <InputModule
            subtitle="분류"
            value={data['분류']}
            onChange={() => {}}
            status="readonly"
          />
          <InputModule
            subtitle="지급일시"
            value={data['지급일']}
            onChange={() => {}}
            status="readonly"
          />
        </div>
        <div className="flex grow flex-col gap-y-4 rounded-regular border border-stroke-100 bg-cus-100 p-4">
          <h4 className="font-bold">지급대상 ({users.length})</h4>
          <div className="flex w-full flex-col gap-y-10">
            {/* TODO : value, onChange, width 전달해야됨 */}
            <SearchingBoxModule
              placeholder="이름을 검색하세요."
              onClick={() => {}}
              widthFull
            />
            <TableContainer>
              <TableHeaderModule bgColor="bg-cus-100">
                <TableHeaderAtom width="100px">번호</TableHeaderAtom>
                <TableHeaderAtom>이름</TableHeaderAtom>
                <TableHeaderAtom>소속</TableHeaderAtom>
                <TableHeaderAtom width="120px">아이디</TableHeaderAtom>
              </TableHeaderModule>
              <tbody>
                {users.length <= 0 ? (
                  <EmptyContainer colSpan={4} />
                ) : (
                  users
                    .slice(
                      (currentPage - 1) * 5,
                      Math.min(users.length, (currentPage - 1) * 5 + 5),
                    )
                    .map((user, idx) => (
                      <TableBodyModule key={user.id}>
                        <TableBodyAtom isFirst>{idx + 1}</TableBodyAtom>
                        <TableBodyAtom>{user['이름']}</TableBodyAtom>
                        <TableBodyAtom>{user['소속']}</TableBodyAtom>
                        <TableBodyAtom isLast>{user['아이디']}</TableBodyAtom>
                      </TableBodyModule>
                    ))
                )}
              </tbody>
            </TableContainer>
          </div>
          {users.length > 0 && (
            <div className="flex w-full items-center justify-center">
              <PaginationModule
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={Math.ceil(users.length / 5)}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminPointsRewardDetailPage;
