'use client';

import React from 'react';
import Image from 'next/image';
import { useGetUserWkDetailQuery } from '@/_hooks/user/useGetUserWkDetailQuery';
import { dateConverter } from '@/_types/converter';

interface ReviewWktInfoProps {
  wktId: number;
}

const ReviewWktInfo = ({ wktId }: ReviewWktInfoProps) => {
  const { data, isLoading, isError } = useGetUserWkDetailQuery({
    wktId,
  });

  return (
    <div className="mb-16 flex px-12">
      {!data ? (
        isLoading ? (
          <div>로딩 중...</div>
        ) : isError ? (
          <div>에러 발생</div>
        ) : (
          <div>데이터 없음</div>
        )
      ) : (
        <>
          <div className="flex-shrink-0">
            {data.files && data.files.length > 0 && (
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
              <p className="text-sub-300">{data.title}</p>
              <h2 className="text-h2 font-semibold text-sub-400">
                {data.place}
              </h2>
            </div>
            <div className="mt-auto">
              <p className="mb-0.5">
                모집 기간 : {dateConverter(data.applyStartDate)} -
                {dateConverter(data.applyEndDate)}
              </p>
              <p className="mb-0.5">
                워케이션 기간 : {dateConverter(data.startDate)} -
                {dateConverter(data.endDate)}
              </p>
              <p>모집 인원 : {data.totalRecruit}명</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewWktInfo;
