import Image from 'next/image';
import React from 'react';
import { StatisticsIcon } from '@/_assets/icons';
import InfoSectionModule from '@/_components/common/modules/InfoSectionModule';
import TableContainer from '@/_components/common/containers/TableContainer';

const data = [
  { subtitle: '최대 포인트', content: '350 P' },
  { subtitle: '최소 포인트', content: '350 P' },
  { subtitle: '평균 포인트', content: '350 P' },
];
const headers = [
  { title: '번호', width: '50px' },
  { title: '사유', width: '80px' },
  { title: '이름', width: '100px' },
  { title: '아이디', flexGrow: true },
  { title: '소속', width: '140px' },
  { title: '지급일시', width: '130px' },
  { title: '패널티', width: '135px' },
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
  return (
    <div className="w-full">
      <div className="flex gap-2 mb-8">
        <Image src={StatisticsIcon} alt="StatisticsIcon" />
        <p className="text-h3 font-bold">결과 통계 및 페널티</p>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-5">
          <div className="flex flex-col w-full gap-4">
            <p className="text-3 font-bold">경쟁률</p>
            <div className="w-full py-10 text-center border text-h1 font-bold">
              30:1
            </div>
          </div>
          <div className="flex flex-col w-full gap-4">
            <p className="text-3 font-bold">모집 기간</p>
            <div className="w-full border py-5 px-10">
              <InfoSectionModule data={data} />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4">
          <p className="text-3 font-bold">배팅 분포도</p>
          <div className="w-full py-14 text-center border text-h1 font-bold">
            그래프
          </div>
        </div>
        <div className="flex flex-col w-full">
          <p className="text-3 font-bold">페널티 관리</p>
          <TableContainer headers={headers} data={tabledata} />
        </div>
      </div>
    </div>
  );
};

export default AdminWorkationListPenaltyPage;
