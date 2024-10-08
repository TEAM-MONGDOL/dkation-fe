'use client';

import NetworkError from '@/_components/common/networkError';
import { useRouter } from 'next/navigation';
import { useGetWkListQuery } from '@/_hooks/admin/useGetWktListQuery';
import Image from 'next/image';
import { LeftKeyIcon, RightKeyIcon } from '@/_assets/icons';
import { useRef, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import WktListItem from './WktListItem';

const WktListSection = () => {
  const router = useRouter();
  const scrollContainerRef = useRef(null);
  const [currentStartItem, setCurrentStartItem] = useState(0);
  const { data, isLoading, isError } = useGetWkListQuery({
    status: 'ONGOING',
    pageParam: {
      page: 1,
      size: 10,
    },
  });

  const scrollTo = (scrollContainer: HTMLDivElement, idx: number) => {
    scrollContainer.scrollTo({
      left: idx * 545,
      behavior: 'smooth',
    });
  };

  const handleClickLeft = () => {
    if (!scrollContainerRef.current || !data || data.wktInfos.length < 1)
      return;
    const nowCurrentIdx = Math.max(0, currentStartItem - 3);
    scrollTo(scrollContainerRef.current, nowCurrentIdx);
    setCurrentStartItem(nowCurrentIdx);
  };

  const handleClickRight = () => {
    if (!scrollContainerRef.current || !data || data.wktInfos.length < 1)
      return;
    const nowCurrentIdx = Math.min(
      data.wktInfos.length - 1,
      currentStartItem + 3,
    );
    scrollTo(scrollContainerRef.current, nowCurrentIdx);
    setCurrentStartItem(nowCurrentIdx);
  };

  return (
    <section className="flex w-full flex-col gap-y-[100px] border-b border-sub-100 py-40">
      <h2 className="px-40 text-h2 font-semibold text-sub-400">
        모집 중인 워케이션
      </h2>
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
              <div className="flex h-[474px] w-full items-center justify-center">
                <BeatLoader color="#FDE000" className="mx-auto" />
              </div>
            ) : isError ? (
              <div className="flex h-[474px] w-full items-center justify-center">
                <NetworkError />
              </div>
            ) : (
              <div className="flex h-[474px] w-full items-center justify-center">
                <NetworkError />
              </div>
            )
          ) : data.pageInfo.totalElements <= 0 ? (
            <div className="flex h-[474px] w-full items-center justify-center">
              <p className="text-sub-400">모집 중인 워케이션이 없습니다.</p>
            </div>
          ) : (
            data.wktInfos.map((wktInfo) => (
              <WktListItem
                key={wktInfo.wktId}
                wktInfo={wktInfo}
                onClick={() => {
                  router.push(`/workation/${wktInfo.wktId}`);
                }}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default WktListSection;
