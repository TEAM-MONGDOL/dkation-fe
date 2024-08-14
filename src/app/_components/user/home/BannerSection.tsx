'use client';

import React, { useEffect, useState } from 'react';
import { useGetHomeBannerQuery } from '@/_hooks/user/useGetHomeBannerQuery';
import UserHomeBannerContainer from '../common/containers/UserHomeBannerContainer';

const BannerSection = () => {
  const { data } = useGetHomeBannerQuery();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically slide to the next banner every 5 seconds
  useEffect(() => {
    if (!data || data.bannerInfoList.length < 1) return;

    const intervalId = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % data.bannerInfoList.length,
      );
    }, 5000); // 5000ms = 5 seconds

    /* eslint-disable consistent-return */
    return () => clearInterval(intervalId);
  }, [data]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex shrink-0 transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {data?.bannerInfoList.map((bannerInfo) => (
          <UserHomeBannerContainer
            key={bannerInfo.id}
            title={bannerInfo.title}
            link={bannerInfo.linkUrl}
            bgColor={bannerInfo.backgroundColor}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSection;
