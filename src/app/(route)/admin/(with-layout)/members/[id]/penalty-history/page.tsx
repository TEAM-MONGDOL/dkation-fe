'use client';

import TableContainer from '@/_components/common/containers/TableContainer';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import { WarningIcon } from '@/_assets/icons';
import SubtitleModule from '@/_components/common/modules/SubtitleModule';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ModalModule from '@/_components/common/modules/ModalModule';
import InputModule from '@/_components/common/modules/InputModule';
import { useGetMemberPenaltyHistoryQuery } from '@/_hooks/admin/useGetMemberPenaltyHistoryQuery';
import dayjs from 'dayjs';
import InfoContentAtom from '@/_components/common/atoms/InfoContentAtom';
import { penaltyList } from '@/_types/adminType';
import { usePostPenaltyMutation } from '@/_hooks/admin/usePostPenaltyMutation';

interface Props {
  params: { id: string };
}

const calculateExpiryDate = (penaltyCount: number, penaltyDate: string) => {
  const penaltyDateObj = dayjs(penaltyDate);
  switch (penaltyCount) {
    case 1:
      return `${penaltyDateObj.add(6, 'month').format('YYYY.MM.DD')} (6개월)`;
    case 2:
      return `${penaltyDateObj.add(12, 'month').format('YYYY.MM.DD')} (12개월)`;
    case 3:
      return '영구정지';
    default:
      return '';
  }
};

const AdminMembersPenaltyHistoryPage = ({ params }: Props) => {
  const accountId = params.id;
  const router = useRouter();
  const [isPenaltyModelOpen, setIsPenaltyModelOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('');
  const [wktId, setWktId] = useState<number>(0); // State to store wktId

  const { data, isLoading, isError } = useGetMemberPenaltyHistoryQuery({
    accountId,
  });

  const penaltyInfos = data?.penaltyInfos || [];
  const mostRecentPenalty = [...penaltyInfos].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0];

  const expiryDate = mostRecentPenalty
    ? calculateExpiryDate(penaltyInfos.length, mostRecentPenalty.createdAt)
    : null;

  const { mutate: PostPenalty } = usePostPenaltyMutation({
    successCallback: () => {
      alert('페널티 등록 완료');
      setIsPenaltyModelOpen(false);
      router.refresh();
    },
    errorCallback: (error) => {
      alert(`${error.message}`);
      setIsPenaltyModelOpen(false);
      router.refresh();
    },
  });

  return (
    <section className="flex w-full flex-col gap-y-10">
      <div className="flex w-full items-center">
        <SubtitleModule
          iconSrc={WarningIcon}
          iconAlt="penalty"
          text="페널티 내역"
        />
      </div>
      <div className="flex flex-col gap-y-5">
        <p className="text-3 font-bold">현재 페널티</p>
        {!data || data.memberType === 'PENALTY' ? (
          <div className="w-full rounded-regular border border-negative bg-negative bg-opacity-10 px-10 py-5">
            {mostRecentPenalty ? (
              <div className="grid grid-cols-2 gap-4">
                <InfoContentAtom
                  data={{
                    subtitle: '워케이션',
                    content: mostRecentPenalty.wktName || '',
                  }}
                />
                <InfoContentAtom
                  data={{
                    subtitle: '부여 일시',
                    content:
                      dayjs(mostRecentPenalty.createdAt).format('YYYY.MM.DD') ||
                      '',
                  }}
                />

                <InfoContentAtom
                  data={{
                    subtitle: '사유',
                    content: penaltyList[mostRecentPenalty.penaltyType] || '',
                  }}
                />

                <InfoContentAtom
                  data={{
                    subtitle: '페널티 기간',
                    content: expiryDate || '',
                  }}
                />
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          <table>
            <tbody>
              <EmptyContainer />
            </tbody>
          </table>
        )}
      </div>
      <div>
        <TableContainer>
          <TableHeaderModule>
            <TableHeaderAtom isFirst width="80px">
              번호
            </TableHeaderAtom>
            <TableHeaderAtom>워케이션</TableHeaderAtom>
            <TableHeaderAtom width="200px">사유</TableHeaderAtom>
            <TableHeaderAtom isLast width="190px">
              일시
            </TableHeaderAtom>
          </TableHeaderModule>

          <tbody>
            {!data ? (
              isLoading ? (
                <EmptyContainer colSpan={6} text="로딩 중입니다..." />
              ) : (
                <EmptyContainer colSpan={6} text="error" />
              )
            ) : data.penaltyAmount <= 0 ? (
              <EmptyContainer colSpan={6} />
            ) : (
              penaltyInfos.map((item, index) => (
                <TableBodyModule key={item.wktName}>
                  <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                  <TableBodyAtom>{item.wktName}</TableBodyAtom>
                  <TableBodyAtom>{penaltyList[item.penaltyType]}</TableBodyAtom>
                  <TableBodyAtom isLast>
                    {dayjs(item.createdAt).format('YYYY.MM.DD')}
                  </TableBodyAtom>
                </TableBodyModule>
              ))
            )}
          </tbody>
        </TableContainer>
      </div>
      <div className="flex w-full items-center justify-end">
        <ButtonAtom
          buttonStyle="red"
          onClick={() => setIsPenaltyModelOpen(true)}
          text="페널티 부여"
          type="button"
        />
      </div>
      {isPenaltyModelOpen && (
        <ModalModule
          title="선택한 회원에게 페널티를 부여하시겠습니까?"
          cancelText="취소"
          confirmText="확인"
          confirmButtonStyle="dark"
          cancelButtonStyle="yellow"
          onConfirm={() => {
            PostPenalty({
              accountId,
              penaltyType: 'ABUSE',
            });
          }}
          onCancel={() => {
            setIsPenaltyModelOpen(false);
          }}
        >
          <div className="flex flex-col gap-4">
            <InputModule
              subtitle="해당 워케이션"
              status="disabled"
              placeholder="워케이션 없음"
              value=""
            />

            <InputModule
              subtitle="분류"
              status="readonly"
              value="포인트 제도 악용"
            />
          </div>
        </ModalModule>
      )}
    </section>
  );
};

export default AdminMembersPenaltyHistoryPage;
