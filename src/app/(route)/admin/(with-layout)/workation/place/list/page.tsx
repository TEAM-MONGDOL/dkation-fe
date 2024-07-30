'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { useState } from 'react';
import SearchingBoxModule from '@/_components/common/modules/SearchingBoxModule';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';
import imsyPlace from '@/_assets/images/place_impy.png';
import PaginationModule from '@/_components/common/modules/PaginationModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import RadioButtonContainer from '@/_components/common/containers/RadioButtonContainer';
import { LocationList, orderList } from '@/_types/adminType';
import CheckboxContainer from '@/_components/common/containers/CheckboxContainer';
import FilteringBarContainer from '@/_components/common/containers/FilteringBarContainer';

const data = [
  { subtitle: '이름', content: '양양 쏠비치' },
  { subtitle: '주소', content: '강원도 양양군 손양면 도화길 14' },
  { subtitle: '등록 일시', content: '2024.04.06' },
  { subtitle: '최대 인원', content: '2명' },
  {
    subtitle: '설명',
    content:
      '양양 오션월드와 비발디파크에서 차로 단 5분 거리에 위치한 이곳은 홍천 내에서 유일한 호텔 독채형 풀빌라입니다. \n' +
      '여행객들은 독채형 빌라와 호텔형 풀빌라 중 원하는 유형을 선택하여 숙박할 수 있습니다. 뿐만 아니라, 야외 대형 수영장도 함께 이용할 수 있어 더욱 다채로운 즐거움을 제공합니다.',
  },
];
const AdminWorkationPlaceListPage = () => {
  const [isFilteringBarOpen, setIsFilteringBarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [param, setParam] = useState<{
    order: string;
    type: string[];
  }>({
    order: 'RECENT',
    type: [
      'SEOUL',
      'GANGWON',
      'CHUNGCEOUNG',
      'JEONLA',
      'GYEONGSANG',
      'JEJU',
      'ABROAD',
    ],
  });
  const refreshHandler = () => {
    setParam({
      ...param,
      order: 'RECENT',
      type: [
        'SEOUL',
        'GANGWON',
        'CHUNGCEOUNG',
        'JEONLA',
        'GYEONGSANG',
        'JEJU',
        'ABROAD',
      ],
    });
  };
  return (
    <div>
      <div className="mb-10 flex w-full items-center justify-between">
        <TitleBarModule title="워케이션 장소" />
        <SearchingBoxModule
          placeholder="장소명 또는 주소를 검색하세요."
          filter
          onClick={() => setIsFilteringBarOpen(true)}
        />
      </div>
      {data.length === 0 ? (
        <EmptyContainer />
      ) : (
        <div className="flex flex-col gap-2.5">
          <InfoSectionContainer row image={imsyPlace} data={data} />
          <InfoSectionContainer row image={imsyPlace} data={data} />
          <InfoSectionContainer row image={imsyPlace} data={data} />
        </div>
      )}
      <div className="relative mt-8">
        <div className="flex justify-center">
          {data.length !== 0 && (
            <PaginationModule
              totalPages={1}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>
        <div className="absolute right-0 top-0">
          <ButtonAtom text="장소 추가" buttonStyle="yellow" type="button" />
        </div>
      </div>
      <FilteringBarContainer
        isOpen={isFilteringBarOpen}
        setIsOpen={setIsFilteringBarOpen}
        refreshHandler={refreshHandler}
      >
        <RadioButtonContainer
          title="정렬"
          options={Object.entries(orderList) as [string, string][]}
          selectedOption={param.order}
          setSelectedOption={(order: string) => setParam({ ...param, order })}
        />
        <hr />
        <CheckboxContainer
          title="지역"
          options={Object.entries(LocationList) as [string, string][]}
          selectedOptions={param.type}
          setSelectedOptions={(type: string[]) => setParam({ ...param, type })}
        />
        <hr />
      </FilteringBarContainer>
    </div>
  );
};

export default AdminWorkationPlaceListPage;
