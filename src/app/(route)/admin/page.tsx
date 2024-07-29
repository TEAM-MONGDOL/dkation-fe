'use client';

import TableContainer from '@/_components/common/containers/TableContainer';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { useRouter } from 'next/navigation';

const wkHeaders = [
  { title: '번호', width: '80px' },
  { title: '워케이션', flexGrow: true },
  { title: '모집 기간', width: '260px' },
  { title: '워케이션 기간', width: '260px' },
  { title: '모집 인원', width: '120px' },
  { title: '지원자 수', width: '120px' },
  { title: '', width: '160px' },
];

const pointHeaders = [
  { title: '번호', width: '80px' },
  { title: '구분', width: '200px' },
  { title: '이름', width: '190px' },
  { title: '신청 일시', flexGrow: true },
  { title: '심사 일시', flexGrow: true },
  { title: '상태', width: '160px' },
  { title: '', width: '160px' },
];

const wkData = [
  {
    id: 1,
    워케이션: '9월 1주차 워케이션 : 제주도',
    '모집 기간': '2024-08-01 - 2024-08-15',
    '워케이션 기간': '2023-09-01 - 2023-09-07',
    '모집 인원': 2,
    '지원자 수': 55,
  },
  {
    id: 2,
    워케이션: '9월 1주차 워케이션 : 제주도',
    '모집 기간': '2024-08-01 - 2024-08-15',
    '워케이션 기간': '2023-09-01 - 2023-09-07',
    '모집 인원': 2,
    '지원자 수': 55,
  },
  {
    id: 3,
    워케이션: '9월 1주차 워케이션 : 제주도',
    '모집 기간': '2024-08-01 - 2024-08-15',
    '워케이션 기간': '2023-09-01 - 2023-09-07',
    '모집 인원': 2,
    '지원자 수': 55,
  },
  {
    id: 4,
    워케이션: '9월 1주차 워케이션 : 제주도',
    '모집 기간': '2024-08-01 - 2024-08-15',
    '워케이션 기간': '2023-09-01 - 2023-09-07',
    '모집 인원': 2,
    '지원자 수': 55,
  },
];

const pointData = [
  {
    id: 1,
    구분: '봉사활동',
    이름: '홍길동',
    '신청 일시': '2024.07.03',
    '심사 일시': '-',
    상태: { text: '대기중' },
  },
  {
    id: 2,
    구분: '봉사활동',
    이름: '홍길동',
    '신청 일시': '2024.07.03',
    '심사 일시': '2024.07.07',
    상태: { text: '지급 완료', color: 'blue' },
  },
  {
    id: 3,
    구분: '봉사활동',
    이름: '홍길동',
    '신청 일시': '2024.07.03',
    '심사 일시': '2024.07.07',
    상태: { text: '반려', color: 'red' },
  },
  {
    id: 4,
    구분: '봉사활동',
    이름: '홍길동',
    '신청 일시': '2024.07.03',
    '심사 일시': '-',
    상태: { text: '대기중' },
  },
];

const AdminMainPage = () => {
  const router = useRouter();

  const moveToWkDetail = (id: number) => {
    router.push(`/admin/workation/list/${id}`);
  };

  const moveToPointsDetail = (id: number) => {
    router.push(`/admin/points/request/${id}`);
  };

  return (
    <div className="w-full flex flex-col gap-y-12 overflow-y-auto">
      <div className="w-full flex flex-col gap-y-6">
        <TitleBarModule title="워케이션 모집 현황" type="RIGHT" />
        <TableContainer
          headers={wkHeaders}
          data={wkData.map((item) => ({
            ...item,
            '': { onClick: () => moveToWkDetail(item.id) },
          }))}
        />
      </div>
      <div className="w-full flex flex-col gap-y-6">
        <TitleBarModule title="포인트 신청 내역" type="RIGHT" />
        <TableContainer
          headers={pointHeaders}
          data={pointData.map((item) => ({
            ...item,
            '': { onClick: () => moveToPointsDetail(item.id) },
          }))}
        />
      </div>
    </div>
  );
};

export default AdminMainPage;
