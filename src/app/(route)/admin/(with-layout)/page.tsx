'use client';

import TableContainer from '@/_components/common/containers/TableContainer';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { useRouter } from 'next/navigation';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import ShowDetailButtonAtom from '@/_components/common/atoms/ShowDetailButtonAtom';

const wkData = [
  {
    id: 1,
    워케이션: '9월 1주차 워케이션 : 제주도',
    모집기간: '2024-08-01 - 2024-08-15',
    워케이션기간: '2023-09-01 - 2023-09-07',
    모집인원: 2,
    지원자수: 55,
  },
];

const pointData = [
  {
    id: 1,
    구분: '봉사활동',
    이름: '홍길동',
    신청일시: '2024.07.03',
    심사일시: '2024.07.05',
    상태: { text: '지급 완료', color: 'blue' },
  },
];

const AdminMainPage = () => {
  const router = useRouter();

  const moveToWkDetail = (id: number) => {
    router.push(`/admin/workation/${id}/result`);
  };

  const moveToPointsDetail = (id: number) => {
    router.push(`/admin/points/reward/${id}`);
  };

  return (
    <div className="flex w-full flex-col gap-y-12 overflow-y-auto">
      <div className="flex w-full flex-col gap-y-6">
        <TitleBarModule title="워케이션 모집 현황" type="RIGHT" />
        <TableContainer>
          <TableHeaderModule>
            <TableHeaderAtom width="80px">번호</TableHeaderAtom>
            <TableHeaderAtom>워케이션</TableHeaderAtom>
            {/* TODO : API에서 받을 때는 모집 시작일자, 종료일자 따로 받앗어 dayjs를 통한 포맷팅으로 넣어줘야 함 */}
            <TableHeaderAtom width="260px">모집 기간</TableHeaderAtom>
            <TableHeaderAtom width="260px">워케이션 기간</TableHeaderAtom>
            <TableHeaderAtom width="120px">모집 인원</TableHeaderAtom>
            <TableHeaderAtom width="120px">지원자 수</TableHeaderAtom>
            <TableHeaderAtom width="160px" />
          </TableHeaderModule>

          <tbody>
            {wkData.length <= 0 ? (
              <td colSpan={6}>
                <EmptyContainer />
              </td>
            ) : (
              wkData.map((item, index) => (
                <TableBodyModule key={item.id}>
                  <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                  <TableBodyAtom>{item.워케이션}</TableBodyAtom>
                  <TableBodyAtom>{item.모집기간}</TableBodyAtom>
                  <TableBodyAtom>{item.워케이션기간}</TableBodyAtom>
                  <TableBodyAtom>{item.모집인원}</TableBodyAtom>
                  <TableBodyAtom>{item.지원자수}</TableBodyAtom>
                  <TableBodyAtom isLast>
                    <ShowDetailButtonAtom
                      onClick={() => moveToWkDetail(item.id)}
                    />
                  </TableBodyAtom>
                </TableBodyModule>
              ))
            )}
          </tbody>
        </TableContainer>
      </div>
      <div className="flex w-full flex-col gap-y-6">
        <TitleBarModule title="포인트 신청 내역" type="RIGHT" />
        <TableContainer>
          <TableHeaderModule>
            <TableHeaderAtom width="80px">번호</TableHeaderAtom>
            <TableHeaderAtom width="200px">구분</TableHeaderAtom>
            <TableHeaderAtom width="190px">이름</TableHeaderAtom>
            <TableHeaderAtom>신청 일시</TableHeaderAtom>
            <TableHeaderAtom>심사 일시</TableHeaderAtom>
            <TableHeaderAtom width="160px">상태</TableHeaderAtom>
            <TableHeaderAtom width="160px" />
          </TableHeaderModule>

          <tbody>
            {pointData.length <= 0 ? (
              <td colSpan={6}>
                <EmptyContainer />
              </td>
            ) : (
              pointData.map((item, index) => (
                <TableBodyModule key={item.id}>
                  <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                  <TableBodyAtom>{item.구분}</TableBodyAtom>
                  <TableBodyAtom>{item.이름}</TableBodyAtom>
                  <TableBodyAtom>{item.신청일시}</TableBodyAtom>
                  <TableBodyAtom>{item.심사일시}</TableBodyAtom>
                  <TableBodyAtom color={item.상태.color}>
                    {item.상태.text}
                  </TableBodyAtom>
                  <TableBodyAtom isLast>
                    <ShowDetailButtonAtom
                      onClick={() => moveToPointsDetail(item.id)}
                    />
                  </TableBodyAtom>
                </TableBodyModule>
              ))
            )}
          </tbody>
        </TableContainer>
      </div>
    </div>
  );
};

export default AdminMainPage;
