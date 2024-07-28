import React from 'react';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';
import SidebarModule from '@/_components/common/modules/SidebarModule';

interface Props {
  children: React.ReactNode;
  params: { id: string };
}

const data = [
  { subtitle: '이름', content: '홍길동' },
  { subtitle: '아이디', content: 'hong.gil' },
  { subtitle: '소속', content: '개발팀' },
  { subtitle: '보유 포인트', content: '304 P' },
];

const AdminMembersLayout = ({ children, params }: Props) => {
  const memberId = params.id;

  const membersDetailSidebar = [
    {
      id: '1',
      title: '워케이션 신청 내역',
      url: `/admin/members/${memberId}/wk-history`,
    },
    {
      id: '2',
      title: '포인트 사용 내역',
      url: `/admin/members/${memberId}/points`,
    },
    {
      id: '3',
      title: '패널티 내역',
      url: `/admin/members/${memberId}/penalties`,
    },
  ];

  return (
    <div className="flex flex-col h-full gap-10">
      <TitleBarModule title="회원 상세" type="LEFT" />
      <div className="flex gap-x-5">
        <div className="w-[300px] flex flex-col gap-y-5">
          <InfoSectionContainer data={data} title="기본 정보" />
          <SidebarModule items={membersDetailSidebar} />
        </div>
        <div className="flex grow">
          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminMembersLayout;
