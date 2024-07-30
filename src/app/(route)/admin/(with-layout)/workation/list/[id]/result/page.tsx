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
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import RangeContainer from '@/_components/common/containers/RangeContainer';
import TableHeaderModule from '@/_components/common/modules/TableHeaderModule';
import TableHeaderAtom from '@/_components/common/atoms/TableHeaderAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import TableBodyModule from '@/_components/common/modules/TableBodyModule';
import TableBodyAtom from '@/_components/common/atoms/TableBodyAtom';
import ShowDetailButtonAtom from '@/_components/common/atoms/ShowDetailButtonAtom';

const data = [
  {
    id: 1,
    이름: '홍길동',
    아이디: 'hong.gil',
    소속: '개발팀',
    확률: { text: '3.8%', color: 'text-primaryDark' },
    상태: { text: '미당첨', color: 'text-gray' },
  },
  {
    id: 2,
    이름: '홍길동',
    아이디: 'hong.gil',
    소속: '개발팀',
    확률: { text: '3.8%', color: 'text-primaryDark' },
    상태: { text: '당첨취소', color: 'text-negative' },
  },
  {
    id: 3,
    이름: '홍길동',
    아이디: 'hong.gil',
    소속: '개발팀',
    확률: { text: '3.8%', color: 'text-primaryDark' },
    상태: { text: '당첨확정', color: 'text-[#008726]' },
  },
];
const AdminWorkationListResultPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
    <section>
      <div className="mb-6 flex w-full items-center justify-between">
        <div className="flex gap-2">
          <Image src={ExtensionIcon} alt="ResultIcon" />
          <p className="text-h3 font-bold">추첨 결과</p>
        </div>

        <FilteringButtonAtom onClick={() => setIsFilteringBarOpen(true)} />
      </div>
      <TableContainer>
        <TableHeaderModule>
          <TableHeaderAtom width="80px" isFirst>
            번호
          </TableHeaderAtom>
          <TableHeaderAtom width="130px">이름</TableHeaderAtom>
          <TableHeaderAtom>아이디</TableHeaderAtom>
          <TableHeaderAtom>소속</TableHeaderAtom>
          <TableHeaderAtom width="100px">확률</TableHeaderAtom>
          <TableHeaderAtom width="130px" isLast>
            상태
          </TableHeaderAtom>
        </TableHeaderModule>
        <tbody>
          {data.length <= 0 ? (
            <EmptyContainer colSpan={6} />
          ) : (
            data.map((item, index) => (
              <TableBodyModule key={item.id}>
                <TableBodyAtom isFirst>{index + 1}</TableBodyAtom>
                <TableBodyAtom>{item.이름}</TableBodyAtom>
                <TableBodyAtom>{item.아이디}</TableBodyAtom>
                <TableBodyAtom>{item.소속}</TableBodyAtom>
                <TableBodyAtom color={item.확률.color}>
                  {item.확률.text}
                </TableBodyAtom>
                <TableBodyAtom color={item.상태.color} isLast>
                  {item.상태.text}
                </TableBodyAtom>
              </TableBodyModule>
            ))
          )}
        </tbody>
      </TableContainer>
      <div className="mt-28 flex w-full items-center justify-center">
        <PaginationModule
          totalPages={1}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
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
        <RangeContainer
          title="당첨 확률"
          min={0}
          max={6}
          onChange={handleRangeChange}
        />
      </FilteringBarContainer>
    </section>
  );
};

export default AdminWorkationListResultPage;
