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
import DropdownModule from '@/_components/common/modules/DropdownModule';
import { useGetMemberPenaltyHistoryQuery } from '@/_hooks/admin/useGetMemberPenaltyHistoryQuery';
import dayjs from 'dayjs';

interface Props {
  params: { id: string };
}

const penaltyTypeMapping = {
  NOSHOW: '노쇼',
  REPORT: '협력체 신고',
  NEGLIGENCE: '근무 태만',
  ABUSE: '포인트 제도 악용',
};

const AdminMembersPenaltyHistoryPage = ({ params }: Props) => {
  const accountId = params.id;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isPenaltyModelOpen, setIsPenaltyModelOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('');

  const { data, isLoading, isError } = useGetMemberPenaltyHistoryQuery({
    accountId,
    pageParam: {
      page: currentPage,
      size: 10,
      // sort: param.order,
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
        {!data || data.penaltyInfos.length === 0 ? (
          <table>
            <tbody>
              <EmptyContainer />
            </tbody>
          </table>
        ) : (
          <div className="w-full rounded-regular border border-negative bg-negative bg-opacity-10 px-10 py-5">
            페널티 받는 중
          </div>
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
            ) : data.pageInfo.totalElements <= 0 ? (
              <EmptyContainer colSpan={6} />
            ) : (
              data.penaltyInfos.map((item, index) => (
                <TableBodyModule key={item.wktnName}>
                  <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                  <TableBodyAtom>{item.wktnName}</TableBodyAtom>
                  <TableBodyAtom>
                    {penaltyTypeMapping[item.penaltyType]}
                  </TableBodyAtom>
                  <TableBodyAtom isLast>
                    {dayjs(item.createdAt).format('YYYY-MM-DD')}
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
            alert('페널티 등록 완료');
            setIsPenaltyModelOpen(false);
            router.back();
          }}
          onCancel={() => {
            setIsPenaltyModelOpen(false);
          }}
        >
          <InputModule
            subtitle="해당 워케이션"
            status="disabled"
            placeholder="워케이션 없음"
            value=""
          />
          <div className="mt-4 flex flex-col gap-4">
            <p className="text-3 font-semibold">분류</p>
            <DropdownModule
              options={['노쇼', '고성방가', '포인트 정책 오남용']}
              onSelect={setSelectedType}
              placeholder="페널티 사유를 선택하세요."
              selectedOption={selectedType}
            />
          </div>
        </ModalModule>
      )}
    </section>
  );
};

export default AdminMembersPenaltyHistoryPage;
