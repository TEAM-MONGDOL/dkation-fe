import { ReactNode } from 'react';
import UserTabBarModule from '@/_components/user/common/modules/UserTabBarModule';
import UserHeaderContainers from '@/_components/user/common/containers/UserHeaderContainers';
import { HeaderSupportIcon } from '@/_assets/icons';

interface Props {
  children: ReactNode;
}

const UserSupportLayout = ({ children }: Props) => {
  const tabs = [
    {
      text: '공지사항',
      path: '/support/notices',
      parent: '/support/notices',
    },
    {
      text: '자주 묻는 질문',
      path: '/support/faq',
    },
  ];

  return (
    <div>
      <UserHeaderContainers
        title="고객지원"
        content="공지사항과 자주 묻는 질문을 통해 디케이션에 대해 더 자세히 알아보세요!"
        img="bg-header-bg"
        headerIcon={HeaderSupportIcon}
      />
      <UserTabBarModule tabs={tabs} />
      {children}
    </div>
  );
};

export default UserSupportLayout;
