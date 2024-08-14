'use client';

import { LeftKeyIcon, RightKeyIcon } from '@/_assets/icons';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useGetWkReviewListQuery } from '@/_hooks/user/useGetWkReviewListQuery';
import { useRouter } from 'next/navigation';
import NetworkError from '@/_components/common/networkError';
import { BeatLoader } from 'react-spinners';
import RecentReviewItem from './RecentReviewItem';

const RecentReviewSection = () => {
  const router = useRouter();
  const scrollContainerRef = useRef(null);
  const [currentStartItem, setCurrentStartItem] = useState(0);
  const { data, isLoading, isError } = useGetWkReviewListQuery({
    pageable: {
      page: 1,
      size: 10,
    },
  });

  const scrollTo = (scrollContainer: HTMLDivElement, idx: number) => {
    scrollContainer.scrollTo({
      left: idx * 363,
      behavior: 'smooth',
    });
  };

  const handleClickLeft = () => {
    if (
      !scrollContainerRef.current ||
      !data ||
      data.reviewInfosForMember.length < 1
    )
      return;
    const nowCurrentIdx = Math.max(0, currentStartItem - 3);
    scrollTo(scrollContainerRef.current, nowCurrentIdx);
    setCurrentStartItem(nowCurrentIdx);
  };

  const handleClickRight = () => {
    if (
      !scrollContainerRef.current ||
      !data ||
      data.reviewInfosForMember.length < 1
    )
      return;
    const nowCurrentIdx = Math.min(
      data.reviewInfosForMember.length - 1,
      currentStartItem + 3,
    );
    scrollTo(scrollContainerRef.current, nowCurrentIdx);
    setCurrentStartItem(nowCurrentIdx);
  };

  return (
    <section className="flex w-full flex-col gap-y-[100px] py-40">
      <div className="flex flex-col px-40 text-sub-400">
        <h2 className="text-h2 font-semibold">최근 후기</h2>
        <p className="mt-8 text-2 font-medium">
          최근 워케이션을 다녀온 직원들의 후기입니다.
        </p>
      </div>
      <div className="relative flex w-full">
        <Image
          src={LeftKeyIcon}
          alt="left-key-icon"
          width={50}
          height={50}
          className="absolute left-11 top-1/2 -translate-y-1/2 hover:scale-110"
          onClick={handleClickLeft}
        />
        <Image
          src={RightKeyIcon}
          alt="right-key-icon"
          width={50}
          height={50}
          className="absolute right-11 top-1/2 -translate-y-1/2 hover:scale-110"
          onClick={handleClickRight}
        />
        <div
          ref={scrollContainerRef}
          className="flex snap-x scroll-pl-40 gap-x-8 overflow-x-scroll px-40 scrollbar-hide"
        >
          {!data ? (
            isLoading ? (
              <div className="flex h-[307px] w-full items-center justify-center">
                <BeatLoader color="#FDE000" className="mx-auto" />
              </div>
            ) : isError ? (
              <NetworkError />
            ) : (
              <NetworkError />
            )
          ) : (
            data.reviewInfosForMember.map((review) => (
              <RecentReviewItem
                key={review.reviewId}
                review={review}
                onClick={() => {
                  router.push(`/workation/${review.wktId}`);
                }}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentReviewSection;
