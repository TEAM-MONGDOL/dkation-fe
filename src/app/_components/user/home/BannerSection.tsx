'use client';

import { useGetHomeBannerQuery } from '@/_hooks/user/useGetHomeBannerQuery';
import React from 'react';

const BannerSection = () => {
  const { data } = useGetHomeBannerQuery();

  console.log(data);
  return <div>배너 섹션</div>;
};

export default BannerSection;
