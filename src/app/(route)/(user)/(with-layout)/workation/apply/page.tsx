import place from '@/_assets/images/place_impy.png';
import WkBannerPeriodModule from '@/_components/user/common/modules/WkBannerPeriodModule';
import WkBannerInfoModule from '@/_components/user/common/modules/WkBannerInfoModule';
import Image from 'next/image';
import { LocationIcon } from '@/_assets/icons';

const UserWkApplyPage = () => {
  return (
    <section>
      <div className="">
        <div className="flex h-[450px] justify-center bg-primary/5 px-40 py-12">
          <Image src={place} alt="place" width={630} />
          <div className="ml-auto pr-8 pt-56">
            <p className="text-2">2024년 7월 3주차 워케이션</p>
            <p className="mb-4 text-h1 font-semibold">양양</p>
            <div className="flex">
              <Image src={LocationIcon} alt="LocationIcon" />
              <p className="text-2">
                주소 : 강원 양양군 현북면 하조대해안길 119
              </p>
            </div>
          </div>
        </div>
        <WkBannerPeriodModule
          applyStartDate="2020.07.14"
          applyEndDate="2020.07.14"
          startDate="2020.07.14"
          endDate="2020.07.14"
        />
      </div>
      <div className="px-40" />
    </section>
  );
};

export default UserWkApplyPage;
