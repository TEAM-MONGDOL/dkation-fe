import React, { useState, useEffect } from 'react';
import UserSubtitleAtom from '@/_components/user/common/atoms/UserSubtitleAtom';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import { useGetWkSimulationQuery } from '@/_hooks/user/useGetWkSimulationQuery';

const Slider = ({ id }: { id: number }) => {
  const [animate, setAnimate] = useState(false);
  const [hoveredAccount, setHoveredAccount] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const restartAnimation = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  const { data, isLoading, isError } = useGetWkSimulationQuery({ wktId: id });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data.</div>;

  const totalMembers = data?.raffleMemberIndexInfos?.length || 1;
  const sliderWidth = 100 / totalMembers;

  const handleMouseEnter = (accountId: string, index: number) => {
    setHoveredAccount(accountId);
    setTooltipPosition({
      left: `${index * sliderWidth + (1 / 3) * sliderWidth}%`,
    });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredAccount(null);
    setHoveredIndex(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <UserSubtitleAtom subtitle="결과 시뮬레이션" />
        <UserButtonAtom
          className="rounded-[8px] outline-0"
          text="다시 보기"
          size="md"
          buttonStyle="white"
          type="button"
          onClick={restartAnimation}
        />
      </div>
      <div className="relative h-5 w-full overflow-visible rounded-full bg-gray-300">
        <div
          className={`absolute top-0 h-full rounded-full bg-primary ${animate ? 'animate-fillTrack' : ''}`}
        />

        <div
          className={`${animate ? 'animate-slideHandle' : ''} absolute z-50 h-6 w-6 rounded-full border-[2.5px] border-white bg-yellow-500/90`}
          style={{
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {data?.raffleMemberIndexInfos.map((member, index) => (
          <div
            key={member.accountId}
            className="absolute top-0 h-full cursor-pointer rounded-full"
            style={{
              left: `${index * sliderWidth}%`,
              width: `${sliderWidth}%`,
              zIndex: 10,
              backgroundColor: 'transparent',
            }}
            onMouseEnter={() => handleMouseEnter(member.accountId, index)}
            onMouseLeave={handleMouseLeave}
          >
            {hoveredIndex === index && (
              <div className="absolute top-0 z-0 h-full w-full rounded-full bg-yellow-800/20" />
            )}
          </div>
        ))}

        {hoveredAccount && (
          <div
            className="absolute mt-7 text-sm text-sub-200"
            style={{
              left: tooltipPosition.left,
            }}
          >
            {hoveredAccount}
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
