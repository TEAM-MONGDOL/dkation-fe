import React, { ReactNode } from 'react';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';
import SidebarModule from '@/_components/common/modules/SidebarModule';
import { useGetWkDetailQuery } from '@/_hooks/admin/useGetWkDetailQuery';
import dayjs from 'dayjs';

const WkResultSide = ({ id }: { id: number }) => {
  const wktId = id;
  const { data, isLoading, isError } = useGetWkDetailQuery({ wktId });

  const realData = [
    {
      subtitle: '모집 기간',
      content: `${dayjs(data?.applyStartDate).format('YYYY.MM.DD') ?? ''} - ${dayjs(data?.applyEndDate).format('YYYY.MM.DD') ?? ''}`,
    },
    {
      subtitle: '워케이션 기간',
      content: `${dayjs(data?.startDate).format('YYYY.MM.DD') ?? ''} - ${dayjs(data?.endDate).format('YYYY.MM.DD') ?? ''}`,
    },
    { subtitle: '모집 인원', content: data?.totalRecruit?.toString() ?? '' },
    { subtitle: '장소', content: data?.wktPlaceId?.toString() ?? '' },
  ];

  const WkResultDetailSidebar = [
    {
      id: '1',
      title: '추첨 결과',
      url: `/admin/workation/${id}/result`,
    },
    {
      id: '2',
      title: '결과 통계 및 페널티',
      url: `/admin/workation/${id}/result/penalty`,
    },
  ];

  return (
    <div className="mr-7 flex h-full flex-col gap-10">
      <TitleBarModule title="결과 및 페널티" type="LEFT" />
      <div className="flex">
        <div className="flex w-[330px] flex-col gap-5">
          <InfoSectionContainer data={realData} />
          <SidebarModule items={WkResultDetailSidebar} />
        </div>
      </div>
    </div>
  );
};

export default WkResultSide;
