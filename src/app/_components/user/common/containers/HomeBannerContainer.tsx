import HomeBannerTitleAtom from '@/_components/user/common/atoms/HomeBannerTitleAtom';
import HomeBannerButtonAtom from '@/_components/user/common/atoms/HomeBannerButtonAtom';

export interface HomeBannerProps {
  title: string;
  link: string;
}

const HomeBannerContainer = ({ title, link }: HomeBannerProps) => {
  return (
    <div className="bg-button flex h-[74px] items-center justify-center gap-7 text-white">
      <HomeBannerTitleAtom title={title} />
      <HomeBannerButtonAtom link={link} />
    </div>
  );
};

export default HomeBannerContainer;
