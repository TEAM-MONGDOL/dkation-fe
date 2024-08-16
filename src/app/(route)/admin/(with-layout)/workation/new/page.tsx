'use client';

import InputModule from '@/_components/common/modules/InputModule';
import React, { useState } from 'react';
import { ImageIcon } from '@/_assets/icons';
import Image from 'next/image';
import DropdownModule from '@/_components/common/modules/DropdownModule';
import dayjs from 'dayjs';
import DatePickersModule from '@/_components/common/modules/DatePickersModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import ModalModule from '@/_components/common/modules/ModalModule';
import { useRouter } from 'next/navigation';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';
import { useWkNewMutation } from '@/_hooks/admin/useWkNewMutation';
import { useGetWkPlaceListQuery } from '@/_hooks/admin/useGetWkPlaceListQuery';
import { PlaceListItemType } from '@/_types/adminType';
import AdminLoading from '@/_components/admin/adminLoading';
import NetworkError from '@/_components/common/networkError';

const WorkationNew = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<{
    title: string;
    number: number | null;
    description: string;
  }>({
    title: '',
    number: null,
    description: '',
  });
  const { data, isLoading, isError } = useGetWkPlaceListQuery({
    pageParam: {
      page: 1,
      size: 100,
    },
  });
  const [selectedPlace, setSelectedPlace] = useState<PlaceListItemType | null>(
    null,
  );
  const [startDateRecruitment, setStartDateRecruitment] = useState<Date | null>(
    dayjs().toDate(),
  );
  const [endDateRecruitment, setEndDateRecruitment] = useState<Date | null>(
    dayjs().toDate(),
  );
  const [startDateWorkation, setStartDateWorkation] = useState<Date | null>(
    dayjs().toDate(),
  );
  const [endDateWorkation, setEndDateWorkation] = useState<Date | null>(
    dayjs().toDate(),
  );
  const [isConfirmModelOpen, setIsConfirmModelOpen] = useState(false);
  const successCallback = () => {
    alert('워케이션 등록 완료');
    router.push('/admin/workation');
  };
  const { mutate: postWk } = useWkNewMutation(successCallback);

  if (isLoading) {
    return <AdminLoading />;
  }
  if (isError) {
    return <NetworkError />; // 에러컴포넌트 추가시 변경예정
  }
  if (!data) {
    return <NetworkError />;
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkData = () => {
    if (!formData.title) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!selectedPlace) {
      alert('선택한 장소를 찾을 수 없습니다.');
      return;
    }

    if (!formData.number) {
      alert('모집 인원을 입력해주세요.');
      return;
    }

    if (formData.number > selectedPlace.maxPeople) {
      alert(
        `모집 인원이 장소의 최대 인원(${selectedPlace.maxPeople}명)을 초과합니다.`,
      );
      return;
    }

    if (!formData.description) {
      alert('내용을 입력해주세요.');
      return;
    }

    if (!startDateRecruitment || !endDateRecruitment) {
      alert('모집 기간을 입력해주세요.');
      return;
    }

    if (!startDateWorkation || !endDateWorkation) {
      alert('워케이션 기간을 입력해주세요.');
      return;
    }

    if (dayjs(startDateRecruitment).isAfter(endDateRecruitment)) {
      alert('모집 시작일이 마감일보다 늦습니다.');
      return;
    }

    if (dayjs(startDateWorkation).isAfter(endDateWorkation)) {
      alert('워케이션 시작일이 종료일보다 늦습니다.');
      return;
    }

    if (
      dayjs(startDateRecruitment).isAfter(startDateWorkation) ||
      dayjs(endDateRecruitment).isAfter(startDateWorkation)
    ) {
      alert('모집 기간이 워케이션 시작일보다 늦습니다.');
      return;
    }

    setIsConfirmModelOpen(true);
  };

  const handleSelect = (option: string) => {
    const selected = data.wktPlaceInfos.find((place) => place.place === option);
    setSelectedPlace(selected || null);
  };

  const handleSubmit = () => {
    if (!selectedPlace) {
      alert('선택한 장소를 찾을 수 없습니다.');
      return;
    }

    if (!formData.number) {
      alert('모집 인원을 입력해주세요.');
      return;
    }

    postWk({
      wktPlaceId: selectedPlace.id, // 워케이션 목록 api 가져와서 id 주기
      title: formData.title,
      startDate: dayjs(startDateWorkation!).format('YYYY-MM-DD'),
      endDate: dayjs(endDateWorkation!).format('YYYY-MM-DD'),
      applyStartDate: dayjs(startDateRecruitment!).format('YYYY-MM-DD'),
      applyEndDate: dayjs(endDateRecruitment!).format('YYYY-MM-DD'),
      description: formData.description,
      totalRecruit: formData.number,
    });
    setIsConfirmModelOpen(false);
  };
  const placeOptions = data.wktPlaceInfos.map((place) => place.place);

  return (
    <section className="flex flex-col">
      <TitleBarModule title="워케이션 등록" type="LEFT" />
      <div className="mt-10 flex w-full flex-col gap-[30px]">
        <div className="flex h-52 w-full gap-x-8">
          {selectedPlace ? (
            <Image
              className="h-[204px] grow object-cover"
              src={selectedPlace.thumbnailUrl}
              alt="PlaceGallery"
              width={400}
              height={204}
            />
          ) : (
            <div className="flex h-[204px] grow flex-col items-center justify-center gap-y-2 bg-cus-100 text-sub-200">
              <Image src={ImageIcon} alt="PlaceGallery" />
              <p className="mt-2 w-full px-5 text-center">
                장소 선택 시
                <br />
                대표 이미지를 확인할 수 있습니다.
              </p>
            </div>
          )}
          <div className="flex w-2/3 flex-col gap-y-6">
            <div className="flex w-full gap-6">
              <div className="grow">
                <InputModule
                  subtitle="제목"
                  placeholder="제목을 입력하세요"
                  textCount={30}
                  value={formData.title}
                  onChange={handleChange}
                  name="title"
                />
              </div>
              <div className="w-40 xl:w-52">
                <InputModule
                  type="number"
                  subtitle="모집 인원"
                  placeholder="0"
                  value={formData.number?.toLocaleString() || ''}
                  onChange={handleChange}
                  name="number"
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <p className="text-3 font-semibold">장소</p>
              <DropdownModule
                selectedOption={selectedPlace?.place || null}
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
            placeholder="상세내용을 입력해주세요."
            size="LARGE"
            maxLength={2000}
            name="description"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-12 flex justify-end">
        <ButtonAtom
          width="fixed"
          text="등록"
          type="button"
          buttonStyle="yellow"
          onClick={checkData}
        />
      </div>
      {isConfirmModelOpen && (
        <ModalModule
          title="워케이션을 등록하시겠습니까?"
          confirmText="확인"
          cancelText="취소"
          onConfirm={handleSubmit}
          onCancel={() => {
            setIsConfirmModelOpen(false);
          }}
        >
          <InfoSectionContainer
            data={[
              {
                subtitle: '제목',
                content: formData.title,
              },
              {
                subtitle: '장소',
                content: selectedPlace?.place || 'Unknown place',
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

export default WorkationNew;
