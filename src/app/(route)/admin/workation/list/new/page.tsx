'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import React, { useState } from 'react';
import { PlaceGallery } from '@/_assets/icons';
import Image from 'next/image';
import DropdownModule from '@/_components/common/modules/DropdownModule';
import { PlaceOptions } from '@/_constants/common';

const WorkationNew = () => {
  const [values, setValues] = useState({
    title: '',
    person: '',
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
  return (
    <div>
      <TitleBarModule title="워케이션 등록" type="LEFT" />
      <div className="h-52 flex gap-x-8 mt-10">
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
                value={values.person}
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
    </div>
  );
};

export default WorkationNew;
