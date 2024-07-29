'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TitleBarModule from '@/_components/common/modules/TitleBarModule';
import InputModule from '@/_components/common/modules/InputModule';
import FileContainer from '@/_components/common/containers/FileContainer';
import ButtonAtom from '@/_components/common/atoms/ButtonAtom';
import DropdownModule from '@/_components/common/modules/DropdownModule';
import TextAreaModule from '@/_components/common/modules/TextAreaModule';
import { NoticeOptions } from '@/_constants/common';

const WriteNoticesPage = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    category: '',
    title: '',
    files: [] as File[],
    content: '',
  });

  const handleSelect = (option: string) => {
    setValues({ ...values, category: option });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilesChange = (newFiles: File[]) => {
    setValues({
      ...values,
      files: newFiles,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/admin/notices'); // 추후 수정 예정
  };

  return (
    <div>
      <TitleBarModule title="공지 글쓰기" type="LEFT" />
      <form onSubmit={handleSubmit}>
        <div className="pt-10">
          <p className="text-3 font-bold mb-4">제목</p>
          <div className="flex gap-4">
            <DropdownModule
              options={NoticeOptions}
              onSelect={handleSelect}
              placeholder="구분 선택"
            />
            <div className="w-full">
              <InputModule
                name="title"
                placeholder="제목을 입력하세요"
                textCount={20}
                value={values.title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="py-7">
            <FileContainer onFileChange={handleFilesChange} />{' '}
          </div>
          <p className="text-3 font-bold mb-4">내용</p>
          <TextAreaModule
            name="content"
            placeholder="상세 내용을 입력하세요."
            size="LARGE"
            maxLength={2000}
            value={values.content}
            onChange={handleChange}
          />
          <div className="flex justify-end pt-14">
            <ButtonAtom buttonType="yellow">등록</ButtonAtom>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WriteNoticesPage;
