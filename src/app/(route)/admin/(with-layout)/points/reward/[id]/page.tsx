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
import { useGetPointSupplyDetailQuery } from '@/_hooks/admin/useGetPointSupplyDetailQuery';
import { pointSupplyTypeConvertList } from '@/_types/adminType';
import { useState } from 'react';

interface RewardDetailPageProps {
  params: {
    id: string;
  };
}

const AdminPointsRewardDetailPage = ({ params }: RewardDetailPageProps) => {
  const { id } = params;
  const { data, isLoading, isError } = useGetPointSupplyDetailQuery({
    supplyId: Number(id),
  });
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="flex w-full flex-col gap-y-10 overflow-y-auto">
      <TitleBarModule title="포인트 지급 내역 상세" type="LEFT" />
      {!data ? (
        isLoading ? (
          <p>로딩 중...</p>
        ) : isError ? (
          <p>에러 발생</p>
        ) : null
      ) : (
        <div className="flex w-full items-start gap-x-3xl">
          <div className="flex min-w-[400px] basis-1/3 flex-col gap-y-3xl">
            <InputModule
              subtitle="구분"
              value={
                pointSupplyTypeConvertList[
                  data.pointSupplyDetailInfo.pointSupplyType
                ]
              }
              onChange={() => {}}
              status="readonly"
            />
            <InputModule
              subtitle="분류"
              value={data.pointSupplyDetailInfo.pointTitle}
              onChange={() => {}}
              status="readonly"
            />
            <InputModule
              subtitle="지급일시"
              value={data.pointSupplyDetailInfo.supplyTime}
              onChange={() => {}}
              status="readonly"
            />
          </div>
          <div className="flex grow flex-col gap-y-4 rounded-regular border border-stroke-100 bg-cus-100 p-4">
            <h4 className="font-bold">
              지급대상 ({data.pointSupplyMemberList.length})
            </h4>
            <div className="flex w-full flex-col gap-y-10">
              {/* TODO : value, onChange, width 전달해야됨 */}
              {/* <SearchingBoxModule
                placeholder="이름을 검색하세요."
                onClick={() => {}}
                widthFull
              /> */}
              <TableContainer>
                <TableHeaderModule bgColor="bg-cus-100">
                  <TableHeaderAtom isFirst width="80px">
                    번호
                  </TableHeaderAtom>
                  <TableHeaderAtom>이름</TableHeaderAtom>
                  <TableHeaderAtom>소속</TableHeaderAtom>
                  <TableHeaderAtom isLast>아이디</TableHeaderAtom>
                </TableHeaderModule>
                <tbody>
                  {data.pointSupplyMemberList.length <= 0 ? (
                    <EmptyContainer colSpan={4} />
                  ) : (
                    data.pointSupplyMemberList
                      .slice(
                        (currentPage - 1) * 5,
                        Math.min(
                          data.pointSupplyMemberList.length,
                          (currentPage - 1) * 5 + 5,
                        ),
                      )
                      .map((user, idx) => (
                        <TableBodyModule key={user.accountId}>
                          <TableBodyAtom isFirst>{idx + 1}</TableBodyAtom>
                          <TableBodyAtom>{user.name}</TableBodyAtom>
                          <TableBodyAtom>{user.department}</TableBodyAtom>
                          <TableBodyAtom isLast>{user.accountId}</TableBodyAtom>
                        </TableBodyModule>
                      ))
                  )}
                </tbody>
              </TableContainer>
            </div>
            {data.pointSupplyMemberList.length > 0 && (
              <div className="flex w-full items-center justify-center">
                <PaginationModule
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={Math.ceil(data.pointSupplyMemberList.length / 5)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminPointsRewardDetailPage;
