'use client';

import Image from 'next/image';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import WkDetailInfo from '@/_components/user/workation/WkDetailInfo';
import WkReviewInfo from '@/_components/user/workation/WkReviewInfo';
import { useGetUserWkDetailQuery } from '@/_hooks/user/useGetUserWkDetailQuery';
import dayjs from 'dayjs';
import { useGetUserWkPlaceReviewQuery } from '@/_hooks/user/useGetUserWkPlaceReviewQuery';
import UserFilteringSectionContainer from '@/_components/user/common/containers/UserFilteringSectionContainer';
import UserLoading from '@/_components/user/userLoading';
import NetworkError from '@/_components/common/networkError';
import WkResultInfo from '@/_components/user/workation/WkResultInfo';
import { useSession } from 'next-auth/react';
import { useGetMemberPenaltyHistoryQuery } from '@/_hooks/admin/useGetMemberPenaltyHistoryQuery';

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
  const [param, setParam] = useState<{
    order: string;
  }>({
    order: 'DESC',
  });
  const {
    data: reviewData,
    isLoading: reviewIsLoading,
    isError: reviewIsError,
  } = useGetUserWkPlaceReviewQuery({
    wktPlaceId: data?.wktPlaceId,
    pageParam: {
      page: 1,
      size: 100,
      sort: `createdAt,${param.order}`,
    },
    enable: !!data,
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
  const [isFilteringSectionOpen, setIsFilteringSectionOpen] = useState<
    'FILTER' | 'ORDER' | null
  >(null);
  const [selectedOrder, setSelectedOrder] = useState<string>('createdAt,DESC');
  const updateParam = useCallback(() => {
    setParam((prev) => ({
      ...prev,
      order: selectedOrder,
    }));
  }, [selectedOrder]);

  useEffect(() => {
    updateParam();
  }, [selectedOrder, updateParam]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const session = useSession();
  const accountId = String(session.data?.accountId || '');

  const {
    data: userData,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useGetMemberPenaltyHistoryQuery({
    accountId,
  });
  if (isLoading || reviewIsLoading || userIsLoading) {
    return <UserLoading />;
  }
  if (isError || reviewIsError || userIsError) {
    return <NetworkError />;
  }
  if (!data || !reviewData || !userData) {
    return <NetworkError />;
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
          <Image
            className="h-[304px] w-[402px] object-cover"
            width={402}
            height={304}
            src={urls[0]}
            alt="place"
          />
          <div className="ml-8 flex-col">
            <p className="mb-4 text-sub-300">{data.title}</p>
            <h2 className="mb-20 text-h2 font-semibold text-sub-400">
              {data.place}
            </h2>
            <p className="mb-5 inline-block rounded-regular border border-primary bg-primary/10 px-5 py-1.5 text-3 text-primary">
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
            onClick={() =>
              data.isApplied
                ? router.push('/mypage/wk-history')
                : dayjs().isAfter(dayjs(data.applyEndDate).endOf('day')) ||
                  dayjs().isBefore(dayjs(data.applyStartDate)) ||
                  userData.memberType === 'PENALTY' ||
                  router.push(`/workation/${id}/apply`)
            }
            className={`ml-auto mt-auto rounded-[8px] ${(dayjs().isAfter(dayjs(data.applyEndDate).endOf('day')) && 'cursor-default') || dayjs().isBefore(dayjs(data.applyStartDate)) || (userData.memberType === 'PENALTY' && 'cursor-default')}`}
            buttonStyle={`${dayjs().isAfter(dayjs(data.applyEndDate).endOf('day')) || dayjs().isBefore(dayjs(data.applyStartDate)) || userData.memberType === 'PENALTY' ? 'red' : data.isApplied ? 'lightGray' : 'black'}`}
            text={`${userData.memberType === 'PENALTY' ? '페널티 기간' : data.isApplied ? '응모 완료' : dayjs().isBefore(dayjs(data.applyStartDate)) ? '모집 예정' : dayjs().isAfter(dayjs(data.applyEndDate).endOf('day')) ? '모집 마감' : '응모하기'}`}
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
          <WkDetailInfo
            url={urls}
            description={data.description}
            longitude={data.longitude}
            latitude={data.latitude}
          />
        </div>
        <div ref={resultRef}>
          <WkResultInfo id={id} />
        </div>
        <div className="flex flex-col gap-10 pt-16" ref={reviewRef}>
          {reviewData.reviewInfosForWkt[0]?.wktTitle && (
            <UserFilteringSectionContainer
              orderOption={{
                onClickOrder: () => {
                  setIsFilteringSectionOpen(
                    isFilteringSectionOpen === 'ORDER' ? null : 'ORDER',
                  );
                },
                isOrderOpen: isFilteringSectionOpen === 'ORDER',
                orderProps: {
                  orders: [
                    { key: 'createdAt,DESC', value: '최신순' },
                    { key: 'createdAt,ASC', value: '오래된순' },
                  ],
                  selectedOrder,
                  setSelectedOrder,
                },
              }}
            />
          )}
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
