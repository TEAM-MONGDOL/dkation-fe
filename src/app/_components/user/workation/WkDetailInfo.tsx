import Image from 'next/image';
import UserSubtitleAtom from '@/_components/user/common/atoms/UserSubtitleAtom';
import React from 'react';

export interface WkDetailProps {
  description: string;
  url: string[] | undefined;
}

const WkDetailInfo = ({ description, url }: WkDetailProps) => {
  return (
    <div>
      <div className="mt-8">
        {url &&
          url.length > 0 &&
          url.map((imageUrl, index) => (
            <div key={imageUrl} className="mb-4">
              <Image
                src={imageUrl}
                alt={`Image ${index}`}
                className="h-auto w-full object-cover"
                width={800}
                height={600}
              />
            </div>
          ))}
      </div>{' '}
      <div className="mt-16 bg-[#F9F9F9] p-10">{description}</div>
      <UserSubtitleAtom subtitle="오시는 길" />
      {/* 지도 라이브러리 */}
    </div>
  );
};
export default WkDetailInfo;
