'use client';

import UserHeaderContainers from '@/_components/user/common/containers/UserHeaderContainers';
import UserTabBarModule from '@/_components/user/common/modules/UserTabBarModule';
import { useState } from 'react';
import Image from 'next/image';
import place from '@/_assets/images/place_impy.png';
import UserTextLabelAtom from '@/_components/user/common/atoms/UserTextLabelAtom';
import UserFilteringAtom from '@/_components/user/common/atoms/UserFilteringAtom';
import UserStateFilteringContainer from '@/_components/user/common/containers/UserStateFilteringContainer';
import UserPlaceFilteringContainer from '@/_components/user/common/containers/UserPlaceFilteringContainer';
import UserFilteringSectionContainer from '@/_components/user/common/containers/UserFilteringSectionContainer';

const Workation = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabs = [
    {
      text: '워케이션 목록',
      isActive: activeTab === 0,
      onClick: () => {
        setActiveTab(0);
      },
    },
  ];
  const [isFilteringSectionOpen, setIsFilteringSectionOpen] = useState<
    'FILTER' | 'ORDER' | null
  >(null);
  const [selectedState, setSelectedState] = useState<string>('PLANNED');
  const [selectedSpace, setSelectedSpace] = useState<string[]>(['양양 쏠비치']);
  const [selectedOrder, setSelectedOrder] = useState<string>('createdAt,DESC');
  const handleFilteringBar = () => {
    setIsFilteringSectionOpen('FILTER');
  };
  const handleOrderBar = () => {
    setIsFilteringSectionOpen('ORDER');
  };

  return (
    <div className="">
      <UserHeaderContainers
        title="워케이션"
        content="워케이션(Workation)을 통해 업무의 효율과 재충전의 기회를 놓치지 마세요!"
      />
      <UserTabBarModule tabs={tabs} />
      <div className="mr-24 mt-8 flex justify-end">
        <UserFilteringSectionContainer
          filterOption={{
            onClickFilter: () => {
              setIsFilteringSectionOpen(
                isFilteringSectionOpen === 'FILTER' ? null : 'FILTER',
              );
            },
            isFilterOpen: isFilteringSectionOpen === 'FILTER',
            filterChildren: (
              <>
                <UserStateFilteringContainer
                  type="WKT"
                  selectedOption={selectedState}
                  onClickOption={setSelectedState}
                />
                <UserPlaceFilteringContainer
                  places={['양양 쏠비치', '양양 쏠비치2', '양양 쏠비치3']}
                  clickedPlace={selectedSpace}
                  onClickPlace={setSelectedSpace}
                />
              </>
            ),
            onRefresh: () => console.log('refresh'),
          }}
          orderOption={{
            onClickOrder: () => {
              setIsFilteringSectionOpen(
                isFilteringSectionOpen === 'ORDER' ? null : 'ORDER',
              );
            },
            isOrderOpen: isFilteringSectionOpen === 'ORDER',
            orderProps: {
              orders: [
                { key: 'createdAt,DESC', value: '최신순' },
                { key: 'createdAt,ASC', value: '오래된순' },
              ],
              selectedOrder,
              setSelectedOrder,
            },
          }}
        />
      </div>
      <div className="mt-10 px-40">
        <div className="flex w-full">
          <Image width={402} height={304} src={place} alt="place" />
          <div className="ml-8 flex-col">
            <p className="mb-3 text-sub-300">2024년 7월 3주차 워케이션</p>
            <h2 className="mb-24 text-h2 font-semibold text-sub-400">양양</h2>
            <p className="mb-4 inline-block rounded-regular bg-[#FF2424]/10 px-5 py-1.5 text-3 text-[#FF2424]">
              모집인원 : 2명
            </p>
            <p className="mb-0.5">모집 기간 : yyyy.mm.dd - yyy.mm.dd</p>
            <p>워케이션 기간 : yyyy.mm.dd - yyy.mm.dd</p>
          </div>
          <UserTextLabelAtom
            className="ml-auto mt-auto bg-primary"
            text="모집 중"
            size="md"
          />
        </div>
      </div>
    </div>
  );
};

export default Workation;
