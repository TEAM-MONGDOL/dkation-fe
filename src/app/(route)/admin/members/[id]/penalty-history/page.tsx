'use client';

import TableContainer from '@/_components/common/containers/TableContainer';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import InfoSectionModule from '@/_components/common/modules/InfoSectionModule';
import { PenaltyIcon } from '@/_assets/icons';
import SubtitleModule from '@/_components/common/modules/SubtitleModule';

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
  '패널티 기간': '2024.10.04 까지 (3개월)',
};

// 현재 패널티 데이터를 InfoSectionModule 형식으로 변환
const transformCurrentPenaltyData = (penalty: any) => {
  return [
    { subtitle: '워케이션', content: penalty.워케이션, id: 'workation' },
    { subtitle: '사유', content: penalty.사유, id: 'reason' },
    { subtitle: '일시', content: penalty.일시, id: 'date' },
    { subtitle: '패널티 기간', content: penalty['패널티 기간'], id: 'period' },
  ];
};

const AdminMembersPenaltyHistoryPage = () => {
  const moveToNewPenalty = () => {
    // 추후 추가 예정
  };

  const transformedCurrentPenaltyData =
    transformCurrentPenaltyData(currentPenalty);

  return (
    <div className="flex flex-col gap-y-10 w-full">
      <div className="w-full flex items-center">
        <SubtitleModule
          iconSrc={PenaltyIcon}
          iconAlt="penalty"
          text="패널티 내역"
        />
      </div>
      <div className="flex flex-col gap-y-5">
        <p className="text-3 font-bold">현재 패널티</p>
        {Object.keys(currentPenalty).length === 0 ? (
          <EmptyContainer />
        ) : (
          <div className="rounded-regular py-5 px-10 w-full bg-negative bg-opacity-10 border border-negative">
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
        <TableContainer
          headers={headers}
          data={pastPenalties.map((item) => ({
            ...item,
          }))}
        />
      </div>
      <div className="flex items-center justify-end w-full">
        <ButtonAtom buttonType="red" onClick={moveToNewPenalty}>
          패널티 부여
        </ButtonAtom>
      </div>
    </div>
  );
};

export default AdminMembersPenaltyHistoryPage;
