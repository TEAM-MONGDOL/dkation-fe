'use client';

import InputModule from '@/_components/common/modules/InputModule';
import React, { useState } from 'react';
import { ImageIcon } from '@/_assets/icons';
import Image from 'next/image';
import DropdownModule from '@/_components/common/modules/DropdownModule';
import { PlaceOptions } from '@/_constants/common';
import { DatePickerTagType } from '@/_types/commonType';
import dayjs from 'dayjs';
import DatePickersModule from '@/_components/common/modules/DatePickersModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';

const WorkationNew = () => {
  const [formData, setFormData] = useState({
    title: '',
    number: '',
    place: '',
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSelect = (option: string) => {
    setFormData({ ...formData, place: option });
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
      <div className="mt-10 flex flex-col gap-[30px]">
        <div className="flex h-52 gap-x-8">
          <div className="flex w-[550px] flex-col items-center justify-center gap-y-2 bg-cus-100 text-sub-200">
            <Image src={ImageIcon} alt="PlaceGallery" />
            <p className="mt-2 text-center">
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
                  value={formData.title}
                  onChange={handleChange}
                  name="title"
                />
              </div>
              <div className="w-52">
                <InputModule
                  subtitle="모집 인원"
                  placeholder="0"
                  value={formData.number}
                  onChange={handleChange}
                  name="number"
                />
              </div>
            </div>
            <div className="mt-6 flex w-full flex-col gap-4">
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
            <p className="mb-3 text-3 font-semibold">모집 기간</p>
            <DatePickersModule
              startDatePlaceholder="모집 시작일"
              endDatePlaceholder="모집 마감일"
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              className="flex items-center gap-x-2 py-3"
            />
          </div>
          <div className="w-full">
            <p className="mb-3 text-3 font-semibold">워케이션 기간</p>
            <DatePickersModule
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
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
            name="워케이션 상세내용"
          />
        </div>
      </div>

      <div className="mt-12 flex justify-end">
        <ButtonAtom
          width="fixed"
          text="등록"
          type="submit"
          buttonStyle="yellow"
        />
      </div>
    </div>
  );
};

export default WorkationNew;
