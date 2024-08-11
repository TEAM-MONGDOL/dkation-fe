import UserSubtitleAtom from '@/_components/user/common/atoms/UserSubtitleAtom';
import React from 'react';
import WkSlider from '@/_components/user/workation/WkSlider';

const WkResultInfo = () => {
  return (
    <div>
      <WkSlider />
      <div className="flex flex-col">
        <UserSubtitleAtom subtitle="추첨 결과" />
        <div className="flex justify-between">
          <div className="flex h-16 w-48 items-center rounded-full bg-primary">
            <p className="ml-2.5 mr-3.5 h-12 w-12 rounded-full bg-white pt-2.5 text-center">
              12
            </p>
            <p>개발팀 홍길동</p>
          </div>
          <div className="flex h-16 w-48 items-center rounded-full bg-primary">
            <p className="ml-2.5 mr-3.5 h-12 w-12 rounded-full bg-white pt-2.5 text-center">
              12
            </p>
            <p>개발팀 홍길동</p>
          </div>
          <div className="flex h-16 w-48 items-center rounded-full bg-primary/50">
            <p className="ml-2.5 mr-3.5 h-12 w-12 rounded-full bg-white pt-2.5 text-center">
              12
            </p>
            <p>개발팀 홍길동</p>
          </div>
          <div className="flex h-16 w-48 items-center rounded-full bg-primary/50">
            <p className="ml-2.5 mr-3.5 h-12 w-12 rounded-full bg-white pt-2.5 text-center">
              12
            </p>
            <p>개발팀 홍길동</p>
          </div>
          <div className="flex h-16 w-48 items-center rounded-full bg-primary/50">
            <p className="ml-2.5 mr-3.5 h-12 w-12 rounded-full bg-white pt-2.5 text-center">
              12
            </p>
            <p>개발팀 홍길동</p>
          </div>
        </div>
        <div className="mt-9 w-full bg-cus-100 py-14 text-center text-h1">
          그래프
        </div>
      </div>
    </div>
  );
};

export default WkResultInfo;
