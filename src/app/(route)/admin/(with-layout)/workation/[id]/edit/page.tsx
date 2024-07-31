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
import { PlaceOptions } from '@/_constants/common';
import DatePickersModule from '@/_components/common/modules/DatePickersModule';
import dayjs from 'dayjs';
import ModalModule from '@/_components/common/modules/ModalModule';
import logo from '@/_assets/images/logo_imsy.png';
import InfoSectionContainer from '@/_components/common/containers/InfoSectionContainer';

const data = {
  id: 1,
  title: '제목입니다',
  number: '2',
  place: '양양',
  description: '상세내용입니다.',
  startDateRecruitment: dayjs('2024-07-14,').toDate(),
  endDateRecruitment: dayjs('2024-07-14,').toDate(),
  startDateWorkation: dayjs('2024-07-14,').toDate(),
  endDateWorkation: dayjs('2024-07-14,').toDate(),
};

const WorkationEdit = () => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [values, setValues] = useState({
    id: data.id,
    title: data.title,
    number: data.number,
    place: data.place,
    description: data.description,
  });

  const [startDateRecruitment, setStartDateRecruitment] = useState<Date | null>(
    data.startDateRecruitment,
  );
  const [endDateRecruitment, setEndDateRecruitment] = useState<Date | null>(
    data.endDateRecruitment,
  );

  const [startDateWorkation, setStartDateWorkation] = useState<Date | null>(
    data.startDateWorkation,
  );
  const [endDateWorkation, setEndDateWorkation] = useState<Date | null>(
    data.endDateWorkation,
  );
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelect = (option: string) => {
    setValues({ ...values, place: option });
  };
  return (
    <section className="flex flex-col">
      <TitleBarModule title="워케이션 상세" type="LEFT" />
      <div className="mt-10 flex flex-col gap-[30px]">
        <div className="flex h-52 gap-x-8">
          <Image src={placeImsy} alt="placeImsy" />
          <div className="w-full">
            <div className="flex w-full gap-6">
              <div className="w-full">
                <InputModule
                  textCount={20}
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
                options={PlaceOptions}
                onSelect={handleSelect}
                placeholder="구분 선택"
                selectedOption={values.place}
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
            maxLength={2000}
            placeholder="상세내용을 입력하세요."
            size="LARGE"
            value={values.description}
            name="워케이션 상세내용"
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
          onConfirm={() => {
            //  TODO : 워케이션 수정 API 호출
            alert('워케이션 수정 완료');
            setIsEditModalOpen(false);
            router.push('/admin/workation');
          }}
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
                content: values.place,
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
