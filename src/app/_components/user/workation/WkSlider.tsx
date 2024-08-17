import React, { useState, useEffect, useRef } from 'react';
import UserSubtitleAtom from '@/_components/user/common/atoms/UserSubtitleAtom';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import { useGetWkSimulationQuery } from '@/_hooks/user/useGetWkSimulationQuery';
import { useSession } from 'next-auth/react';

const Slider = ({ id }: { id: number }) => {
  const [animate, setAnimate] = useState(false);
  const [hoveredAccount, setHoveredAccount] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ left: '0%' });
  const sliderRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleWinner, setVisibleWinner] = useState(null);
  const { data: sessionData } = useSession();
  const userId = String(sessionData?.accountId);

  const restartAnimation = () => {
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
      setVisibleWinner(null); // Ensure winner is reset on animation restart
    }, 10);
  };

  useEffect(() => {
    setAnimate(true);
  }, []);

  const { data, isLoading, isError } = useGetWkSimulationQuery({ wktId: id });
  if (isLoading || isError || !data) return;

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
    /* eslint-disable no-plusplus */
    for (let i = 0; i < index; i++) {
      left += getSliderWidth(i);
    }
    return left;
  };

  const handleMouseEnter = (accountId: string, index: number) => {
    setHoveredAccount(accountId);
    setTooltipPosition({
      left: `${calculateLeftPosition(index) + getSliderWidth(index)}%`,
    });
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredAccount(null);
    setHoveredIndex(null);
  };

  const handleMouseMove = (event) => {
    const rect = sliderRef.current.getBoundingClientRect();
    const xPos = event.clientX - rect.left; // Calculate mouse position within the slider
    const relativePosition = (xPos / rect.width) * 100; // Convert to relative percentage position

    // Find the closest account based on mouse position percentage
    let closestAccount = null;
    let minDiff = Infinity;

    data.raffleMemberIndexInfos.forEach((member, index) => {
      // Calculate the start and end percentage positions for this index
      const startPercent = index === 0 ? 0 : calculateLeftPosition(index);
      const endPercent = startPercent + getSliderWidth(index);

      // Check if the current mouse position falls within this range
      if (relativePosition >= startPercent && relativePosition < endPercent) {
        const diff = Math.min(
          Math.abs(startPercent - relativePosition),
          Math.abs(endPercent - relativePosition),
        );
        if (diff < minDiff) {
          minDiff = diff;
          closestAccount = member.accountId;
        }
      }
    });

    if (closestAccount) {
      setHoveredAccount(closestAccount);
      setTooltipPosition({ left: `${(xPos / rect.width) * 100}%` });
    }
  };

  // pausePositions 계산 로직 변경
  const pausePositions = data.rafflePickedIndexInfos
    .map((winner) => {
      return {
        position: (winner.pickedIndex / totalRange) * 100,
        accountId: winner.accountId,
        pickedIndex: winner.pickedIndex,
      };
    })
    .sort((a, b) => a.pickedIndex - b.pickedIndex) // pickedIndex를 기준으로 오름차순 정렬
    .map((winner) => winner.position); // 최종적으로 포지션만 추출

  // 동적으로 키프레임 생성
  const generateKeyframes = () => {
    const keyframes = {
      '0%': { left: '0%' },
    };

    let totalPauseTime = 0;
    const totalDuration = 15; // 전체 애니메이션 시간 (초)
    const holdTime = 2; // 각 위치에서 멈출 시간 (초 단위)
    const runningTime = totalDuration - holdTime * pausePositions.length; // 멈추지 않는 동안의 총 시간

    pausePositions.forEach((position, i) => {
      const positionKey = `${(((position * runningTime) / 100 + totalPauseTime) / totalDuration) * 100}%`;
      keyframes[positionKey] = { left: `${position}%` };

      totalPauseTime += holdTime;
      const holdKey = `${(((position * runningTime) / 100 + totalPauseTime) / totalDuration) * 100}%`;
      keyframes[holdKey] = { left: `${position}%` };
    });

    keyframes['100%'] = { left: '100%' };
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
          <div
            className="relative h-5 w-full overflow-visible rounded-full bg-gray-300"
            ref={sliderRef}
            onMouseMove={handleMouseMove}
          >
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
                className={`absolute top-0 h-full rounded-full bg-[#FFF5A5] ${animate ? 'animate-fillTrack' : ''}`}
              />

              <div
                className={`${animate ? 'linear animate-slideHandle' : ''} absolute z-50 h-6 w-6 rounded-full border-[2px] border-[#FFFBE0] bg-primary`}
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
                      member.accountId === userId ? '#FDE000' : 'transparent',
                  }}
                  onMouseEnter={() => handleMouseEnter(member.accountId, index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {member.accountId === userId && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xs text-sub-200">
                      {userId}
                    </div>
                  )}
                  {hoveredIndex === index && (
                    <div className="absolute top-0 z-0 h-full w-full rounded-full bg-yellow-800/20" />
                  )}
                </div>
              ))}
              {data?.rafflePickedIndexInfos.map((winner, index) => (
                <div
                  key={winner.accountId}
                  className="absolute z-50 rounded-regular bg-button px-3.5 pb-1"
                  style={{
                    left: `${(winner.pickedIndex / totalRange) * 100}%`,
                    top: '-40px',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <span className="text-xs text-white">당첨</span>
                </div>
              ))}
              {hoveredAccount && (
                <div
                  className="absolute mt-7 text-sm text-sub-200"
                  style={{
                    left: tooltipPosition.left,
                  }}
                >
                  ID {hoveredAccount}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
