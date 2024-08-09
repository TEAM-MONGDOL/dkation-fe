'use client';

import place from '@/_assets/images/place_impy.png';
import Image from 'next/image';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import WkDetailInfo from '@/_components/user/workation/WkDetailInfo';
import WkResultInfo from '@/_components/user/workation/WkResultInfo';
import WkReviewInfo from '@/_components/user/workation/WkReviewInfo';

const UserWkDetailPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('상세정보');
  const detailRef = useRef<HTMLDivElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const reviewRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (detailRef.current && resultRef.current && reviewRef.current) {
      const detailPos = detailRef.current.getBoundingClientRect().top;
      const resultPos = resultRef.current.getBoundingClientRect().top;
      const reviewPos = reviewRef.current.getBoundingClientRect().top;

      if (window.scrollY >= reviewPos - 100) {
        setActiveTab('후기');
      } else if (window.scrollY >= resultPos - 100) {
        setActiveTab('추첨결과');
      } else if (window.scrollY >= detailPos - 100) {
        setActiveTab('상세정보');
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (section: string) => {
    if (section === '상세정보' && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === '추첨결과' && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === '후기' && reviewRef.current) {
      reviewRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveTab(section);
  };

  return (
    <section>
      <hr />
      <div className="mt-20 px-40">
        <div className="flex w-full">
          <Image width={402} height={304} src={place} alt="place" />
          <div className="ml-8 flex-col">
            <p className="mb-3 text-sub-300">2024년 7월 3주차 워케이션</p>
            <h2 className="mb-12 text-h2 font-semibold text-sub-400">양양</h2>
            <p className="mb-4 inline-block rounded-regular border border-primary bg-primary/10 px-5 py-1.5 text-3 text-primary">
              모집인원 : 2명
            </p>
            <p className="mb-0.5">모집 기간 : yyyy.mm.dd - yyyy.mm.dd</p>
            <p className="mb-0.5">워케이션 기간 : yyyy.mm.dd - yyyy.mm.dd</p>
            <p>주소 : 강원 양양군 현북면 하조대해안길 119</p>
          </div>
          <UserButtonAtom
            onClick={() => router.push(`/workation/apply`)}
            className="ml-auto mt-auto rounded-[8px]"
            buttonStyle="black"
            text="응모하기"
            type="button"
            size="md"
          />
        </div>
        <div className="top-0 z-10 mt-24 flex h-14 justify-between bg-white">
          <button
            className={`w-full border border-sub-100 ${activeTab === '상세정보' ? 'bg-sub-300 text-white' : ''}`}
            onClick={() => scrollToSection('상세정보')}
          >
            상세정보
          </button>
          <button
            className={`w-full border border-sub-100 ${activeTab === '추첨결과' ? 'bg-sub-300 text-white' : ''}`}
            onClick={() => scrollToSection('추첨결과')}
          >
            추첨결과
          </button>
          <button
            className={`w-full border border-sub-100 ${activeTab === '후기' ? 'bg-sub-300 text-white' : ''}`}
            onClick={() => scrollToSection('후기')}
          >
            후기
          </button>
        </div>
        <div className="mt-16 flex flex-col" ref={detailRef}>
          <WkDetailInfo />
        </div>
        <div className="mt-16 flex flex-col" ref={resultRef}>
          <WkResultInfo />
        </div>
        <div className="flex flex-col pt-16" ref={reviewRef}>
          <WkReviewInfo />
        </div>
      </div>
    </section>
  );
};

export default UserWkDetailPage;
