'use client';

import place from '@/_assets/images/place_impy.png';
import Image from 'next/image';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import { useRouter } from 'next/navigation';
import UserSubtitleAtom from '@/_components/user/common/atoms/UserSubtitleAtom';
import React from 'react';
import WkDetailInfo from '@/_components/user/workation/WkDetailInfo';
import WkResultInfo from '@/_components/user/workation/WkResultInfo';
import WkReviewInfo from '@/_components/user/workation/WkReviewInfo';

const UserWkDetailPage = () => {
  const router = useRouter();
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
            <p className="mb-0.5">모집 기간 : yyyy.mm.dd - yyy.mm.dd</p>
            <p className="mb-0.5">워케이션 기간 : yyyy.mm.dd - yyy.mm.dd</p>
            <p>주소 : 강원 양양군 현북면 하조대해안길 119</p>
          </div>
          <UserButtonAtom
            onClick={() => router.push('/workation/submit')}
            className="ml-auto mt-auto rounded-[8px]"
            buttonStyle="black"
            text="응모하기"
            type="button"
            size="md"
          />
        </div>
        <div className="mt-24 flex h-14 justify-between">
          <button className="w-full border border-sub-100 bg-sub-300 text-white">
            상세정보
          </button>
          <button className="w-full border border-sub-100">추첨결과</button>
          <button className="w-full border border-sub-100">후기</button>
        </div>
        <div className="mt-16 flex flex-col" key="상세정보">
          <WkDetailInfo />
        </div>
        <div className="mt-16 flex flex-col" key="추첨결과">
          <WkResultInfo />
        </div>
        <div className="mt-16 flex flex-col" key="후기">
          <WkReviewInfo />
        </div>
      </div>
    </section>
  );
};

export default UserWkDetailPage;
