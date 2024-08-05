import UserHomeBannerTitleAtom from '@/_components/user/common/atoms/UserHomeBannerTitleAtom';
import UserHomeBannerButtonAtom from '@/_components/user/common/atoms/UserHomeBannerButtonAtom';

export interface HomeBannerProps {
  title: string;
  link: string;
}

const UserHomeBannerContainer = ({ title, link }: HomeBannerProps) => {
  return (
    <div className="bg-button flex h-[74px] items-center justify-center gap-7 text-white">
      <UserHomeBannerTitleAtom title={title} />
      <UserHomeBannerButtonAtom link={link} />
    </div>
  );
};

export default UserHomeBannerContainer;
