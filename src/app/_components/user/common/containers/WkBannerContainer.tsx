import WkBannerPeriodModule from '@/_components/user/common/modules/WkBannerPeriodModule';
import WkBannerInfoModule from '@/_components/user/common/modules/WkBannerInfoModule';

export interface WkBannerProps {
  percent: number;
  item: string;
  point: number;
  applyStartDate: string;
  applyEndDate: string;
  startDate: string;
  endDate: string;
}

const WkBannerContainer = ({
  percent,
  item,
  point,
  applyStartDate,
  applyEndDate,
  startDate,
  endDate,
}: WkBannerProps) => {
  return (
    <div className="flex flex-col">
      <WkBannerPeriodModule
        applyStartDate={applyStartDate}
        applyEndDate={applyEndDate}
        startDate={startDate}
        endDate={endDate}
      />
      <WkBannerInfoModule percent={percent} item={item} point={point} />
    </div>
  );
};

export default WkBannerContainer;
