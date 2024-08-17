'use client';

import UserTabBarModule from '@/_components/user/common/modules/UserTabBarModule';
import UserHeaderContainers from '@/_components/user/common/containers/UserHeaderContainers';
import { usePathname } from 'next/navigation';
import { HeaderMypageIcon } from '@/_assets/icons';

const UserMyPageFix = () => {
  const pathname = usePathname();

  const tabs = [
    {
      text: '회원정보',
      path: '/mypage',
    },
    {
      text: '페널티 내역',
      path: '/mypage/penalty',
    },
    {
      text: '워케이션 신청 내역',
      path: '/mypage/wk-history',
    },
    {
      text: '내가 쓴 후기',
      path: '/mypage/review',
    },
  ];

  if (pathname !== '/mypage/review' && pathname.startsWith('/mypage/review/')) {
    return null;
  }

  return (
    <div>
      <UserHeaderContainers
        title="마이페이지"
        content="마이페이지를 통해 나의 정보들을 쉽게 확인하세요."
        img="bg-header-bg"
        headerIcon={HeaderMypageIcon}
      />
      <UserTabBarModule tabs={tabs} />
    </div>
  );
};

export default UserMyPageFix;
