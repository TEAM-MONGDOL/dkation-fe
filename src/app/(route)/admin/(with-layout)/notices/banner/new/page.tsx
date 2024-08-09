'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import ColorChartModule from '@/_components/admin/notices/StyleChartModule';

const WriteNoticesPage = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    title: '',
    linkUrl: '',
    backgroundColor: '',
  });

  const handleSelect = (option: string) => {};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleColorSelect = (color: string) => {
    setValues({ ...values, backgroundColor: color });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = { ...values };
  };

  return (
    <section>
      <TitleBarModule title="배너 추가하기" type="LEFT" />
      <form onSubmit={handleSubmit}>
        <div className="pt-10">
          <div className="mb-3 flex items-center gap-x-3">
            <p className="text-3 font-bold">제목</p>
            <p className="text-4 text-sub-100">
              해당 필드의 입력값이 사용자 메인 페이지에 노출됩니다.
            </p>
          </div>
          <div className="flex w-full">
            <InputModule
              name="title"
              placeholder="제목을 입력하세요."
              textCount={50}
              value={values.title}
              onChange={handleChange}
            />
          </div>
          <p className="mb-3 mt-6 text-3 font-bold">링크</p>
          {/*  드롭다운 추가 */}
          <div>
            <p className="mb-3 mt-6 text-3 font-bold">스타일</p>
            <ColorChartModule
              selectedColor={values.backgroundColor}
              onSelectColor={handleColorSelect}
            />
          </div>
          <div className="flex justify-end pt-14">
            <ButtonAtom buttonStyle="yellow" text="등록" type="submit" />
          </div>
        </div>
      </form>
    </section>
  );
};

export default WriteNoticesPage;
