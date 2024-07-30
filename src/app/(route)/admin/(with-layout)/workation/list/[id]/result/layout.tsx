import React, { ReactNode } from 'react';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import PlaceImsy from '@/_assets/images/place_impy.png';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';
import SidebarModule from '@/_components/common/modules/SidebarModule';

interface Props {
  children: ReactNode;
  params: { id: string };
}
const data = [
  { subtitle: '모집 기간', content: 'Content 1' },
  { subtitle: '워케이션 기간', content: 'Content 2' },
  { subtitle: '모집 인원', content: 'Content 3' },
  { subtitle: '장소', content: 'Content 3' },
];
const AdminWorkationResultLayout = ({ children, params }: Props) => {
  const resultId = params.id;

  const WkResultDetailSidebar = [
    {
      id: '1',
      title: '워케이션 신청 내역',
      url: `/admin/workation/list/${resultId}/result`,
    },
    {
      id: '2',
      title: '포인트 사용 내역',
      url: `/admin/workation/list/${resultId}/result/penalty`,
    },
  ];

  return (
    <div className="flex h-full flex-col gap-10">
      <TitleBarModule title="결과 및 페널티" type="LEFT" />
      <div className="gap-x- flex">
        <div className="flex w-[300px] flex-col gap-5">
          <InfoSectionContainer data={data} image={PlaceImsy} />
          <SidebarModule items={WkResultDetailSidebar} />
        </div>
        <div className="ml-5 flex grow">
          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminWorkationResultLayout;
