import NavModule from '@/_components/common/modules/NavModule';
import {
  InfoIcon,
  PointIcon,
  ProfileIcon,
  WorkationIcon,
} from '@/_assets/icons';

const NavBar = () => {
  return (
    <div className="pt-1 text-white w-[203px] bg-sub-400 h-screen">
      <NavModule icon={ProfileIcon} title="회원 관리" content1="회원 목록" />
      <hr className="opacity-50" />
      <NavModule
        icon={PointIcon}
        title="포인트 관리"
        content="단체 포인트 등록"
        content1="포인트 지급 내역"
        content2="포인트 신청 내역"
        content3="포인트 정책 설정"
      />
      <hr className="opacity-50" />
      <NavModule
        icon={WorkationIcon}
        title="워케이션 관리"
        content1="워케이션 목록"
        content2="워케이션 장소"
        content3="워케이션 후기"
      />
      <hr className="opacity-50" />
      <NavModule
        icon={InfoIcon}
        title="공지 관리"
        content="공지사항 등록"
        content1="공지사항 목록"
      />
    </div>
  );
};

export default NavBar;
