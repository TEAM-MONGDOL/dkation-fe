'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StarRateIcon } from '@/_assets/icons';
import UserFilteringSectionContainer from '@/_components/user/common/containers/UserFilteringSectionContainer';
import { ReviewInfo } from '@/_constants/common';
import dayjs from 'dayjs';

export interface ReviewProps {
  reviewer: string;
  department: string;
  lastModifiedAt: string;
  contents: string;
  rating: number;
  title: string;
}

const WkReviewInfo = ({
  reviewer,
  department,
  lastModifiedAt,
  contents,
  rating,
  title,
}: ReviewProps) => {
  return (
    <div>
      <div className="rounded-lg border">
        <div className="flex flex-col px-8">
          <div className="my-5 flex items-center">
            <p className="mr-4 text-h3 font-semibold">{reviewer}</p>
            <p className="text-4 text-sub-200">
              {department} + {title}
            </p>
            <div className="ml-auto flex flex-col justify-center">
              <div className="mb-1 flex">
                <Image src={StarRateIcon} alt="StarRateIcon" />
                <Image src={StarRateIcon} alt="StarRateIcon" />
                <Image src={StarRateIcon} alt="StarRateIcon" />
                <Image src={StarRateIcon} alt="StarRateIcon" />
                <Image src={StarRateIcon} alt="StarRateIcon" />
              </div>
              <p>
                {rating}점({ReviewInfo[rating.toString()]})
              </p>
            </div>
          </div>
          <hr />
          <p className="pb-14 pt-7">{contents}</p>
        </div>
        <div className="flex justify-end bg-sub-100/10 px-8 py-3">
          {dayjs(lastModifiedAt).format('YYYY.MM.DD')}
        </div>
      </div>
    </div>
  );
};

export default WkReviewInfo;
