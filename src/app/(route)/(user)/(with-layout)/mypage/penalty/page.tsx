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

  const penaltyInfos = data?.penaltyInfos || [];
  const sortedPenaltyInfos = [...penaltyInfos].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

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
            {!data ? (
              isLoading ? (
                <EmptyContainer colSpan={6} text="로딩 중입니다..." />
              ) : (
                <EmptyContainer colSpan={6} text="error" />
              )
            ) : data.penaltyAmount <= 0 ? (
              <EmptyContainer colSpan={6} />
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
        <div className="whitespace-pre-line">
          <p className="mb-2 text-2 font-semibold text-sub-400">
            페널티 규정 안내
          </p>
          서비스의 원활한 운영과 사용자 만족도를 높이기 위해 페널티 제도를
          시행하고 있습니다.
          <br />
          아래 조항에 따라 페널티가 부여되며, 이외에도 위법 또는 부당한 행위가
          의심되는 경우 페널티가 적용될 수 있습니다.
          <br />
          <br />
          <strong>[페널티 항목]</strong>
          <ul>
            <li>
              <strong>노쇼:</strong> 워케이션 방문 확정 후 불참
            </li>
            <li>
              <strong>협력체 신고:</strong> 제휴 워케이션 장소에서 신고 접수
            </li>
            <li>
              <strong>포인트 제도 악용:</strong> 포인트 제도를 부정하게 이용한
              경우
            </li>
            <li>
              <strong>근무 태만:</strong> 업무 불이행
            </li>
          </ul>
          <p className="text-sub-200">
            * 근무 태만은 팀원 또는 함께 워케이션에 방문한 인원의 판단에
            기반합니다.
            <br />* 한 워케이션에 대해서는 최대 1개의 페널티만 부여할 수
            있습니다.
          </p>
          <br />
          <strong>[페널티 조치 방법]</strong>
          <ul>
            <li>
              <strong>누적 1회:</strong> 6개월간 워케이션 응모 및 포인트 획득
              불가
            </li>
            <li>
              <strong>누적 2회:</strong> 12개월간 워케이션 응모 및 포인트 획득
              불가
            </li>
            <li>
              <strong>누적 3회:</strong> 서비스 이용 정지 (워케이션 신청 및 참여
              등 모든 행위 불가)
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default UserPenaltyPage;
