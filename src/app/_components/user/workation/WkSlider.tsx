import React, { useState, useEffect, useRef } from 'react';
import UserSubtitleAtom from '@/_components/user/common/atoms/UserSubtitleAtom';
import UserButtonAtom from '@/_components/user/common/atoms/UserButtonAtom';
import { useGetWkSimulationQuery } from '@/_hooks/user/useGetWkSimulationQuery';
import { useSession } from 'next-auth/react';

const Slider = ({ id }: { id: number }) => {
  const [animate, setAnimate] = useState(false);
  const [hoveredAccount, setHoveredAccount] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ left: '0%' });
  const [visibleWinners, setVisibleWinners] = useState<number[]>([]);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { data: sessionData } = useSession();
  const userId = String(sessionData?.accountId);

  const { data, isLoading, isError } = useGetWkSimulationQuery({ wktId: id });

  const totalRange =
    data?.raffleMemberIndexInfos?.reduce((max, member) => {
      return Math.max(max, member.raffleIndex);
    }, 0) ?? 0;

  const getSliderWidth = (index: number) => {
    if (!data) return 0;
    if (index === 0) {
      return (data.raffleMemberIndexInfos[0].raffleIndex / totalRange) * 100;
    }
    const prevIndex = data.raffleMemberIndexInfos[index - 1]?.raffleIndex;
    const currIndex = data.raffleMemberIndexInfos[index]?.raffleIndex;
    return ((currIndex - prevIndex) / totalRange) * 100;
  };

  const calculateLeftPosition = (index: number) => {
    let left = 0;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < index; i++) {
      left += getSliderWidth(i);
    }
    return left;
  };

  const sortedRafflePickedIndexInfos = [
    ...(data?.rafflePickedIndexInfos || []),
  ].sort((a, b) => a.pickedIndex - b.pickedIndex);

  const pausePositions = sortedRafflePickedIndexInfos.map((winner) => {
    return {
      position: (winner.pickedIndex / totalRange) * 100,
    };
  });

  const totalDuration = 30;
  const holdTime = 2;
  const runningTime = totalDuration - holdTime * pausePositions.length;

  const generateKeyframes = () => {
    const keyframes: { [key: string]: { left: string } } = {
      '0%': { left: '0%' },
    };

    let totalPauseTime = 0;

    pausePositions.forEach((positionObj) => {
      const positionKey = `${(((positionObj.position * runningTime) / 100 + totalPauseTime) / totalDuration) * 100}%`;
      keyframes[positionKey] = { left: `${positionObj.position}%` };

      totalPauseTime += holdTime;
      const holdKey = `${(((positionObj.position * runningTime) / 100 + totalPauseTime) / totalDuration) * 100}%`;
      keyframes[holdKey] = { left: `${positionObj.position}%` };
    });

    keyframes['100%'] = { left: '100%' };
    return keyframes;
  };

  const triggerWinnerVisibility = () => {
    let totalPauseTime = 0;

    pausePositions.forEach((_, index) => {
      const delay =
        (pausePositions[index].position * runningTime) / 100 +
        totalPauseTime * 1000;

      setTimeout(
        () => {
          setVisibleWinners((prev) => [...prev, index]);
        },
        delay + holdTime * 1000,
      );

      totalPauseTime += holdTime;
    });
  };

  const restartAnimation = () => {
    setAnimate(false);
    setVisibleWinners([]);
    setTimeout(() => {
      setAnimate(true);
      triggerWinnerVisibility();
    }, 10);
  };

  useEffect(() => {
    if (data && !isLoading && !isError) {
      setAnimate(false);
      setVisibleWinners([]);
      setTimeout(() => {
        setAnimate(true);
        triggerWinnerVisibility();
      }, 10);
    }
  }, [data, isLoading, isError]);

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

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!data || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const xPos = event.clientX - rect.left;
    const relativePosition = (xPos / rect.width) * 100;

    let closestAccount: string | null = null;
    let minDiff = Infinity;

    data.raffleMemberIndexInfos.forEach((member, index) => {
      const startPercent = index === 0 ? 0 : calculateLeftPosition(index);
      const endPercent = startPercent + getSliderWidth(index);

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

  const customKeyframes = generateKeyframes();

  if (isLoading || isError || !data) return null;

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
            className="relative my-8 h-5 w-full overflow-visible rounded-full bg-gray-300"
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
                className={`absolute top-0 h-full rounded-full bg-[#FFF5A5] ${
                  animate ? 'animate-fillTrack' : ''
                }`}
              />

              <div
                className={`${
                  animate ? 'linear animate-slideHandle' : ''
                } absolute z-50 h-6 w-6 rounded-full border-[2px] border-[#FFFBE0] bg-primary`}
                style={{
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
              {data?.raffleMemberIndexInfos.map((member, index) => {
                const isWinner = visibleWinners.includes(
                  sortedRafflePickedIndexInfos.findIndex(
                    (winner) => winner.accountId === member.accountId,
                  ),
                );

                return (
                  <div
                    key={member.accountId}
                    className="absolute top-0 h-full cursor-pointer rounded-full"
                    style={{
                      left: `${calculateLeftPosition(index)}%`,
                      width: `${getSliderWidth(index)}%`,
                      zIndex: 10,
                      backgroundColor: isWinner
                        ? '#FBD501'
                        : member.accountId === userId
                          ? '#FFFFFF'
                          : 'transparent',
                    }}
                    onMouseEnter={() =>
                      handleMouseEnter(member.accountId, index)
                    }
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
                );
              })}
              {sortedRafflePickedIndexInfos.map((winner, index) => (
                <div
                  key={winner.accountId}
                  className="absolute z-50 rounded-regular bg-button px-3.5 pb-1"
                  style={{
                    left: `${(winner.pickedIndex / totalRange) * 100}%`,
                    top: '-40px',
                    transform: 'translateX(-50%)',
                    display: visibleWinners.includes(index) ? 'block' : 'none',
                  }}
                >
                  <span className="text-xs text-white">당첨</span>
                  <div className="relative">
                    <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 transform border-x-8 border-t-8 border-x-transparent border-t-button" />
                  </div>
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
        </div>
      )}
    </div>
  );
};

export default Slider;
