import BannerSection from '@/_components/user/home/BannerSection';
import MainHeaderSection from '@/_components/user/home/MainHeaderSection';
import React from 'react';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col">
      <BannerSection />
      <MainHeaderSection />
    </div>
  );
};

export default HomePage;
