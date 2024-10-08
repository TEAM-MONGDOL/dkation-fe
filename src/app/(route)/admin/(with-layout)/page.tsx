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
import { useGetWkListQuery } from '@/_hooks/admin/useGetWktListQuery';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useGetPointApply } from '@/_hooks/admin/useGetPointApply';
import { pointApplyTypeConvertList } from '@/_types/adminType';

const AdminMainPage = () => {
  const router = useRouter();
  const [statusOption, setStatusOption] = useState<{
    status: string[];
  }>({
    status: ['PLANNED', 'ONGOING', 'CLOSED'],
  });

  const moveToWkResult = (id: number) => {
    router.push(`/admin/workation/${id}/result`);
  };

  const moveToPointsDetail = (id: number) => {
    router.push(`/admin/points/reward/${id}`);
  };

  const {
    data: wkData,
    isLoading: isWkLoading,
    isError: isWkError,
  } = useGetWkListQuery({
    status: statusOption.status.join(','),
    pageParam: {
      page: 1,
      size: 5,
      sort: `createdAt,DESC`,
    },
  });

  const {
    data: PointData,
    isLoading: isPointLoading,
    isError: isPointError,
  } = useGetPointApply({
    params: { applyTypes: 'PENDING' },
    pageable: {
      page: 1,
      size: 5,
      sort: `createdAt,DESC`,
    },
  });

  const moveToWkDetail = (id: number) => {
    router.push(`/admin/workation/${id}`);
  };

  const onClickRowDetail = (id: number) => {
    router.push(`/admin/points/reward/${id}`);
  };

  const getStatusLabelAndColor = (
    applyStartDate: string,
    applyEndDate: string,
  ): { label: string; color: string } => {
    const now = dayjs();
    const start = dayjs(applyStartDate);
    const end = dayjs(applyEndDate);

    if (now.isBefore(start)) {
      return { label: '모집 예정', color: '' };
    }
    if (now.isAfter(end)) {
      return { label: '모집 완료', color: 'text-sub-200' };
    }
    return { label: '모집 중', color: 'text-positive' };
  };

  return (
    <div className="flex w-full flex-col gap-y-12 overflow-y-auto">
      <div className="flex w-full flex-col gap-y-6">
        <TitleBarModule
          title="워케이션 목록"
          type="RIGHT"
          url="/admin/workation"
        />
        <TableContainer minWidth="1200px">
          <TableHeaderModule>
            <TableHeaderAtom isFirst width="80px">
              번호
            </TableHeaderAtom>
            <TableHeaderAtom>워케이션</TableHeaderAtom>
            <TableHeaderAtom width="100px">모집 기간</TableHeaderAtom>
            <TableHeaderAtom width="100px">워케이션 기간</TableHeaderAtom>
            <TableHeaderAtom width="100px">모집 인원</TableHeaderAtom>
            <TableHeaderAtom width="120px">지원자 수</TableHeaderAtom>
            <TableHeaderAtom width="160px">결과 및 페널티</TableHeaderAtom>
            <TableHeaderAtom isLast width="140px" />
          </TableHeaderModule>
          <tbody>
            {!wkData ? (
              isWkLoading ? (
                <EmptyContainer colSpan={8} text="loading" />
              ) : (
                <EmptyContainer colSpan={8} text="no data" />
              )
            ) : wkData.pageInfo.totalElements <= 0 ? (
              <EmptyContainer colSpan={8} />
            ) : (
              wkData.wktInfos.map((item, index) => (
                <TableBodyModule key={item.wktId}>
                  <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                  <TableBodyAtom>{item.wktPlaceTitle}</TableBodyAtom>
                  <TableBodyAtom>
                    {dayjs(item.applyStartDate).format('YYYY.MM.DD')} -
                    {dayjs(item.applyEndDate).format('YYYY.MM.DD')}
                  </TableBodyAtom>
                  <TableBodyAtom>
                    {dayjs(item.startDate).format('YYYY.MM.DD')} -
                    {dayjs(item.endDate).format('YYYY.MM.DD')}
                  </TableBodyAtom>
                  <TableBodyAtom>{item.totalRecruit}</TableBodyAtom>
                  <TableBodyAtom
                    color={
                      getStatusLabelAndColor(
                        item.applyStartDate,
                        item.applyEndDate,
                      ).color
                    }
                  >
                    {
                      getStatusLabelAndColor(
                        item.applyStartDate,
                        item.applyEndDate,
                      ).label
                    }
                  </TableBodyAtom>
                  <TableBodyAtom>
                    <button
                      onClick={() => moveToWkResult(item.wktId)}
                      className="rounded-full bg-primary px-6 py-2 text-4 font-semibold text-white"
                    >
                      자세히
                    </button>
                  </TableBodyAtom>
                  <TableBodyAtom isLast>
                    <ShowDetailButtonAtom
                      onClick={() => moveToWkDetail(item.wktId)}
                    />
                  </TableBodyAtom>
                </TableBodyModule>
              ))
            )}
          </tbody>
        </TableContainer>
      </div>
      <div className="flex w-full flex-col gap-y-6">
        <TitleBarModule
          title="포인트 신청 내역"
          type="RIGHT"
          url="/admin/points/request"
        />
        <TableContainer minWidth="1200px">
          <TableHeaderModule>
            <TableHeaderAtom isFirst width="80px">
              번호
            </TableHeaderAtom>
            <TableHeaderAtom width="150px">분류</TableHeaderAtom>
            <TableHeaderAtom width="190px">이름</TableHeaderAtom>
            <TableHeaderAtom>신청 일시</TableHeaderAtom>
            <TableHeaderAtom>지급 일시</TableHeaderAtom>
            <TableHeaderAtom width="140px">상태</TableHeaderAtom>
            <TableHeaderAtom isLast width="160px" />
          </TableHeaderModule>
          <tbody>
            {!PointData ? (
              isPointLoading ? (
                <EmptyContainer colSpan={7} text="로딩 중..." />
              ) : isPointError ? (
                <EmptyContainer colSpan={7} text="에러가 발생했습니다." />
              ) : (
                <EmptyContainer
                  colSpan={7}
                  text="알 수 없는 에러가 발생했습니다."
                />
              )
            ) : PointData.pointApplyInfos.length <= 0 ? (
              <EmptyContainer colSpan={7} />
            ) : (
              PointData.pointApplyInfos.map((item, idx) => (
                <TableBodyModule key={item.pointApplyId}>
                  <TableBodyAtom isFirst>{idx + 1}</TableBodyAtom>
                  <TableBodyAtom>{item.pointTitle}</TableBodyAtom>
                  <TableBodyAtom>{item.name}</TableBodyAtom>
                  <TableBodyAtom>
                    {dayjs(item.applyTime).format('YYYY.MM.DD')}
                  </TableBodyAtom>
                  <TableBodyAtom>
                    {dayjs(item.reviewTime).format('YYYY.MM.DD')}
                  </TableBodyAtom>
                  <TableBodyAtom color="text-sub-200">
                    {pointApplyTypeConvertList[item.applyType]}
                  </TableBodyAtom>
                  <TableBodyAtom isLast>
                    <ShowDetailButtonAtom
                      onClick={() => onClickRowDetail(item.pointApplyId)}
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
