import React, { useState, useEffect } from 'react';
import UserSubtitleAtom from '@/_components/user/common/atoms/UserSubtitleAtom';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import { useGetWkSimulationQuery } from '@/_hooks/user/useGetWkSimulationQuery';
import { useSession } from 'next-auth/react';

const Slider = ({ id }: { id: number }) => {
  const [animate, setAnimate] = useState(false);
  const [hoveredAccount, setHoveredAccount] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ left: '0%' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { data: sessionData } = useSession();
  const userId = String(sessionData?.accountId);

  const restartAnimation = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  const { data, isLoading, isError } = useGetWkSimulationQuery({ wktId: id });

  if (isLoading) return null;
  if (isError) return null;
  if (!data) return null;

  const totalRange = data?.raffleMemberIndexInfos.reduce((max, member) => {
    return Math.max(max, member.raffleIndex);
  }, 0);

  const getSliderWidth = (index: number) => {
    if (index === 0) {
      return (data.raffleMemberIndexInfos[0].raffleIndex / totalRange) * 100;
    }
    const prevIndex = data.raffleMemberIndexInfos[index - 1]?.raffleIndex;
    const currIndex = data.raffleMemberIndexInfos[index]?.raffleIndex;
    return ((currIndex - prevIndex) / totalRange) * 100;
  };

  const calculateLeftPosition = (index: number) => {
    let left = 0;
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

  // 일치하는 accountId의 raffleIndex 값을 기반으로 멈추는 위치를 계산
  const pausePositions = data.rafflePickedIndexInfos
    .map((winner) => {
      const matchingMemberIndex = data.raffleMemberIndexInfos.findIndex(
        (member) => member.accountId === winner.accountId,
      );
      if (matchingMemberIndex !== -1) {
        const currentPos = calculateLeftPosition(matchingMemberIndex);
        const nextPos =
          matchingMemberIndex < data.raffleMemberIndexInfos.length - 1
            ? calculateLeftPosition(matchingMemberIndex + 1)
            : 100;
        // 당첨자 위치와 그 다음 위치 사이의 중간점
        return (currentPos + nextPos) / 2;
      }
      return null;
    })
    .filter((position) => position !== null);

  // 동적으로 키프레임 생성
  const generateKeyframes = () => {
    const keyframes: { [key: string]: { left: string } } = {
      '0%': { left: '0%' },
    };

    let totalPauseTime = 0;
    const totalDuration = 15; // 전체 애니메이션 시간 (초)
    const holdTime = 2; // 각 위치에서 멈출 시간 (초 단위)
    const runningTime = totalDuration - holdTime * pausePositions.length; // 멈추지 않는 동안의 총 시간

    pausePositions?.forEach((position, i) => {
      const positionKey = `${(((position! * runningTime) / 100 + totalPauseTime) / totalDuration) * 100}%`;
      keyframes[positionKey] = { left: `${position}%` };

      totalPauseTime += holdTime;
      const holdKey = `${(((position! * runningTime) / 100 + totalPauseTime) / totalDuration) * 100}%`;
      keyframes[holdKey] = { left: `${position}%` };
    });

    keyframes['100%'] = { left: 'calc(100%)' };
    return keyframes;
  };

  // 동적으로 생성된 키프레임을 스타일 태그에 주입
  const customKeyframes = generateKeyframes();

  return (
    <div>
      {data.rafflePickedIndexInfos[0] && (
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
            <style>
              {`
                @keyframes slideHandle {
                  ${Object.entries(customKeyframes)
                    .map(([key, value]) => `${key} { left: ${value.left}; }`)
                    .join('\n')}
                }
                @keyframes fillTrack {
                  ${Object.entries(customKeyframes)
                    .map(([key, value]) => `${key} { width: ${value.left}; }`)
                    .join('\n')}
                }
              `}
            </style>
            <div
              className={`absolute top-0 h-full rounded-full bg-primary ${animate ? 'animate-fillTrack' : ''}`}
            />

            <div
              className={`${animate ? 'linear animate-slideHandle' : ''} absolute z-50 h-6 w-6 rounded-full border-[2.5px] border-white bg-yellow-500/90`}
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
                  left: `${calculateLeftPosition(index)}%`,
                  width: `${getSliderWidth(index)}%`,
                  zIndex: 10,
                  backgroundColor:
                    member.accountId === userId ? 'orange' : 'transparent',
                }}
                onMouseEnter={() => handleMouseEnter(member.accountId, index)}
                onMouseLeave={handleMouseLeave}
              >
                {member.accountId === userId && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xs font-bold text-white">
                    {userId}
                  </div>
                )}
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
