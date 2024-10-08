'use client';

import InputModule from '@/_components/common/modules/InputModule';
import React, { useState } from 'react';
import placeImsy from '@/_assets/images/place_impy.png';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DropdownModule from '@/_components/common/modules/DropdownModule';
import DatePickersModule from '@/_components/common/modules/DatePickersModule';
import dayjs from 'dayjs';
import ModalModule from '@/_components/common/modules/ModalModule';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';
import { useGetWkDetailQuery } from '@/_hooks/admin/useGetWkDetailQuery';
import { useGetWkPlaceListQuery } from '@/_hooks/admin/useGetWkPlaceListQuery';
import { usePatchWkQuery } from '@/_hooks/admin/usePatchWkQuery';
import AdminLoading from '@/_components/admin/adminLoading';
import NetworkError from '@/_components/common/networkError';

interface WkEditProps {
  params: { id: number };
}
const WorkationEdit = ({ params }: WkEditProps) => {
  const router = useRouter();
  const { id } = params;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { data, isLoading, isError } = useGetWkDetailQuery({
    wktId: id,
  });
  const {
    data: placeData,
    isLoading: isPlaceLoading,
    isError: isPlaceError,
  } = useGetWkPlaceListQuery({
    pageParam: {
      page: 1,
      size: 100,
    },
  });
  const [values, setValues] = useState({
    title: '',
    number: 0,
    place: '',
    description: data?.description,
  });
  const successCallback = () => {
    alert('워케이션 수정 완료');
    router.push('/admin/workation');
  };
  const patchWkQuery = usePatchWkQuery(id, successCallback);
  const [startDateRecruitment, setStartDateRecruitment] = useState<Date | null>(
    dayjs(data?.applyStartDate).toDate(),
  );
  const [endDateRecruitment, setEndDateRecruitment] = useState<Date | null>(
    dayjs(data?.applyEndDate).toDate(),
  );
  const [startDateWorkation, setStartDateWorkation] = useState<Date | null>(
    dayjs(data?.startDate).toDate(),
  );
  const [endDateWorkation, setEndDateWorkation] = useState<Date | null>(
    dayjs(data?.endDate).toDate(),
  );
  React.useEffect(() => {
    if (data) {
      setValues({
        title: data.title,
        number: data.totalRecruit,
        place: data.wktPlaceId.toString(),
        description: data.description,
      });
      setStartDateRecruitment(dayjs(data.applyStartDate).toDate());
      setEndDateRecruitment(dayjs(data.applyEndDate).toDate());
      setStartDateWorkation(dayjs(data.startDate).toDate());
      setEndDateWorkation(dayjs(data.endDate).toDate());
    }
  }, [data]);
  if (isLoading || isPlaceLoading) {
    return <AdminLoading />;
  }
  if (isError || isPlaceError) {
    return <NetworkError />; // 에러컴포넌트 추가시 변경예정
  }
  if (!data || !placeData) {
    return <NetworkError />;
  }
  const handleConfirmEdit = () => {
    const selectedPlace = placeData.wktPlaceInfos.find(
      (place) => place.id.toString() === values.place,
    );
    if (!selectedPlace) {
      alert('선택한 장소를 찾을 수 없습니다.');
      return;
    }
    const patchData = {
      wktId: id,
      thumbnailUrl: '썸네일 주소',
      wktPlaceId: selectedPlace.id,
      title: values.title,
      address: values.place, // 주소 삭제 예정
      startDate: dayjs(startDateWorkation).toISOString(),
      endDate: dayjs(endDateWorkation).toISOString(),
      applyStartDate: dayjs(startDateRecruitment).toISOString(),
      applyEndDate: dayjs(endDateRecruitment).toISOString(),
      description: values.description || '',
      totalRecruit: values.number,
    };
    patchWkQuery.mutate(patchData);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelect = (option: string) => {
    const selectedPlace = placeData.wktPlaceInfos.find(
      (place) => place.place === option,
    );
    setValues((prevValues) => ({
      ...prevValues,
      place: selectedPlace ? selectedPlace.id.toString() : '',
    }));
  };
  const placeOptions = placeData.wktPlaceInfos.map((place) => place.place);

  return (
    <section className="flex flex-col">
      <TitleBarModule title="워케이션 수정" type="LEFT" />
      <div className="mt-10 flex flex-col gap-[30px]">
        <div className="flex h-52 gap-x-8">
          <Image
            src={data?.files[0].url || ''}
            width={400}
            height={300}
            alt="place"
          />
          <div className="w-full">
            <div className="flex w-full gap-6">
              <div className="w-full">
                <InputModule
                  textCount={30}
                  placeholder="제목을 입력하세요"
                  subtitle="제목"
                  value={values.title}
                  name="title"
                  onChange={handleChange}
                />
              </div>
              <div className="w-52">
                <InputModule
                  subtitle="모집 인원"
                  placeholder="0"
                  value={values.number}
                  name="number"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-6 flex w-full flex-col gap-4">
              <p className="text-3 font-semibold">장소</p>
              <DropdownModule
                selectedOption={
                  placeData.wktPlaceInfos.find(
                    (place) => place.id.toString() === values.place,
                  )?.place || 'Unknown place'
                }
                options={placeOptions}
                onSelect={handleSelect}
                placeholder="장소를 선택해주세요."
              />
            </div>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="w-full">
            <p className="mb-3 text-3 font-semibold">모집 기간</p>
            <DatePickersModule
              startDatePlaceholder="모집 시작일"
              endDatePlaceholder="모집 마감일"
              startDate={startDateRecruitment}
              setStartDate={setStartDateRecruitment}
              endDate={endDateRecruitment}
              setEndDate={setEndDateRecruitment}
              className="flex items-center gap-x-2 py-3"
            />
          </div>
          <div className="w-full">
            <p className="mb-3 text-3 font-semibold">워케이션 기간</p>
            <DatePickersModule
              startDatePlaceholder="모집 시작일"
              endDatePlaceholder="모집 마감일"
              startDate={startDateWorkation}
              setStartDate={setStartDateWorkation}
              endDate={endDateWorkation}
              setEndDate={setEndDateWorkation}
              className="flex items-center gap-x-2 py-3"
            />
          </div>
        </div>
        <div className="-mt-4">
          <p className="mb-3 text-3 font-semibold">내용</p>
          <TextAreaModule
            placeholder="상세 내용을 입력하세요"
            maxLength={2000}
            size="LARGE"
            value={values.description}
            name="description"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-12 flex justify-end gap-5">
        <ButtonAtom
          width="fixed"
          text="취소"
          type="button"
          buttonStyle="dark"
          onClick={() => router.push('/admin/workation')}
        />
        <ButtonAtom
          width="fixed"
          text="수정"
          type="button"
          buttonStyle="yellow"
          onClick={() => setIsEditModalOpen(true)}
        />
      </div>
      {isEditModalOpen && (
        <ModalModule
          title="워케이션을 수정하시겠습니까?"
          confirmText="확인"
          cancelText="취소"
          onConfirm={handleConfirmEdit}
          onCancel={() => {
            setIsEditModalOpen(false);
          }}
        >
          <InfoSectionContainer
            data={[
              {
                subtitle: '제목',
                content: values.title,
              },
              {
                subtitle: '장소',
                content:
                  placeData.wktPlaceInfos.find(
                    (place) => place.id.toString() === values.place,
                  )?.place || 'Unknown place',
              },
              {
                subtitle: '모집 기간',
                content: `${dayjs(startDateRecruitment).format('YYYY.MM.DD')} - ${dayjs(endDateRecruitment).format('YYYY.MM.DD')}`,
              },
              {
                subtitle: '워케이션 기간',
                content: `${dayjs(startDateWorkation).format('YYYY.MM.DD')} - ${dayjs(endDateWorkation).format('YYYY.MM.DD')}`,
              },
            ]}
          />
        </ModalModule>
      )}
    </section>
  );
};

export default WorkationEdit;
