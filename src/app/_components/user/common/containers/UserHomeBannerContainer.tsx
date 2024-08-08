import UserHomeBannerTitleAtom from '@/_components/user/common/atoms/UserHomeBannerTitleAtom';
import UserHomeBannerButtonAtom from '@/_components/user/common/atoms/UserHomeBannerButtonAtom';

export interface HomeBannerProps {
  title: string;
  link: string;
}

const UserHomeBannerContainer = ({ title, link }: HomeBannerProps) => {
  return (
    <div className="flex h-[74px] items-center justify-center gap-7 bg-button text-white">
      <UserHomeBannerTitleAtom title={title} />
      <UserHomeBannerButtonAtom link={link} />
    </div>
  );
};

export default UserHomeBannerContainer;
