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

const data = [
  { subtitle: '최대 포인트', content: '350 P' },
  { subtitle: '최소 포인트', content: '350 P' },
  { subtitle: '평균 포인트', content: '350 P' },
];

const tabledata = [
  {
    id: 1,
    사유: '-',
    이름: '홍길동',
    아이디: 'hong.gil',
    소속: '개발팀',
    지급일시: '2024.05.05',
  },
  {
    id: 2,
    사유: '노쇼',
    이름: '홍길동',
    아이디: 'hong.gil',
    소속: '개발팀',
    지급일시: '2024.05.05',
  },
];

const AdminWorkationListPenaltyPage = () => {
  const [isConfirmModelOpen, setIsConfirmModelOpen] = useState(false);
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string>('');

  return (
    <section className="w-full">
      <div className="mb-8 flex gap-2">
        <Image src={ExtensionIcon} alt="StatisticsIcon" />
        <p className="text-h3 font-bold">결과 통계 및 페널티</p>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="flex w-full flex-col gap-4">
            <p className="text-3 font-bold">경쟁률</p>
            <div className="flex w-full flex-col gap-1 border py-7 text-center">
              <p className="text-h1 font-bold">30 : 1</p>
              <p className="text-4 text-sub-300">신청 인원 250명</p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <p className="text-3 font-bold">모집 기간</p>
            <div className="w-full border px-10 py-5">
              <InfoSectionModule data={data} />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <p className="text-3 font-bold">배팅 분포도</p>
          <div className="w-full border py-14 text-center text-h1 font-bold">
            그래프
          </div>
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
              {data.length <= 0 ? (
                <EmptyContainer colSpan={8} />
              ) : (
                tabledata.map((item, index) => (
                  <TableBodyModule key={item.id}>
                    <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                    <TableBodyAtom>{item.사유}</TableBodyAtom>
                    <TableBodyAtom>{item.이름}</TableBodyAtom>
                    <TableBodyAtom>{item.아이디}</TableBodyAtom>
                    <TableBodyAtom>{item.소속}</TableBodyAtom>
                    <TableBodyAtom>{item.지급일시}</TableBodyAtom>
                    <TableBodyAtom isLast>
                      <button
                        onClick={() => setIsConfirmModelOpen(true)}
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
          confirmButtonStyle="dark"
          cancelButtonStyle="yellow"
          onClick={() => {
            setIsConfirmModelOpen(false);
          }}
          onConfirm={() => {
            //  TODO : 페널티 등록 API 호출
            alert('페널티 등록 완료');
            setIsConfirmModelOpen(false);
            router.back();
          }}
          onCancel={() => {
            setIsConfirmModelOpen(false);
          }}
        >
          <InputModule
            subtitle="해당 워케이션"
            status="disabled"
            value="1월 1주차 워케이션"
          />
          <div className="mt-4 flex flex-col gap-4">
            <p className="text-3 font-semibold">분류</p>
            <DropdownModule
              options={['노쇼', '고성방가']}
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

export default AdminWorkationListPenaltyPage;
