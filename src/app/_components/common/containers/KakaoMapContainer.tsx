import React, { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMapContainer = ({
  longitude,
  latitude,
}: {
  longitude: string;
  latitude: string;
}) => {
  useEffect(() => {
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=8ebee3e39cf6ba8b3f932caeaae1c08f&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          // draggable: false,
          center: new window.kakao.maps.LatLng(
            Number(latitude),
            Number(longitude),
          ),
          level: 3,
        };

        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(
          Number(latitude),
          Number(longitude),
        );

        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  }, []);

  return (
    <section className="flex w-full flex-col items-center justify-center pt-4">
      <div className="h-96 w-full">
        <div id="map" style={{ width: '100%', height: '100%' }} />
      </div>
    </section>
  );
};

export default KakaoMapContainer;
