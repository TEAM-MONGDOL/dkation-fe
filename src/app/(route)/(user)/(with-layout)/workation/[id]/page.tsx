'use client';

import Image from 'next/image';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import WkDetailInfo from '@/_components/user/workation/WkDetailInfo';
import WkResultInfo from '@/_components/user/workation/WkResultInfo';
import WkReviewInfo from '@/_components/user/workation/WkReviewInfo';
import { useGetUserWkDetailQuery } from '@/_hooks/user/useGetUserWkDetailQuery';
import dayjs from 'dayjs';
import { useGetUserWkPlaceReviewQuery } from '@/_hooks/user/useGetUserWkPlaceReviewQuery';

interface UserWkDetailProps {
  params: { id: number };
}
const UserWkDetailPage = ({ params }: UserWkDetailProps) => {
  const { id } = params;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('상세정보');
  const detailRef = useRef<HTMLDivElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const reviewRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, isError } = useGetUserWkDetailQuery({
    wktId: id,
  });
  const {
    data: reviewData,
    isLoading: reviewIsLoading,
    isError: reviewIsError,
  } = useGetUserWkPlaceReviewQuery({
    wktPlaceId: data?.wktPlaceId,
  });
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
  if (isLoading || reviewIsLoading) {
    return <div>Loading...</div>; // 로딩컴포넌트 추가시 변경예정
  }
  if (isError || reviewIsError) {
    return <div>Error loading data</div>; // 에러컴포넌트 추가시 변경예정
  }
  if (!data || !reviewData) {
    return <div>No data</div>;
  }

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
  const urls = data.files?.map((file) => file.url) || [''];
  return (
    <section>
      <hr />
      <div className="mt-20 px-40">
        <div className="flex w-full">
          <Image width={402} height={304} src={urls[0]} alt="place" />
          <div className="ml-8 flex-col">
            <p className="mb-3 text-sub-300">{data.title}</p>
            <h2 className="mb-12 text-h2 font-semibold text-sub-400">
              {data.place}
            </h2>
            <p className="mb-4 inline-block rounded-regular border border-primary bg-primary/10 px-5 py-1.5 text-3 text-primary">
              모집인원 : {data.totalRecruit}명
            </p>
            <p className="mb-0.5">
              모집 기간 : {dayjs(data.applyStartDate).format('YYYY.MM.DD')} -{' '}
              {dayjs(data.applyEndDate).format('YYYY.MM.DD')}
            </p>
            <p className="mb-0.5">
              워케이션 기간 : {dayjs(data.startDate).format('YYYY.MM.DD')} -{' '}
              {dayjs(data.endDate).format('YYYY.MM.DD')}
            </p>
            <p>주소 : {data.address}</p>
          </div>
          <UserButtonAtom
            onClick={() => router.push(`/workation/${id}/apply`)}
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
          <WkDetailInfo url={urls} description={data.description} />
        </div>
        <div className="mt-16 flex flex-col" ref={resultRef}>
          <WkResultInfo />
        </div>
        <div className="flex flex-col gap-10 pt-16" ref={reviewRef}>
          {reviewData.reviewInfosForWkt.map((review) => (
            <WkReviewInfo
              key={review.wktTitle}
              title={review.wktTitle}
              reviewer={review.reviewer}
              lastModifiedAt={review.lastModifiedAt}
              department={review.department}
              contents={review.contents}
              rating={review.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserWkDetailPage;
