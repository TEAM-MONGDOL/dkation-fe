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
import { usePostNoticeMutation } from '@/_hooks/admin/usePostNoticeMutation';
import FileModule from '@/_components/common/modules/FileModule';

const WriteNoticesPage = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    announcementType: '',
    title: '',
    fileUrls: [] as string[],
    description: '',
  });

  const { mutate: postAnnouncement } = usePostNoticeMutation({
    successCallback: () => {
      router.push('/admin/notices');
    },
    errorCallback: (error: Error) => {
      console.error('failed upload announcement : ', error);
    },
  });

  const handleSelect = (option: string) => {
    setValues({ ...values, announcementType: option });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilesChange = (fileUrls: string[]) => {
    setValues((prevValues) => ({
      ...prevValues,
      fileUrls: [...prevValues.fileUrls, ...fileUrls],
    }));
  };

  const handleDeleteFile = (index: number) => {
    setValues((prevValues) => {
      const updatedFileUrls = prevValues.fileUrls.filter(
        (_, idx) => idx !== index,
      );
      return {
        ...prevValues,
        fileUrls: updatedFileUrls,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postAnnouncement(values);
  };

  const getFileType = (url: string) => {
    const parts = url.split('.');
    const extension = parts.length > 1 ? parts.pop()?.toLowerCase() : '';
    const imageExtensions = ['jpg', 'jpeg', 'png'];
    return imageExtensions.includes(extension || '') ? 'image' : 'other';
  };

  return (
    <section>
      <TitleBarModule title="공지 글쓰기" type="LEFT" />
      <form onSubmit={handleSubmit}>
        <div className="pt-10">
          <p className="mb-4 text-3 font-bold">제목</p>
          <div className="flex w-full gap-4">
            <DropdownModule
              size="large"
              options={NoticeOptions}
              onSelect={handleSelect}
              placeholder="구분 선택"
              selectedOption={values.announcementType}
            />
            <InputModule
              name="title"
              placeholder="제목을 입력하세요"
              textCount={20}
              value={values.title}
              onChange={handleChange}
            />
          </div>
          <div className="py-7">
            {values.fileUrls.length > 0 && (
              <div className="py-2">
                <div className="flex flex-col gap-2">
                  {values.fileUrls.map((fileUrl, index) => {
                    const fileName = decodeURIComponent(
                      fileUrl.split('/').pop()?.split('-').slice(1).join('-') ||
                        '',
                    );

                    const fileType = getFileType(fileUrl);
                    return (
                      <div key={fileName} className="flex items-center gap-2">
                        <FileModule
                          preview={fileUrl}
                          fileName={fileName}
                          fileType={fileType}
                          buttonType="delete"
                          onDelete={() => handleDeleteFile(index)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <FileContainer
              onFileChange={handleFilesChange}
              fileDomainType="ANNOUNCEMENT"
            />
          </div>
          <p className="mb-4 text-3 font-bold">내용</p>
          <TextAreaModule
            name="description"
            placeholder="상세 내용을 입력하세요."
            size="LARGE"
            maxLength={2000}
            value={values.description}
            onChange={handleChange}
          />
          <div className="flex justify-end pt-14">
            <ButtonAtom buttonStyle="yellow" text="등록" type="submit" />
          </div>
        </div>
      </form>
    </section>
  );
};

export default WriteNoticesPage;
