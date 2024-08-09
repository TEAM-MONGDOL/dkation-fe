import BannerSection from '@/_components/user/home/BannerSection';
import MainHeaderSection from '@/_components/user/home/MainHeaderSection';
import WktListSection from '@/_components/user/home/WktListSection';
import React from 'react';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col">
      <BannerSection />
      <MainHeaderSection />
      <WktListSection />
    </div>
  );
};

export default HomePage;
