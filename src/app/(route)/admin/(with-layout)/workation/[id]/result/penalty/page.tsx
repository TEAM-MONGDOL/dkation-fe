'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { ExtensionIcon } from '@/_assets/icons';
import InfoSectionModule from '@/_components/common/modules/InfoSectionModule';
import TableContainer from '@/_components/common/containers/TableContainer';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import ModalModule from '@/_components/common/modules/ModalModule';
import { useRouter } from 'next/navigation';
import InputModule from '@/_components/common/modules/InputModule';
import DropdownModule from '@/_components/common/modules/DropdownModule';
import WkResultSide from '@/(route)/admin/(with-layout)/workation/[id]/result/wkResultSide';
import { useGetWkPenaltyQuery } from '@/_hooks/admin/useGetWkPenaltyQuery';
import { usePostPenaltyMutation } from '@/_hooks/admin/usePostPenaltyMutation';
import dayjs from 'dayjs';
import WkBattingGraph from '@/_components/common/graph/WkBattingGraph';
import AdminLoading from '@/_components/admin/adminLoading';
import NetworkError from '@/_components/common/networkError';

interface WkResultProps {
  params: { id: number };
}

const penaltyDisplayTextMapping: {
  [key: string]: string;
} = {
  NOSHOW: '노쇼',
  REPORT: '협력체 신고',
  NEGLIGENCE: '근무 태만',
  ABUSE: '포인트 제도 악용',
};
const penaltyTypeMapping: {
  [key: string]: 'NOSHOW' | 'REPORT' | 'NEGLIGENCE' | 'ABUSE';
} = {
  노쇼: 'NOSHOW',
  '협력체 신고': 'REPORT',
  '근무 태만': 'NEGLIGENCE',
  '포인트 제도 악용': 'ABUSE',
};

const AdminWorkationListPenaltyPage = ({ params }: WkResultProps) => {
  const [isConfirmModelOpen, setIsConfirmModelOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );
  const router = useRouter();
  const { id } = params;
  const { data, isLoading, isError } = useGetWkPenaltyQuery({ wktId: id });
  const { mutate: PostPenalty } = usePostPenaltyMutation({
    successCallback: () => {
      alert('페널티 등록 완료');
      setIsConfirmModelOpen(false);
      setSelectedAccountId(null);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    },
    errorCallback: (error) => {
      alert('이미 페널티가 지급되었습니다.');
      setIsConfirmModelOpen(false);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    },
  });

  if (isLoading) {
    return <AdminLoading />;
  }
  if (isError) {
    return <NetworkError />;
  }
  if (!data) {
    return <NetworkError />;
  }
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

  const { totalRecruit, totalApply } = data.wktResultInfo;
  const reducedRatio = getReducedRatio(totalRecruit, totalApply);
  return (
    <section className="flex">
      <WkResultSide id={id} result />
      <div className="w-full">
        <div className="mb-8 flex gap-2">
          <Image src={ExtensionIcon} alt="StatisticsIcon" />
          <p className="text-h3 font-bold">결과 통계 및 페널티</p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <div className="flex w-full flex-col gap-4">
              <p className="text-3 font-bold">경쟁률</p>
              <div className="flex w-full flex-col gap-1 border py-7 text-center">
                <p className="text-h1 font-bold">{reducedRatio}</p>
                <p className="text-4 text-sub-300">
                  신청 인원 {data.wktResultInfo.totalRecruit}명
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <p className="text-3 font-bold">포인트 통계</p>
              <div className="w-full border px-10 py-5">
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
          <div className="flex w-full flex-col gap-4">
            <p className="text-3 font-bold">배팅 분포도</p>
            <WkBattingGraph
              battings={data?.wktDistributionInfo.wktDistributionCount}
            />
          </div>
          <div className="flex w-full flex-col">
            <p className="text-3 font-bold">페널티 관리</p>
            <TableContainer>
              <TableHeaderModule>
                <TableHeaderAtom width="80px" isFirst>
                  번호
                </TableHeaderAtom>
                <TableHeaderAtom width="130px">사유</TableHeaderAtom>
                <TableHeaderAtom>이름</TableHeaderAtom>
                <TableHeaderAtom>아이디</TableHeaderAtom>
                <TableHeaderAtom width="100px">소속</TableHeaderAtom>
                <TableHeaderAtom width="100px">지급 일시</TableHeaderAtom>
                <TableHeaderAtom width="140px" isLast>
                  패널티
                </TableHeaderAtom>
              </TableHeaderModule>
              <tbody>
                {data.wktWinningUserInfos.length <= 0 ? (
                  <EmptyContainer colSpan={8} />
                ) : (
                  data.wktWinningUserInfos.map((item, index) => (
                    <TableBodyModule key={item.accountId}>
                      <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                      <TableBodyAtom>
                        {item.penaltyType
                          ? penaltyDisplayTextMapping[item.penaltyType]
                          : '-'}
                      </TableBodyAtom>
                      <TableBodyAtom>{item.name}</TableBodyAtom>
                      <TableBodyAtom>{item.accountId}</TableBodyAtom>
                      <TableBodyAtom>{item.department}</TableBodyAtom>
                      <TableBodyAtom>
                        {item.penaltyAssignDate
                          ? dayjs(item.penaltyAssignDate).format('YYYY.MM.DD')
                          : '-'}
                      </TableBodyAtom>
                      <TableBodyAtom isLast>
                        <button
                          onClick={() => {
                            setSelectedAccountId(item.accountId); // Set selected accountId
                            setIsConfirmModelOpen(true);
                          }}
                          className="rounded-full bg-primary px-4 py-1.5 text-4"
                        >
                          부여하기
                        </button>
                      </TableBodyAtom>
                    </TableBodyModule>
                  ))
                )}
              </tbody>
            </TableContainer>
          </div>
        </div>
        {isConfirmModelOpen && (
          <ModalModule
            title="선택한 회원에게 페널티를 부여하시겠습니까?"
            cancelText="취소"
            confirmText="확인"
            onConfirm={() => {
              if (selectedAccountId) {
                PostPenalty({
                  wktId: Number(id),
                  accountId: selectedAccountId,
                  penaltyType: penaltyTypeMapping[selectedType],
                });
              }
            }}
            onCancel={() => {
              setIsConfirmModelOpen(false);
              setSelectedAccountId(null); // Clear selected accountId on cancel
            }}
          >
            <InputModule
              subtitle="해당 워케이션"
              status="disabled"
              value={data.wktWinningUserInfos[0].wktTitle}
            />
            <div className="mt-4 flex flex-col gap-4">
              <p className="text-3 font-semibold">분류</p>
              <DropdownModule
                options={[
                  '노쇼',
                  '협력체 신고',
                  '근무 태만',
                  '포인트 제도 악용',
                ]}
                onSelect={setSelectedType}
                placeholder="페널티 사유를 선택하세요."
                selectedOption={selectedType}
              />
            </div>
          </ModalModule>
        )}
      </div>
    </section>
  );
};

export default AdminWorkationListPenaltyPage;
