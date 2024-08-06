import React from 'react';
import Image from 'next/image';
import { StarRateIcon } from '@/_assets/icons';
import UserFilteringAtom from '@/_components/user/common/atoms/UserFilteringAtom';

const WkReviewInfo = () => {
  return (
    <div>
      {/* 필터링 추가예정 */}
      <UserFilteringAtom type="SORT" onClick={() => {}} />
      <div className="rounded-lg border">
        <div className="flex flex-col px-8">
          <div className="my-5 flex items-center">
            <p className="mr-4 text-h3 font-semibold">홍길동</p>
            <p className="text-4 text-sub-200">
              개발팀 00부서 + yyyy년 n월 n주차 워케이션
            </p>
            <div className="ml-auto flex flex-col justify-center">
              <div className="mb-1 flex">
                <Image src={StarRateIcon} alt="StarRateIcon" />
                <Image src={StarRateIcon} alt="StarRateIcon" />
                <Image src={StarRateIcon} alt="StarRateIcon" />
                <Image src={StarRateIcon} alt="StarRateIcon" />
                <Image src={StarRateIcon} alt="StarRateIcon" />
              </div>
              <p>5점(정말 최고에요)</p>
            </div>
          </div>
          <hr />
          <p className="pb-14 pt-7">
            여기 정말 좋아요. 미쳤어요. 매일오고 싶어요.
          </p>
        </div>
        <div className="flex justify-end bg-sub-100/10 px-8 py-3">
          yyyy.mm.dd
        </div>
      </div>
    </div>
  );
};

export default WkReviewInfo;
