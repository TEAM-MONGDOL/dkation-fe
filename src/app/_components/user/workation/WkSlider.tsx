import React, { useState, useEffect } from 'react';
import UserSubtitleAtom from '@/_components/user/common/atoms/UserSubtitleAtom';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import { useGetWkSimulationQuery } from '@/_hooks/user/useGetWkSimulationQuery';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';

const Slider = ({ id }: { id: number }) => {
  const [animate, setAnimate] = useState(false);
  const [hoveredAccount, setHoveredAccount] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ left: '0%' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const restartAnimation = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  const { data, isLoading, isError } = useGetWkSimulationQuery({ wktId: id });

  if (isLoading) return;
  if (isError) return;
  if (!data) return;

  const totalMembers = data?.raffleMemberIndexInfos?.length || 1;
  const totalRange = data?.raffleMemberIndexInfos.reduce((max, member) => {
    return Math.max(max, member.raffleIndex);
  }, 0);

  const getSliderWidth = (index: number) => {
    if (index === 0) {
      return (data.raffleMemberIndexInfos[0].raffleIndex / totalRange) * 100;
    }
    const prevIndex = data.raffleMemberIndexInfos[index - 1].raffleIndex;
    const currIndex = data.raffleMemberIndexInfos[index].raffleIndex;
    return ((currIndex - prevIndex) / totalRange) * 100;
  };

  const calculateLeftPosition = (index: number) => {
    let left = 0;
    /* eslint-disable no-plusplus */
    for (let i = 0; i < index; i++) {
      left += getSliderWidth(i);
    }
    return left;
  };

  const handleMouseEnter = (accountId: string, index: number) => {
    setHoveredAccount(accountId);
    setTooltipPosition({
      left: `${calculateLeftPosition(index) + getSliderWidth(index) / 3}%`,
    });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredAccount(null);
    setHoveredIndex(null);
  };

  return (
    <div>
      {data.raffleWinnerInfos[0] && (
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
            {data.rafflePickedIndexInfos.map((winner) => (
              <div key={winner.accountId}>{winner.pickedIndex}</div>
            ))}
            {data?.raffleMemberIndexInfos.map((member, index) => (
              <div
                key={member.accountId}
                className="absolute top-0 h-full cursor-pointer rounded-full"
                style={{
                  left: `${calculateLeftPosition(index)}%`,
                  width: `${getSliderWidth(index)}%`,
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
      )}
    </div>
  );
};

export default Slider;
