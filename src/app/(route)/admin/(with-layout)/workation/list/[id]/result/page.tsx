'use client';

import React, { useState } from 'react';
import FilteringButtonAtom from '@/_components/common/atoms/FilteringButtonAtom';
import Image from 'next/image';
import { ExtensionIcon } from '@/_assets/icons';
import TableContainer from '@/_components/common/containers/TableContainer';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import RadioButtonContainer from '@/_components/common/containers/RadioButtonContainer';
import { resultList } from '@/_types/adminType';
import CheckboxContainer from '@/_components/common/containers/CheckboxContainer';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';
import RangeContainer from '@/_components/common/containers/RangeContainer';

const headers = [
  { title: '번호', width: '50px' },
  { title: '이름', width: '130px' },
  { title: '아이디', flexGrow: true },
  { title: '소속', flexGrow: true },
  { title: '확률', width: '100px' },
  { title: '상태', width: '130px' },
];

const data = [
  {
    id: 1,
    이름: '홍길동',
    아이디: 'hong.gil',
    소속: '개발팀',
    확률: { text: '3.8%', color: 'orange' },
    상태: { text: '미당첨', color: 'gray' },
  },
  {
    id: 2,
    이름: '홍길동',
    아이디: 'hong.gil',
    소속: '개발팀',
    확률: { text: '3.8%', color: 'orange' },
    상태: { text: '당첨취소', color: 'red' },
  },
  {
    id: 3,
    이름: '홍길동',
    아이디: 'hong.gil',
    소속: '개발팀',
    확률: { text: '3.8%', color: 'orange' },
    상태: { text: '당첨확정', color: 'green' },
  },
];
const AdminWorkationListResultPage = () => {
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [param, setParam] = useState<{
    order: string;
    status: string[];
    probabilityRange: { min: number; max: number };
  }>({
    order: 'NAME',
    status: [
      'COMPLETE',
      'NOTYET',
      'FAIL',
      'WAITING',
      'CANCEL',
      'SURE',
      'WAIT',
      'FINISH',
    ],
    probabilityRange: { min: 0, max: 6 },
  });
  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'NAME',
      status: [
        'COMPLETE',
        'NOTYET',
        'FAIL',
        'WAITING',
        'CANCEL',
        'SURE',
        'WAIT',
        'FINISH',
      ],
      probabilityRange: { min: 0, max: 6 },
    });
  };
  const handleRangeChange = ({ min, max }: { min: number; max: number }) => {
    setParam((prevParam) => ({
      ...prevParam,
      range: { min, max },
    }));
  };
  return (
    <div>
      <div className="mb-6 flex w-full items-center justify-between">
        <div className="flex gap-2">
          <Image src={ExtensionIcon} alt="ResultIcon" />
          <p className="text-h3 font-bold">추첨 결과</p>
        </div>

        <FilteringButtonAtom onClick={() => setIsFilteringBarOpen(true)} />
      </div>
      <TableContainer headers={headers} data={data} />
      <div className="mt-28 flex w-full items-center justify-center">
        <PaginationModule />
      </div>
      <FilteringBarContainer
        isOpen={isFilteringBarOpen}
        setIsOpen={setIsFilteringBarOpen}
        refreshHandler={refreshHandler}
      >
        <RadioButtonContainer
          title="정렬"
          options={Object.entries(resultList) as [string, string][]}
          selectedOption={param.order}
          setSelectedOption={(order: string) => setParam({ ...param, order })}
        />
        <CheckboxContainer
          title="진행 상태"
          options={[
            ['COMPLETE', '신청완료'],
            ['NOTYET', '추첨대기'],
            ['FAIL', '미당첨'],
            ['WAITING', '확정대기'],
            ['CANCEL', '당첨취소'],
            ['SURE', '당첨확정'],
            ['WAIT', '대기'],
            ['FINISH', '일정종료'],
          ]}
          selectedOptions={param.status}
          setSelectedOptions={(status: string[]) =>
            setParam({ ...param, status })
          }
        />
        {/* 추후 수정 예정 */}
        {/* <RangeContainer */}
        {/*  title="당첨 확률" */}
        {/*  min={0} */}
        {/*  max={6} */}
        {/*  onChange={handleRangeChange} */}
        {/* /> */}
      </FilteringBarContainer>
    </div>
  );
};

export default AdminWorkationListResultPage;
