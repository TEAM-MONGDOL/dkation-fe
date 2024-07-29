import React, { ReactNode } from 'react';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import PlaceImsy from '@/_assets/images/place_impy.png';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';
import SidebarModule from '@/_components/common/modules/SidebarModule';
import { AdminListResultSidebar } from '@/_components/_constants/common';

interface Props {
  children: ReactNode;
  id: number;
}
const data = [
  { subtitle: '모집 기간', content: 'Content 1' },
  { subtitle: '워케이션 기간', content: 'Content 2' },
  { subtitle: '모집 인원', content: 'Content 3' },
  { subtitle: '장소', content: 'Content 3' },
];
const AdminWorkationResultLayout = ({ children, id }: Props) => {
  return (
    <div className="flex flex-col h-full gap-10">
      <TitleBarModule title="결과 및 페널티" type="LEFT" />
      <div className="flex gap-x-">
        <div className="w-[300px] flex flex-col gap-5">
          <InfoSectionContainer data={data} image={PlaceImsy} />
          <SidebarModule items={AdminListResultSidebar(id)} />
        </div>
        <div className="grow flex ml-5">
          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminWorkationResultLayout;
