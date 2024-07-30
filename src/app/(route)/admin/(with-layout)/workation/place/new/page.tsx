'use client';

import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import FileContainer from '@/_components/common/containers/FileContainer';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import React, { useState } from 'react';

const AdminWorkationPlaceNewPage = () => {
  const [formData, setFormData] = useState({
    placeName: '',
    address: '',
    maxPeople: '',
    registrationDate: '2024.07.14',
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col gap-7">
      <TitleBarModule title="장소 추가" type="LEFT" />
      <div className="flex w-full gap-7">
        <InputModule
          subtitle="이름"
          textCount={20}
          placeholder="장소 이름을 입력하세요."
          value={formData.placeName}
          onChange={handleChange}
          name="placeName"
        />
        <InputModule
          subtitle="주소"
          placeholder="주소를 입력하세요."
          value={formData.address}
          onChange={handleChange}
          name="address"
        />
      </div>
      <div className="flex w-full gap-7">
        <InputModule
          subtitle="최대 인원"
          placeholder="0"
          value={formData.maxPeople}
          onChange={handleChange}
          name="maxPeople"
        />
        <InputModule
          subtitle="등록 일시"
          status="disabled"
          value={formData.registrationDate}
          onChange={() => {}}
        />
      </div>
      <FileContainer />
      <div>
        <p className="mb-4 text-3 font-bold">상세 내용</p>
        <TextAreaModule
          placeholder="상세 내용을 입력하세요"
          size="MEDIUM"
          maxLength={500}
          name="상세내용"
        />
      </div>
      <div className="flex justify-end gap-5">
        <ButtonAtom
          text="취소"
          type="button"
          width="fixed"
          buttonStyle="dark"
        />
        <ButtonAtom
          text="등록"
          type="submit"
          width="fixed"
          buttonStyle="yellow"
        />
      </div>
    </div>
  );
};

export default AdminWorkationPlaceNewPage;
