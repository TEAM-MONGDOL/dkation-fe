import NavModule from '@/_components/common/modules/NavModule';
import {
  InfoIcon,
  PointIcon,
  ProfileIcon,
  WorkationIcon,
} from '@/_assets/icons';

const NavBarContainer = () => {
  return (
    <div className="pt-1 text-white w-[203px] bg-sub-400 h-screen">
      <NavModule
        icon={ProfileIcon}
        title="회원 관리"
        contents={['회원 목록', '페널티 내역']}
      />
      <hr className="opacity-50" />
      <NavModule
        icon={PointIcon}
        title="포인트 관리"
        content="단체 포인트 등록"
        contents={['포인트 지급 내역', '포인트 신청 내역', '포인트 정책 설정']}
      />
      <hr className="opacity-50" />
      <NavModule
        icon={WorkationIcon}
        title="워케이션 관리"
        contents={['워케이션 목록', '워케이션 장소', '워케이션 후기']}
      />
      <hr className="opacity-50" />
      <NavModule
        icon={InfoIcon}
        title="공지 관리"
        content="공지사항 등록"
        contents={['공지사항 목록']}
      />
    </div>
  );
};

export default NavBarContainer;
