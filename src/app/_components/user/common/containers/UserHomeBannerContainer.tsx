import UserHomeBannerTitleAtom from '@/_components/user/common/atoms/UserHomeBannerTitleAtom';
import UserHomeBannerButtonAtom from '@/_components/user/common/atoms/UserHomeBannerButtonAtom';

export interface HomeBannerProps {
  title: string;
  link: string;
  bgColor: string;
}

const UserHomeBannerContainer = ({ title, link, bgColor }: HomeBannerProps) => {
  return (
    <div
      className={`flex h-[74px] min-w-full shrink-0 items-center justify-center gap-7 ${bgColor === 'DARK' ? 'bg-sub-400' : bgColor === 'YELLOW' ? 'bg-[#FBD501]' : 'bg-sub-100'} text-white`}
    >
      <UserHomeBannerTitleAtom
        title={title}
        textColor={bgColor === 'DARK' ? 'text-white' : 'text-black'}
      />
      <UserHomeBannerButtonAtom
        link={`/support/notices/${link}`}
        buttonBgColor={bgColor === 'DARK' ? 'bg-primary' : 'bg-sub-400'}
        buttonTextColor={bgColor === 'DARK' ? 'text-black' : 'text-white'}
      />
    </div>
  );
};

export default UserHomeBannerContainer;
