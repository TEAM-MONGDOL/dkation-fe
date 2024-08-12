'use client';

import { useGetWkListQuery } from '@/_hooks/admin/useGetWktListQuery';
import Image from 'next/image';
import { LeftKeyIcon, RightKeyIcon } from '@/_assets/icons';
import { useEffect, useRef, useState } from 'react';
import WktListItem from './WktListItem';

const WktListSection = () => {
  const scrollContainerRef = useRef(null);
  const [currentStartItem, setCurrentStartItem] = useState(0);
  const { data, isLoading, isError } = useGetWkListQuery({
    // status: 'ONGOING',
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
    console.log('left : ', nowCurrentIdx);
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
    console.log('right : ', nowCurrentIdx);
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
              <div>loading...</div>
            ) : isError ? (
              <div>error...</div>
            ) : (
              <div>no data...</div>
            )
          ) : (
            data.wktInfos.map((wktInfo) => (
              <WktListItem key={wktInfo.wktId} wktInfo={wktInfo} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default WktListSection;
