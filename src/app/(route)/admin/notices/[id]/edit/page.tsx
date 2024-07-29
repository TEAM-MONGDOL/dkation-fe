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
import FileModule from '@/_components/common/modules/FileModule';

interface FileItem {
  name: string;
  url: string;
  type: 'image' | 'other';
}

const data = {
  id: 1,
  category: '공지사항',
  title: '제목입니다',
  content: '내용입니다 !!!!!!!!!!!!!',
  files: [
    {
      name: '첨부파일1.pdf',
      url: '/file/path/example/file1.pdf',
      type: 'other',
    },
    {
      name: '첨부파일2.pdf',
      url: '/file/path/example/file2.pdf',
      type: 'other',
    },
  ] as FileItem[],
};

const AdminWriteNoticesEditPage = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    category: data.category,
    title: data.title,
    files: data.files,
    content: data.content,
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
    const fileItems: FileItem[] = newFiles.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image') ? 'image' : 'other',
    }));

    setValues({
      ...values,
      files: fileItems,
    });
  };

  const BackToNoticesDetail = (id: number) => {
    router.push(`/admin/notices/${id}`);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
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
              initialSelectedOption={values.category}
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
          <div className="flex flex-col py-7 gap-4">
            {data.files.length > 0 ? (
              <div className="flex flex-col gap-2">
                {data.files.map((file) => (
                  <FileModule
                    key={file.url}
                    fileName={file.name}
                    fileType={file.type}
                    fileUrl={file.url}
                    buttonType="delete"
                    onDelete={() => console.log(`Delete ${file.name}`)} // 추후 수정 예정
                  />
                ))}
              </div>
            ) : (
              ''
            )}
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
          <div className="flex justify-end pt-14 gap-5">
            <ButtonAtom
              buttonStyle="dark"
              onClick={() => BackToNoticesDetail(data.id)}
            >
              취소
            </ButtonAtom>
            <ButtonAtom buttonStyle="yellow" type="submit">
              등록
            </ButtonAtom>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminWriteNoticesEditPage;
