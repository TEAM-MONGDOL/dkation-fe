'use client';

import InputModule from '@/_components/common/modules/InputModule';
import React, { useState } from 'react';
import { PlaceGallery } from '@/_assets/icons';
import Image from 'next/image';
import DropdownModule from '@/_components/common/modules/DropdownModule';
import { PlaceOptions } from '@/_constants/common';
import { DatePickerTagType } from '@/_types/commonType';
import dayjs from 'dayjs';
import DatePickersModule from '@/_components/common/modules/DatePickersModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import TitleBarModule from '../../../../../../_components/common/modules/TitleBarModule';

const WorkationNew = () => {
  const [values, setValues] = useState({
    title: '',
    number: '',
    category: '',
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleSelect = (option: string) => {
    setValues({ ...values, category: option });
  };
  const [selectedDateTag, setSelectedDateTag] =
    useState<DatePickerTagType>('ALL');
  const [startDate, setStartDate] = useState<Date>(
    dayjs().subtract(1, 'year').toDate(),
  );
  const [endDate, setEndDate] = useState<Date>(dayjs().toDate());
  return (
    <div className="flex flex-col">
      <TitleBarModule title="워케이션 등록" type="LEFT" />
      <div className="flex flex-col  mt-10 gap-[30px]">
        <div className="h-52 flex gap-x-8">
          <div className=" gap-y-2 text-sub-200 w-[550px] bg-cus-100 items-center flex flex-col justify-center">
            <Image src={PlaceGallery} alt="PlaceGallery" />
            <p className="text-center mt-2">
              장소 선택 시
              <br />
              대표 이미지를 확인할 수 있습니다.
            </p>
          </div>
          <div className="w-full">
            <div className="flex w-full gap-6">
              <div className="w-full">
                <InputModule
                  subtitle="제목"
                  placeholder="제목을 입력하세요"
                  textCount={30}
                  value={values.title}
                  onChange={handleChange}
                />
              </div>
              <div className="w-52">
                <InputModule
                  subtitle="모집 인원"
                  placeholder="0"
                  value={values.number}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col w-full gap-4">
              <p className="text-3 font-semibold">장소</p>
              <DropdownModule
                options={PlaceOptions}
                onSelect={handleSelect}
                placeholder="장소를 선택해주세요."
              />
            </div>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="w-full">
            <p className="text-3 mb-3 font-semibold">모집 기간</p>
            <DatePickersModule
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              className="py-3 flex gap-x-2 items-center"
            />
          </div>
          <div className="w-full">
            <p className="text-3 mb-3 font-semibold">워케이션 기간</p>
            <DatePickersModule
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              className="py-3 flex gap-x-2 items-center"
            />
          </div>
        </div>
        <div className="-mt-4">
          <p className="text-3 mb-3 font-semibold">내용</p>
          <TextAreaModule
            placeholder="상세내용을 입력해주세요."
            size="LARGE"
            maxLength={2000}
            name="워케이션 상세내용"
          />
        </div>
      </div>

      <div className="flex justify-end mt-12">
        <ButtonAtom buttonType="yellow">등록</ButtonAtom>
      </div>
    </div>
  );
};

export default WorkationNew;
