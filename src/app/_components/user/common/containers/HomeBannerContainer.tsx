import HomeBannerTitleAtom from '@/_components/user/common/atoms/HomeBannerTitleAtom';
import HomeBannerButtonAtom from '@/_components/user/common/atoms/HomeBannerButtonAtom';

const HomeBannerContainer = () => {
  return (
    <div className="bg-button flex h-[74px] items-center justify-center gap-7 text-white">
      <HomeBannerTitleAtom />
      <HomeBannerButtonAtom />
    </div>
  );
};

export default HomeBannerContainer;
