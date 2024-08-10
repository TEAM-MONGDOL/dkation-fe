import { HeaderPointIcon } from '@/_assets/icons';
import UserHeaderContainers from '@/_components/user/common/containers/UserHeaderContainers';
import UserTabBarModule from '@/_components/user/common/modules/UserTabBarModule';
import path from 'path';
import { ReactNode } from 'react';

const tabs = [
  {
    text: '포인트 사용 내역',
    path: '/points/history',
  },
  {
    text: '포인트 신청 내역',
    path: '/points/apply',
  },
  {
    text: '포인트 정책',
    path: '/points/policy',
  },
];

interface PointsLayoutProps {
  children: ReactNode;
}

const PointsLayout = ({ children }: PointsLayoutProps) => {
  return (
    <div className="flex w-full flex-col">
      <UserHeaderContainers
        title="포인트"
        content="포인트 정책을 확인하여 포인트를 적립하고 사용해보세요."
        img="bg-header-bg"
        headerIcon={HeaderPointIcon}
      />
      <UserTabBarModule tabs={tabs} />
      {children}
    </div>
  );
};

export default PointsLayout;
