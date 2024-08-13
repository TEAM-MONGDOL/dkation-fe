import Image from 'next/image';
import UserSubtitleAtom from '@/_components/user/common/atoms/UserSubtitleAtom';
import React from 'react';
import KakaoMapContainer from '@/_components/common/containers/KakaoMapContainer';

export interface WkDetailProps {
  description: string;
  url: string[] | undefined;
  longitude: string;
  latitude: string;
}

const WkDetailInfo = ({
  description,
  url,
  longitude,
  latitude,
}: WkDetailProps) => {
  return (
    <div>
      <div className="mt-8 flex w-full flex-col items-center justify-center">
        {url &&
          url.length > 0 &&
          url.map((imageUrl, index) => (
            <div key={imageUrl} className="mb-4 w-full max-w-2xl">
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
      {latitude && longitude && (
        <>
          <UserSubtitleAtom subtitle="오시는 길" />
          <KakaoMapContainer latitude={latitude} longitude={longitude} />
        </>
      )}
    </div>
  );
};
export default WkDetailInfo;
