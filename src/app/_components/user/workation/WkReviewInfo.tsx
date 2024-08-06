import React from 'react';
import Image from 'next/image';
import { StarRateIcon } from '@/_assets/icons';

const WkReviewInfo = () => {
  return (
    <div className="rounded-lg border">
      <div className="px-8">
        <p>홍길동</p>
        <p>개발팀 00부서 + yyyy년 n월 n주차 워케이션</p>
        <div>
          <Image src={StarRateIcon} alt="StarRateIcon" />
          <p>5점(정말 최고에요)</p>
        </div>
        <hr />
        <p>여기 정말 좋아요. 미쳤어요. 매일오고 싶어요.</p>
      </div>
      <div className="bg-sub-100/10 px-8">yyyy.mm.dd</div>
    </div>
  );
};

export default WkReviewInfo;
