'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import UserTableContainer from '@/_components/user/common/containers/UserTableContainer';
import UserTableHeaderModule from '@/_components/user/common/modules/UserTableHeaderModule';
import UserTableHeaderAtom from '@/_components/user/common/atoms/UserTableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import { penaltyList } from '@/_types/adminType';
import dayjs from 'dayjs';
import UserTableBodyModule from '@/_components/common/modules/TableBodyModule';
import UserTableBodyAtom from '@/_components/user/common/atoms/UserTableBodyAtom';
import { useGetMemberPenaltyHistoryQuery } from '@/_hooks/admin/useGetMemberPenaltyHistoryQuery';

const calculateExpiryDate = (penaltyDate: string, index: number) => {
  const penaltyDateObj = dayjs(penaltyDate);
  if (index === 0) {
    return `${penaltyDateObj.add(6, 'month').format('YYYY.MM.DD')}까지`;
  }
  if (index === 1) {
    return `${penaltyDateObj.add(12, 'month').format('YYYY.MM.DD')}까지`;
  }
  return '영구정지';
};

const UserPenaltyPage = () => {
  const session = useSession();
  const accountId = String(session.data?.accountId || '');

  const { data, isLoading, isError } = useGetMemberPenaltyHistoryQuery({
    accountId,
  });

  console.log('Penalty Infos:', data?.penaltyInfos);
  console.log('Is Loading:', isLoading);
  console.log('Is Error:', isError);

  const penaltyInfos = data?.penaltyInfos || [];
  const sortedPenaltyInfos = [...penaltyInfos].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  console.log('Sorted Penalty Infos:', sortedPenaltyInfos);

  return (
    <section className="px-40 pt-18">
      <div className="flex flex-col gap-y-14">
        <div className="flex justify-between">
          <h2 className="text-h2 font-semibold">페널티 내역</h2>
        </div>

        <UserTableContainer>
          <UserTableHeaderModule>
            <UserTableHeaderAtom isFirst width="160px" text="번호" />
            <UserTableHeaderAtom text="워케이션" />
            <UserTableHeaderAtom text="사유" />
            <UserTableHeaderAtom isLast width="200px" text="페널티 기간" />
          </UserTableHeaderModule>

          <tbody>
            {sortedPenaltyInfos.length === 0 ? (
              <EmptyContainer colSpan={6} text="데이터가 없습니다" />
            ) : (
              [...sortedPenaltyInfos].reverse().map((item, index) => {
                const expiryDate = calculateExpiryDate(
                  item.createdAt,
                  sortedPenaltyInfos.length - 1 - index,
                );
                return (
                  <UserTableBodyModule key={item.createdAt}>
                    <UserTableBodyAtom isFirst>
                      {sortedPenaltyInfos.length - index}
                    </UserTableBodyAtom>
                    <UserTableBodyAtom>{item.wktName}</UserTableBodyAtom>
                    <UserTableBodyAtom>
                      {penaltyList[item.penaltyType]}
                    </UserTableBodyAtom>
                    <UserTableBodyAtom isLast>{expiryDate}</UserTableBodyAtom>
                  </UserTableBodyModule>
                );
              })
            )}
          </tbody>
        </UserTableContainer>
      </div>
      <div className="mt-5xl flex w-full flex-col gap-y-4 rounded-lg bg-[#F9F9F9] p-6">
        <p className="text-2 font-semibold text-sub-400">페널티 규정 안내</p>
        <p className="whitespace-pre-line">내용은 추후 추가 예정 ...</p>
      </div>
    </section>
  );
};

export default UserPenaltyPage;
