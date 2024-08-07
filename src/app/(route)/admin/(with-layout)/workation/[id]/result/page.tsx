'use client';

import React, { useState } from 'react';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import Image from 'next/image';
import { ExtensionIcon } from '@/_assets/icons';
import TableContainer from '@/_components/common/containers/TableContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import RadioButtonContainer from '@/_components/common/containers/RadioButtonContainer';
import { resultList } from '@/_types/adminType';
import CheckboxContainer from '@/_components/common/containers/CheckboxContainer';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';
import RangeContainer from '@/_components/common/containers/RangeContainer';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import WkResultSide from '@/(route)/admin/(with-layout)/workation/[id]/result/wkResultSide';
import { useGetWkResultQuery } from '@/_hooks/admin/useGetWkResultQuery';

interface WkResultProps {
  params: { id: number };
}
//
// const data = [
//   {
//     id: 1,
//     이름: '홍길동',
//     아이디: 'hong.gil',
//     소속: '개발팀',
//     확률: { text: '3.8%', color: 'text-primaryDark' },
//     상태: { text: '미당첨', color: 'text-gray' },
//   },
//   {
//     id: 2,
//     이름: '홍길동',
//     아이디: 'hong.gil',
//     소속: '개발팀',
//     확률: { text: '3.8%', color: 'text-primaryDark' },
//     상태: { text: '당첨취소', color: 'text-negative' },
//   },
//   {
//     id: 3,
//     이름: '홍길동',
//     아이디: 'hong.gil',
//     소속: '개발팀',
//     확률: { text: '3.8%', color: 'text-primaryDark' },
//     상태: { text: '당첨확정', color: 'text-[#008726]' },
//   },
// ];
const AdminWorkationListResultPage = ({ params }: WkResultProps) => {
  const { id } = params;
  const { data, isLoading, isError } = useGetWkResultQuery({ wktId: id });
  if (isLoading) {
    return <div>Loading...</div>; // 로딩컴포넌트 추가시 변경예정
  }
  if (isError) {
    return <div>Error loading data</div>; // 에러컴포넌트 추가시 변경예정
  }
  if (!data) {
    return <div>No data</div>;
  }
  return (
    <section className="flex">
      <WkResultSide id={id} />
      <div className="w-full">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2">
            <Image src={ExtensionIcon} alt="ResultIcon" />
            <p className="text-h3 font-bold">추첨 결과</p>
          </div>
        </div>
        <TableContainer>
          <TableHeaderModule>
            <TableHeaderAtom width="80px" isFirst>
              번호
            </TableHeaderAtom>
            <TableHeaderAtom width="130px">이름</TableHeaderAtom>
            <TableHeaderAtom>아이디</TableHeaderAtom>
            <TableHeaderAtom>소속</TableHeaderAtom>
            <TableHeaderAtom width="100px">확률</TableHeaderAtom>
            <TableHeaderAtom width="130px" isLast>
              상태
            </TableHeaderAtom>
          </TableHeaderModule>
          <tbody>
            {data.wktWinningUserInfos.length <= 0 ? (
              <EmptyContainer colSpan={6} />
            ) : (
              data.wktWinningUserInfos.map((item, index) => (
                <TableBodyModule key={item.accountId}>
                  <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                  <TableBodyAtom>{item.name}</TableBodyAtom>
                  <TableBodyAtom>{item.accountId}</TableBodyAtom>
                  <TableBodyAtom>{item.department}</TableBodyAtom>
                  <TableBodyAtom color="text-primaryDart">
                    {/* {item.확률.text} */}확률
                  </TableBodyAtom>
                  {/* <TableBodyAtom color={item.상태.color} isLast> */}
                  {/*  {item.상태.text} */}
                  {/* </TableBodyAtom> */}
                  <TableBodyAtom isLast>상태</TableBodyAtom>
                </TableBodyModule>
              ))
            )}
          </tbody>
        </TableContainer>
      </div>
    </section>
  );
};

export default AdminWorkationListResultPage;
