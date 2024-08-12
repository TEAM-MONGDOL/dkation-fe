'use client';

import React from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useGetUserWkDetailQuery } from '@/_hooks/user/useGetUserWkDetailQuery';

interface ReviewWktInfoProps {
  wktId: number;
}

const ReviewWktInfo = ({ wktId }: ReviewWktInfoProps) => {
  const { data } = useGetUserWkDetailQuery({
    wktId,
  });

  return (
    <div className="mb-16 flex px-12">
      <div className="flex-shrink-0">
        {data?.files && data.files.length > 0 && (
          <Image
            src={data.files[0].url}
            alt={data.files[0].fileName}
            width={442}
            height={304}
            className="mr-4"
          />
        )}
      </div>
      <div className="flex flex-grow flex-col justify-between px-2">
        <div>
          <p className="text-sub-300">{data?.title}</p>
          <h2 className="text-h2 font-semibold text-sub-400">{data?.place}</h2>
        </div>
        <div className="mt-auto">
          <p className="mb-0.5">
            모집 기간 : {dayjs(data?.applyStartDate).format('YYYY.MM.DD')} -
            {dayjs(data?.applyEndDate).format('YYYY.MM.DD')}
          </p>
          <p className="mb-0.5">
            워케이션 기간 : {dayjs(data?.startDate).format('YYYY.MM.DD')} -
            {dayjs(data?.endDate).format('YYYY.MM.DD')}
          </p>
          <p>모집 인원 : {data?.totalRecruit}명</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewWktInfo;
