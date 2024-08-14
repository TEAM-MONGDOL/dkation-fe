import React, { useState, useEffect } from 'react';
import UserSubtitleAtom from '@/_components/user/common/atoms/UserSubtitleAtom';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';

const Slider = () => {
  const [animate, setAnimate] = useState(false);

  const restartAnimation = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <UserSubtitleAtom subtitle="결과 시뮬레이션" />
        <UserButtonAtom
          className="rounded-[8px]"
          text="다시 보기"
          size="md"
          buttonStyle="white"
          type="button"
          onClick={restartAnimation}
        />
      </div>
      <div className="relative h-5 w-full overflow-visible rounded-full bg-gray-300">
        <div
          className={`${animate ? 'animate-fillTrack' : ''} absolute left-0 top-0 h-full rounded-full bg-primary`}
        />
        <div
          className={`${animate ? 'animate-slideHandle' : ''} absolute h-10 w-10 rounded-full border-[3.5px] border-white bg-primary`}
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        />
      </div>
    </div>
  );
};

export default Slider;
