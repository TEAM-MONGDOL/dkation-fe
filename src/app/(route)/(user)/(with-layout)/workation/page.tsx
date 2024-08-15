'use client';

import UserHeaderContainers from '@/_components/user/common/containers/UserHeaderContainers';
import UserTabBarModule from '@/_components/user/common/modules/UserTabBarModule';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import UserTextLabelAtom from '@/_components/user/common/atoms/UserTextLabelAtom';
import UserStateFilteringContainer from '@/_components/user/common/containers/UserStateFilteringContainer';
import UserPlaceFilteringContainer from '@/_components/user/common/containers/UserPlaceFilteringContainer';
import UserFilteringSectionContainer from '@/_components/user/common/containers/UserFilteringSectionContainer';
import dayjs from 'dayjs';
import { DatePickerTagType } from '@/_types/commonType';
import { useGetWkListQuery } from '@/_hooks/admin/useGetWktListQuery';
import EmptyContainer from '@/_components/common/containers/EmptyContainer';
import { useGetWkPlaceListQuery } from '@/_hooks/admin/useGetWkPlaceListQuery';
import UserDatePickerContainer from '@/_components/user/common/containers/UserDatePickerContainer';
import { useRouter } from 'next/navigation';
import UserLoading from '@/_components/user/userLoading';
import NetworkError from '@/_components/common/networkError';
import { HeaderPointIcon } from '@/_assets/icons';

const Workation = () => {
  const router = useRouter();
  const tabs = [
    {
      text: '워케이션 목록',
      path: '/workation',
    },
  ];
  const [isFilteringSectionOpen, setIsFilteringSectionOpen] = useState<
    'FILTER' | 'ORDER' | null
  >(null);
  const [param, setParam] = useState<{
    order: string;
    status: string[];
    places: string[];
    startDate: string | null;
    endDate: string | null;
  }>({
    order: 'DESC',
    status: ['PLANNED', 'ONGOING', 'CLOSED'],
    places: [],
    startDate: null,
    endDate: null,
  });
  const [selectedState, setSelectedState] = useState<string>('ONGOING');
  const [selectedSpace, setSelectedSpace] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>('createdAt,DESC');
  const [selectedTag, setSelectedTag] = useState<DatePickerTagType>('ALL');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const {
    data: placeData,
    isLoading: placeIsLoading,
    isError: placeIsError,
  } = useGetWkPlaceListQuery({
    pageParam: {
      page: 1,
      size: 100,
    },
  });

  const placeOptions = useMemo(() => {
    return (
      placeData?.wktPlaceInfos.map((place) => ({
        id: place.id,
        place: place.place,
      })) || []
    );
  }, [placeData]);

  useEffect(() => {
    if (placeOptions.length > 0) {
      setSelectedSpace(placeOptions.map((place) => place.place));
      setParam((prev) => ({
        ...prev,
        places: placeOptions.map((place) => place.id.toString()), // Convert id to string
      }));
    }
  }, [placeOptions]);

  const updateParam = useCallback(() => {
    setParam((prev) => ({
      ...prev,
      status: [selectedState],
      places: placeOptions
        .filter((place) => selectedSpace.includes(place.place))
        .map((place) => place.id.toString()), // Convert id to string
      order: selectedOrder,
      startDate: startDate
        ? dayjs(startDate).format('YYYY-MM-DDTHH:mm:ss')
        : null,
      endDate: endDate ? dayjs(endDate).format('YYYY-MM-DDTHH:mm:ss') : null,
    }));
  }, [
    selectedState,
    selectedSpace,
    selectedOrder,
    startDate,
    endDate,
    placeOptions,
  ]);

  useEffect(() => {
    updateParam();
  }, [
    selectedState,
    selectedSpace,
    selectedOrder,
    startDate,
    endDate,
    updateParam,
  ]);

  const refreshHandler = () => {
    setSelectedSpace(placeOptions.map((place) => place.place));
    setParam({
      order: 'DESC',
      status: ['PLANNED', 'ONGOING', 'CLOSED'],
      places: placeOptions.map((place) => place.id.toString()),
      startDate: null,
      endDate: null,
    });
    setStartDate(dayjs().subtract(1, 'year').toDate());
    setEndDate(dayjs().subtract(1, 'year').toDate());
  };

  const { data, isLoading, isError } = useGetWkListQuery({
    status: param.status.join(','),
    wktPlaceIdList: param.places.join(','),
    wktStartDate: param.startDate || null,
    wktEndDate: param.endDate || null,
    pageParam: {
      page: 1,
      size: 10,
      sort: `${param.order}`,
    },
  });

  const handlePlaceClick = (places: string[]) => {
    setSelectedSpace(places);
  };

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const getStatusLabelAndColor = (
    applyStartDate: string,
    applyEndDate: string,
  ): { label: string; color: string } => {
    const now = dayjs();
    const start = dayjs(applyStartDate);
    const end = dayjs(applyEndDate).endOf('day');

    if (now.isBefore(start)) {
      return { label: '모집 예정', color: '' };
    }
    if (now.isAfter(end)) {
      return { label: '모집 완료', color: 'bg-cus-100 text-sub-300' };
    }
    return { label: '모집 중', color: 'bg-primary' };
  };

  if (isLoading || placeIsLoading) {
    return <UserLoading />;
  }
  if (isError || placeIsError) {
    return <NetworkError />;
  }
  if (!data || !placeData) {
    return <NetworkError />;
  }

  return (
    <div className="">
      <UserHeaderContainers
        title="워케이션"
        content="워케이션(Workation)을 통해 업무의 효율과 재충전의 기회를 놓치지 마세요!"
        img="bg-header-bg"
      />
      <UserTabBarModule tabs={tabs} />
      <div className="mr-24 mt-8 flex justify-end">
        <UserFilteringSectionContainer
          filterOption={{
            type: 'FILTER',
            onClickFilter: () => {
              setIsFilteringSectionOpen(
                isFilteringSectionOpen === 'FILTER' ? null : 'FILTER',
              );
            },
            isFilterOpen: isFilteringSectionOpen === 'FILTER',
            filterChildren: (
              <>
                <UserDatePickerContainer
                  selectedTag={selectedTag}
                  onClickTag={(tag) => setSelectedTag(tag)}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                />
                <UserStateFilteringContainer
                  type="WKT"
                  selectedOption={selectedState}
                  onClickOption={setSelectedState}
                />
                <UserPlaceFilteringContainer
                  places={placeOptions.map((place) => place.place)}
                  clickedPlace={selectedSpace}
                  onClickPlace={handlePlaceClick}
                />
              </>
            ),
            onRefresh: refreshHandler,
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
        {!data ? (
          isLoading ? (
            <EmptyContainer text="loading" notTable />
          ) : (
            <EmptyContainer text="no data" notTable />
          )
        ) : data.pageInfo.totalElements <= 0 ? (
          <EmptyContainer notTable />
        ) : (
          data.wktInfos.map((wkt) => (
            <div
              role="presentation"
              key={wkt.wktId}
              className="mb-24 flex w-full justify-between gap-x-4"
              onClick={() => router.push(`/workation/${wkt.wktId}`)}
            >
              <div className="flex items-end gap-x-8">
                <Image
                  className="h-[237px] w-[345px] object-cover xl:h-[304px] xl:w-[442px]"
                  width={402}
                  height={304}
                  src={wkt.thumbnailUrl}
                  alt="place"
                />
                <div className="flex h-full flex-col items-start justify-between gap-y-4">
                  <div className="flex flex-col gap-y-1.5">
                    <p className="text-sub-300">{wkt.wktPlaceTitle}</p>
                    <h2 className="line-clamp-1 break-keep text-h2 font-semibold text-sub-400 xl:line-clamp-2">
                      {wkt.title}
                    </h2>
                  </div>
                  <div className="flex flex-col items-start gap-y-4">
                    <p className="flex items-center justify-center rounded-regular bg-[#FF2424]/10 px-5 py-1.5 text-3 text-[#FF2424]">
                      모집인원 : {wkt.totalRecruit}명
                    </p>
                    <div className="flex flex-col gap-y-0.5">
                      <p>
                        모집 기간 : <br className="block xl:hidden" />
                        {dayjs(wkt.applyStartDate).format('YYYY.MM.DD')} -{' '}
                        {dayjs(wkt.applyEndDate).format('YYYY.MM.DD')}
                      </p>
                      <p>
                        워케이션 기간 : <br className="block xl:hidden" />
                        {dayjs(wkt.startDate).format('YYYY.MM.DD')} -{' '}
                        {dayjs(wkt.endDate).format('YYYY.MM.DD')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <UserTextLabelAtom
                className={`mt-auto shrink-0 ${getStatusLabelAndColor(wkt.applyStartDate, wkt.applyEndDate).color}`}
                text={
                  getStatusLabelAndColor(wkt.applyStartDate, wkt.applyEndDate)
                    .label
                }
                size="md"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Workation;
