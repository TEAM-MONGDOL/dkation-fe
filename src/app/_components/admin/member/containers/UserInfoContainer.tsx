'use client';

import React from 'react';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';
import { useGetMemberDetailQuery } from '@/_hooks/common/useGetMemberDetailQuery';

interface UserInfoContainerProps {
  accountId: string;
}

const UserInfoContainer = ({ accountId }: UserInfoContainerProps) => {
  const { data, isLoading, isError } = useGetMemberDetailQuery({
    accountId,
  });

  const formattedData = data
    ? [
        { subtitle: '이름', content: data.name },
        { subtitle: '아이디', content: data.accountId },
        { subtitle: '소속', content: data.department },
        { subtitle: '보유 포인트', content: `${data.pointQuantity} P` },
      ]
    : [];

  return (
    <div className="flex flex-col gap-y-5">
      {!data ? (
        isLoading ? (
          <div>loading ...</div>
        ) : isError ? (
          <div>error</div>
        ) : (
          <div>no data</div>
        )
      ) : (
        <InfoSectionContainer data={formattedData} title="기본 정보" />
      )}
    </div>
  );
};

export default UserInfoContainer;
