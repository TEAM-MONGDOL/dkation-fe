import UserSubtitleAtom from '@/_components/user/common/atoms/UserSubtitleAtom';
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
              className="flex h-16 w-48 min-w-48 items-center rounded-full bg-primary"
            >
              <p className="ml-2.5 mr-4 h-12 w-12 rounded-full bg-white pt-3 text-center">
                {winner.waitingNum < 0 ? '당첨' : winner.waitingNum}
              </p>
              <p>
                {winner.department} {winner.name}
              </p>
            </div>
          ))}
          {data?.wktWaitingUserInfos.map((waiter) => (
            <div
              key={waiter.accountId}
              className="flex h-16 w-48 min-w-48 items-center rounded-full bg-primary/50"
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

export default WkResultInfo;
