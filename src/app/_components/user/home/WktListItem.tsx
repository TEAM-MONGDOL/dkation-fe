import { WktInfoType } from '@/_types/adminType';
import { dateConverter } from '@/_types/converter';
import Image from 'next/image';
import React from 'react';

interface WktListItemProps {
  wktInfo: WktInfoType;
  onClick: () => void;
}

const WktListItem = ({ wktInfo, onClick }: WktListItemProps) => {
  return (
    <div
      className="flex h-[474px] w-[513px] shrink-0 cursor-pointer snap-start flex-col bg-white"
      onClick={onClick}
    >
      <Image
        className="max-h-[280px] min-h-[280px] min-w-[513px] max-w-[513px] rounded-t-xl object-cover"
        src={wktInfo.thumbnailUrl}
        alt="thumbnail"
        width={513}
        height={280}
      />
      <div className="flex grow flex-col items-start justify-between rounded-b-xl border-x border-b border-sub-100 px-7 pb-[30px] pt-8 text-sub-400">
        <div className="flex flex-col gap-y-2.5">
          <p className="text-4 font-medium text-sub-300">{wktInfo.title}</p>
          <p className="text-h3 font-semibold">{wktInfo.wktPlaceTitle}</p>
        </div>
        <div className="flex flex-col">
          <p className="font-medium">
            모집 기간 : {dateConverter(wktInfo.applyStartDate)} -{' '}
            {dateConverter(wktInfo.applyEndDate)}
          </p>
          <p className="font-medium">
            워케이션 기간 : {dateConverter(wktInfo.startDate)} -{' '}
            {dateConverter(wktInfo.endDate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WktListItem;
