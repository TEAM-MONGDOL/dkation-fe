'use client';

import TableContainer from '@/_components/common/containers/TableContainer';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import InfoSectionModule from '@/_components/common/modules/InfoSectionModule';
import { WarningIcon } from '@/_assets/icons';
import SubtitleModule from '@/_components/common/modules/SubtitleModule';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import { useRouter } from 'next/navigation';

const headers = [
  { title: '번호', width: '90px' },
  { title: '워케이션', flexGrow: true },
  { title: '사유', width: '200px' },
  { title: '일시', width: '190px' },
];

const pastPenalties = [
  {
    id: 1,
    워케이션: '9월 2주차 워케이션 : 양양',
    사유: '노쇼',
    일시: '2024.07.04',
  },
];

const currentPenalty = {
  워케이션: '9월 2주차 워케이션 : 양양',
  사유: '노쇼',
  일시: '2024.07.04',
  '페널티 기간': '2024.10.04 까지 (3개월)',
};

// 현재 패널티 데이터를 InfoSectionModule 형식으로 변환
const transformCurrentPenaltyData = (penalty: any) => {
  return [
    { subtitle: '워케이션', content: penalty.워케이션, id: 'workation' },
    { subtitle: '사유', content: penalty.사유, id: 'reason' },
    { subtitle: '일시', content: penalty.일시, id: 'date' },
    { subtitle: '페널티 기간', content: penalty['페널티 기간'], id: 'period' },
  ];
};

const AdminMembersPenaltyHistoryPage = () => {
  const router = useRouter();
  const moveToNewPenalty = () => {
    router.push('/admin/workation/list/null/result/penalty');
  };

  const transformedCurrentPenaltyData =
    transformCurrentPenaltyData(currentPenalty);

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
        {Object.keys(currentPenalty).length === 0 ? (
          <EmptyContainer />
        ) : (
          <div className="w-full rounded-regular border border-negative bg-negative bg-opacity-10 px-10 py-5">
            <div className="grid grid-cols-2 gap-5">
              {transformedCurrentPenaltyData.slice(0, 2).map((item) => (
                <InfoSectionModule key={item.id} data={[item]} />
              ))}
              {transformedCurrentPenaltyData.slice(2).map((item) => (
                <InfoSectionModule key={item.id} data={[item]} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        <TableContainer>
          <TableHeaderModule>
            <TableHeaderAtom width="90px">번호</TableHeaderAtom>
            <TableHeaderAtom>워케이션</TableHeaderAtom>
            <TableHeaderAtom width="200px">사유</TableHeaderAtom>
            <TableHeaderAtom width="190px">일시</TableHeaderAtom>
          </TableHeaderModule>

          <tbody>
            {pastPenalties.length <= 0 ? (
              <td colSpan={4}>
                <EmptyContainer />
              </td>
            ) : (
              pastPenalties.map((item, index) => (
                <TableBodyModule key={item.id}>
                  <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                  <TableBodyAtom>{item.워케이션}</TableBodyAtom>
                  <TableBodyAtom>{item.사유}</TableBodyAtom>
                  <TableBodyAtom>{item.일시}</TableBodyAtom>
                </TableBodyModule>
              ))
            )}
          </tbody>
        </TableContainer>
      </div>
      <div className="flex w-full items-center justify-end">
        <ButtonAtom
          buttonStyle="red"
          onClick={moveToNewPenalty}
          text="페널티 부여"
          type="button"
        />
      </div>
    </section>
  );
};

export default AdminMembersPenaltyHistoryPage;
