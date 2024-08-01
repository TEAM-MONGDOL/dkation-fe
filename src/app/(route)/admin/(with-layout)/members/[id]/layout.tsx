'use client';

import React from 'react';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import SidebarModule from '@/_components/common/modules/SidebarModule';
import UserInfoContainer from '@/_components/admin/member/containers/UserInfoContainer';

interface Props {
  children: React.ReactNode;
  params: { id: string };
}

const AdminMembersLayout = ({ children, params }: Props) => {
  const accountId = params.id;

  const membersDetailSidebar = [
    {
      id: '1',
      title: '워케이션 신청 내역',
      url: `/admin/members/${accountId}/wk-history`,
    },
    {
      id: '2',
      title: '포인트 사용 내역',
      url: `/admin/members/${accountId}/point-history`,
    },
    {
      id: '3',
      title: '페널티 내역',
      url: `/admin/members/${accountId}/penalty-history`,
    },
  ];

  // Ensure `children` is defined
  const renderedChildren = children ? (
    React.cloneElement(children as React.ReactElement)
  ) : (
    <div>Loading...</div>
  );

  return (
    <div className="flex h-full flex-col gap-10">
      <TitleBarModule title="회원 상세" type="LEFT" />
      <div className="flex gap-x-5">
        <div className="flex w-[300px] flex-col gap-y-5">
          <UserInfoContainer accountId={accountId} />
          <SidebarModule items={membersDetailSidebar} />
        </div>
        <div className="flex grow">
          <main className="w-full">{renderedChildren}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminMembersLayout;
