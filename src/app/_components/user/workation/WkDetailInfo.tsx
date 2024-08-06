import Image from 'next/image';
import place from '@/_assets/images/place_impy.png';
import UserSubtitleAtom from '@/_components/user/common/atoms/UserSubtitleAtom';
import React from 'react';

const WkDetailInfo = () => {
  return (
    <div>
      <Image className="mx-auto" src={place} alt="place" />
      <div className="mt-16 bg-[#F9F9F9] p-10">상세정보입니다.</div>
      <UserSubtitleAtom subtitle="오시는 길" />
      {/* 지도 라이브러리 */}
    </div>
  );
};
export default WkDetailInfo;
