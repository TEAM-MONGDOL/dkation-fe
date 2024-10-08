import NavModule from '@/_components/common/modules/NavModule';
import {
  ControlPointIcon,
  ExtensionGrayIcon,
  InfoIcon,
  PersonIcon,
} from '@/_assets/icons';

const NavBarContainer = () => {
  return (
    <div className="h-full w-[203px] gap-y-3 bg-sub-400 py-5 text-white">
      <NavModule
        icon={PersonIcon}
        title="회원 관리"
        contents={[{ content: '회원 목록', route: '/admin/members' }]}
      />
      <hr className="h-[0.5px] border-0 bg-stroke-100 opacity-50" />
      <NavModule
        icon={ControlPointIcon}
        title="포인트 관리"
        plusContents={[
          { content: '단체 포인트 등록', route: '/admin/points/reward/new' },
        ]}
        contents={[
          { content: '포인트 지급 내역', route: '/admin/points/reward' },
          { content: '포인트 신청 내역', route: '/admin/points/request' },
          { content: '포인트 정책 설정', route: '/admin/points/policy' },
        ]}
      />
      <hr className="h-[0.5px] border-0 bg-stroke-100 opacity-50" />
      <NavModule
        icon={ExtensionGrayIcon}
        title="워케이션 관리"
        contents={[
          { content: '워케이션 목록', route: '/admin/workation' },
          { content: '워케이션 장소', route: '/admin/workation/place' },
          { content: '워케이션 후기', route: '/admin/workation/reviews' },
        ]}
      />
      <hr className="h-[0.5px] border-0 bg-stroke-100 opacity-50" />
      <NavModule
        icon={InfoIcon}
        title="공지 관리"
        plusContents={[
          { content: '공지사항 등록', route: '/admin/notices/new' },
        ]}
        contents={[
          { content: '배너 목록', route: '/admin/notices/banner' },
          { content: '공지사항 목록', route: '/admin/notices' },
        ]}
      />
    </div>
  );
};

export default NavBarContainer;
