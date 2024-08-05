export interface WkBannerProps {
  applyStartDate: string;
  applyEndDate: string;
  startDate: string;
  endDate: string;
}

const WkBannerPeriodModule = ({
  applyStartDate,
  applyEndDate,
  startDate,
  endDate,
}: WkBannerProps) => {
  return (
    <div className="flex h-[52px] items-center justify-center gap-4 bg-primary text-3">
      <p>
        모집 기간 : {applyStartDate} - {applyEndDate}
      </p>
      <div className="h-4 w-0.5 bg-[#E5CD07]" />
      <p>
        워케이션 기간 : {startDate} - {endDate}
      </p>
    </div>
  );
};

export default WkBannerPeriodModule;
