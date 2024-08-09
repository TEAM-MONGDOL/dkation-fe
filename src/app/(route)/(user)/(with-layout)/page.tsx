import BannerSection from '@/_components/user/home/BannerSection';
import MainHeaderSection from '@/_components/user/home/MainHeaderSection';
import WktInfoSection from '@/_components/user/home/WktInfoSection';
import WktListSection from '@/_components/user/home/WktListSection';
import React from 'react';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col">
      <BannerSection />
      <MainHeaderSection />
      <WktListSection />
      <WktInfoSection />
    </div>
  );
};

export default HomePage;
