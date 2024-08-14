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
            : 100; // 마지막 멤버라면 끝까지
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
=======
import React from 'react';
import WkSlider from '@/_components/user/workation/WkSlider';
import { useGetWkPenaltyQuery } from '@/_hooks/admin/useGetWkPenaltyQuery';
import WkBattingGraph from '@/_components/common/graph/WkBattingGraph';
import InfoSectionModule from '@/_components/common/modules/InfoSectionModule';

const WkResultInfo = ({ id }: { id: number }) => {
  const { data, isLoading, isError } = useGetWkPenaltyQuery({ wktId: id });

  const gcd = (a: number, b: number): number => {
    if (b === 0) return a;
    return gcd(b, a % b);
  };

  const getReducedRatio = (
    totalRecruit: number,
    totalApply: number,
  ): string => {
    const divisor = gcd(totalRecruit, totalApply);
    return `${totalRecruit / divisor} : ${totalApply / divisor}`;
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류 발생</div>;
  if (!data) return <div>데이터 없음</div>;

  const { totalRecruit, totalApply } = data.wktResultInfo;
  const reducedRatio = getReducedRatio(totalRecruit, totalApply);

  return (
    <div>
      <WkSlider />
      <div className="flex flex-col">
        <UserSubtitleAtom subtitle="추첨 결과" />
        <div className="flex w-full justify-between gap-3.5 overflow-x-auto scrollbar-hide">
          {data?.wktWinningUserInfos.map((winner) => (
            <div
              key={winner.accountId}
              className={`flex h-16 w-48 min-w-48 items-center rounded-full ${winner.applyStatusType === 'CONFIRM' || 'VISITED' ? 'bg-primary' : 'bg-primary/50'}`}
            >
              <p className="ml-2.5 mr-4 h-12 w-12 rounded-full bg-white pt-3 text-center">
                최초
              </p>
              <p>
                {winner.department} {winner.name}
              </p>
            </div>
          ))}
          {data?.wktWaitingUserInfos.map((waiter) => (
            <div
              key={waiter.accountId}
              className={`flex h-16 w-48 min-w-48 items-center rounded-full ${waiter.applyStatusType === ('CONFIRM' || 'VISITED') ? 'bg-primary' : 'bg-primary/50'}`}
            >
              <p className="ml-2.5 mr-3.5 h-12 w-12 rounded-full bg-white pt-2.5 text-center">
                {waiter.waitingNum}
              </p>
              <p>
                {waiter.department} {waiter.name}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex gap-5">
              <div className="flex w-full flex-col gap-4">
                <p className="text-3 font-bold">경쟁률</p>
                <div className="flex w-full flex-col gap-1 border py-7 text-center">
                  <p className="text-h1 font-bold">{reducedRatio}</p>
                  <p className="text-4 text-sub-300">
                    신청 인원 {totalRecruit}명
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-4">
                <p className="text-3 font-bold">포인트 통계</p>
                <div className="w-full border px-3 py-5">
                  <InfoSectionModule
                    data={[
                      {
                        subtitle: '최대 포인트',
                        content: `${data.wktResultInfo.maxPoint.toString()} P`,
                      },
                      {
                        subtitle: '최소 포인트',
                        content: `${data.wktResultInfo.minPoint.toString()} P`,
                      },
                      {
                        subtitle: '평균 포인트',
                        content: `${Math.floor(data.wktResultInfo.avgPoint).toString()} P`,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4" />
            <div>
              <p className="mb-5 text-3 font-bold">베팅 분포도</p>
              <WkBattingGraph
                battings={data?.wktDistributionInfo.wktDistributionCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
