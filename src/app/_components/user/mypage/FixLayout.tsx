import UserTabBarModule from '@/_components/user/common/modules/UserTabBarModule';
import UserHeaderContainers from '@/_components/user/common/containers/UserHeaderContainers';

const UserMyPageFix = () => {
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

  return (
    <div>
      <UserHeaderContainers
        title="마이페이지"
        content="마이페이지를 통해 나의 정보들을 쉽게 확인하세요."
      />
      <UserTabBarModule tabs={tabs} />
    </div>
  );
};

export default UserMyPageFix;
